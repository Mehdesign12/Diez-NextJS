// ============================================================
// AI Matcher — Scoring des opportunites freelance via Claude
// ============================================================

import type { JobPreferences } from './types';

interface MatchResult {
  score: number;   // 0-100
  reason: string;  // justification courte
}

interface OpportunityData {
  title: string;
  description?: string | null;
  skills?: string[];
  budget_min?: number | null;
  budget_max?: number | null;
  budget_type?: string | null;
  duration?: string | null;
  experience_level?: string | null;
  location?: string | null;
  client_name?: string | null;
}

/**
 * Score une opportunite par rapport aux preferences utilisateur via Claude API.
 * Fallback sur un scoring basique par mots-cles si l'API echoue.
 */
export async function scoreOpportunity(
  opportunity: OpportunityData,
  preferences: JobPreferences
): Promise<MatchResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.warn('ANTHROPIC_API_KEY not set, using keyword-based scoring');
    return keywordScore(opportunity, preferences);
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [
          {
            role: 'user',
            content: buildPrompt(opportunity, preferences),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Claude API error:', response.status, await response.text());
      return keywordScore(opportunity, preferences);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text || '';

    return parseAIResponse(text);
  } catch (error) {
    console.error('AI matcher error:', error);
    return keywordScore(opportunity, preferences);
  }
}

function buildPrompt(opp: OpportunityData, prefs: JobPreferences): string {
  const oppText = [
    `Titre: ${opp.title}`,
    opp.description ? `Description: ${opp.description.slice(0, 1000)}` : '',
    opp.skills?.length ? `Competences demandees: ${opp.skills.join(', ')}` : '',
    opp.budget_min || opp.budget_max ? `Budget: ${opp.budget_min || '?'} - ${opp.budget_max || '?'} ${opp.budget_type || ''}` : '',
    opp.duration ? `Duree: ${opp.duration}` : '',
    opp.experience_level ? `Niveau: ${opp.experience_level}` : '',
    opp.location ? `Localisation: ${opp.location}` : '',
  ].filter(Boolean).join('\n');

  const profileText = [
    `Competences: ${prefs.skills.join(', ')}`,
    `Mots-cles recherches: ${prefs.keywords.join(', ')}`,
    `Mots-cles exclus: ${prefs.exclude_keywords.join(', ')}`,
    prefs.min_budget ? `Budget minimum souhaite: ${prefs.min_budget}` : '',
    prefs.bio ? `Profil: ${prefs.bio}` : '',
  ].filter(Boolean).join('\n');

  return `Tu es un expert en recrutement freelance. Evalue la pertinence de cette offre pour ce profil.

OFFRE:
${oppText}

PROFIL DU CANDIDAT:
${profileText}

Reponds UNIQUEMENT au format JSON suivant, sans aucun autre texte:
{"score": <nombre entre 0 et 100>, "reason": "<explication en 1-2 phrases courtes>"}

Criteres de scoring:
- Correspondance competences/mots-cles : 40%
- Budget adequat : 20%
- Niveau d'experience compatible : 20%
- Qualite globale de l'offre : 20%`;
}

function parseAIResponse(text: string): MatchResult {
  try {
    // Extraire le JSON de la reponse
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      return { score: 50, reason: 'Impossible de parser la reponse IA' };
    }
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score || 0))),
      reason: parsed.reason || 'Pas de justification',
    };
  } catch {
    return { score: 50, reason: 'Erreur de parsing IA' };
  }
}

/**
 * Scoring de fallback par mots-cles (sans IA)
 */
function keywordScore(
  opportunity: OpportunityData,
  preferences: JobPreferences
): MatchResult {
  const text = `${opportunity.title} ${opportunity.description || ''} ${(opportunity.skills || []).join(' ')}`.toLowerCase();

  // Verifier les mots-cles exclus
  const hasExcluded = preferences.exclude_keywords.some(kw => text.includes(kw.toLowerCase()));
  if (hasExcluded) {
    return { score: 10, reason: 'Contient des mots-cles exclus' };
  }

  let score = 0;
  const reasons: string[] = [];

  // Mots-cles positifs (max 40 pts)
  const keywordMatches = preferences.keywords.filter(kw => text.includes(kw.toLowerCase()));
  const keywordScore = Math.min(40, (keywordMatches.length / Math.max(preferences.keywords.length, 1)) * 40);
  score += keywordScore;
  if (keywordMatches.length > 0) reasons.push(`${keywordMatches.length} mot(s)-cle(s) trouves`);

  // Competences (max 30 pts)
  const skillMatches = preferences.skills.filter(s => text.includes(s.toLowerCase()));
  const skillScore = Math.min(30, (skillMatches.length / Math.max(preferences.skills.length, 1)) * 30);
  score += skillScore;
  if (skillMatches.length > 0) reasons.push(`${skillMatches.length} competence(s) correspondante(s)`);

  // Budget (max 20 pts)
  if (preferences.min_budget && opportunity.budget_max) {
    if (opportunity.budget_max >= preferences.min_budget) {
      score += 20;
      reasons.push('Budget compatible');
    }
  } else {
    score += 10; // Pas d'info budget = neutre
  }

  // Bonus si titre contient un keyword exact (10 pts)
  const titleLower = opportunity.title.toLowerCase();
  if (preferences.keywords.some(kw => titleLower.includes(kw.toLowerCase()))) {
    score += 10;
  }

  score = Math.min(100, Math.round(score));

  return {
    score,
    reason: reasons.length > 0 ? reasons.join('. ') : 'Faible correspondance avec le profil',
  };
}
