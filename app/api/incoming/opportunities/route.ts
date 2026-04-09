import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProjectByApiKey, upsertJobOpportunity, updateJobOpportunityScore, getJobPreferences, checkRateLimit } from '@/lib/supabase';
import { scoreOpportunity } from '@/lib/ai-matcher';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

export async function POST(req: Request) {
  try {
    // 1. Validate API key
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 401, headers: corsHeaders });
    }

    const project = await getProjectByApiKey(apiKey);
    if (!project) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401, headers: corsHeaders });
    }

    // 2. Rate limiting
    const allowed = await checkRateLimit(apiKey);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Max 10 requests per minute.' }, { status: 429, headers: corsHeaders });
    }

    // 3. Parse and validate body
    const body = await req.json();
    const { source, source_url, source_id, title, description, client_name, budget_min, budget_max, budget_type, currency, skills, duration, experience_level, location, metadata } = body;

    if (!source || !title) {
      return NextResponse.json({ error: 'source and title are required' }, { status: 400, headers: corsHeaders });
    }

    // 4. Upsert opportunity (deduplicate by source + source_id)
    const oppData: Record<string, unknown> = {
      source,
      source_url: source_url || null,
      source_id: source_id || null,
      title,
      description: description || null,
      client_name: client_name || null,
      budget_min: budget_min || null,
      budget_max: budget_max || null,
      budget_type: budget_type || null,
      currency: currency || 'USD',
      skills: Array.isArray(skills) ? skills : [],
      duration: duration || null,
      experience_level: experience_level || null,
      location: location || null,
      metadata: metadata || {},
    };

    const { data: saved, error: dbError } = await upsertJobOpportunity(oppData);

    if (dbError) {
      return NextResponse.json({ error: 'Database error' }, { status: 500, headers: corsHeaders });
    }

    // 5. AI scoring (async, non-blocking for the response)
    if (saved?.id) {
      scoringAndNotify(saved.id, oppData).catch(err =>
        console.error('Background scoring error:', err)
      );
    }

    return NextResponse.json({ success: true, id: saved?.id }, { headers: corsHeaders });
  } catch (error) {
    console.error('Incoming opportunity API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

async function scoringAndNotify(opportunityId: number, oppData: Record<string, unknown>) {
  const preferences = await getJobPreferences();
  if (!preferences) return;

  const result = await scoreOpportunity(
    {
      title: oppData.title as string,
      description: oppData.description as string | null,
      skills: oppData.skills as string[],
      budget_min: oppData.budget_min as number | null,
      budget_max: oppData.budget_max as number | null,
      budget_type: oppData.budget_type as string | null,
      duration: oppData.duration as string | null,
      experience_level: oppData.experience_level as string | null,
      location: oppData.location as string | null,
      client_name: oppData.client_name as string | null,
    },
    preferences
  );

  // Save score
  await updateJobOpportunityScore(opportunityId, result.score, result.reason);

  // Notify if high match score
  if (result.score >= 70 && resend) {
    const title = oppData.title as string;
    const source = oppData.source as string;
    const sourceUrl = oppData.source_url as string | null;
    const budgetText = oppData.budget_min || oppData.budget_max
      ? `${oppData.budget_min || '?'} - ${oppData.budget_max || '?'} ${oppData.currency || 'USD'}`
      : 'Non specifie';

    await resend.emails.send({
      from: 'Diez Agency <noreply@diez-agency.com>',
      to: ['contact@diez-agency.com'],
      subject: `[Opportunite ${result.score}%] ${title}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          <div style="background: #0F0F0F; padding: 32px; text-align: center;">
            <h1 style="color: #FF4D29; margin: 0; font-size: 22px; font-weight: 800;">
              Opportunite Freelance — ${result.score}% match
            </h1>
            <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
              Source : ${source.charAt(0).toUpperCase() + source.slice(1)}
            </p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 8px 8px 0 0; border-bottom: 1px solid #fed7aa;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Titre</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px; font-weight: 600;">${title}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px;">${budgetText}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 0 0 8px 8px;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Analyse IA</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px;">${result.reason}</span>
                </td>
              </tr>
            </table>
            ${sourceUrl ? `
            <div style="text-align: center;">
              <a href="${sourceUrl}" style="display: inline-block; background: #FF4D29; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">
                Voir l'offre
              </a>
            </div>
            ` : ''}
          </div>
          <div style="background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Diez Agency — Hub Opportunites Freelance
            </p>
          </div>
        </div>
      `,
    }).catch((err) => console.error('Opportunity notification email error:', err));
  }
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
