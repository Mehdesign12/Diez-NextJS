import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getJobOpportunities } from '@/lib/supabase';
import { autoApplyBatch } from '@/lib/auto-apply';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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

  const { min_score = 0, status = 'new' } = await req.json().catch(() => ({}));

  // Get eligible opportunities
  const opportunities = await getJobOpportunities({
    status,
    minScore: min_score,
  });

  if (opportunities.length === 0) {
    return NextResponse.json({ success: true, applied: 0, total: 0 });
  }

  const result = await autoApplyBatch(opportunities);

  return NextResponse.json({
    success: true,
    applied: result.applied,
    total: opportunities.length,
    errors: result.errors,
  });
}
