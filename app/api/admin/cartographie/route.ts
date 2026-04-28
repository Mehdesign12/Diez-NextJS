import { NextRequest, NextResponse } from 'next/server';
import {
  getBusinessEntities, getBusinessEdges,
  createBusinessEntity, updateBusinessEntity, deleteBusinessEntity,
  createBusinessEdge, deleteBusinessEdge,
  getSession,
} from '@/lib/supabase';

async function requireAuth() {
  const session = await getSession();
  return !!session;
}

// GET — fetch all entities + edges
export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [entities, edges] = await Promise.all([getBusinessEntities(), getBusinessEdges()]);
  return NextResponse.json({ entities, edges });
}

// POST — create entity or edge
export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
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

// PATCH — update entity fields (including position)
export async function PATCH(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, ...fields } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await updateBusinessEntity(id, fields);
  return NextResponse.json({ ok: true });
}

// DELETE — delete entity or edge
export async function DELETE(req: NextRequest) {
  if (!(await requireAuth())) {
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
