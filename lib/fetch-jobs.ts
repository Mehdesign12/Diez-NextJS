// ============================================================
// Fetch Jobs — Logique de recuperation des offres freelance
// Utilisee par le cron ET le bouton admin
// ============================================================

import { upsertJobOpportunity, updateJobOpportunityScore, getJobPreferences, getJobOpportunities } from '@/lib/supabase';
import { scoreOpportunity } from '@/lib/ai-matcher';
import { autoApplyBatch } from '@/lib/auto-apply';

export interface FetchResults {
  remoteok: number;
  freelancer: number;
  weworkremotely: number;
  himalayas: number;
  arbeitnow: number;
  jobicy: number;
  filtered: number;
  auto_applied: number;
  errors: string[];
}

// Mots-cles de pertinence : une offre doit contenir AU MOINS un de ces termes
const RELEVANCE_KEYWORDS = [
  'product manager', 'product owner', 'product lead', 'product director',
  'product management', 'product strategy', 'product roadmap',
  'chef de produit', 'responsable produit', 'directeur produit',
  'scrum master', 'agile coach', 'program manager', 'project manager',
  'head of product', 'vp product', 'cpo', 'product analyst',
  'product operations', 'product ops', 'product marketing',
  'product designer', 'growth manager', 'growth product',
  'delivery manager', 'release manager', 'technical program',
];

// Sources dont la requete API filtre deja — on leur fait confiance
const TRUSTED_SOURCES = new Set(['freelancer', 'himalayas']);

const REMOTEOK_API = 'https://remoteok.com/api?tag=product-manager';

const FREELANCER_QUERIES = [
  'product+manager',
  'product+owner',
  'scrum+master',
];

const WEWORKREMOTELY_FEEDS = [
  'https://weworkremotely.com/categories/remote-product-jobs.rss',
];

/** Verifie qu'une offre est potentiellement pertinente (filtre pre-scoring) */
function isRelevant(job: Record<string, unknown>): boolean {
  // Sources dont la requete API filtre deja — on leur fait confiance
  if (TRUSTED_SOURCES.has(job.source as string)) return true;
  const text = `${job.title || ''} ${job.description || ''}`.toLowerCase();
  return RELEVANCE_KEYWORDS.some(kw => text.includes(kw));
}

/** Fetch toutes les sources et stocke les offres */
export async function fetchAllJobs(): Promise<FetchResults> {
  const results: FetchResults = { remoteok: 0, freelancer: 0, weworkremotely: 0, himalayas: 0, arbeitnow: 0, jobicy: 0, filtered: 0, auto_applied: 0, errors: [] };
  const preferences = await getJobPreferences();

  // Helper: filter + save
  const processJobs = async (jobs: Record<string, unknown>[], sourceKey: keyof Omit<FetchResults, 'errors' | 'filtered'>) => {
    for (const job of jobs) {
      if (!isRelevant(job)) { results.filtered++; continue; }
      if (await saveAndScore(job, preferences)) results[sourceKey]++;
    }
  };

  // 1. RemoteOK
  try {
    await processJobs(await fetchRemoteOK(), 'remoteok');
  } catch (err) {
    results.errors.push(`RemoteOK: ${err}`);
  }

  // 2. Freelancer
  for (const query of FREELANCER_QUERIES) {
    try {
      await processJobs(await fetchFreelancer(query), 'freelancer');
    } catch (err) {
      results.errors.push(`Freelancer (${query}): ${err}`);
    }
  }

  // 3. WeWorkRemotely
  for (const feedUrl of WEWORKREMOTELY_FEEDS) {
    try {
      await processJobs(await fetchWeWorkRemotely(feedUrl), 'weworkremotely');
    } catch (err) {
      results.errors.push(`WeWorkRemotely: ${err}`);
    }
  }

  // 4. Himalayas
  try {
    await processJobs(await fetchHimalayas(), 'himalayas');
  } catch (err) {
    results.errors.push(`Himalayas: ${err}`);
  }

  // 5. Arbeitnow
  try {
    await processJobs(await fetchArbeitnow(), 'arbeitnow');
  } catch (err) {
    results.errors.push(`Arbeitnow: ${err}`);
  }

  // 6. Jobicy
  try {
    await processJobs(await fetchJobicy(), 'jobicy');
  } catch (err) {
    results.errors.push(`Jobicy: ${err}`);
  }

  const total = results.remoteok + results.freelancer + results.weworkremotely + results.himalayas + results.arbeitnow + results.jobicy;

  // Auto-apply on high-score opportunities (>= 80%)
  try {
    const highScoreJobs = await getJobOpportunities({ status: 'new', minScore: 80 });
    if (highScoreJobs.length > 0) {
      const applyResult = await autoApplyBatch(highScoreJobs);
      results.auto_applied = applyResult.applied;
      results.errors.push(...applyResult.errors);
    }
  } catch (err) {
    results.errors.push(`Auto-apply error: ${err}`);
  }

  console.log(`[fetch-jobs] Total: ${total}, Auto-applied: ${results.auto_applied}, Errors: ${results.errors.length}`);

  return results;
}

