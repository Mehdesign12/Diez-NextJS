// ============================================================
// Cover Letter Generator — Lettres de motivation IA
// ============================================================

import type { JobPreferences } from './types';

interface JobData {
  title: string;
  description?: string | null;
  client_name?: string | null;
  skills?: string[];
  source?: string;
}

/**
 * Genere une lettre de motivation personnalisee via Claude API.
 * Fallback sur un template basique si l'API echoue.
 */
export async function generateCoverLetter(
  job: JobData,
  preferences: JobPreferences
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return templateCoverLetter(job, preferences);
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: buildCoverLetterPrompt(job, preferences),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('DeepSeek API error:', response.status);
      return templateCoverLetter(job, preferences);
    }

    const result = await response.json();
    return result.choices?.[0]?.message?.content || templateCoverLetter(job, preferences);
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return templateCoverLetter(job, preferences);
  }
}

function buildCoverLetterPrompt(job: JobData, prefs: JobPreferences): string {
  const jobText = [
    `Poste: ${job.title}`,
    job.client_name ? `Entreprise: ${job.client_name}` : '',
    job.description ? `Description: ${job.description.slice(0, 1500)}` : '',
    job.skills?.length ? `Competences demandees: ${job.skills.join(', ')}` : '',
    job.source ? `Plateforme: ${job.source}` : '',
  ].filter(Boolean).join('\n');

  const profileText = [
    prefs.full_name ? `Nom: ${prefs.full_name}` : '',
    `Competences: ${prefs.skills.join(', ')}`,
    prefs.bio ? `Profil: ${prefs.bio}` : '',
  ].filter(Boolean).join('\n');

  return `Tu es un expert en redaction de candidatures freelance. Redige une lettre de motivation courte et percutante (150-250 mots) pour cette offre.

OFFRE:
${jobText}

PROFIL DU CANDIDAT:
${profileText}

Regles:
- Ton professionnel mais pas formel, adapte au freelance
- Commence directement par ce que tu apportes (pas de "Madame, Monsieur")
- Mets en avant 2-3 competences specifiques qui matchent l'offre
- Termine par une proposition concrete (disponibilite, appel decouverte)
- Si la plateforme est Freelancer.com, adapte le ton pour une proposition de bid
- Redige en anglais sauf si l'offre est clairement en francais
- Ne mets PAS de placeholders entre crochets [comme ceci]
- Utilise le nom du candidat si disponible`;
}

function templateCoverLetter(job: JobData, prefs: JobPreferences): string {
  const name = prefs.full_name || 'Product Manager';
  const skills = prefs.skills.slice(0, 3).join(', ');

  return `Hi,

I'm ${name}, a freelance Product Manager with expertise in ${skills}.

I came across your posting for "${job.title}"${job.client_name ? ` at ${job.client_name}` : ''} and I'm very interested. My background aligns well with what you're looking for — I bring hands-on experience in product strategy, agile delivery, and cross-functional team leadership.

I'd love to discuss how I can contribute to your project. I'm available for a quick call at your convenience.

Best regards,
${name}`;
}
