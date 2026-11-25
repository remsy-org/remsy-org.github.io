import { defaultLocale, type Locale } from './index';

// Page content in src/content/: <name>.md is English, <name>.<locale>.md is a translation.
// A translation only needs the fields it translates; everything else comes from English.

const files = import.meta.glob<{ frontmatter: Record<string, unknown> }>('../content/*.md', {
  eager: true,
});

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function merge(base: Record<string, unknown>, override: Record<string, unknown>) {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === null || value === undefined || value === '') continue;
    result[key] = isPlainObject(value) && isPlainObject(base[key]) ? merge(base[key], value) : value;
  }
  return result;
}

function frontmatterOf(fileName: string) {
  return files[`../content/${fileName}`]?.frontmatter;
}

/** The content file `name` in `locale`, falling back to English field by field. */
export function getContent<T = Record<string, any>>(name: string, locale: Locale = defaultLocale): T {
  const english = frontmatterOf(`${name}.md`) ?? {};
  if (locale === defaultLocale) return english as T;
  const translated = frontmatterOf(`${name}.${locale}.md`);
  return (translated ? merge(english, translated) : english) as T;
}

/** Only what the translation file itself contains (no English fallback); {} if there's none. */
export function getOwnContent<T = Record<string, any>>(name: string, locale: Locale): T {
  const fileName = locale === defaultLocale ? `${name}.md` : `${name}.${locale}.md`;
  return (frontmatterOf(fileName) ?? {}) as T;
}
