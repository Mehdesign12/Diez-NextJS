-- ============================================================
-- Migration 003 : Données de démonstration
-- ============================================================

-- ─────────────────────────────────────────
-- Réalisations exemples
-- ─────────────────────────────────────────
INSERT INTO realisations (title, slug, description, long_description, image_url, tags, link, featured, display_order)
VALUES
(
  'Dashboard Analytics SaaS',
  'dashboard-analytics-saas',
  'Tableau de bord temps réel pour une startup fintech avec visualisations avancées.',
  'Conception et développement d''un dashboard analytics complet pour une startup fintech. Intégration de graphiques temps réel, gestion des utilisateurs, et exports PDF automatisés.',
  NULL,
  ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
  'https://example.com',
  true,
  1
),
(
  'Automatisation CRM',
  'automatisation-crm',
  'Système d''automatisation des workflows commerciaux connecté à HubSpot et Slack.',
  'Développement d''un système d''automatisation complet reliant HubSpot, Slack et une base de données interne. Réduction de 80% des tâches manuelles de l''équipe commerciale.',
  NULL,
  ARRAY['Node.js', 'HubSpot API', 'Slack API', 'PostgreSQL'],
  NULL,
  true,
  2
),
(
  'Application Mobile E-commerce',
  'app-mobile-ecommerce',
  'Application mobile cross-platform pour une marque de mode avec paiement intégré.',
  'Création d''une application mobile React Native pour une marque de mode française. Catalogue produits, panier, paiement Stripe, notifications push et programme de fidélité.',
  NULL,
  ARRAY['React Native', 'Stripe', 'Node.js', 'MongoDB'],
  NULL,
  false,
  3
);

-- ─────────────────────────────────────────
-- Articles exemples
-- ─────────────────────────────────────────
INSERT INTO articles (title, slug, excerpt, content, category, published)
VALUES
(
  'Comment automatiser 80% de vos tâches répétitives en 2025',
  'automatiser-taches-repetitives-2025',
  'Découvrez les outils et méthodes que nous utilisons pour automatiser les processus métier de nos clients et leur faire gagner des dizaines d''heures par semaine.',
  '## Introduction

L''automatisation n''est plus réservée aux grandes entreprises. En 2025, des outils accessibles permettent à n''importe quelle PME de gagner des dizaines d''heures par semaine.

## Les 3 piliers de l''automatisation

### 1. Identifier les tâches répétitives

La première étape est d''auditer votre journée de travail. Quelles tâches faites-vous plus d''une fois par semaine de manière identique ?

- Saisie de données entre deux outils
- Envoi d''emails de suivi
- Génération de rapports
- Mise à jour de tableurs

### 2. Choisir les bons outils

Il existe aujourd''hui des connecteurs no-code très puissants :

- **Make (ex-Integromat)** — idéal pour les workflows complexes
- **Zapier** — parfait pour les intégrations simples
- **n8n** — open-source et auto-hébergeable

### 3. Mesurer le ROI

Avant de lancer, estimez le temps gagné × coût horaire. Un workflow qui prend 2h à configurer mais économise 3h/semaine est rentabilisé en moins de 1 mois.

## Conclusion

L''automatisation bien pensée libère vos équipes pour des tâches à haute valeur ajoutée. C''est notre mission chez Diez Agency : identifier où vous perdez du temps et construire les outils qui y remédient.',
  'Automatisation',
  true
),
(
  'Pourquoi votre site web perd des clients (et comment y remédier)',
  'site-web-perd-clients',
  'Une analyse des erreurs les plus courantes que nous voyons sur les sites de nos clients et les solutions concrètes pour les corriger.',
  '## Le constat

85% des visiteurs quittent un site web en moins de 10 secondes si quelque chose les freine. Voici les erreurs que nous corrigeons le plus souvent.

## Erreur n°1 : Temps de chargement trop lent

Un site qui met plus de 3 secondes à charger perd 50% de ses visiteurs. Les causes les plus fréquentes :

- Images non optimisées
- Pas de CDN
- Hébergement sous-dimensionné
- Trop de scripts tiers

## Erreur n°2 : Message pas clair

Votre visiteur doit comprendre en 5 secondes ce que vous faites et pourquoi il devrait rester. Si votre hero dit juste "Bienvenue sur notre site", vous avez un problème.

## Erreur n°3 : Pas d''appel à l''action clair

Un bon CTA est :
- Visible immédiatement
- Formulé en bénéfice client
- Unique par page

## Conclusion

Ces trois erreurs sont corrigeables en quelques jours. Si vous voulez qu''on audite votre site gratuitement, contactez-nous.',
  'Design & UX',
  true
);
