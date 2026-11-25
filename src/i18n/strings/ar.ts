// Interface text in Arabic.
//
// The text itself is in ar.json, which is written by the translation tool:
// translators work on /translate/ar and export a file, and
//   npm run translations:import -- <exported file>
// writes it back here (and to src/content/*.ar.md). Anything missing shows in English.
import type en from './en';
import english from './en';
import text from './ar.json';

type Tree = Record<string, unknown>;

function merge<T extends Tree>(base: T, override: Tree): T {
  const result: Tree = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === '' || value == null) continue;
    const current = result[key];
    result[key] =
      typeof value === 'object' && typeof current === 'object' && current !== null
        ? merge(current as Tree, value as Tree)
        : value;
  }
  return result as T;
}

const ar: typeof en = merge(english, text);

// Settings that aren't text
ar.site.universityLogo = { src: '/images/haifa-university-logo-trilingual.png', width: 497, height: 300 };
ar.site.universityLogoMenu = '/images/haifa-university-logo-trilingual.png';

export default ar;
