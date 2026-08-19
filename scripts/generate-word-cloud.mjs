#!/usr/bin/env node
// Regenerates the TOPIC_WORDS / AUTHOR_WORDS data embedded in public/word-cloud.html
// from the current publication and team records. Run with `npm run word-cloud`.
//
// Data source: src/pages/publications/*.md frontmatter (title, authors, abstract, year)
// and src/pages/team/*.md frontmatter (title), which decides who counts as
// "Current lab team" in the authors cloud.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { load as parseYaml } from "js-yaml";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLICATIONS_DIR = path.join(ROOT, "src/pages/publications");
const TEAM_DIR = path.join(ROOT, "src/pages/team");
const OUTPUT_FILE = path.join(ROOT, "public/word-cloud.html");

// ---------- frontmatter ----------

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return parseYaml(match[1]) || {};
  } catch (err) {
    console.warn(`  ! could not parse frontmatter: ${err.message}`);
    return {};
  }
}

function loadMarkdownFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const text = readFileSync(path.join(dir, f), "utf-8");
      return { file: f, ...parseFrontmatter(text) };
    });
}

// ---------- topic extraction ----------

const STOPWORDS = new Set(
  `a about above after again against all also am an and any are as at be because been
  before being below between both but by can cannot could did do does doing down during
  each few for from further had has have having he her here hers herself him himself his
  how i if in into is it its itself just me more most my myself no nor not now of off on
  once only or other our ours ourselves out over own same she should so some such than
  that the their theirs them themselves then there these they this those through to too
  under until up very was we were what when where which while who whom why will with you
  your yours yourself yourselves study results result show shown showed find found using
  used use based paper data analysis high low new two three first second across among
  between due role via provide provides provided suggest suggests suggested via well may
  might one however et al into within likely including include included associated
  significant important observed observe reveal reveals revealed present presents
  presented despite different similar related known change changes changed report
  reports reported demonstrate demonstrates demonstrated key impact impacts effect
  effects potential largely often overall approach method methods dataset datasets
  compared comparison during time year years dynamic dynamical period scale source system
  regime property field current science correlated correlation range level term terms
  general generally therefore thus thereby moreover furthermore whether either neither
  case cases specific specifically particular particularly indicate indicates indicated
  consistent overall total number numbers order given rather still yet already whose
  those such non both area characteristic condition conditions`
    .split(/\s+/)
    .filter(Boolean)
);

