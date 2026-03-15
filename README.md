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

### Phase 2 — Haute priorité (impact SEO fort)

- [ ] **2.1 Labels de formulaire manquants** — Ajouter `<label htmlFor>` ou `aria-label` sur tous les inputs :
  - `ContactClient.tsx:444, 490, 572, 585`
  - `RecruitmentClient.tsx:404, 413, 436, 502, 531, 544`
  - `Footer.tsx:57-66` (input newsletter)
- [ ] **2.2 Schema.org manquant** — Ajouter les données structurées :
  - Schema `Organization` sur la homepage (nom, logo, URL, réseaux sociaux)
  - Schema `Service` sur les pages services
  - Schema `LocalBusiness` si applicable
  - Schema `BreadcrumbList` sur toutes les pages internes
- [ ] **2.3 Liens morts dans le Footer** — `Footer.tsx:33-37, 45-49` : tous les liens services et company pointent vers `href="#"`. Les remplacer par les vraies URLs ou les supprimer.
- [ ] **2.4 `aria-label` sur boutons/icônes** — Ajouter des labels accessibles :
  - `Footer.tsx:76-79` (icônes réseaux sociaux)
  - `Portfolio.tsx:152-154` (lien externe)
  - `Hero.tsx:187-189` (lien Trustpilot)
- [ ] **2.5 Configuration `next.config.mjs`** — Ajouter les domaines d'images autorisés :
  ```js
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'i.pravatar.cc' },
      { hostname: 'flagcdn.com' },
    ],
  }
  ```

### Phase 3 — Priorité normale (optimisation)

- [ ] **3.1 Modal Portfolio accessible** — `Portfolio.tsx:25` : ajouter `role="dialog"`, `aria-modal="true"`, et gestion du focus trap.
- [ ] **3.2 Barre de progression accessible** — `ContactClient.tsx:30-45` : ajouter `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- [ ] **3.3 Optimiser le bundle animations** — Les composants BlurFade, TextAnimate, ShimmerButton, MagicCard + Framer Motion alourdissent le JS. Évaluer le lazy-loading ou le remplacement par des animations CSS.
- [ ] **3.4 Headers de sécurité** — Ajouter dans `next.config.mjs` les headers `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` (signal de confiance indirect pour le SEO).
- [ ] **3.5 Optimiser FontAwesome** — Vérifier si l'intégralité de FontAwesome CSS est chargée (`layout.tsx:3`). Passer à un import sélectif (tree-shaking) pour réduire le CSS render-blocking.
- [ ] **3.6 Générer les pages blog en statique** — Utiliser `generateStaticParams` pour les articles de blog et les réalisations afin d'améliorer le TTFB.
