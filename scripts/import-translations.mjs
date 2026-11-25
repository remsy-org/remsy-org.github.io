#!/usr/bin/env node
// Writes a file exported from the translation page (/translate/<language>) into the site:
//
//   npm run translations:import -- path/to/translation-ar.json
//
//   strings/...   -> src/i18n/strings/<language>.json
//   hero/...      -> src/content/hero.<language>.md
//   research/...  -> src/content/research.<language>.md
//   contact/...   -> src/content/contact.<language>.md
//   reviewed ids  -> src/i18n/reviewed/<language>.json
//
// The files are replaced with what the export contains; empty texts are left out
// (the site shows English for them). Review the changes with `git diff` before committing.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dump as toYaml, load as parseYaml } from 'js-yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...parts) => path.join(root, ...parts);

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

const file = process.argv[2];
if (!file || file === '--help' || file === '-h') {
  console.log('Usage: npm run translations:import -- <file exported from /translate/<language>>');
  process.exit(file ? 0 : 1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  fail(`Couldn't read ${file}: ${error.message}`);
}

if (data?.format !== 'site-translation' || typeof data.translations !== 'object') {
  fail(`${file} isn't a file exported from the translation page.`);
}
const locale = data.locale;
if (typeof locale !== 'string' || !/^[a-z]{2,3}$/.test(locale) || locale === 'en') {
  fail(`Unexpected language "${locale}" in ${file}.`);
}
const stringsFile = rel('src/i18n/strings', `${locale}.json`);
if (!fs.existsSync(stringsFile)) {
  fail(`src/i18n/strings/${locale}.json doesn't exist: this language isn't set up for the translation tool.`);
}

const texts = Object.entries(data.translations)
  .filter(([id, text]) => typeof id === 'string' && typeof text === 'string')
  .map(([id, text]) => [id.split('/'), text.trim()]);

const isSafeKey = (key) => key !== '__proto__' && key !== 'constructor' && key !== 'prototype';

/** Nested object from [path, text] pairs; empty texts are left out. */
function tree(pairs) {
  const result = {};
  for (const [keys, text] of pairs) {
    if (!text || !keys.every(isSafeKey)) continue;
    let node = result;
    for (const key of keys.slice(0, -1)) node = node[key] ??= {};
    node[keys.at(-1)] = text;
  }
  return result;
}

const section = (name) => texts.filter(([keys]) => keys[0] === name).map(([keys, text]) => [keys.slice(1), text]);

function readFrontmatter(name) {
  const source = fs.readFileSync(rel('src/content', `${name}.md`), 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  return match ? parseYaml(match[1]) ?? {} : {};
}

const written = [];

function writeContent(name, frontmatter, description) {
  const target = rel('src/content', `${name}.${locale}.md`);
  if (Object.keys(frontmatter).length === 0) {
    if (fs.existsSync(target)) console.log(`  (no ${name} texts in the export; kept ${path.relative(root, target)})`);
    return;
  }
  const body = toYaml(frontmatter, { lineWidth: -1, quotingType: '"' });
  const header =
    `# ${description}\n` +
    `# Written by scripts/import-translations.mjs from the translation page (/translate/${locale}).\n` +
    `# Anything missing here shows in English.\n`;
  fs.writeFileSync(target, `---\n${header}${body}---\n`);
  written.push(target);
}

// Interface text
fs.writeFileSync(stringsFile, JSON.stringify(tree(section('strings')), null, 2) + '\n');
written.push(stringsFile);

// Hero and photo captions
writeContent('hero', tree(section('hero')), `Home page text and photo captions (${locale}).`);

// Research areas: same ids and order as research.md. A missing topic is left empty,
// and the site shows the English one in its place.
const research = tree(section('research'));
const englishAreas = readFrontmatter('research').areas ?? [];
const areas = englishAreas
  .map((area) => {
    const translated = research.areas?.[area.id] ?? {};
    const topics = (area.topics ?? []).map((_, n) => translated.topics?.[n] ?? '');
    if (!translated.title && topics.every((topic) => !topic)) return null;
    return { id: area.id, ...(translated.title ? { title: translated.title } : {}), topics };
  })
  .filter(Boolean);
writeContent(
  'research',
  { ...(research.intro ? { intro: research.intro } : {}), ...(areas.length ? { areas } : {}) },
  `Research section (${locale}). Areas match research.md by id.`
);

// Contact details (email and phone always come from contact.md)
writeContent('contact', tree(section('contact')), `Contact details (${locale}).`);

// Which texts the translator marked as checked
if (Array.isArray(data.reviewed)) {
  const reviewedFile = rel('src/i18n/reviewed', `${locale}.json`);
  fs.mkdirSync(path.dirname(reviewedFile), { recursive: true });
  const reviewed = data.reviewed.filter((id) => typeof id === 'string' && id in data.translations);
  fs.writeFileSync(reviewedFile, JSON.stringify(reviewed, null, 2) + '\n');
  written.push(reviewedFile);
}

const filled = texts.filter(([, text]) => text).length;
console.log(`✓ Imported ${filled} of ${texts.length} texts (${locale}) into:`);
for (const target of written) console.log(`  ${path.relative(root, target)}`);
console.log('Check the changes with `git diff`, then preview the site.');
