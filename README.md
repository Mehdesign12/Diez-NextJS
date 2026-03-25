# Diez Agency — Next.js

Landing page + CMS de Diez Agency. Next.js 15 · Tailwind CSS · Supabase · Vercel.

---

## URLs

| Environnement | URL |
|---|---|
| Production | https://www.diez-agency.com |
| Vercel | https://diez-chi.vercel.app |
| GitHub | https://github.com/Mehdesign12/Diez-NextJS |

---

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **Style** : Tailwind CSS + CSS custom (`globals.css`)
- **Base de données** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth
- **Déploiement** : Vercel (auto-deploy sur push `main`)
- **i18n** : routing bilingue FR/EN via middleware Next.js

---

## Architecture i18n — RÈGLE IMPORTANTE

Le site est bilingue (FR + EN) avec détection automatique de la langue selon :
1. **Cookie** `lang` (préférence sauvegardée — priorité absolue)
2. **IP géolocalisation** via header Vercel `x-vercel-ip-country`
3. **Header** `Accept-Language` du navigateur
4. **Défaut** : anglais (marché le plus large)

### Structure des routes

```
/          → redirect automatique vers /fr ou /en (middleware)
/fr        → Landing page française
/en        → Landing page anglaise
/fr/work   → Réalisations (FR)
/en/work   → Our Work (EN)
/fr/blog   → Blog (FR)
/en/blog   → Blog (EN)
/fr/blog/[slug] → Article (FR)
/en/blog/[slug] → Article (EN)
/admin     → Panel admin (sans préfixe langue)
```

### Créer une nouvelle page — checklist obligatoire

> **Consulter ce README avant chaque création de page.**

Quand tu veux créer une nouvelle page (ex: `/contact`, `/pricing`, `/about`) :

**1. Créer le fichier dans `app/[lang]/`** (jamais directement dans `app/`)
```
✅ app/[lang]/contact/page.tsx
❌ app/contact/page.tsx
```

**2. Ajouter les traductions FR + EN dans `app/context/LangContext.tsx`**
```typescript
// Dans le bloc fr: { ... }
'contact-title': 'Contactez-nous',
'contact-subtitle': 'On vous répond en moins de 24h.',

// Dans le bloc en: { ... }
'contact-title': 'Contact Us',
'contact-subtitle': 'We reply within 24 hours.',
```

**3. Ajouter l'URL au sitemap dans `app/sitemap.ts`**
```typescript
// Ajouter la route dans le tableau staticRoutes
const staticRoutes = ['', '/work', '/blog', '/contact']; // ← ajouter ici
```

**4. Template de page bilingue prêt à l'emploi**
```tsx
// app/[lang]/ma-page/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type SupportedLang } from '../layout';

const META: Record<SupportedLang, { title: string; description: string }> = {
  fr: { title: 'Titre FR | Diez Agency', description: 'Description FR' },
  en: { title: 'Title EN | Diez Agency', description: 'Description EN' },
};

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) return {};
  return { title: META[lang as SupportedLang].title, description: META[lang as SupportedLang].description };
}

export default async function MaPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as SupportedLang)) notFound();
  return <div>Contenu de la page</div>;
}
```

---

## Structure du projet

```
app/
├── [lang]/              ← TOUTES les pages publiques ici
│   ├── layout.tsx       ← Layout bilingue (LangProvider + hreflang)
│   ├── page.tsx         ← Landing page
│   ├── work/            ← Réalisations
│   ├── blog/            ← Blog + [slug]
│   └── (nouvelles pages ici)
├── admin/               ← Panel admin (pas de préfixe langue)
├── components/          ← Composants réutilisables
├── context/
│   └── LangContext.tsx  ← Traductions FR/EN + hook useLang()
├── layout.tsx           ← Root layout (fonts, global CSS)
├── page.tsx             ← Root page (retourne null, le middleware redirige)
├── sitemap.ts           ← Sitemap dynamique bilingue
└── robots.ts            ← robots.txt
middleware.ts            ← Détection langue + redirection automatique
lib/
├── supabase.ts          ← Client Supabase + fonctions fetch
└── types.ts             ← Types TypeScript (Article, Realisation...)
```

---

## Base de données Supabase

**Projet** : `qegewzvyjiijozioqsgq.supabase.co`

### Tables

