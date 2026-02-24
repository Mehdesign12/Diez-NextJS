// Langues supportées — partagées entre layout, pages et middleware
export const SUPPORTED_LANGS = ['fr', 'en'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];
