import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getBusinessEntities, getBusinessEdges,
  createBusinessEntity, updateBusinessEntity, deleteBusinessEntity,
  createBusinessEdge, deleteBusinessEdge,
} from '@/lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcwpqblpovhbgzkipqgn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjd3BxYmxwb3ZoYmd6a2lwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTYxNzgsImV4cCI6MjA4OTA3MjE3OH0.5uXrIJtENQ-0xfn-BKjAfCIyow-0XIkyaGYKeaWqTTU';

async function requireAuth(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  const token = authHeader.replace('Bearer ', '');
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: { user }, error } = await client.auth.getUser(token);
  return !error && !!user;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [entities, edges] = await Promise.all([getBusinessEntities(), getBusinessEdges()]);
  return NextResponse.json({ entities, edges });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();

  if (body._type === 'edge') {
    const { _type: _, ...edgeData } = body;
    const edge = await createBusinessEdge(edgeData);
    if (!edge) return NextResponse.json({ error: 'Failed to create edge' }, { status: 500 });
    return NextResponse.json(edge, { status: 201 });
  }

  const { _type: _, ...entityData } = body;
  const entity = await createBusinessEntity(entityData);
  if (!entity) return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 });
  return NextResponse.json(entity, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await updateBusinessEntity(id, fields);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, _type } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  if (_type === 'edge') {
    await deleteBusinessEdge(id);
  } else {
    await deleteBusinessEntity(id);
  }
  return NextResponse.json({ ok: true });
}