**`realisations`**
| Colonne | Type | Description |
|---|---|---|
| id | int | Clé primaire |
| title | text | Titre du projet |
| description | text | Description courte |
| long_description | text | Description longue (modal) |
| image_url | text | URL image principale |
| tags | text[] | Tags (ex: ["React", "API"]) |
| link | text | Lien vers le projet |
| featured | boolean | Affiché sur la homepage |
| created_at | timestamp | Date de création |

**`articles`**
| Colonne | Type | Description |
|---|---|---|
| id | int | Clé primaire |
| title | text | Titre de l'article |
| slug | text | URL slug (unique) |
| excerpt | text | Résumé court |
| content | text | Contenu Markdown |
| cover_url | text | URL image de couverture |
| category | text | Catégorie |
| published | boolean | Publié ou brouillon |
| created_at | timestamp | Date de publication |

---

## Déploiement

- **Auto-deploy** : chaque push sur `main` déclenche un build Vercel
- **Variables d'environnement Vercel** :
  - `NEXT_PUBLIC_SUPABASE_URL` = `https://qegewzvyjiijozioqsgq.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<clé dans Vercel Settings>`

---

## Commandes utiles

```bash
npm run dev       # Serveur local http://localhost:3000
npm run build     # Build production
npm run lint      # Vérification ESLint
```

---

## Audit SEO — Plan de correction (score actuel : 58/100)

### Phase 1 — Critique (bloquant SEO) ✅ TERMINÉE

- [x] **1.1 Attribut `lang` dynamique** — Le middleware transmet désormais la langue détectée via un header `x-lang`. Le root layout (`app/layout.tsx`) lit ce header pour rendre `<html lang="fr">` ou `<html lang="en">` dynamiquement.
  - Fichiers modifiés : `middleware.ts`, `app/layout.tsx`
- [x] **1.2 Traductions SSR** — ~~Initialement signalé comme critique~~ → **Faux positif**. Les composants `'use client'` sont bien SSR par Next.js. Le `LangProvider` initialise `useState(initialLang)` qui retourne la bonne langue côté serveur. Les traductions `t(key)` sont donc présentes dans le HTML initial envoyé aux crawlers. Aucune migration nécessaire.
- [x] **1.3 H1 multiples par page** — Tous les `<h1>` parasites convertis en `<h2>`. Seul le Hero de la homepage et le titre d'article individuel conservent un `<h1>`.
  - Fichiers modifiés : `BlogClient.tsx`, `WorkClient.tsx`, `ContactClient.tsx` (7 h1→h2), `RecruitmentClient.tsx` (5 h1→h2)
- [x] **1.4 Images sans dimensions (CLS)** — Attributs `width` + `height` ajoutés sur toutes les `<img>` qui en manquaient :
  - `Hero.tsx` — avatars trust bar (36x36)
  - `Navbar.tsx` — 4 drapeaux (20x20)
  - `Testimonials.tsx` — avatars (40x40)
  - `BlogClient.tsx` — featured (800x400), grille (400x176), logo (36x36)
  - `ArticleClient.tsx` — cover (1200x600), logo (36x36)
  - `Portfolio.tsx` — modal (800x400), card (800x500)
  - `WorkClient.tsx` — modal (800x400), grille (600x208), logo (36x36)
  - `ServiceSlugClient.tsx` — LLC hero (800x600), clients (160x192), testimonial (48x48)
  - `ContactClient.tsx` — logos (36x36)
  - `RecruitmentClient.tsx` — logos (36x36)

### Phase 2 — Haute priorité (impact SEO fort) ✅ TERMINÉE

- [x] **2.1 Labels de formulaire manquants** — `aria-label` ajouté sur tous les inputs sans label visible, `htmlFor`+`id` ajoutés sur les paires label/input existantes :
  - `ContactClient.tsx` : step 1 input (aria-label), step 3 textarea (aria-label), step 6 email/phone (htmlFor+id)
  - `RecruitmentClient.tsx` : step 1 prénom/nom (aria-label), step 3 textarea (aria-label), step 4 email/phone (htmlFor+id)
  - `Footer.tsx` : newsletter input (aria-label)
- [x] **2.2 Schema.org** — Données structurées JSON-LD ajoutées :
  - Schema `Organization` dans `app/layout.tsx` (nom, logo, URL, contactPoint)
  - Schema `Service` + `BreadcrumbList` dans `app/[lang]/services/[slug]/page.tsx` pour chaque page service