// Seed dictionary carried over from the current word cloud, so re-running the
// generator reproduces the existing categorization for known vocabulary.
// New terms that show up in future publications and aren't listed here fall
// back to a default category (with a console warning) — add them below once
// you're happy with where they should land.
const CATEGORY_MAP = {
  sea: "Ocean Physics & Atmosphere", aerosol: "Ocean Physics & Atmosphere", marine: "Ocean Physics & Atmosphere",
  bloom: "Biology, Ecology & Environment", ocean: "Ocean Physics & Atmosphere", mediterranean: "Ocean Physics & Atmosphere",
  phytoplankton: "Biology, Ecology & Environment", surface: "Ocean Physics & Atmosphere", water: "Ocean Physics & Atmosphere",
  eastern: "Ocean Physics & Atmosphere", satellite: "Remote Sensing & AI Methods", depth: "Ocean Physics & Atmosphere",
  dust: "Ocean Physics & Atmosphere", coastal: "Ocean Physics & Atmosphere", dynamics: "Ocean Physics & Atmosphere",
  process: "Ocean Physics & Atmosphere", chlorophyll: "Biology, Ecology & Environment", measurement: "Remote Sensing & AI Methods",
  concentration: "Biology, Ecology & Environment", production: "Biology, Ecology & Environment", nutrient: "Biology, Ecology & Environment",
  cloud: "Ocean Physics & Atmosphere", transport: "Ocean Physics & Atmosphere", community: "Biology, Ecology & Environment",
  jellyfish: "Biology, Ecology & Environment", atlantic: "Ocean Physics & Atmosphere", eddy: "Ocean Physics & Atmosphere",
  region: "Ocean Physics & Atmosphere", optical: "Remote Sensing & AI Methods", carbon: "Biology, Ecology & Environment",
  pattern: "Remote Sensing & AI Methods", basin: "Ocean Physics & Atmosphere", spatial: "Ocean Physics & Atmosphere",
  "ultra-oligotrophic": "Biology, Ecology & Environment", biological: "Biology, Ecology & Environment", seasonal: "Ocean Physics & Atmosphere",
  winter: "Ocean Physics & Atmosphere", horizontal: "Ocean Physics & Atmosphere", oligotrophic: "Biology, Ecology & Environment",
  north: "Ocean Physics & Atmosphere", wind: "Ocean Physics & Atmosphere", summer: "Ocean Physics & Atmosphere",
  virus: "Biology, Ecology & Environment", offshore: "Ocean Physics & Atmosphere", oil: "Biology, Ecology & Environment",
  factor: "Biology, Ecology & Environment", submesoscale: "Ocean Physics & Atmosphere", patch: "Ocean Physics & Atmosphere",
  environmental: "Biology, Ecology & Environment", primary: "Biology, Ecology & Environment", export: "Biology, Ecology & Environment",
  stirring: "Ocean Physics & Atmosphere", levantine: "Ocean Physics & Atmosphere", mesoscale: "Ocean Physics & Atmosphere",
  observation: "Ocean Physics & Atmosphere", ems: "Ocean Physics & Atmosphere", layer: "Ocean Physics & Atmosphere",
  physical: "Ocean Physics & Atmosphere", remote: "Remote Sensing & AI Methods", situ: "Ocean Physics & Atmosphere",
  video: "Remote Sensing & AI Methods", infection: "Biology, Ecology & Environment", atmospheric: "Ocean Physics & Atmosphere",
  lagrangian: "Ocean Physics & Atmosphere", vertical: "Ocean Physics & Atmosphere", oceanic: "Ocean Physics & Atmosphere",
  temporal: "Ocean Physics & Atmosphere", productivity: "Biology, Ecology & Environment", biomass: "Biology, Ecology & Environment",
  microbial: "Biology, Ecology & Environment",
  // extra common terms likely to recur, pre-classified so they don't fall back to default
  algorithm: "Remote Sensing & AI Methods", model: "Remote Sensing & AI Methods", machine: "Remote Sensing & AI Methods",
  learning: "Remote Sensing & AI Methods", sensing: "Remote Sensing & AI Methods", imagery: "Remote Sensing & AI Methods",
  image: "Remote Sensing & AI Methods", classification: "Remote Sensing & AI Methods", deep: "Remote Sensing & AI Methods",
  detection: "Remote Sensing & AI Methods", sensor: "Remote Sensing & AI Methods", spectral: "Remote Sensing & AI Methods",
  bacteria: "Biology, Ecology & Environment", bacterial: "Biology, Ecology & Environment", species: "Biology, Ecology & Environment",
  diversity: "Biology, Ecology & Environment", biodiversity: "Biology, Ecology & Environment", ecosystem: "Biology, Ecology & Environment",
  coral: "Biology, Ecology & Environment", reef: "Biology, Ecology & Environment", pollution: "Biology, Ecology & Environment",
  temperature: "Ocean Physics & Atmosphere", circulation: "Ocean Physics & Atmosphere", storm: "Ocean Physics & Atmosphere",
  climate: "Ocean Physics & Atmosphere", warming: "Ocean Physics & Atmosphere", mixing: "Ocean Physics & Atmosphere",
  fire: "Ocean Physics & Atmosphere", flux: "Biology, Ecology & Environment",
};
const DEFAULT_CATEGORY = "Ocean Physics & Atmosphere";

function singularize(word) {
  if (word.length <= 3) return word;
  if (/[^aeiou]ies$/.test(word)) return word.slice(0, -3) + "y";
  if (/(ss|us|is)$/.test(word)) return word;
  if (/(sses|shes|ches|xes)$/.test(word)) return word.slice(0, -2);
  if (/[^s]s$/.test(word)) return word.slice(0, -1);
  return word;
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9-]+/)
    .map((w) => w.replace(/^-+|-+$/g, ""))
    .filter((w) => w.length > 2 && !/^\d+$/.test(w))
    .map(singularize)
    .filter((w) => !STOPWORDS.has(w));
}

