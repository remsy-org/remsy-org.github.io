// Everything on the site that can be translated, as a flat list of texts.
// Used by the translation page (/translate/<language>); its exported file is written
// back with scripts/import-translations.mjs, which understands the same ids:
//
//   strings/<path>            interface text   -> src/i18n/strings/<language>.json
//   hero/<field>              hero text        -> src/content/hero.<language>.md
//   hero/captions/<file>      photo captions   -> src/content/hero.<language>.md
//   research/intro, research/areas/<id>/title, research/areas/<id>/topics/<n>
//                                              -> src/content/research.<language>.md
//   contact/<field>, contact/address/<field>   -> src/content/contact.<language>.md

import type { Locale } from './index';
import en from './strings/en';
import { getOwnContent } from './content';
import { getStrings } from './index';

export interface TranslationEntry {
  id: string;
  group: string;
  /** Help for the translator, when the English alone may not be clear. */
  note?: string;
  source: string;
  /** The same text in other languages, for reference. */
  references: Record<string, string>;
  /** What the site currently shows in the target language ('' when untranslated). */
  current: string;
}

// Settings in the strings files that aren't text.
const NOT_TEXT = new Set(['site/universityLogo', 'site/universityLogoMenu', 'site/universityUrl']);

const GROUPS: Record<string, string> = {
  'strings/site': 'Site name and header',
  'strings/nav': 'Navigation menu',
  'strings/hero': 'Slideshow buttons',
  'strings/research': 'Research section',
  'strings/team': 'Team',
  'strings/publications': 'Publications',
  'strings/contact': 'Contact section',
  'strings/gallery': 'Gallery page',
  'strings/footer': 'Footer',
  hero: 'Home page: title and tagline',
  'hero/captions': 'Photo captions',
  research: 'Research areas',
  contact: 'Contact details',
};

const NOTES: Record<string, string> = {
  'strings/hero': 'Not shown on screen: read aloud by screen readers for the slideshow buttons.',
  'strings/gallery/openPhoto': 'Read aloud by screen readers, followed by the photo caption.',
  'strings/gallery/playVideo': 'Read aloud by screen readers, followed by the video caption.',
  'strings/gallery/close': 'Button label read by screen readers.',
  'strings/gallery/previous': 'Button label read by screen readers.',
  'strings/gallery/next': 'Button label read by screen readers.',
  'strings/nav/menu': 'Label of the menu button on phones (read by screen readers).',
  'strings/nav/language': 'Label of the language links (read by screen readers).',
  'strings/team/positions': 'Shown under a team member’s name when their page has no translated position.',
  'strings/site/name': 'Shown in the browser tab, after the page title.',
  'strings/site/description': 'Shown by search engines under the page link.',
};

function groupOf(id: string) {
  const parts = id.split('/');
  for (let n = parts.length - 1; n > 0; n--) {
    const key = parts.slice(0, n).join('/');
    if (GROUPS[key]) return GROUPS[key];
  }
  return parts[0];
}

function noteOf(id: string) {
  const parts = id.split('/');
  for (let n = parts.length; n > 0; n--) {
    const note = NOTES[parts.slice(0, n).join('/')];
    if (note) return note;
  }
  return undefined;
}

type Tree = Record<string, any>;

/** All texts of a nested object, as [path, text] pairs. */
function texts(tree: Tree, prefix: string): [string, string][] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = `${prefix}/${key}`;
    if (typeof value === 'string') return [[path, value] as [string, string]];
    if (value && typeof value === 'object') return texts(value, path);
    return [];
  });
}

/** Texts of the content files (src/content/), by id, in a given language. */
function contentTexts(locale: Locale): Map<string, string> {
  const result = new Map<string, string>();
  // Only the translation file's own texts count (not the English fallback).
  const own = (name: string): Tree => getOwnContent(name, locale);

  const hero = own('hero');
  for (const field of ['title', 'subtitle', 'tagline']) result.set(`hero/${field}`, hero[field] ?? '');
  for (const [file, caption] of Object.entries<string>(hero.captions ?? {})) {
    result.set(`hero/captions/${file}`, caption);
  }

  const research = own('research');
  result.set('research/intro', research.intro ?? '');
  for (const area of research.areas ?? []) {
    result.set(`research/areas/${area.id}/title`, area.title ?? '');
    (area.topics ?? []).forEach((topic: string, n: number) =>
      result.set(`research/areas/${area.id}/topics/${n}`, topic)
    );
  }

  const contact = own('contact');
  for (const field of ['title', 'subtitle', 'officeHours']) result.set(`contact/${field}`, contact[field] ?? '');
  for (const field of ['building', 'room', 'institution', 'street', 'city', 'country']) {
    result.set(`contact/address/${field}`, contact.address?.[field] ?? '');
  }
  return result;
}

function stringTexts(locale: Locale, onlyTranslated: Tree | null): Map<string, string> {
  const tree = onlyTranslated ?? getStrings(locale);
  return new Map(texts(tree, 'strings'));
}

/**
 * Every translatable text: the English source, other languages for reference, and
 * the target language's current text.
 * `targetStrings` is the target's own interface text (without the English fallback).
 */
export function getTranslationEntries(
  target: Locale,
  targetStrings: Tree,
  referenceLocales: Locale[] = ['he']
): TranslationEntry[] {
  const englishTexts = new Map([...stringTexts('en', en), ...contentTexts('en')]);
  const targetTexts = new Map([...stringTexts(target, targetStrings), ...contentTexts(target)]);
  const references = referenceLocales.map(
    (locale) => [locale, new Map([...stringTexts(locale, null), ...contentTexts(locale)])] as const
  );

  const entries: TranslationEntry[] = [];
  for (const [id, source] of englishTexts) {
    if (NOT_TEXT.has(id.replace(/^strings\//, '').split('/').slice(0, 2).join('/'))) continue;
    if (!source.trim()) continue;
    entries.push({
      id,
      group: groupOf(id),
      note: noteOf(id),
      source,
      references: Object.fromEntries(
        references
          .map(([locale, map]) => [locale, map.get(id) ?? ''] as const)
          .filter(([, text]) => text && text !== source)
      ),
      current: targetTexts.get(id) ?? '',
    });
  }
  return entries;
}