- [x] **2.3 Liens morts dans le Footer** — Tous les `href="#"` remplacés par de vraies routes :
  - Services → `/{lang}/services/saas-web-app`, `llc-creation`, `llm-seo`, `agent-automation`
  - Blog → `/{lang}/blog`
  - À propos → `/{lang}#how-we-work`
- [x] **2.4 `aria-label` sur boutons/icônes** — Labels accessibles ajoutés :
  - `Footer.tsx` : 4 icônes réseaux sociaux (Twitter, LinkedIn, Instagram, Dribbble) + bouton newsletter
  - `Portfolio.tsx` : lien externe projet
  - `Hero.tsx` : lien Trustpilot
- [x] **2.5 Configuration `next.config.ts`** — `images.unsplash.com` ajouté dans `remotePatterns` pour les images Unsplash des pages services

### Phase 3 — Priorité normale (optimisation) ✅ TERMINÉE

- [x] **3.1 Modal Portfolio accessible** — Ajouté `role="dialog"`, `aria-modal="true"`, `aria-label` sur les modals de `Portfolio.tsx` et `WorkClient.tsx`. Ajouté `aria-label="Fermer"` sur les boutons de fermeture.
- [x] **3.2 Barre de progression accessible** — Ajouté `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-label` sur les barres de progression de `ContactClient.tsx` et `RecruitmentClient.tsx`.
- [x] **3.3 Optimiser le bundle animations** — Lazy-loading des sections below-the-fold via `next/dynamic` dans `app/[lang]/page.tsx` : Timeline, Testimonials, Pricing, FAQ, Manifesto, CTA, ScrollReveal. Réduit le JS initial de la homepage.
- [x] **3.4 Headers de sécurité** — Ajouté dans `next.config.ts` les headers :
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [x] **3.5 Optimiser FontAwesome** — Remplacé l'import global `all.min.css` par un import sélectif : `fontawesome.min.css` + `solid.min.css` + `brands.min.css` uniquement (pas de `regular`, aucune icône `far` utilisée). Réduit le CSS render-blocking.
- [x] **3.6 Générer les pages en statique** — Ajouté `generateStaticParams` sur les pages blog listing (`app/[lang]/blog/page.tsx`) et services listing (`app/[lang]/services/page.tsx`). Les articles individuels et pages services avaient déjà cette configuration.

### Phase 4 — Audit complémentaire ✅ TERMINÉE

- [x] **4.1 Sitemap complet** — Le sitemap (`app/sitemap.ts`) inclut désormais :
  - Les 4 pages services individuelles : `/services/saas-web-app`, `/services/llc-creation`, `/services/llm-seo`, `/services/agent-automation` (priority 0.8, changeFrequency monthly)
  - Tous les articles de blog individuels depuis Supabase via `getAllArticleSlugs()` (priority 0.7, changeFrequency weekly)
  - La page `/services` listing ajoutée aux routes statiques
  - Alternates hreflang FR/EN sur chaque entrée
  - Le sitemap est maintenant `async` pour le fetch dynamique
- [x] **4.2 Schema JSON-LD FAQPage** — Données structurées FAQ ajoutées sur la homepage (`app/[lang]/page.tsx`) :
  - 3 questions/réponses en FR et 3 en EN (durée projet, support post-lancement, technologies)
  - Injecté côté serveur via `<script type="application/ld+json">`
  - Permet l'affichage de rich snippets FAQ dans les résultats Google

### Ce qu'il reste à faire (non bloquant)

