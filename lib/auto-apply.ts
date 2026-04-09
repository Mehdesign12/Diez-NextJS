// ============================================================
// Auto-Apply — Candidature automatique sur les offres
// ============================================================

import { getJobPreferences, markJobAsApplied, updateJobOpportunityCoverLetter } from '@/lib/supabase';
import { generateCoverLetter } from '@/lib/cover-letter';
import { Resend } from 'resend';
import type { JobOpportunity, JobPreferences } from '@/lib/types';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const DEFAULT_PREFERENCES: JobPreferences = {
  id: 0, skills: ['product-management', 'agile', 'scrum', 'roadmap'], keywords: ['product manager'],
  exclude_keywords: [], min_budget: null, preferred_budget_type: null, preferred_duration: [],
  preferred_experience: [], preferred_sources: [], bio: 'Freelance Product Manager.', cv_url: null,
  full_name: null, email: null, phone: null, freelancer_token: null, updated_at: '',
};

export interface AutoApplyResult {
  applied: number;
  errors: string[];
}

/**
 * Auto-apply sur une liste d'opportunites :
 * 1. Genere la lettre IA
 * 2. Envoie par email si contact_email dispo
 * 3. Bid Freelancer si source = freelancer + token dispo
 * 4. Sinon, sauvegarde juste la lettre (postulation manuelle)
 */
export async function autoApplyBatch(opportunities: JobOpportunity[]): Promise<AutoApplyResult> {
  const result: AutoApplyResult = { applied: 0, errors: [] };
  const preferences = await getJobPreferences() || DEFAULT_PREFERENCES;

  for (const opp of opportunities) {
    // Skip si deja postule
    if (opp.status === 'applied' || opp.applied_at) continue;

    try {
      // 1. Generer la lettre
      const letter = opp.cover_letter || await generateCoverLetter(
        { title: opp.title, description: opp.description, client_name: opp.client_name, skills: opp.skills, source: opp.source },
        preferences
      );
      await updateJobOpportunityCoverLetter(opp.id, letter);

      // 2. Tenter l'envoi
      let applied = false;

      // Email auto si contact_email dispo
      if (opp.contact_email && resend && preferences.email) {
        try {
          const senderName = preferences.full_name || 'Product Manager';
          const emailOptions: Parameters<typeof resend.emails.send>[0] = {
            from: `${senderName} <noreply@diez-agency.com>`,
            replyTo: preferences.email,
            to: [opp.contact_email],
            subject: `Application: ${opp.title}`,
            html: letter.split('\n').map(p => p.trim() ? `<p style="margin:0 0 12px;line-height:1.6;color:#333;">${p}</p>` : '').join(''),
          };

          // Attach CV
          if (preferences.cv_url) {
            try {
              const cvRes = await fetch(preferences.cv_url);
              if (cvRes.ok) {
                emailOptions.attachments = [{
                  filename: preferences.cv_url.split('/').pop() || 'CV.pdf',
                  content: Buffer.from(await cvRes.arrayBuffer()),
                }];
              }
            } catch { /* skip CV attachment */ }
          }

          await resend.emails.send(emailOptions);
          await markJobAsApplied(opp.id, 'email');
          applied = true;
        } catch (err) {
          result.errors.push(`Email ${opp.id}: ${err}`);
        }
      }

      // Freelancer auto-bid
      if (!applied && opp.source === 'freelancer' && preferences.freelancer_token && opp.source_id) {
        try {
          const res = await fetch('https://www.freelancer.com/api/projects/0.1/bids/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'freelancer-oauth-v1': preferences.freelancer_token,
            },
            body: JSON.stringify({
              project_id: Number(opp.source_id),
              description: letter,
              amount: opp.budget_max || opp.budget_min || 500,
              period: 7,
              milestone_percentage: 100,
            }),
          });
          if (res.ok) {
            await markJobAsApplied(opp.id, 'freelancer');
            applied = true;
          }
        } catch (err) {
          result.errors.push(`Freelancer bid ${opp.id}: ${err}`);
        }
      }

      // Si aucun envoi auto possible, on marque juste la lettre comme prete
      if (applied) result.applied++;
    } catch (err) {
      result.errors.push(`Opp ${opp.id}: ${err}`);
    }
  }

  return result;
}