// ── Save + Score ──

async function saveAndScore(
  job: Record<string, unknown>,
  preferences: Awaited<ReturnType<typeof getJobPreferences>>
): Promise<boolean> {
  const { data: saved } = await upsertJobOpportunity(job);
  if (saved?.id && preferences) {
    const score = await scoreOpportunity(
      {
        title: job.title as string,
        description: job.description as string | null,
        skills: job.skills as string[],
        budget_min: job.budget_min as number | null,
        budget_max: job.budget_max as number | null,
        budget_type: job.budget_type as string | null,
        location: job.location as string | null,
        client_name: job.client_name as string | null,
      },
      preferences
    );
    await updateJobOpportunityScore(saved.id, score.score, score.reason);
  }
  return !!saved;
}

// ── RemoteOK API ──

async function fetchRemoteOK(): Promise<Record<string, unknown>[]> {
  const res = await fetch(REMOTEOK_API, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)', 'Accept': 'application/json' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return [];
  const data = await res.json();
  const jobs = Array.isArray(data) ? data.filter((item: Record<string, unknown>) => item.id && item.position) : [];

  return jobs.slice(0, 20).map((job: Record<string, unknown>) => ({
    source: 'remoteok',
    source_id: String(job.id),
    source_url: `https://remoteok.com/remote-jobs/${job.slug || job.id}`,
    title: job.position as string,
    description: cleanHTML(job.description as string)?.slice(0, 2000) || null,
    client_name: (job.company as string) || null,
    skills: Array.isArray(job.tags) ? (job.tags as string[]).slice(0, 10) : [],
    location: (job.location as string) || 'Remote',
    budget_min: job.salary_min ? Number(job.salary_min) : null,
    budget_max: job.salary_max ? Number(job.salary_max) : null,
    budget_type: job.salary_min ? 'fixed' : null,
    currency: 'USD',
    metadata: { company_logo: job.company_logo, date: job.date },
  }));
}

// ── Freelancer.com API ──

async function fetchFreelancer(query: string): Promise<Record<string, unknown>[]> {
  const url = `https://www.freelancer.com/api/projects/0.1/projects/active/?query=${query}&limit=15&compact=true&job_details=true`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return [];
  const data = await res.json();
  const projects = data?.result?.projects;
  if (!Array.isArray(projects)) return [];

  return projects.slice(0, 15).map((p: Record<string, unknown>) => {
    const budget = p.budget as Record<string, number> | null;
    const currency = p.currency as Record<string, unknown> | null;
    const hourlyInfo = p.hourly_project_info as Record<string, unknown> | null;

    return {
      source: 'freelancer',
      source_id: String(p.id),
      source_url: `https://www.freelancer.com/projects/${p.seo_url}`,
      title: p.title as string,
      description: (p.preview_description as string)?.slice(0, 2000) || null,
      client_name: null,
      skills: [],
      location: 'Remote',
      budget_min: budget?.minimum || null,
      budget_max: budget?.maximum || null,
      budget_type: (p.type as string) === 'hourly' ? 'hourly' : 'fixed',
      currency: (currency?.code as string) || 'USD',
      duration: hourlyInfo ? formatFreelancerDuration(hourlyInfo) : null,
      metadata: {
        bid_count: (p.bid_stats as Record<string, unknown>)?.bid_count,
        bid_avg: (p.bid_stats as Record<string, unknown>)?.bid_avg,
        type: p.type,
      },
    };
  });
}

