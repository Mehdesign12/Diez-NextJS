import { NextResponse } from 'next/server';
import { upsertJobOpportunity, updateJobOpportunityScore, getJobPreferences } from '@/lib/supabase';
import { scoreOpportunity } from '@/lib/ai-matcher';

// ── Config des sources RSS/API ──

const UPWORK_RSS_FEEDS = [
  // Product Manager searches
  'https://www.upwork.com/ab/feed/jobs/rss?q=product+manager&sort=recency&paging=0%3B20',
  'https://www.upwork.com/ab/feed/jobs/rss?q=product+owner&sort=recency&paging=0%3B20',
  'https://www.upwork.com/ab/feed/jobs/rss?q=chef+de+produit&sort=recency&paging=0%3B20',
  'https://www.upwork.com/ab/feed/jobs/rss?q=scrum+master&sort=recency&paging=0%3B20',
];

const REMOTEOK_API = 'https://remoteok.com/api?tag=product';

// ── Vercel Cron protection ──
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60s max (Vercel Pro)

export async function GET(req: Request) {
  // Verify cron secret (Vercel sets this automatically)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = { upwork: 0, remoteok: 0, errors: [] as string[] };

  // Load preferences for scoring
  const preferences = await getJobPreferences();

  // ── 1. Fetch Upwork RSS feeds ──
  for (const feedUrl of UPWORK_RSS_FEEDS) {
    try {
      const jobs = await fetchUpworkRSS(feedUrl);
      for (const job of jobs) {
        const { data: saved } = await upsertJobOpportunity(job);
        if (saved?.id && preferences) {
          const score = await scoreOpportunity(
            { title: job.title as string, description: job.description as string | null, skills: job.skills as string[] },
            preferences
          );
          await updateJobOpportunityScore(saved.id, score.score, score.reason);
        }
        if (saved) results.upwork++;
      }
    } catch (err) {
      results.errors.push(`Upwork RSS error: ${err}`);
    }
  }

  // ── 2. Fetch RemoteOK API ──
  try {
    const jobs = await fetchRemoteOK();
    for (const job of jobs) {
      const { data: saved } = await upsertJobOpportunity(job);
      if (saved?.id && preferences) {
        const score = await scoreOpportunity(
          { title: job.title as string, description: job.description as string | null, skills: job.skills as string[] },
          preferences
        );
        await updateJobOpportunityScore(saved.id, score.score, score.reason);
      }
      if (saved) results.remoteok++;
    }
  } catch (err) {
    results.errors.push(`RemoteOK error: ${err}`);
  }

  console.log(`[fetch-jobs] Upwork: ${results.upwork}, RemoteOK: ${results.remoteok}, Errors: ${results.errors.length}`);

  return NextResponse.json({
    success: true,
    fetched: { upwork: results.upwork, remoteok: results.remoteok },
    errors: results.errors,
    timestamp: new Date().toISOString(),
  });
}

// ── Upwork RSS Parser ──

async function fetchUpworkRSS(feedUrl: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(feedUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DiezAgency/1.0)' },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) return [];

  const xml = await res.text();
  const items = parseRSSItems(xml);

  return items.map(item => ({
    source: 'upwork',
    source_id: item.guid || item.link,
    source_url: item.link,
    title: cleanHTML(item.title),
    description: cleanHTML(item.description)?.slice(0, 2000) || null,
    skills: extractSkillsFromText(item.description || ''),
    budget_type: detectBudgetType(item.description || ''),
    ...extractBudgetFromText(item.description || ''),
    currency: 'USD',
    location: extractLocation(item.description || ''),
    metadata: { raw_description: item.description?.slice(0, 500) },
  }));
}

// ── RemoteOK API Parser ──

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

  // RemoteOK returns an array where first element is metadata
  const jobs = Array.isArray(data) ? data.filter((item: Record<string, unknown>) => item.id && item.position) : [];

  return jobs.slice(0, 20).map((job: Record<string, unknown>) => ({
    source: 'remoteok',
    source_id: String(job.id),
    source_url: `https://remoteok.com/remote-jobs/${job.slug || job.id}`,
    title: job.position as string,
    description: cleanHTML(job.description as string)?.slice(0, 2000) || null,
    client_name: job.company as string || null,
    skills: Array.isArray(job.tags) ? (job.tags as string[]).slice(0, 10) : [],
    location: (job.location as string) || 'Remote',
    budget_min: job.salary_min ? Number(job.salary_min) : null,
    budget_max: job.salary_max ? Number(job.salary_max) : null,
    budget_type: job.salary_min ? 'fixed' : null,
    currency: 'USD',
    metadata: {
      company_logo: job.company_logo,
      date: job.date,
    },
  }));
}

// ── Helpers ──

function parseRSSItems(xml: string): { title: string; link: string; description: string; guid: string }[] {
  const items: { title: string; link: string; description: string; guid: string }[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    items.push({
      title: extractTag(content, 'title'),
      link: extractTag(content, 'link'),
      description: extractTag(content, 'description'),
      guid: extractTag(content, 'guid') || extractTag(content, 'link'),
    });
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
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

function detectBudgetType(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes('/hr') || lower.includes('hourly') || lower.includes('per hour')) return 'hourly';
  if (lower.includes('fixed') || lower.includes('budget:')) return 'fixed';
  return null;
}

function extractBudgetFromText(text: string): { budget_min: number | null; budget_max: number | null } {
  // Match patterns like "$500-$1,000" or "Budget: $2000"
  const rangeMatch = text.match(/\$[\s]*([\d,]+)\s*[-–]\s*\$?\s*([\d,]+)/);
  if (rangeMatch) {
    return {
      budget_min: parseFloat(rangeMatch[1].replace(/,/g, '')),
      budget_max: parseFloat(rangeMatch[2].replace(/,/g, '')),
    };
  }

  const singleMatch = text.match(/\$\s*([\d,]+)/);
  if (singleMatch) {
    const val = parseFloat(singleMatch[1].replace(/,/g, ''));
    return { budget_min: val, budget_max: val };
  }

  return { budget_min: null, budget_max: null };
}

function extractLocation(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes('remote') || lower.includes('worldwide') || lower.includes('anywhere')) return 'Remote';
  const countryMatch = text.match(/(?:Location|Country):\s*([^\n<]+)/i);
  if (countryMatch) return countryMatch[1].trim();
  return null;
}