function buildTopicWords(pubs) {
  const weighted = new Map(); // term -> total weighted count
  const docFreq = new Map(); // term -> number of distinct publications

  for (const pub of pubs) {
    const perDoc = new Map();
    for (const t of tokenize(pub.title)) perDoc.set(t, (perDoc.get(t) || 0) + 3);
    for (const t of tokenize(pub.abstract)) perDoc.set(t, (perDoc.get(t) || 0) + 1);
    for (const [term, w] of perDoc) {
      weighted.set(term, (weighted.get(term) || 0) + w);
      docFreq.set(term, (docFreq.get(term) || 0) + 1);
    }
  }

  const unknown = new Set();
  const words = [...weighted.entries()]
    .filter(([, count]) => count >= 4) // drop noise: terms mentioned once in one abstract
    .sort((a, b) => b[1] - a[1])
    .slice(0, 70)
    .map(([text, count]) => {
      let category = CATEGORY_MAP[text];
      if (!category) {
        unknown.add(text);
        category = DEFAULT_CATEGORY;
      }
      return { text, count, category, docFreq: docFreq.get(text) };
    });

  if (unknown.size) {
    console.warn(
      `\n  ! ${unknown.size} term(s) not in CATEGORY_MAP, defaulted to "${DEFAULT_CATEGORY}":\n    ${[...unknown].join(", ")}\n    Add them to CATEGORY_MAP in scripts/generate-word-cloud.mjs to categorize properly.\n`
    );
  }

  return words;
}

// ---------- author extraction ----------

// The same person sometimes gets spelled slightly differently across
// publication records (hyphen vs space in a compound surname, "M.D." vs
// "M. D.", a stray typo) — each variant would otherwise show up as a
// separate person in the cloud. Canonicalize known cases here; when the
// generator warns about a low-count name that looks like a near-duplicate
// of a bigger one, add it below (and ideally fix the source .md file too).
const AUTHOR_ALIASES = {
  "Ben Ezra, T.": "Ben-Ezra, T.",
  "Roth Rosenberg, D.": "Roth-Rosenberg, D.",
  "Aharoonovich, D.": "Aharonovich, D.",
  "Krom, M.D.": "Krom, M. D.",
  "Krom, M.": "Krom, M. D.",
};

function parseAuthors(raw) {
  if (!raw) return [];
  const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const authors = [];
  for (let i = 0; i + 1 < parts.length; i += 2) {
    const surname = parts[i].replace(/^(&|and)\s+/i, "").trim();
    const initials = parts[i + 1].trim();
    if (!/^([A-Z]\.\s?)+$/.test(initials)) continue; // not a "F. M." pattern -> skip (consortium/group name etc.)
    if (!surname) continue;
    const key = `${surname}, ${initials}`;
    authors.push(AUTHOR_ALIASES[key] || key);
  }
  return authors;
}

// Manual overrides for authors whose publication byline doesn't match their
// team-page name (name changes, nicknames, etc.). Extend as needed.
const TEAM_NAME_ALIASES = {
  "Maya Bloch": "Bloch Haimson, M.",
};

function teamMemberKey(title) {
  const clean = title.replace(/^(Prof\.|Dr\.)\s+/i, "").trim();
  if (TEAM_NAME_ALIASES[clean]) return TEAM_NAME_ALIASES[clean];
  const words = clean.split(/\s+/);
  const surname = words[words.length - 1];
  const initials = words
    .slice(0, -1)
    .map((w) => w[0].toUpperCase() + ".")
    .join(" ");
  return `${surname}, ${initials}`;
}

function buildAuthorWords(pubs, teamMembers) {
  const counts = new Map();
  for (const pub of pubs) {
    for (const author of new Set(parseAuthors(pub.authors))) {
      counts.set(author, (counts.get(author) || 0) + 1);
    }
  }

  const currentTeamKeys = new Set(teamMembers.map((t) => teamMemberKey(t.title)));

  const totalAuthors = counts.size;
  const words = [...counts.entries()]
    .filter(([author, count]) => count >= 2 || currentTeamKeys.has(author))
    .sort((a, b) => b[1] - a[1])
    .map(([text, count]) => ({
      text,
      count,
      category: currentTeamKeys.has(text) ? "Current lab team" : "Collaborator",
    }));

  return { words, totalAuthors };
}