| # | Priorité | Tâche | Détail |
|---|----------|-------|--------|
| 1 | Haute | **Liens sociaux réels** | Les 4 liens du Footer (Twitter, LinkedIn, Instagram, Dribbble) pointent vers `href="#"` — remplacer par les vraies URLs des profils |
| 2 | Haute | **Schema `sameAs`** | Le JSON-LD Organization dans `app/layout.tsx` a un tableau `sameAs: []` vide — à compléter avec les URLs des profils sociaux |
| 3 | Moyenne | **Alt text images** | Certains alt text sont génériques ("client" pour les avatars, juste le titre pour le portfolio) — à rendre plus descriptifs |
| 4 | Basse | **Page error.tsx** | Pas de page d'erreur runtime (500) — ajouter `app/error.tsx` |
| 5 | Basse | **Articles liés** | Les articles de blog ne linkent pas vers des services ou articles connexes |
| 6 | **Haute** | **Configurer réception email** | Resend est configuré pour **envoyer** les emails de contact, mais il faut configurer la **réception** sur `contact@diez-agency.com`. Options : ImprovMX (gratuit, forwarding vers Gmail) ou Cloudflare Email Routing. Ajouter les MX records chez Maromania (registrar du domaine) |
| 7 | **Haute** | **Vérifier domaine sur Resend** | Aller sur [resend.com/domains](https://resend.com/domains), ajouter `diez-agency.com`, puis ajouter les DNS records (SPF, DKIM, DMARC) chez Maromania pour que Resend puisse envoyer depuis `noreply@diez-agency.com` |
| 8 | **Haute** | **Ajouter RESEND_API_KEY sur Vercel** | Aller dans Vercel > Settings > Environment Variables et ajouter `RESEND_API_KEY` = `re_VAVnHPgH_...` (la clé est déjà dans `.env.local` en local) |

---

## PSEO — Programmatic SEO (Stratégie de domination locale Maroc)

> **Objectif** : Devenir la référence #1 du digital au Maroc en générant des centaines de pages locales optimisées ciblant chaque combinaison `ville × service × secteur`.

### Principe

Le PSEO génère automatiquement des pages SEO à partir de templates + données structurées. Chaque page cible une intention de recherche locale précise et est unique, indexable, et optimisée.

**Formule** : `[Service] + [Ville]` + `[Secteur d'activité]`

Exemples :
- *"Création de SaaS à Casablanca"*
- *"Automatisation IA pour restaurants à Marrakech"*
- *"Site web pour avocat à Rabat"*

### Architecture des routes PSEO

```
/fr/agence/[city]                          → "Agence digitale à Casablanca"
/fr/agence/[city]/[service-slug]           → "Création de SaaS à Casablanca"
/fr/agence/[city]/[sector]                 → "Agence digitale pour restaurants à Rabat"
/fr/agence/[city]/[service-slug]/[sector]  → "Site web pour avocat à Marrakech" (phase 2)
```

### Matrice de données

| Dimension | Éléments | Volume |
|-----------|----------|--------|
| **Villes** | Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kénitra, Tétouan, Salé, Nador | 12 |
| **Services** | SaaS/Sites web, Création LLC, LLM SEO, Automatisation IA | 4 |
| **Secteurs** | Restaurant, Immobilier, E-commerce, Avocat, Médecin, Hôtel, Startup, PME, Import/Export, Éducation | 10 |

**Volume estimé** :
- Phase 1 : 12 villes × (1 + 4 services) = **60 pages**
- Phase 1b : + 12 villes × 10 secteurs = **+120 pages = 180 pages total**
- Phase 2 : + 12 × 4 × 10 combinaisons complètes = **jusqu'à 660+ pages**

### Tables Supabase (nouvelles)

**`pseo_cities`**
| Colonne | Type | Description |
|---------|------|-------------|
| id | int | Clé primaire |
| slug | text | URL slug (ex: `casablanca`) |
| name_fr | text | Nom FR (ex: `Casablanca`) |
| name_en | text | Nom EN |
| region | text | Région (ex: `Casablanca-Settat`) |
| population | int | Population (pour les chiffres locaux) |
| description_fr | text | Paragraphe contexte économique FR |
| description_en | text | Paragraphe contexte économique EN |
| lat | float | Latitude (Schema LocalBusiness) |
| lng | float | Longitude (Schema LocalBusiness) |
| created_at | timestamp | Date de création |

**`pseo_sectors`**
| Colonne | Type | Description |
|---------|------|-------------|
| id | int | Clé primaire |
| slug | text | URL slug (ex: `restaurant`) |
| name_fr | text | Nom FR (ex: `Restaurant`) |
| name_en | text | Nom EN |
| icon | text | Icône (emoji ou classe FA) |
| description_fr | text | Description du secteur FR |
| description_en | text | Description du secteur EN |
| created_at | timestamp | Date de création |

**`pseo_pages`**
| Colonne | Type | Description |
|---------|------|-------------|
| id | int | Clé primaire |
| city_id | int | FK → pseo_cities |
| service_slug | text | Slug du service (nullable) |
| sector_id | int | FK → pseo_sectors (nullable) |
| title_fr | text | H1 FR personnalisé |
| title_en | text | H1 EN personnalisé |
| meta_title_fr | text | Meta title FR |
| meta_title_en | text | Meta title EN |
| meta_description_fr | text | Meta description FR |
| meta_description_en | text | Meta description EN |
| content_fr | text | Contenu Markdown FR |
| content_en | text | Contenu Markdown EN |
| faq_fr | jsonb | FAQ FR (array de {question, answer}) |
| faq_en | jsonb | FAQ EN (array de {question, answer}) |
| published | boolean | Publié ou brouillon |
| created_at | timestamp | Date de création |

### Contenu de chaque page PSEO

Chaque page générée contient :
1. **H1 dynamique** — ex: *"Agence de création de SaaS à Casablanca"*
2. **Hero avec contexte local** — chiffres économiques de la ville, nombre d'entreprises du secteur
3. **Section services** — adaptée au secteur ciblé avec cas d'usage spécifiques
4. **FAQ locale** — 3-5 questions/réponses (Schema `FAQPage` JSON-LD)
5. **CTA** — vers `/contact` avec pré-remplissage ville/service/secteur
6. **Schema JSON-LD** — `LocalBusiness` + `Service` + `BreadcrumbList`
7. **Maillage interne** — liens vers pages sœurs (autres villes, autres services, autres secteurs)

### Données structurées (Schema.org)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Diez Agency — Casablanca",
  "description": "Agence digitale à Casablanca...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Casablanca",
    "addressRegion": "Casablanca-Settat",
    "addressCountry": "MA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 33.5731, "longitude": -7.5898 },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services digitaux",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Création de SaaS" } }
    ]
  }
}
```

### Plan d'implémentation

#### Phase 1 — Fondations (priorité immédiate)

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 1.1 | Créer les tables Supabase (`pseo_cities`, `pseo_sectors`, `pseo_pages`) | SQL Supabase | ✅ |
| 1.2 | Ajouter les types TypeScript PSEO | `lib/types.ts` | ✅ |
| 1.3 | Ajouter les fonctions fetch Supabase PSEO | `lib/supabase.ts` | ✅ |
| 1.4 | Créer la route `app/[lang]/agence/[city]/page.tsx` | Nouvelle page | ✅ |
| 1.5 | Créer la route `app/[lang]/agence/[city]/[service]/page.tsx` | Nouvelle page | ✅ |
| 1.6 | Créer le composant template PSEO réutilisable | `app/components/PseoPage.tsx` | ✅ |
| 1.7 | Ajouter `generateStaticParams` pour SSG de toutes les combinaisons | Pages PSEO | ✅ |
| 1.8 | Ajouter les pages PSEO au sitemap | `app/sitemap.ts` | ✅ |

#### Phase 2 — Contenu & SEO

| # | Tâche | Fichiers | Statut |
|---|-------|----------|--------|
| 2.1 | Seeder les 12 villes marocaines dans `pseo_cities` | `supabase/seeds/01_cities.sql` | ✅ |
| 2.2 | Seeder les 10 secteurs dans `pseo_sectors` | `supabase/seeds/02_sectors.sql` | ✅ |
| 2.3 | Générer les 12 pages ville (agence) | `supabase/seeds/03_pages_city.sql` | ✅ |
| 2.4 | Générer les 48 pages ville × service | `supabase/seeds/04-07_pages_*.sql` | ✅ |
| 2.5 | Schema JSON-LD `LocalBusiness` + `FAQPage` sur chaque page PSEO | Inclus dans Phase 1 (routes) | ✅ |
| 2.6 | Pages PSEO dans le sitemap | `app/sitemap.ts` | ✅ |
| 2.7 | Ajouter le maillage interne dans le Footer | `app/components/Footer.tsx` | |

#### Phase 3 — Expansion (secteurs)

| # | Tâche | Fichiers |
|---|-------|----------|
| 3.1 | Créer la route `app/[lang]/agence/[city]/[sector]/page.tsx` | Nouvelle page |
| 3.2 | Générer les 120 pages ville × secteur | `pseo_pages` |
| 3.3 | Créer la route combinée `app/[lang]/agence/[city]/[service]/[sector]/page.tsx` | Phase 2 |
| 3.4 | Générer les 480 pages combinées | `pseo_pages` |

#### Phase 4 — Tracking & Optimisation

| # | Tâche | Détail |
|---|-------|--------|
| 4.1 | Soumettre le sitemap étendu à Google Search Console | Indexation |
| 4.2 | Monitorer les positions ville par ville | Google Search Console |
| 4.3 | A/B tester les titres et meta descriptions | Optimisation CTR |
| 4.4 | Tracker les citations IA (ChatGPT, Perplexity) | LLM SEO |
| 4.5 | Itérer sur le contenu des pages performantes | Optimisation continue |

---

## QG Multi-Projets — Plan de développement (à venir)

> **Objectif** : Transformer l'admin Diez en un **QG centralisé** (hub-and-spoke) capable de gérer plusieurs sous-projets déployés, recevoir leurs données/stats via API, et envoyer des commandes à distance.

### Architecture

```
Sous-projet A ──┐
                 │   HTTPS + API Key + HMAC