function formatFreelancerDuration(info: Record<string, unknown>): string | null {
  const commitment = info.commitment as Record<string, unknown> | null;
  if (!commitment) return null;
  const hours = commitment.hours;
  const interval = commitment.interval;
  if (hours && interval) return `${hours}h/${interval}`;
  return null;
}

// ── WeWorkRemotely RSS ──

async function fetchWeWorkRemotely(feedUrl: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(feedUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return [];
  const xml = await res.text();
  const items = parseRSSItems(xml);

  return items.slice(0, 20).map(item => ({
    source: 'weworkremotely',
    source_id: item.guid || item.link,
    source_url: item.link,
    title: cleanHTML(item.title) || item.title,
    description: cleanHTML(item.description)?.slice(0, 2000) || null,
    client_name: extractCompanyFromWWR(item.title),
    skills: extractSkillsFromText(item.description || ''),
    location: extractTagValue(item.raw, 'region') || 'Remote',
    budget_min: null,
    budget_max: null,
    budget_type: null,
    currency: 'USD',
    metadata: { category: extractTagValue(item.raw, 'category'), type: extractTagValue(item.raw, 'type') },
  }));
}

function extractCompanyFromWWR(title: string): string | null {
  const match = title.match(/^(.+?):\s/);
  return match ? match[1].trim() : null;
}

// ── Helpers ──

interface RSSItem { title: string; link: string; description: string; guid: string; raw: string; }

function parseRSSItems(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    items.push({
      title: extractTagValue(content, 'title'),
      link: extractTagValue(content, 'link'),
      description: extractTagValue(content, 'description'),
      guid: extractTagValue(content, 'guid') || extractTagValue(content, 'link'),
      raw: content,
    });
  }
  return items;
}

function extractTagValue(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? (match[1] || match[2] || '').trim() : '';
}