// ---------- institution extraction (via OpenAlex) ----------

const HOME_INSTITUTION = "University of Haifa";
const OPENALEX_DELAY_MS = 200; // be polite to the shared/unauthenticated pool

// A few institution names come back from OpenAlex as more than one variant
// for the same real institution (parent/sub-unit records, etc). Merge known
// cases here.
const INSTITUTION_ALIASES = {
  "University of Haifa (Israel)": HOME_INSTITUTION,
};

function normalizeInstitution(name) {
  return INSTITUTION_ALIASES[name] || name;
}

function extractDoi(rawDoi) {
  if (!rawDoi) return null;
  return String(rawDoi).replace(/^https?:\/\/doi\.org\//i, "").trim();
}

async function fetchInstitutionsForDoi(doi) {
  const url = `https://api.openalex.org/works/doi:${encodeURIComponent(doi)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! OpenAlex lookup failed for ${doi}: HTTP ${res.status}`);
    return { institutions: [], authorCount: 0 };
  }
  const data = await res.json();
  const names = new Set();
  for (const authorship of data.authorships || []) {
    for (const inst of authorship.institutions || []) {
      if (inst.display_name) names.add(normalizeInstitution(inst.display_name));
    }
  }
  return { institutions: [...names], authorCount: (data.authorships || []).length };
}

async function buildInstituteWords(pubs) {
  const counts = new Map();
  let lookedUp = 0;
  let maxInstitutionsPerPaper = { count: 0, title: null };
  let maxAuthorsPerPaper = { count: 0, title: null };

  for (const pub of pubs) {
    const doi = extractDoi(pub.doi);
    if (!doi) continue;
    let institutions, authorCount;
    try {
      ({ institutions, authorCount } = await fetchInstitutionsForDoi(doi));
    } catch (err) {
      console.warn(`  ! OpenAlex lookup errored for ${doi}: ${err.message}`);
      institutions = [];
      authorCount = 0;
    }
    lookedUp++;
    for (const inst of institutions) {
      counts.set(inst, (counts.get(inst) || 0) + 1);
    }
    if (institutions.length > maxInstitutionsPerPaper.count) {
      maxInstitutionsPerPaper = { count: institutions.length, title: pub.title };
    }
    // OpenAlex's authorship count is ground truth here — our own `authors:`
    // frontmatter sometimes abbreviates huge consortium papers down to a
    // couple of named authors plus a group name, which would undercount.
    if (authorCount > maxAuthorsPerPaper.count) {
      maxAuthorsPerPaper = { count: authorCount, title: pub.title };
    }
    await new Promise((resolve) => setTimeout(resolve, OPENALEX_DELAY_MS));
  }

  const totalInstitutions = counts.size;
  const words = [...counts.entries()]
    .filter(([inst, count]) => count >= 2 || inst === HOME_INSTITUTION)
    .sort((a, b) => b[1] - a[1])
    .map(([text, count]) => ({
      text,
      count,
      category: text === HOME_INSTITUTION ? "Home institution" : "Partner institution",
    }));

  console.log(`  Looked up ${lookedUp} DOIs on OpenAlex, found ${totalInstitutions} distinct institutions.`);
  return { words, totalInstitutions, maxInstitutionsPerPaper, maxAuthorsPerPaper };
}

// ---------- main ----------

