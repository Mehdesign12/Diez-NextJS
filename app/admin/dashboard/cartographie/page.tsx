'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as d3 from 'd3';
import { getSession } from '@/lib/supabase';
import type { BusinessEntity, BusinessEntityType, BusinessOwner, BusinessStatus, BusinessEdge } from '@/lib/types';

// ── Types for D3 ──────────────────────────────────────────────
interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: BusinessEntityType;
  owner: BusinessOwner;
  status: BusinessStatus;
  description: string | null;
  website: string | null;
  sector: string | null;
  employees: number | null;
  revenue_est: string | null;
  color: string | null;
  size: number;
  is_root: boolean;
  x?: number;
  y?: number;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  id: string;
  label: string | null;
  strength: number;
  source: SimNode | string;
  target: SimNode | string;
}

// ── Constants ────────────────────────────────────────────────
const TYPE_COLORS: Record<BusinessEntityType, string> = {
  person: '#1a1a2e',
  holding: '#1e3a8a',
  company: '#1d4ed8',
  sci: '#0891b2',
  association: '#7c3aed',
  other: '#6b7280',
};

const TYPE_LABELS: Record<BusinessEntityType, string> = {
  person: 'Personne',
  holding: 'Holding',
  company: 'Société',
  sci: 'SCI',
  association: 'Association',
  other: 'Autre',
};

const OWNER_LABELS: Record<BusinessOwner, string> = {
  diezagency: 'Diez Agency',
  mehdi: 'Mehdi Hajji',
  both: 'Les deux',
};

const STATUS_LABELS: Record<BusinessStatus, string> = {
  active: 'Actif',
  inactive: 'Inactif',
  in_development: 'En développement',
};

const STATUS_COLORS: Record<BusinessStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  in_development: 'bg-yellow-100 text-yellow-700',
};

const EMPTY_FORM = {
  name: '',
  type: 'company' as BusinessEntityType,
  owner: 'diezagency' as BusinessOwner,
  status: 'active' as BusinessStatus,
  description: '',
  website: '',
  sector: '',
  employees: '',
  revenue_est: '',
  color: '',
  size: 24,
};

