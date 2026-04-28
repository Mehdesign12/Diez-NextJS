import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcwpqblpovhbgzkipqgn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjd3BxYmxwb3ZoYmd6a2lwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTYxNzgsImV4cCI6MjA4OTA3MjE3OH0.5uXrIJtENQ-0xfn-BKjAfCIyow-0XIkyaGYKeaWqTTU';

function getAuthClient(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') ?? '';
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

async function requireAuth(req: NextRequest): Promise<boolean> {
  const db = getAuthClient(req);
  const { data: { user }, error } = await db.auth.getUser();
  return !error && !!user;
}

export async function GET(req: NextRequest) {
  const db = getAuthClient(req);
  const { data: { user }, error: authError } = await db.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [{ data: entities }, { data: edges }] = await Promise.all([
    db.from('business_entities').select('*').order('created_at', { ascending: true }),
    db.from('business_edges').select('*').order('created_at', { ascending: true }),
  ]);

  return NextResponse.json({ entities: entities ?? [], edges: edges ?? [] });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getAuthClient(req);
  const body = await req.json();

  if (body._type === 'edge') {
    const { _type: _, ...edgeData } = body;
    const { data, error } = await db.from('business_edges').insert(edgeData).select().single();
    if (error) { console.error(error); return NextResponse.json({ error: error.message }, { status: 500 }); }
    return NextResponse.json(data, { status: 201 });
  }

  const { _type: _, ...entityData } = body;
  const { data, error } = await db
    .from('business_entities')
    .insert({ ...entityData, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) { console.error(error); return NextResponse.json({ error: error.message }, { status: 500 }); }
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getAuthClient(req);
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await db
    .from('business_entities')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) { console.error(error); return NextResponse.json({ error: error.message }, { status: 500 }); }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getAuthClient(req);
  const { id, _type } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  if (_type === 'edge') {
    await db.from('business_edges').delete().eq('id', id);
  } else {
    await db.from('business_entities').delete().eq('id', id);
  }
  return NextResponse.json({ ok: true });
}
