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