function cleanHTML(text: string | null | undefined): string | null {
  if (!text) return null;
  let cleaned = text;
  // Decode HTML entities first (handles double-encoded RSS content)
  cleaned = cleaned.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  // Second pass for double-encoded
  cleaned = cleaned.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  // Strip all HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');
  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

function extractSkillsFromText(text: string): string[] {
  const skillKeywords = [
    'product management', 'product manager', 'agile', 'scrum', 'jira', 'confluence',
    'roadmap', 'user research', 'data analysis', 'sql', 'figma', 'notion',
    'sprint planning', 'okr', 'kpi', 'saas', 'b2b', 'b2c', 'ux', 'ui',
    'stakeholder', 'backlog', 'user stories', 'mvp', 'go-to-market',
    'analytics', 'a/b testing', 'project management', 'lean', 'kanban',
  ];
  const lower = text.toLowerCase();
  return skillKeywords.filter(skill => lower.includes(skill));
}

// ── Himalayas.app API ──

const HIMALAYAS_QUERIES = ['product+manager', 'product+owner', 'scrum+master'];

async function fetchHimalayas(): Promise<Record<string, unknown>[]> {
  const allJobs: Record<string, unknown>[] = [];

  for (const query of HIMALAYAS_QUERIES) {
    const res = await fetch(`https://himalayas.app/jobs/api?title=${query}&limit=15`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) continue;
    const data = await res.json();
    const jobs = Array.isArray(data?.jobs) ? data.jobs : [];

    for (const job of jobs.slice(0, 15)) {
      allJobs.push({
        source: 'himalayas',
        source_id: job.companySlug ? `${job.companySlug}-${(job.title || '').toLowerCase().replace(/\s+/g, '-').slice(0, 50)}` : null,
        source_url: job.companySlug ? `https://himalayas.app/companies/${job.companySlug}/jobs` : null,
        title: job.title as string,
        description: cleanHTML(job.description as string)?.slice(0, 2000) || (job.excerpt as string) || null,
        client_name: (job.companyName as string) || null,
        skills: extractSkillsFromText(`${job.title || ''} ${job.description || ''}`),
        location: Array.isArray(job.locationRestrictions) && job.locationRestrictions.length > 0
          ? (job.locationRestrictions as string[]).join(', ')
          : 'Remote',
        budget_min: job.minSalary ? Number(job.minSalary) : null,
        budget_max: job.maxSalary ? Number(job.maxSalary) : null,
        budget_type: job.minSalary ? 'fixed' : null,
        currency: (job.currency as string) || 'USD',
        experience_level: Array.isArray(job.seniority) ? (job.seniority as string[]).join(', ') : null,
        metadata: {
          company_logo: job.companyLogo,
          employment_type: job.employmentType,
          categories: job.categories,
        },
      });
    }
  }

  return allJobs;
}

// ── Arbeitnow API ──

async function fetchArbeitnow(): Promise<Record<string, unknown>[]> {
  const res = await fetch('https://www.arbeitnow.com/api/job-board-api', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return [];
  const data = await res.json();
  const jobs = Array.isArray(data?.data) ? data.data : [];

  // Arbeitnow retourne TOUTES les offres — le filtre isRelevant triera
  return jobs.slice(0, 50).map((job: Record<string, unknown>) => ({
    source: 'arbeitnow',
    source_id: job.slug as string,
    source_url: `https://www.arbeitnow.com/jobs/${job.slug}`,
    title: job.title as string,
    description: cleanHTML(job.description as string)?.slice(0, 2000) || null,
    client_name: (job.company_name as string) || null,
    skills: extractSkillsFromText(`${job.title || ''} ${job.description || ''}`),
    location: (job.location as string) || (job.remote === true ? 'Remote' : null),
    budget_min: null,
    budget_max: null,
    budget_type: null,
    currency: 'EUR',
    metadata: {
      tags: job.tags,
      remote: job.remote,
    },
  }));
}

// ── Jobicy API ──

const JOBICY_TAGS = ['product-manager', 'project-manager', 'scrum'];

async function fetchJobicy(): Promise<Record<string, unknown>[]> {
  const allJobs: Record<string, unknown>[] = [];

  for (const tag of JOBICY_TAGS) {
    const res = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=10&tag=${tag}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) continue;
    const data = await res.json();
    const jobs = Array.isArray(data?.jobs) ? data.jobs : [];

    for (const job of jobs) {
      allJobs.push({
        source: 'jobicy',
        source_id: String(job.id),
        source_url: job.url as string,
        title: job.jobTitle as string,
        description: cleanHTML(job.jobDescription as string)?.slice(0, 2000) || job.jobExcerpt || null,
        client_name: (job.companyName as string) || null,
        skills: extractSkillsFromText(`${job.jobTitle || ''} ${job.jobDescription || ''}`),
        location: (job.jobGeo as string) || 'Remote',
        budget_min: job.annualSalaryMin ? Number(job.annualSalaryMin) : null,
        budget_max: job.annualSalaryMax ? Number(job.annualSalaryMax) : null,
        budget_type: job.annualSalaryMin ? 'fixed' : null,
        currency: (job.salaryCurrency as string) || 'USD',
        experience_level: (job.jobLevel as string) || null,
        metadata: {
          company_logo: job.companyLogo,
          job_type: job.jobType,
          job_industry: job.jobIndustry,
        },
      });
    }
  }

  return allJobs;
}
