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
