// Site languages.
//
// English lives at the site root (/, /gallery, /team); every other language lives
// under its own prefix (/he/, /he/gallery, /he/team).
//
// To add a language:
//   1. Add it to `locales` below and add a `strings/<code>.ts` file (copy he.ts).
//   2. Add its pages: copy src/pages/he/ to src/pages/<code>/ and change the locale.
//   3. Optionally add translated content: src/content/hero.<code>.md, contact.<code>.md,
//      research.<code>.md. Anything missing falls back to English.
//
// A language with `public: false` is built (e.g. /ar/) but not linked from the
// language switcher and hidden from search engines, so it can be reviewed first.
// Its translators work on /translate/<code> (see src/pages/translate/).

import en from './strings/en';
import he from './strings/he';
import ar from './strings/ar';

export const locales = {
  en: { name: 'English', dir: 'ltr', public: true },
  he: { name: 'עברית', dir: 'rtl', public: true },
  ar: { name: 'العربية', dir: 'rtl', public: true },
} as const;

export type Locale = keyof typeof locales;
export type Strings = typeof en;

export const defaultLocale: Locale = 'en';

const strings: Record<Locale, Strings> = { en, he, ar };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in locales;
}

export function getStrings(locale: Locale = defaultLocale): Strings {
  return strings[locale] ?? strings[defaultLocale];
}

export function isPublic(locale: Locale) {
  return locales[locale]?.public ?? false;
}

export const publicLocales = (Object.keys(locales) as Locale[]).filter(isPublic);

export function dirOf(locale: Locale = defaultLocale) {
  return locales[locale]?.dir ?? 'ltr';
}

/**
 * The address of `path` in the given language, e.g. ('/gallery', 'he') -> '/he/gallery'.
 * `path` is the English address; anchors are kept ('/#team' -> '/he/#team').
 */
export function localizePath(path: string, locale: Locale = defaultLocale): string {
  if (locale === defaultLocale) return path;
  if (path === '/' ) return `/${locale}/`;
  if (path.startsWith('/#')) return `/${locale}/${path.slice(1)}`;
  return `/${locale}${path}`;
}

/**
 * Pages that exist in every language, by their English address.
 * Pages not listed here (publications, team bios, ...) are English only; the
 * language switcher on them leads to the translated home page.
 */
export const translatedPages = ['/', '/gallery', '/team'];

/** Where the language switcher leads from `path` (an English address) to `locale`. */
export function switchPath(path: string, locale: Locale): string {
  return localizePath(translatedPages.includes(path) ? path : '/', locale);
}
