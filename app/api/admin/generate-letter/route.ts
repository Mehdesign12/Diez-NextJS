import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getJobPreferences, updateJobOpportunityCoverLetter } from '@/lib/supabase';
import { generateCoverLetter } from '@/lib/cover-letter';
import type { JobPreferences } from '@/lib/types';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcwpqblpovhbgzkipqgn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjd3BxYmxwb3ZoYmd6a2lwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTYxNzgsImV4cCI6MjA4OTA3MjE3OH0.5uXrIJtENQ-0xfn-BKjAfCIyow-0XIkyaGYKeaWqTTU';

const DEFAULT_PREFERENCES: JobPreferences = {
  id: 0,
  skills: ['product-management', 'agile', 'scrum', 'roadmap', 'user-research'],
  keywords: ['product manager', 'product owner'],
  exclude_keywords: [],
  min_budget: null,
  preferred_budget_type: null,
  preferred_duration: [],
  preferred_experience: [],
  preferred_sources: [],
  bio: 'Product Manager freelance avec experience en gestion de produit digital, methodologies agiles, et strategie produit.',
  cv_url: null,
  full_name: null,
  email: null,
  phone: null,
  freelancer_token: null,
  updated_at: '',
};

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

  const { opportunity_id, title, description, client_name, skills, source } = await req.json();
  if (!opportunity_id || !title) {
    return NextResponse.json({ error: 'opportunity_id and title required' }, { status: 400 });
  }

  const preferences = await getJobPreferences() || DEFAULT_PREFERENCES;

  const letter = await generateCoverLetter(
    { title, description, client_name, skills, source },
    preferences
  );

  await updateJobOpportunityCoverLetter(opportunity_id, letter);

  return NextResponse.json({ success: true, cover_letter: letter });
}