async function main() {
  const pubFiles = loadMarkdownFiles(PUBLICATIONS_DIR);
  const teamMembers = loadMarkdownFiles(TEAM_DIR).filter((t) => t.title && t.role);

  const topicWords = buildTopicWords(pubFiles);
  const { words: authorWords, totalAuthors } = buildAuthorWords(pubFiles, teamMembers);

  const html = readFileSync(OUTPUT_FILE, "utf-8");
  const marker = /  \/\/ GENERATED:DATA:START[\s\S]*?\/\/ GENERATED:DATA:END/;
  if (!marker.test(html)) {
    throw new Error("Could not find GENERATED:DATA markers in public/word-cloud.html");
  }

  console.log("Looking up author institutions via OpenAlex (this takes a bit)...");
  let instituteWords, totalInstitutions, maxInstitutionsPerPaper, maxAuthorsPerPaper;
  try {
    ({ words: instituteWords, totalInstitutions, maxInstitutionsPerPaper, maxAuthorsPerPaper } =
      await buildInstituteWords(pubFiles));
  } catch (err) {
    console.warn(`  ! Institution lookup failed entirely: ${err.message}`);
    instituteWords = [];
    totalInstitutions = 0;
    maxInstitutionsPerPaper = { count: 0, title: null };
    maxAuthorsPerPaper = { count: 0, title: null };
  }

  // OpenAlex being down/rate-limited shouldn't silently blank out a
  // previously-good institutes cloud — fall back to whatever's already
  // in the file if this run came back suspiciously empty.
  if (instituteWords.length < 3) {
    const existingMatch = html.match(/const INSTITUTE_WORDS = (\[.*?\]);/s);
    const existingTotalMatch = html.match(/const TOTAL_INSTITUTIONS = (\d+);/);
    const existingMaxInstMatch = html.match(/const MAX_INSTITUTIONS_PER_PAPER = (\{.*?\});/s);
    const existingMaxAuthMatch = html.match(/const MAX_AUTHORS_PER_PAPER = (\{.*?\});/s);
    if (existingMatch) {
      console.warn(
        `  ! Only found ${instituteWords.length} institution(s) this run — keeping the existing INSTITUTE_WORDS data instead of overwriting it.`
      );
      instituteWords = JSON.parse(existingMatch[1]);
      totalInstitutions = existingTotalMatch ? Number(existingTotalMatch[1]) : totalInstitutions;
      maxInstitutionsPerPaper = existingMaxInstMatch ? JSON.parse(existingMaxInstMatch[1]) : maxInstitutionsPerPaper;
      maxAuthorsPerPaper = existingMaxAuthMatch ? JSON.parse(existingMaxAuthMatch[1]) : maxAuthorsPerPaper;
    }
  }

  const years = pubFiles.map((p) => Number(p.year)).filter((y) => Number.isFinite(y) && y > 1900);
  const yearMin = Math.min(...years);
  const yearMax = Math.max(...years);
  const abstractCount = pubFiles.filter((p) => p.abstract && p.abstract.trim().length > 0).length;

  const dataBlock = `  // GENERATED:DATA:START — produced by scripts/generate-word-cloud.mjs, do not hand-edit
  const TOPIC_WORDS = ${JSON.stringify(topicWords)};

  const AUTHOR_WORDS = ${JSON.stringify(authorWords)};

  const INSTITUTE_WORDS = ${JSON.stringify(instituteWords)};

  const N_PUBS = ${pubFiles.length};
  const TOTAL_AUTHORS = ${totalAuthors};
  const TOTAL_INSTITUTIONS = ${totalInstitutions};
  const MAX_AUTHORS_PER_PAPER = ${JSON.stringify(maxAuthorsPerPaper)};
  const MAX_INSTITUTIONS_PER_PAPER = ${JSON.stringify(maxInstitutionsPerPaper)};
  const HOME_INSTITUTION = ${JSON.stringify(HOME_INSTITUTION)};
  const ABSTRACT_COUNT = ${abstractCount};
  const YEAR_MIN = ${yearMin};
  const YEAR_MAX = ${yearMax};
  // GENERATED:DATA:END`;

  const updated = html.replace(marker, () => dataBlock); // fn form avoids $-pattern interpolation
  writeFileSync(OUTPUT_FILE, updated);

  console.log(
    `Wrote ${topicWords.length} topic terms, ${authorWords.length}/${totalAuthors} authors, and ${instituteWords.length}/${totalInstitutions} institutions from ${pubFiles.length} publications (${yearMin}–${yearMax}).`
  );
}

main();
