import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getJobPreferences, markJobAsApplied } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcwpqblpovhbgzkipqgn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjd3BxYmxwb3ZoYmd6a2lwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTYxNzgsImV4cCI6MjA4OTA3MjE3OH0.5uXrIJtENQ-0xfn-BKjAfCIyow-0XIkyaGYKeaWqTTU';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const { opportunity_id, to_email, subject, cover_letter, job_title } = await req.json();
  if (!opportunity_id || !to_email || !cover_letter) {
    return NextResponse.json({ error: 'opportunity_id, to_email, and cover_letter required' }, { status: 400 });
  }

  const preferences = await getJobPreferences();
  const senderName = preferences?.full_name || 'Product Manager';
  const senderEmail = preferences?.email || 'contact@diez-agency.com';

  // Build email with CV attachment if available
  const emailOptions: Parameters<typeof resend.emails.send>[0] = {
    from: `${senderName} <noreply@diez-agency.com>`,
    replyTo: senderEmail,
    to: [to_email],
    subject: subject || `Application: ${job_title || 'Product Manager'}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        ${cover_letter.split('\n').map((p: string) => p.trim() ? `<p style="margin: 0 0 12px; line-height: 1.6; color: #333;">${p}</p>` : '').join('')}
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 13px; color: #888;">
          ${senderName}${preferences?.phone ? ` · ${preferences.phone}` : ''} · ${senderEmail}
        </p>
      </div>
    `,
  };

  // Attach CV if available
  if (preferences?.cv_url) {
    try {
      const cvRes = await fetch(preferences.cv_url);
      if (cvRes.ok) {
        const cvBuffer = await cvRes.arrayBuffer();
        const filename = preferences.cv_url.split('/').pop() || 'CV.pdf';
        emailOptions.attachments = [{
          filename,
          content: Buffer.from(cvBuffer),
        }];
      }
    } catch (err) {
      console.error('CV fetch error:', err);
    }
  }

  try {
    await resend.emails.send(emailOptions);
    await markJobAsApplied(opportunity_id, 'email');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