// ─────────────────────────────────────────────────────────────
export default function CartographiePage() {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);

  const [loading, setLoading] = useState(true);
  const [entities, setEntities] = useState<BusinessEntity[]>([]);
  const [edges, setEdges] = useState<BusinessEdge[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // Panel state
  const [selectedEntity, setSelectedEntity] = useState<BusinessEntity | null>(null);
  const [panel, setPanel] = useState<'none' | 'detail' | 'add' | 'edit' | 'add-edge'>('none');
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Edge form
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [edgeLabel, setEdgeLabel] = useState('');

  // Filter
  const [filterOwner, setFilterOwner] = useState<'all' | BusinessOwner>('all');

  // ── Auth ──────────────────────────────────────────────────
  useEffect(() => {
    getSession().then((s) => {
      if (!s) { router.push('/admin'); setLoading(false); return; }
      setToken(s.access_token);
    });
  }, [router]);

  // ── Authenticated fetch helper ─────────────────────────────
  const authFetch = useCallback((url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  // ── Data fetch ────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const res = await authFetch('/api/admin/cartographie');
      if (res.ok) {
        const json = await res.json();
        setEntities(json.entities ?? []);
        setEdges(json.edges ?? []);
      }
    } catch (e) {
      console.error('cartographie fetch error', e);
    } finally {
      setLoading(false);
    }
  }, [authFetch, token]);

  useEffect(() => { if (token) fetchData(); }, [fetchData, token]);

  // ── D3 graph ──────────────────────────────────────────────
  useEffect(() => {
    if (loading || !svgRef.current) return;

    const filtered = filterOwner === 'all'
      ? entities
      : entities.filter(e => e.owner === filterOwner || e.is_root);

    const filteredIds = new Set(filtered.map(e => e.id));
    const filteredEdges = edges.filter(e => filteredIds.has(e.source_id) && filteredIds.has(e.target_id));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const container = svgRef.current.parentElement;
    const W = container?.clientWidth ?? 900;
    const H = container?.clientHeight ?? 600;

    svg.attr('width', W).attr('height', H);

    const g = svg.append('g');

    // Zoom + pan
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    // Nodes
    const nodes: SimNode[] = filtered.map(e => ({
      id: e.id,
      name: e.name,
      type: e.type,
      owner: e.owner,
      status: e.status,
      description: e.description,
      website: e.website,
      sector: e.sector,
      employees: e.employees,
      revenue_est: e.revenue_est,
      color: e.color,
      size: e.size ?? 22,
      is_root: e.is_root,
      x: e.pos_x ?? W / 2 + (Math.random() - 0.5) * 200,
      y: e.pos_y ?? H / 2 + (Math.random() - 0.5) * 200,
    }));

    const links: SimLink[] = filteredEdges.map(e => ({
      id: e.id,
      source: e.source_id,
      target: e.target_id,
      label: e.label,
      strength: e.strength ?? 1,
    }));

    // Simulation
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.id).distance(160).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide<SimNode>().radius(d => d.size + 30));

    simulationRef.current = simulation;

    // Links
    const link = g.append('g').selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.7);

    // Link labels
    const linkLabel = g.append('g').selectAll('text')
      .data(links.filter(l => l.label))
      .join('text')
      .attr('font-size', 10)
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .text(d => d.label ?? '');

    // Nodes group
    const node = g.append('g').selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            // Persist position
            authFetch('/api/admin/cartographie', {
              method: 'PATCH',
              body: JSON.stringify({ id: d.id, pos_x: event.x, pos_y: event.y }),
            });
            d.fx = null; d.fy = null;
          })
      )
      .on('click', (_, d) => {
        const entity = entities.find(e => e.id === d.id);
        if (entity) { setSelectedEntity(entity); setPanel('detail'); }
      });

    // Circle
    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color || TYPE_COLORS[d.type] || '#1d4ed8')
      .attr('stroke', d => d.is_root ? 'white' : 'transparent')
      .attr('stroke-width', d => d.is_root ? 3 : 0)
      .attr('opacity', d => d.status === 'inactive' ? 0.4 : d.status === 'in_development' ? 0.75 : 1);

    // Label
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.size + 16)
      .attr('font-size', 12)
      .attr('font-weight', d => d.is_root ? '700' : '500')
      .attr('fill', '#1e293b')
      .attr('font-family', 'sans-serif')
      .text(d => d.name.length > 20 ? d.name.slice(0, 18) + '…' : d.name);

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as SimNode).x ?? 0)
        .attr('y1', d => (d.source as SimNode).y ?? 0)
        .attr('x2', d => (d.target as SimNode).x ?? 0)
        .attr('y2', d => (d.target as SimNode).y ?? 0);

      linkLabel
        .attr('x', d => (((d.source as SimNode).x ?? 0) + ((d.target as SimNode).x ?? 0)) / 2)
        .attr('y', d => (((d.source as SimNode).y ?? 0) + ((d.target as SimNode).y ?? 0)) / 2);

      node.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => { simulation.stop(); };
  }, [loading, entities, edges, filterOwner, authFetch]);

  // ── CRUD ──────────────────────────────────────────────────
  const handleAddEntity = async () => {
    setSaving(true);
    const payload = {
      name: form.name,
      type: form.type,
      owner: form.owner,
      status: form.status,
      description: form.description || null,
      website: form.website || null,
      sector: form.sector || null,
      employees: form.employees ? parseInt(form.employees as unknown as string) : null,
      revenue_est: form.revenue_est || null,
      color: form.color || null,
      size: Number(form.size),
      is_root: false,
      pos_x: null,
      pos_y: null,
    };
    const res = await authFetch('/api/admin/cartographie', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await fetchData();
      setPanel('none');
      setForm(EMPTY_FORM);
    }
    setSaving(false);
  };

  const handleEditEntity = async () => {
    if (!selectedEntity) return;
    setSaving(true);
    const payload = {
      id: selectedEntity.id,
      name: form.name,
      type: form.type,
      owner: form.owner,
      status: form.status,
      description: form.description || null,
      website: form.website || null,
      sector: form.sector || null,
      employees: form.employees ? parseInt(form.employees as unknown as string) : null,
      revenue_est: form.revenue_est || null,
      color: form.color || null,
      size: Number(form.size),
    };
    await authFetch('/api/admin/cartographie', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    await fetchData();
    setPanel('none');
    setSaving(false);
  };

  const handleDeleteEntity = async (id: string) => {
    if (!confirm('Supprimer cette entité ? Les connexions associées seront aussi supprimées.')) return;
    await authFetch('/api/admin/cartographie', {
      method: 'DELETE',
      body: JSON.stringify({ id, _type: 'entity' }),
    });
    await fetchData();
    setPanel('none');
    setSelectedEntity(null);
  };

  const handleAddEdge = async () => {
    if (!edgeSource || !edgeTarget) return;
    setSaving(true);
    await authFetch('/api/admin/cartographie', {
      method: 'POST',
      body: JSON.stringify({ _type: 'edge', source_id: edgeSource, target_id: edgeTarget, label: edgeLabel || null, strength: 1 }),
    });
    await fetchData();
    setPanel('none');
    setEdgeSource(''); setEdgeTarget(''); setEdgeLabel('');
    setSaving(false);
  };

  const handleDeleteEdge = async (id: string) => {
    await authFetch('/api/admin/cartographie', {
      method: 'DELETE',
      body: JSON.stringify({ id, _type: 'edge' }),
    });
    await fetchData();
  };

  const openEdit = (entity: BusinessEntity) => {
    setForm({
      name: entity.name,
      type: entity.type,
      owner: entity.owner,
      status: entity.status,
      description: entity.description ?? '',
      website: entity.website ?? '',
      sector: entity.sector ?? '',
      employees: entity.employees?.toString() ?? '',
      revenue_est: entity.revenue_est ?? '',
      color: entity.color ?? '',
      size: entity.size ?? 24,
    });
    setSelectedEntity(entity);
    setPanel('edit');
  };

  // ── Stats ─────────────────────────────────────────────────
  const totalActive = entities.filter(e => e.status === 'active').length;
  const totalDiez = entities.filter(e => e.owner === 'diezagency' || e.owner === 'both').length;
  const totalMehdi = entities.filter(e => e.owner === 'mehdi' || e.owner === 'both').length;

  if (loading) return (
    <div className="min-h-screen bg-[#FFF8F3] flex items-center justify-center">
      <i className="fas fa-spinner animate-spin text-[#FF4D29] text-3xl"></i>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col">

      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#FF4D29] transition-colors mr-1">
            <i className="fas fa-arrow-left text-sm"></i>
          </Link>
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-[#0F0F0F]">Cartographie Business</h1>
            <p className="text-xs text-gray-400">Gestion des structures & connexions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Stats pills */}
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            <i className="fas fa-building text-xs"></i> {totalActive} actifs
          </span>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-[#FF4D29] text-xs font-semibold rounded-full">
            <i className="fas fa-network-wired text-xs"></i> Diez ({totalDiez})
          </span>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
            <i className="fas fa-user text-xs"></i> Mehdi ({totalMehdi})
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Graph canvas ────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden bg-white">

          {/* Toolbar */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 flex-wrap">
            {/* Filter */}
            <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 shadow-sm p-1">
              {(['all', 'diezagency', 'mehdi', 'both'] as const).map(o => (
                <button key={o} onClick={() => setFilterOwner(o)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterOwner === o ? 'bg-[#FF4D29] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {o === 'all' ? 'Tous' : o === 'diezagency' ? 'Diez' : o === 'mehdi' ? 'Mehdi' : 'Les deux'}
                </button>
              ))}
            </div>

            {/* Actions */}
            <button onClick={() => { setForm(EMPTY_FORM); setPanel('add'); }}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF4D29] hover:bg-[#e03e1e] text-white text-xs font-bold rounded-xl shadow-sm transition-all">
              <i className="fas fa-plus"></i> Ajouter un business
            </button>
            <button onClick={() => setPanel('add-edge')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-[#FF4D29] text-gray-700 text-xs font-semibold rounded-xl shadow-sm transition-all">
              <i className="fas fa-link"></i> Relier
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col gap-1.5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Types</p>
            {Object.entries(TYPE_LABELS).map(([k, label]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[k as BusinessEntityType] }}></span>
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/80 text-xs text-gray-400 px-3 py-2 rounded-xl border border-gray-100">
            <i className="fas fa-hand-pointer mr-1"></i> Clic = détails · Glisser = repositionner
          </div>

          <svg ref={svgRef} className="w-full h-full" />
        </div>

        {/* ── Side panel ──────────────────────────────────── */}
        {panel !== 'none' && (
          <aside className="w-96 bg-white border-l border-gray-100 flex flex-col shadow-lg overflow-y-auto flex-shrink-0">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="font-extrabold text-[#0F0F0F]">
                {panel === 'detail' && 'Détails'}
                {panel === 'add' && 'Nouveau business'}
                {panel === 'edit' && 'Modifier'}
                {panel === 'add-edge' && 'Créer une connexion'}
              </h2>
              <button onClick={() => setPanel('none')} className="text-gray-400 hover:text-gray-700 transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-1 px-6 py-5 overflow-y-auto">

              {/* ── Detail panel ── */}
              {panel === 'detail' && selectedEntity && (
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: (selectedEntity.color || TYPE_COLORS[selectedEntity.type]) + '20' }}>
                      <i className={`fas ${selectedEntity.type === 'person' ? 'fa-user' : 'fa-building'} text-lg`}
                        style={{ color: selectedEntity.color || TYPE_COLORS[selectedEntity.type] }}></i>
                    </span>
                    <div>
                      <h3 className="font-extrabold text-[#0F0F0F] text-lg leading-tight">{selectedEntity.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs font-semibold text-gray-400">{TYPE_LABELS[selectedEntity.type]}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[selectedEntity.status]}`}>
                          {STATUS_LABELS[selectedEntity.status]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Rattaché à</p>
                    <p className="font-semibold text-[#0F0F0F] text-sm">{OWNER_LABELS[selectedEntity.owner]}</p>
                  </div>

                  {/* Description */}
                  {selectedEntity.description && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Description</p>
                      <p className="text-sm text-gray-700">{selectedEntity.description}</p>
                    </div>
                  )}

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedEntity.sector && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-400">Secteur</p>
                        <p className="text-sm font-semibold text-[#0F0F0F] mt-0.5">{selectedEntity.sector}</p>
                      </div>
                    )}
                    {selectedEntity.employees != null && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-400">Employés</p>
                        <p className="text-sm font-semibold text-[#0F0F0F] mt-0.5">{selectedEntity.employees}</p>
                      </div>
                    )}
                    {selectedEntity.revenue_est && (
                      <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                        <p className="text-xs text-gray-400">CA estimé</p>
                        <p className="text-sm font-semibold text-[#0F0F0F] mt-0.5">{selectedEntity.revenue_est}</p>
                      </div>
                    )}
                    {selectedEntity.website && (
                      <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                        <p className="text-xs text-gray-400">Site web</p>
                        <a href={selectedEntity.website} target="_blank" rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#FF4D29] hover:underline mt-0.5 block truncate">
                          {selectedEntity.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Connexions */}
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Connexions</p>
                    {edges.filter(e => e.source_id === selectedEntity.id || e.target_id === selectedEntity.id).length === 0
                      ? <p className="text-sm text-gray-400 italic">Aucune connexion</p>
                      : edges
                          .filter(e => e.source_id === selectedEntity.id || e.target_id === selectedEntity.id)
                          .map(e => {
                            const otherId = e.source_id === selectedEntity.id ? e.target_id : e.source_id;
                            const other = entities.find(en => en.id === otherId);
                            return (
                              <div key={e.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: other?.color || TYPE_COLORS[other?.type ?? 'company'] }}></span>
                                  <span className="text-sm font-medium text-[#0F0F0F]">{other?.name ?? '—'}</span>
                                  {e.label && <span className="text-xs text-gray-400">· {e.label}</span>}
                                </div>
                                <button onClick={() => handleDeleteEdge(e.id)}
                                  className="text-gray-300 hover:text-red-500 transition-colors text-xs p-1">
                                  <i className="fas fa-unlink"></i>
                                </button>
                              </div>
                            );
                          })
                    }
                  </div>

                  {/* Actions */}
                  {!selectedEntity.is_root && (
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => openEdit(selectedEntity)}
                        className="flex-1 py-2.5 bg-[#FF4D29] hover:bg-[#e03e1e] text-white text-sm font-bold rounded-xl transition-all">
                        <i className="fas fa-edit mr-2"></i> Modifier
                      </button>
                      <button onClick={() => handleDeleteEntity(selectedEntity.id)}
                        className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl transition-all">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Add / Edit form ── */}
              {(panel === 'add' || panel === 'edit') && (
                <div className="space-y-4">
                  <FormField label="Nom *">
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Ex: KLS Holding" className={inputClass} />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Type">
                      <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as BusinessEntityType }))} className={inputClass}>
                        {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Rattaché à">
                      <select value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value as BusinessOwner }))} className={inputClass}>
                        {Object.entries(OWNER_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Statut">
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as BusinessStatus }))} className={inputClass}>
                      {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </FormField>

                  <FormField label="Description">
                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      rows={3} placeholder="Description courte…" className={inputClass} />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Secteur">
                      <input value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                        placeholder="Ex: Immobilier" className={inputClass} />
                    </FormField>
                    <FormField label="Employés">
                      <input type="number" value={form.employees} onChange={e => setForm(f => ({ ...f, employees: e.target.value }))}
                        placeholder="0" className={inputClass} />
                    </FormField>
                  </div>

                  <FormField label="CA estimé">
                    <input value={form.revenue_est} onChange={e => setForm(f => ({ ...f, revenue_est: e.target.value }))}
                      placeholder="Ex: 500k€/an" className={inputClass} />
                  </FormField>

                  <FormField label="Site web">
                    <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                      placeholder="https://…" className={inputClass} />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Couleur (hex)">
                      <div className="flex gap-2">
                        <input value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                          placeholder="#1d4ed8" className={`${inputClass} flex-1`} />
                        <input type="color" value={form.color || '#1d4ed8'}
                          onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                          className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                      </div>
                    </FormField>
                    <FormField label="Taille du nœud">
                      <input type="range" min={14} max={50} value={form.size}
                        onChange={e => setForm(f => ({ ...f, size: parseInt(e.target.value) }))}
                        className="w-full mt-1.5" />
                      <p className="text-xs text-gray-400 text-center">{form.size}px</p>
                    </FormField>
                  </div>

                  <button
                    onClick={panel === 'add' ? handleAddEntity : handleEditEntity}
                    disabled={!form.name || saving}
                    className="w-full py-3 bg-[#FF4D29] hover:bg-[#e03e1e] disabled:opacity-50 text-white font-bold rounded-xl transition-all mt-2">
                    {saving ? <><i className="fas fa-spinner animate-spin mr-2"></i>Enregistrement…</> : panel === 'add' ? 'Ajouter' : 'Enregistrer'}
                  </button>
                </div>
              )}

              {/* ── Add edge form ── */}
              {panel === 'add-edge' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Reliez deux entités de la cartographie.</p>

                  <FormField label="Entité source">
                    <select value={edgeSource} onChange={e => setEdgeSource(e.target.value)} className={inputClass}>
                      <option value="">— Choisir —</option>
                      {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </FormField>

                  <FormField label="Entité cible">
                    <select value={edgeTarget} onChange={e => setEdgeTarget(e.target.value)} className={inputClass}>
                      <option value="">— Choisir —</option>
                      {entities.filter(e => e.id !== edgeSource).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </FormField>

                  <FormField label="Label (optionnel)">
                    <input value={edgeLabel} onChange={e => setEdgeLabel(e.target.value)}
                      placeholder="Ex: Détient 60%" className={inputClass} />
                  </FormField>

                  <button onClick={handleAddEdge} disabled={!edgeSource || !edgeTarget || saving}
                    className="w-full py-3 bg-[#FF4D29] hover:bg-[#e03e1e] disabled:opacity-50 text-white font-bold rounded-xl transition-all mt-2">
                    {saving ? <><i className="fas fa-spinner animate-spin mr-2"></i>Création…</> : 'Créer la connexion'}
                  </button>

                  {/* Existing edges */}
                  {edges.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Connexions existantes</p>
                      <div className="space-y-1">
                        {edges.map(e => {
                          const src = entities.find(en => en.id === e.source_id);
                          const tgt = entities.find(en => en.id === e.target_id);
                          return (
                            <div key={e.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl text-sm">
                              <span className="text-gray-700 truncate">
                                <span className="font-medium">{src?.name ?? '?'}</span>
                                <span className="text-gray-400 mx-1">→</span>
                                <span className="font-medium">{tgt?.name ?? '?'}</span>
                                {e.label && <span className="text-gray-400 ml-1">· {e.label}</span>}
                              </span>
                              <button onClick={() => handleDeleteEdge(e.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors ml-2 flex-shrink-0">
                                <i className="fas fa-times text-xs"></i>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D29] focus:ring-1 focus:ring-[#FF4D29]/20 bg-white text-[#0F0F0F] placeholder-gray-400 transition-all';
