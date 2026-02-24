import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['fr', 'en'] as const;
type Lang = typeof SUPPORTED_LANGS[number];

// Pays francophones → FR
const FR_COUNTRIES = new Set([
  'FR', 'BE', 'CH', 'LU', 'MC', 'MA', 'TN', 'DZ', 'SN', 'CI',
  'CM', 'MG', 'CD', 'ML', 'BF', 'NE', 'TD', 'GN', 'RW', 'BJ',
  'TG', 'GA', 'CG', 'DJ', 'KM', 'SC', 'MU', 'CA', 'HT',
]);

function detectLang(req: NextRequest): Lang {
  // 1. Cookie (préférence sauvegardée) — priorité absolue
  const cookieLang = req.cookies.get('lang')?.value;
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as Lang)) {
    return cookieLang as Lang;
  }

  // 2. Géolocalisation IP via header Vercel
  const country = req.headers.get('x-vercel-ip-country') ?? '';
  if (FR_COUNTRIES.has(country)) return 'fr';
  if (country && !FR_COUNTRIES.has(country)) return 'en';

  // 3. Accept-Language header navigateur
  const acceptLang = req.headers.get('accept-language') ?? '';
  if (acceptLang.toLowerCase().startsWith('fr')) return 'fr';

  // 4. Défaut : anglais (marché le plus large)
  return 'en';
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorer : fichiers statiques, API, _next, admin, favicon
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Si déjà sur une route avec langue → continuer
  const hasLang = SUPPORTED_LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
  if (hasLang) return NextResponse.next();

  // Détecter la langue et rediriger
  const lang = detectLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url, { status: 307 });
}

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation images)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
