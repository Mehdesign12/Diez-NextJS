import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getJobPreferences, markJobAsApplied } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

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

  const { opportunity_id, project_id, cover_letter, bid_amount, bid_period } = await req.json();
  if (!opportunity_id || !project_id || !cover_letter) {
    return NextResponse.json({ error: 'opportunity_id, project_id, and cover_letter required' }, { status: 400 });
  }

  const preferences = await getJobPreferences();
  if (!preferences?.freelancer_token) {
    return NextResponse.json({ error: 'Freelancer token not configured. Add it in Preferences.' }, { status: 400 });
  }

  try {
    const res = await fetch('https://www.freelancer.com/api/projects/0.1/bids/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'freelancer-oauth-v1': preferences.freelancer_token,
      },
      body: JSON.stringify({
        project_id: Number(project_id),
        description: cover_letter,
        amount: bid_amount || 500,
        period: bid_period || 7,
        milestone_percentage: 100,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Freelancer bid error:', err);
      return NextResponse.json({ error: `Freelancer API error: ${res.status}` }, { status: 500 });
    }

    await markJobAsApplied(opportunity_id, 'freelancer');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Freelancer bid error:', err);
    return NextResponse.json({ error: 'Failed to place bid' }, { status: 500 });
  }
}
