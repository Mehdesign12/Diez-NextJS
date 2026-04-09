import { NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase';
import { fetchAllJobs } from '@/lib/fetch-jobs';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Endpoint pour le bouton "Actualiser" dans l'admin */
export async function POST() {
  // Verifier la session admin
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await fetchAllJobs();

  return NextResponse.json({
    success: true,
    fetched: results,
    timestamp: new Date().toISOString(),
  });
}