Sous-projet B ──┼──────────► QG (Diez Admin)
                 │           ┌─────────────┐
Sous-projet C ──┘           │ Dashboard    │
                             │ Projets      │
    ◄────────────────────── │ Actions      │
    Commandes retour         │ Logs         │
                             └─────────────┘
```

### Modules côté QG

| Module | Description |
|--------|-------------|
| **Registre de projets** | Ajouter/supprimer des projets, stocker URL + clé API + type |
| **Dashboard multi-projets** | Vue d'ensemble : statut, dernières stats, alertes par projet |
| **Fiche projet** | Vue détaillée d'un projet avec ses métriques et actions possibles |
| **Contrôle à distance** | Modifier contenu, toggle features, vider cache d'un sous-projet |
| **Logs centralisés** | Historique de toutes les actions effectuées sur chaque projet |
| **Health monitoring** | Ping automatique des sous-projets, alerte si down |

### API des sous-projets (endpoints standardisés)

| Endpoint | Direction | Description |
|----------|-----------|-------------|
| `POST /api/qg/stats` | Projet → QG | Envoyer métriques (visites, conversions, etc.) |
| `GET /api/qg/health` | QG → Projet | Vérifier que le projet est en ligne |
| `GET /api/qg/data` | QG → Projet | Récupérer données (articles, produits, etc.) |
| `PUT /api/qg/content` | QG → Projet | Modifier du contenu à distance |
| `POST /api/qg/action` | QG → Projet | Exécuter une action (vider cache, rebuild, etc.) |
| `GET /api/qg/config` | QG → Projet | Lire la config du projet |
| `PUT /api/qg/config` | QG → Projet | Modifier la config à distance |

### Plan d'implémentation

#### Phase 1 — Fondations (BDD + modèles)
- Créer la table `projects` (nom, url, api_key, type, status, etc.)
- Créer la table `project_stats` (métriques reçues des sous-projets)
- Créer la table `project_logs` (historique d'actions)
- Types TypeScript + fonctions CRUD dans `supabase.ts`

#### Phase 2 — API du QG (réception)
- `POST /api/projects/[id]/stats` — recevoir des stats
- `GET /api/projects/[id]/health` — endpoint de vérification
- Middleware d'authentification par clé API + HMAC
- Validation des payloads entrants

#### Phase 3 — Dashboard admin multi-projets
- Page `/admin/dashboard/projects` — liste de tous les projets
- Page `/admin/dashboard/projects/[id]` — fiche détaillée
- Formulaire d'ajout/édition avec génération de clé API
- Widgets de stats + vue d'ensemble sur le dashboard principal

#### Phase 4 — Contrôle à distance
- Fonctions pour appeler les API des sous-projets depuis le QG
- Interface admin pour modifier du contenu à distance
- Système de logs + health check automatique

#### Phase 5 — SDK sous-projet (réutilisable)
- Module `diez-qg-client` installable dans chaque sous-projet
- Inclut : envoi de stats, endpoints de réception, middleware d'auth
- Documentation d'intégration

### Principes de conception
- **Découplage** : les sous-projets fonctionnent même si le QG est down
- **Sécurité** : clés API par projet + signature HMAC des requêtes
- **Modularité** : chaque type de projet (e-commerce, vitrine, SaaS) a ses propres modules
- **Polling > WebSockets** : stats en batch toutes les 5-15 min, actions en appel direct synchrone
