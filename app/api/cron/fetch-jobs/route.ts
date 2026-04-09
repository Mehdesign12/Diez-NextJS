import { NextResponse } from 'next/server';
import { upsertJobOpportunity, updateJobOpportunityScore, getJobPreferences } from '@/lib/supabase';
import { scoreOpportunity } from '@/lib/ai-matcher';

// ── Config des sources ──

const REMOTEOK_API = 'https://remoteok.com/api?tag=product';

const FREELANCER_QUERIES = [
  'product+manager',
  'product+owner',
  'scrum+master',
];

const WEWORKREMOTELY_FEEDS = [
  'https://weworkremotely.com/categories/remote-product-jobs.rss',
];

// ── Vercel Cron protection ──
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  // Verify cron secret (Vercel sets this automatically)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = { remoteok: 0, freelancer: 0, weworkremotely: 0, errors: [] as string[] };

  // Load preferences for scoring
  const preferences = await getJobPreferences();

  // ── 1. RemoteOK API ──
  try {
    const jobs = await fetchRemoteOK();
    for (const job of jobs) {
      const saved = await saveAndScore(job, preferences);
      if (saved) results.remoteok++;
    }
  } catch (err) {
    results.errors.push(`RemoteOK error: ${err}`);
  }

  // ── 2. Freelancer.com API ──
  for (const query of FREELANCER_QUERIES) {
    try {
      const jobs = await fetchFreelancer(query);
      for (const job of jobs) {
        const saved = await saveAndScore(job, preferences);
        if (saved) results.freelancer++;
      }
    } catch (err) {
      results.errors.push(`Freelancer error (${query}): ${err}`);
    }
  }

  // ── 3. WeWorkRemotely RSS ──
  for (const feedUrl of WEWORKREMOTELY_FEEDS) {
    try {
      const jobs = await fetchWeWorkRemotely(feedUrl);
      for (const job of jobs) {
        const saved = await saveAndScore(job, preferences);
        if (saved) results.weworkremotely++;
      }
    } catch (err) {
      results.errors.push(`WeWorkRemotely error: ${err}`);
    }
  }

  console.log(`[fetch-jobs] RemoteOK: ${results.remoteok}, Freelancer: ${results.freelancer}, WWR: ${results.weworkremotely}, Errors: ${results.errors.length}`);

  return NextResponse.json({
    success: true,
    fetched: results,
    timestamp: new Date().toISOString(),
  });
}

// ── Save + Score helper ──

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
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)',
      'Accept': 'application/json',
    },
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

  return items.slice(0, 20).map(item => {
    const desc = cleanHTML(item.description)?.slice(0, 2000) || null;
    return {
      source: 'weworkremotely',
      source_id: item.guid || item.link,
      source_url: item.link,
      title: cleanHTML(item.title) || item.title,
      description: desc,
      client_name: extractCompanyFromWWR(item.title),
      skills: extractSkillsFromText(item.description || ''),
      location: extractTagValue(item.raw, 'region') || 'Remote',
      budget_min: null,
      budget_max: null,
      budget_type: null,
      currency: 'USD',
      metadata: {
        category: extractTagValue(item.raw, 'category'),
        type: extractTagValue(item.raw, 'type'),
      },
    };
  });
}

function extractCompanyFromWWR(title: string): string | null {
  // WWR titles are "Company: Job Title"
  const match = title.match(/^(.+?):\s/);
  return match ? match[1].trim() : null;
}

// ── Shared Helpers ──

interface RSSItem {
  title: string;
  link: string;
  description: string;
  guid: string;
  raw: string;
}

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
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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
