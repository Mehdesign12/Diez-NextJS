import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, need, description, budget, timeline, email, phone, lang } = body;

    // Validate required fields
    if (!first_name || !need || !description || !budget || !timeline || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to Supabase
    const supaRes = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ first_name, need, description, budget, timeline, email, phone, lang }),
    });

    if (!supaRes.ok) {
      const err = await supaRes.text();
      console.error('Supabase saveContact error:', err);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 2. Send email notification via Resend
    const isFr = lang === 'fr';

    if (!resend) {
      return NextResponse.json({ success: true });
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Diez Agency <noreply@diez-agency.com>',
      to: ['contact@diez-agency.com'],
      subject: isFr
        ? `Nouveau contact : ${first_name} — ${need}`
        : `New contact: ${first_name} — ${need}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">

          <!-- Header -->
          <div style="background: #0F0F0F; padding: 32px; text-align: center;">
            <h1 style="color: #FF4D29; margin: 0; font-size: 24px; font-weight: 800;">
              ${isFr ? 'Nouvelle demande de contact' : 'New contact request'}
            </h1>
            <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
              ${isFr ? 'Reçue depuis diez-agency.com' : 'Received from diez-agency.com'}
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">

            <!-- Contact info -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 8px 8px 0 0; border-bottom: 1px solid #fed7aa;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isFr ? 'Prénom' : 'Name'}</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px; font-weight: 600;">${first_name}</span>
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
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isFr ? 'Téléphone' : 'Phone'}</strong><br>
                  <a href="tel:${phone}" style="color: #0F0F0F; font-size: 16px; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isFr ? 'Besoin' : 'Need'}</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px;">${need}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-bottom: 1px solid #fed7aa;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px;">${budget}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background: #FFF8F3; border-radius: 0 0 8px 8px;">
                  <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isFr ? 'Délai' : 'Timeline'}</strong><br>
                  <span style="color: #0F0F0F; font-size: 16px;">${timeline}</span>
                </td>
              </tr>
            </table>

            <!-- Description -->
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <strong style="color: #FF4D29; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">
                ${isFr ? 'Description du projet' : 'Project description'}
              </strong>
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
            </div>

            <!-- CTA -->
            <div style="text-align: center;">
              <a href="mailto:${email}?subject=${encodeURIComponent(isFr ? `Re: Votre projet — ${need}` : `Re: Your project — ${need}`)}"
                 style="display: inline-block; background: #FF4D29; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">
                ${isFr ? 'Répondre à' : 'Reply to'} ${first_name}
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              ${isFr ? 'Langue du formulaire' : 'Form language'}: ${lang?.toUpperCase() || 'N/A'} · Diez Agency
            </p>
          </div>

        </div>
      `,
    });

    if (emailError) {
      console.error('Resend email error:', emailError);
      // Contact is saved in DB, email failed — don't fail the request
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
