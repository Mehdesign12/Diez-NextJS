import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProjectByApiKey, saveProjectContact } from '@/lib/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    // 2. Parse and validate body
    const body = await req.json();
    const { name, email, phone, budget, interests, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400, headers: corsHeaders });
    }

    // 3. Save to project_contacts
    const { error: dbError } = await saveProjectContact({
      project_id: project.id,
      name,
      email,
      phone: phone || null,
      budget: budget || null,
      interests: Array.isArray(interests) ? interests : undefined,
      message: message || null,
      metadata: { user_agent: req.headers.get('user-agent') || '', origin: req.headers.get('origin') || '' },
    });

    if (dbError) {
      return NextResponse.json({ error: 'Database error' }, { status: 500, headers: corsHeaders });
    }

    // 4. Send email notification
    if (resend) {
      const interestsList = Array.isArray(interests) ? interests.join(', ') : 'N/A';

      await resend.emails.send({
        from: 'Diez Agency <noreply@diez-agency.com>',
        to: ['contact@diez-agency.com'],
        subject: `[${project.name}] Nouveau lead : ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">

            <!-- Header -->
            <div style="background: #0F0F0F; padding: 32px; text-align: center;">
              <h1 style="color: #FF4D29; margin: 0; font-size: 22px; font-weight: 800;">
                Nouveau lead — ${project.name}
              </h1>
              <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
                Reçu depuis ${project.url || project.name}
              </p>
            </div>

            <!-- Body -->
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 8px 8px 0 0; border-bottom: 1px solid #fed7aa;">
                    <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nom</strong><br>
                    <span style="color: #0F0F0F; font-size: 16px; font-weight: 600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                    <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</strong><br>
                    <a href="mailto:${email}" style="color: #0F0F0F; font-size: 16px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                    <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</strong><br>
                    <a href="tel:${phone}" style="color: #0F0F0F; font-size: 16px; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
                ${budget ? `
                <tr>
                  <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                    <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</strong><br>
                    <span style="color: #0F0F0F; font-size: 16px;">${budget}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 0 0 8px 8px;">
                    <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Intérêts</strong><br>
                    <span style="color: #0F0F0F; font-size: 16px;">${interestsList}</span>
                  </td>
                </tr>
              </table>

              ${message ? `
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Message</strong>
                <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}

              <div style="text-align: center;">
                <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your inquiry about ${project.name}`)}"
                   style="display: inline-block; background: #FF4D29; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">
                  Répondre à ${name}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Projet : ${project.name} · Diez Agency QG
              </p>
            </div>
          </div>
        `,
      }).catch((err) => console.error('Resend email error:', err));
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('Incoming contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

// CORS preflight for cross-origin requests from sub-projects
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
