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
  // Long-tail terms exposed once the topic pool stopped being pre-cut to a
  // top 70 (needed so a single paper's own vocabulary can still surface
  // when its year is selected). Hand-classified against this corpus.
  global: "Ocean Physics & Atmosphere", open: "Ocean Physics & Atmosphere", environment: "Biology, Ecology & Environment",
  viruse: "Biology, Ecology & Environment", limited: "Biology, Ecology & Environment", gene: "Biology, Ecology & Environment",
  research: "Ocean Physics & Atmosphere", increase: "Ocean Physics & Atmosphere", active: "Biology, Ecology & Environment",
  contribution: "Ocean Physics & Atmosphere", coarse: "Ocean Physics & Atmosphere", gyre: "Ocean Physics & Atmosphere",
  distribution: "Ocean Physics & Atmosphere", endotoxin: "Biology, Ecology & Environment", station: "Ocean Physics & Atmosphere",
  monitoring: "Remote Sensing & AI Methods", outbreak: "Biology, Ecology & Environment", large: "Ocean Physics & Atmosphere",
  variability: "Ocean Physics & Atmosphere", mechanism: "Ocean Physics & Atmosphere", speed: "Ocean Physics & Atmosphere",
  along: "Ocean Physics & Atmosphere", loading: "Ocean Physics & Atmosphere", coast: "Ocean Physics & Atmosphere",
  address: "Ocean Physics & Atmosphere", way: "Ocean Physics & Atmosphere", host: "Biology, Ecology & Environment",
  understanding: "Ocean Physics & Atmosphere", tool: "Remote Sensing & AI Methods", benchmark: "Remote Sensing & AI Methods",
  gulf: "Ocean Physics & Atmosphere", wave: "Ocean Physics & Atmosphere", digital: "Remote Sensing & AI Methods",
  northeast: "Ocean Physics & Atmosphere", cell: "Biology, Ecology & Environment", maritime: "Ocean Physics & Atmosphere",
  parameter: "Remote Sensing & AI Methods", modis: "Remote Sensing & AI Methods", major: "Ocean Physics & Atmosphere",
  enhance: "Ocean Physics & Atmosphere", pacific: "Ocean Physics & Atmosphere", "satellite-based": "Remote Sensing & AI Methods",
  significantly: "Ocean Physics & Atmosphere", sensitivity: "Biology, Ecology & Environment", assess: "Ocean Physics & Atmosphere",
  resulting: "Ocean Physics & Atmosphere", aod: "Ocean Physics & Atmosphere", patchiness: "Ocean Physics & Atmosphere",
  biogeochemical: "Biology, Ecology & Environment", organism: "Biology, Ecology & Environment", integration: "Remote Sensing & AI Methods",
  swimming: "Biology, Ecology & Environment", footprint: "Biology, Ecology & Environment", thickness: "Ocean Physics & Atmosphere",
  mixed: "Ocean Physics & Atmosphere", subtropical: "Ocean Physics & Atmosphere", critical: "Ocean Physics & Atmosphere",
  derived: "Remote Sensing & AI Methods", front: "Ocean Physics & Atmosphere", resolution: "Remote Sensing & AI Methods",
  dominated: "Biology, Ecology & Environment", activity: "Biology, Ecology & Environment", highly: "Ocean Physics & Atmosphere",
  evidence: "Ocean Physics & Atmosphere", transatlantic: "Ocean Physics & Atmosphere", radiative: "Ocean Physics & Atmosphere",
  importance: "Ocean Physics & Atmosphere", limitation: "Biology, Ecology & Environment", cycle: "Biology, Ecology & Environment",
  cyanobacteria: "Biology, Ecology & Environment", smoke: "Ocean Physics & Atmosphere", location: "Ocean Physics & Atmosphere",
  state: "Ocean Physics & Atmosphere", need: "Ocean Physics & Atmosphere", landscape: "Ocean Physics & Atmosphere",
  dip: "Biology, Ecology & Environment", shelf: "Ocean Physics & Atmosphere", spill: "Biology, Ecology & Environment",
  sensor: "Remote Sensing & AI Methods", characterized: "Ocean Physics & Atmosphere", spring: "Ocean Physics & Atmosphere",
  intensity: "Ocean Physics & Atmosphere", studied: "Ocean Physics & Atmosphere", structure: "Ocean Physics & Atmosphere",
  moderate: "Ocean Physics & Atmosphere", insight: "Ocean Physics & Atmosphere", "long-term": "Ocean Physics & Atmosphere",
  pelagic: "Biology, Ecology & Environment", food: "Biology, Ecology & Environment", viral: "Biology, Ecology & Environment",
  possible: "Ocean Physics & Atmosphere", human: "Biology, Ecology & Environment", product: "Remote Sensing & AI Methods",
  shallow: "Ocean Physics & Atmosphere", chemical: "Biology, Ecology & Environment", question: "Ocean Physics & Atmosphere",
  information: "Remote Sensing & AI Methods", affect: "Ocean Physics & Atmosphere", aodc: "Ocean Physics & Atmosphere",
  gap: "Ocean Physics & Atmosphere", development: "Ocean Physics & Atmosphere", urban: "Ocean Physics & Atmosphere",
  depleted: "Biology, Ecology & Environment", israeli: "Ocean Physics & Atmosphere", pah: "Biology, Ecology & Environment",
  slick: "Biology, Ecology & Environment", color: "Remote Sensing & AI Methods", experiment: "Ocean Physics & Atmosphere",
  estimated: "Ocean Physics & Atmosphere", interannual: "Ocean Physics & Atmosphere", identify: "Remote Sensing & AI Methods",
  link: "Ocean Physics & Atmosphere", behavior: "Biology, Ecology & Environment", stratocumulus: "Ocean Physics & Atmosphere",
  contrast: "Ocean Physics & Atmosphere", amount: "Ocean Physics & Atmosphere", changing: "Ocean Physics & Atmosphere",
  lifetime: "Ocean Physics & Atmosphere", support: "Ocean Physics & Atmosphere", better: "Ocean Physics & Atmosphere",
  relatively: "Ocean Physics & Atmosphere", southern: "Ocean Physics & Atmosphere", heating: "Ocean Physics & Atmosphere",
  "high-resolution": "Remote Sensing & AI Methods", abundance: "Biology, Ecology & Environment", decoupling: "Ocean Physics & Atmosphere",
  affected: "Ocean Physics & Atmosphere", population: "Biology, Ecology & Environment", life: "Biology, Ecology & Environment",
  organic: "Biology, Ecology & Environment", sampled: "Ocean Physics & Atmosphere", amazon: "Ocean Physics & Atmosphere",
  ecological: "Biology, Ecology & Environment", energy: "Ocean Physics & Atmosphere", predicted: "Ocean Physics & Atmosphere",
  risk: "Biology, Ecology & Environment", segmentation: "Remote Sensing & AI Methods", msc: "Ocean Physics & Atmosphere",
  earth: "Ocean Physics & Atmosphere", ability: "Ocean Physics & Atmosphere", huxleyi: "Biology, Ecology & Environment",
  interaction: "Ocean Physics & Atmosphere", march: "Ocean Physics & Atmosphere", artificial: "Remote Sensing & AI Methods",
  multiple: "Ocean Physics & Atmosphere", exposure: "Biology, Ecology & Environment", loss: "Biology, Ecology & Environment",
  aerial: "Remote Sensing & AI Methods", feature: "Remote Sensing & AI Methods", stream: "Ocean Physics & Atmosphere",
  uav: "Remote Sensing & AI Methods", connectivity: "Biology, Ecology & Environment", cyclone: "Ocean Physics & Atmosphere",
  utilizing: "Ocean Physics & Atmosphere", "fy-1c": "Remote Sensing & AI Methods", southeastern: "Ocean Physics & Atmosphere",
  sery: "Ocean Physics & Atmosphere", subpolar: "Ocean Physics & Atmosphere", ratio: "Biology, Ecology & Environment",
  boundary: "Ocean Physics & Atmosphere", addition: "Ocean Physics & Atmosphere", "multi-satellite": "Remote Sensing & AI Methods",
  geostrophic: "Ocean Physics & Atmosphere", analyzing: "Ocean Physics & Atmosphere", produced: "Ocean Physics & Atmosphere",
  component: "Ocean Physics & Atmosphere", imaging: "Remote Sensing & AI Methods", allow: "Ocean Physics & Atmosphere",
  retrieval: "Remote Sensing & AI Methods", altimetry: "Remote Sensing & AI Methods", spatiotemporal: "Ocean Physics & Atmosphere",
  signature: "Remote Sensing & AI Methods", anthropogenic: "Ocean Physics & Atmosphere", particle: "Ocean Physics & Atmosphere",
  reduce: "Ocean Physics & Atmosphere", simulation: "Remote Sensing & AI Methods", observational: "Ocean Physics & Atmosphere",
  size: "Ocean Physics & Atmosphere", approximately: "Ocean Physics & Atmosphere", play: "Ocean Physics & Atmosphere",
  event: "Ocean Physics & Atmosphere", rhythm: "Ocean Physics & Atmosphere", robust: "Remote Sensing & AI Methods",
  annual: "Ocean Physics & Atmosphere", proposed: "Remote Sensing & AI Methods", higher: "Ocean Physics & Atmosphere",
  less: "Ocean Physics & Atmosphere", signal: "Remote Sensing & AI Methods", characterization: "Remote Sensing & AI Methods",
  material: "Ocean Physics & Atmosphere", spray: "Ocean Physics & Atmosphere", quantification: "Remote Sensing & AI Methods",
  consequence: "Ocean Physics & Atmosphere", challenge: "Ocean Physics & Atmosphere", quantify: "Remote Sensing & AI Methods",
  coccolithophore: "Biology, Ecology & Environment", city: "Ocean Physics & Atmosphere", influence: "Ocean Physics & Atmosphere",
  site: "Ocean Physics & Atmosphere", content: "Ocean Physics & Atmosphere", highest: "Ocean Physics & Atmosphere",
  season: "Ocean Physics & Atmosphere", metabolism: "Biology, Ecology & Environment", dispersion: "Ocean Physics & Atmosphere",
  dilution: "Ocean Physics & Atmosphere", aggregation: "Biology, Ecology & Environment", particulate: "Ocean Physics & Atmosphere",
  expression: "Biology, Ecology & Environment", "ocean-atmosphere": "Ocean Physics & Atmosphere", composition: "Biology, Ecology & Environment",
  view: "Ocean Physics & Atmosphere", convective: "Ocean Physics & Atmosphere", control: "Ocean Physics & Atmosphere",
  south: "Ocean Physics & Atmosphere", arabian: "Ocean Physics & Atmosphere", association: "Biology, Ecology & Environment",
  forward: "Ocean Physics & Atmosphere", availability: "Biology, Ecology & Environment", ontology: "Remote Sensing & AI Methods",
  coverage: "Remote Sensing & AI Methods", mapping: "Remote Sensing & AI Methods", "particle-associated": "Biology, Ecology & Environment",
  "sars-cov-2": "Biology, Ecology & Environment", carrier: "Ocean Physics & Atmosphere", unusual: "Ocean Physics & Atmosphere",
  monthly: "Ocean Physics & Atmosphere", photic: "Biology, Ecology & Environment", zone: "Ocean Physics & Atmosphere",
  aqaba: "Ocean Physics & Atmosphere", historical: "Remote Sensing & AI Methods", bacterioplankton: "Biology, Ecology & Environment",
  pipeline: "Remote Sensing & AI Methods", directional: "Biology, Ecology & Environment", movement: "Biology, Ecology & Environment",
  spectrum: "Remote Sensing & AI Methods", "species-specific": "Biology, Ecology & Environment", recycling: "Biology, Ecology & Environment",
  fenyeng: "Remote Sensing & AI Methods", monitor: "Remote Sensing & AI Methods", quality: "Remote Sensing & AI Methods",
  seawif: "Remote Sensing & AI Methods", mld: "Ocean Physics & Atmosphere", done: "Ocean Physics & Atmosphere",
  midlatitude: "Ocean Physics & Atmosphere", deeper: "Ocean Physics & Atmosphere", pump: "Biology, Ecology & Environment",
  appear: "Ocean Physics & Atmosphere", driven: "Ocean Physics & Atmosphere", velocity: "Ocean Physics & Atmosphere",
  filament: "Ocean Physics & Atmosphere", shape: "Ocean Physics & Atmosphere", estimating: "Ocean Physics & Atmosphere",
  spectroradiometer: "Remote Sensing & AI Methods", perspective: "Ocean Physics & Atmosphere", systematic: "Remote Sensing & AI Methods",
  induced: "Ocean Physics & Atmosphere", multiscale: "Ocean Physics & Atmosphere", turbulence: "Ocean Physics & Atmosphere",
  variance: "Remote Sensing & AI Methods", thought: "Ocean Physics & Atmosphere", growth: "Biology, Ecology & Environment",
  atmosphere: "Ocean Physics & Atmosphere", agulha: "Ocean Physics & Atmosphere", ring: "Ocean Physics & Atmosphere",
  throughout: "Ocean Physics & Atmosphere", month: "Ocean Physics & Atmosphere", variable: "Ocean Physics & Atmosphere",
  rapid: "Ocean Physics & Atmosphere", emphasize: "Ocean Physics & Atmosphere", discernible: "Ocean Physics & Atmosphere",
  unusually: "Ocean Physics & Atmosphere", frequency: "Ocean Physics & Atmosphere", northern: "Ocean Physics & Atmosphere",
  half: "Ocean Physics & Atmosphere", air: "Ocean Physics & Atmosphere", differ: "Ocean Physics & Atmosphere",
  lower: "Ocean Physics & Atmosphere", estimate: "Ocean Physics & Atmosphere", framework: "Remote Sensing & AI Methods",
  sampling: "Ocean Physics & Atmosphere", strategy: "Ocean Physics & Atmosphere", interface: "Ocean Physics & Atmosphere",
  affecting: "Ocean Physics & Atmosphere", cluster: "Remote Sensing & AI Methods", distance: "Ocean Physics & Atmosphere",
  highlight: "Ocean Physics & Atmosphere", algal: "Biology, Ecology & Environment", "large-scale": "Ocean Physics & Atmosphere",
  fraction: "Ocean Physics & Atmosphere", genome: "Biology, Ecology & Environment", presence: "Ocean Physics & Atmosphere",
  regional: "Ocean Physics & Atmosphere", strong: "Ocean Physics & Atmosphere", improve: "Remote Sensing & AI Methods",
  assessment: "Ocean Physics & Atmosphere", planktonic: "Biology, Ecology & Environment", macroalgal: "Biology, Ecology & Environment",
  biorefinery: "Biology, Ecology & Environment", fuel: "Biology, Ecology & Environment", rate: "Ocean Physics & Atmosphere",
  tracking: "Remote Sensing & AI Methods", geostationary: "Remote Sensing & AI Methods", require: "Ocean Physics & Atmosphere",
  methodology: "Remote Sensing & AI Methods", enriched: "Biology, Ecology & Environment", metagenomic: "Biology, Ecology & Environment",
  proteorhodopsin: "Biology, Ecology & Environment", summary: "Ocean Physics & Atmosphere", poorly: "Ocean Physics & Atmosphere",
  coccolithovirus: "Biology, Ecology & Environment", upper: "Ocean Physics & Atmosphere", early: "Ocean Physics & Atmosphere",
  profiling: "Biology, Ecology & Environment", column: "Ocean Physics & Atmosphere", providing: "Ocean Physics & Atmosphere",
  novel: "Remote Sensing & AI Methods", scientific: "Ocean Physics & Atmosphere", part: "Ocean Physics & Atmosphere",
  platform: "Remote Sensing & AI Methods", numerical: "Remote Sensing & AI Methods", daily: "Ocean Physics & Atmosphere",
  seasonality: "Ocean Physics & Atmosphere", increased: "Ocean Physics & Atmosphere", intelligence: "Remote Sensing & AI Methods",
  effort: "Ocean Physics & Atmosphere", "free-living": "Biology, Ecology & Environment", hydrocarbon: "Biology, Ecology & Environment",
  manifest: "Ocean Physics & Atmosphere", morphology: "Biology, Ecology & Environment", israel: "Ocean Physics & Atmosphere",
  determined: "Ocean Physics & Atmosphere", nox: "Biology, Ecology & Environment", decreased: "Ocean Physics & Atmosphere",
  specy: "Biology, Ecology & Environment", many: "Ocean Physics & Atmosphere", infrastructure: "Remote Sensing & AI Methods",
  transect: "Ocean Physics & Atmosphere", stratified: "Ocean Physics & Atmosphere", ics: "Ocean Physics & Atmosphere",
  sample: "Ocean Physics & Atmosphere", standard: "Ocean Physics & Atmosphere", contributing: "Ocean Physics & Atmosphere",
  predict: "Remote Sensing & AI Methods", "time-sery": "Ocean Physics & Atmosphere", biophysical: "Ocean Physics & Atmosphere",
  citizen: "Remote Sensing & AI Methods", bathymetry: "Remote Sensing & AI Methods", archaeological: "Ocean Physics & Atmosphere",
  ven: "Ocean Physics & Atmosphere", caesarea: "Ocean Physics & Atmosphere", maritima: "Ocean Physics & Atmosphere",
  emergent: "Ocean Physics & Atmosphere", nadir: "Remote Sensing & AI Methods", widespread: "Biology, Ecology & Environment",
  enhanced: "Ocean Physics & Atmosphere", wintertime: "Ocean Physics & Atmosphere", constrain: "Ocean Physics & Atmosphere",
  interferometry: "Remote Sensing & AI Methods", value: "Ocean Physics & Atmosphere",
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

function pubYear(pub) {
  const y = Number(pub.year);
  return Number.isFinite(y) && y > 1900 ? y : null;
}

function buildTopicWords(pubs) {
  const weighted = new Map(); // term -> total weighted count
  const docFreq = new Map(); // term -> number of distinct publications
  const byYear = new Map(); // term -> { year -> weight }

  for (const pub of pubs) {
    const year = pubYear(pub);
    const perDoc = new Map();
    for (const t of tokenize(pub.title)) perDoc.set(t, (perDoc.get(t) || 0) + 3);
    for (const t of tokenize(pub.abstract)) perDoc.set(t, (perDoc.get(t) || 0) + 1);
    for (const [term, w] of perDoc) {
      weighted.set(term, (weighted.get(term) || 0) + w);
      docFreq.set(term, (docFreq.get(term) || 0) + 1);
      if (year != null) {
        if (!byYear.has(term)) byYear.set(term, new Map());
        const yearMap = byYear.get(term);
        yearMap.set(year, (yearMap.get(year) || 0) + w);
      }
    }
  }

  // Embeds every term above the noise floor, not just the current all-time
  // top 70 — the page picks the top 70 for whatever year range is active,
  // client-side, so a single paper's own vocabulary still surfaces when its
  // year is selected even if it never became prominent across all 50 papers.
  const unknown = new Set();
  const words = [...weighted.entries()]
    .filter(([, count]) => count >= 4) // drop noise: terms mentioned once in one abstract
    .sort((a, b) => b[1] - a[1])
    .map(([text, count]) => {
      let category = CATEGORY_MAP[text];
      if (!category) {
        unknown.add(text);
        category = DEFAULT_CATEGORY;
      }
      return {
        text,
        count,
        category,
        docFreq: docFreq.get(text),
        byYear: Object.fromEntries(byYear.get(text) || []),
      };
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
  const byYear = new Map(); // author -> { year -> paper count }
  for (const pub of pubs) {
    const year = pubYear(pub);
    for (const author of new Set(parseAuthors(pub.authors))) {
      counts.set(author, (counts.get(author) || 0) + 1);
      if (year != null) {
        if (!byYear.has(author)) byYear.set(author, new Map());
        const yearMap = byYear.get(author);
        yearMap.set(year, (yearMap.get(year) || 0) + 1);
      }
    }
  }

  const currentTeamKeys = new Set(teamMembers.map((t) => teamMemberKey(t.title)));

  // Embeds every co-author, not just the ones with 2+ papers all-time — the
  // page applies the "2+ papers, or current team" cut itself, computed
  // against whatever year range is active, so a one-off collaborator whose
  // single paper falls inside a narrow selected range still shows up there.
  const totalAuthors = counts.size;
  const words = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([text, count]) => ({
      text,
      count,
      category: currentTeamKeys.has(text) ? "Current lab team" : "Collaborator",
      byYear: Object.fromEntries(byYear.get(text) || []),
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
  // OpenAlex's own institution record, not a separate research partner —
  // it's the University of Haifa's tech-transfer/commercialization company
  // (carmel-ltd.haifa.ac.il), sometimes listed as an author's affiliation.
  "Carmel (Israel)": HOME_INSTITUTION,
};

// OpenAlex occasionally mis-parses a paper's affiliation text and attaches a
// completely unrelated institution to an author (a name-matching artifact,
// not a real affiliation) — verified by hand against each case. Exclude
// rather than guess a correct replacement.
const INSTITUTION_EXCLUDE = new Set([
  "Planta", // "other" type, country RU — bogus for this Weizmann-based team
  "Planetary Science Institute", // unrelated US astronomy nonprofit
  "Markusovszky Egyetemi Oktatókórház", // Hungarian teaching hospital
  "Global and Regional Asperger Syndrome Partnership", // autism advocacy org
]);

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
      if (!inst.display_name || INSTITUTION_EXCLUDE.has(inst.display_name)) continue;
      names.add(normalizeInstitution(inst.display_name));
    }
  }
  return { institutions: [...names], authorCount: (data.authorships || []).length };
}

async function buildInstituteWords(pubs) {
  const counts = new Map();
  const byYear = new Map(); // institution -> { year -> paper count }
  let lookedUp = 0;
  let maxInstitutionsPerPaper = { count: 0, title: null };
  let maxAuthorsPerPaper = { count: 0, title: null };

  for (const pub of pubs) {
    const doi = extractDoi(pub.doi);
    if (!doi) continue;
    const year = pubYear(pub);
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
      if (year != null) {
        if (!byYear.has(inst)) byYear.set(inst, new Map());
        const yearMap = byYear.get(inst);
        yearMap.set(year, (yearMap.get(year) || 0) + 1);
      }
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

  // Embeds every institution, not just the ones with 2+ papers all-time —
  // same reasoning as authors above: the page applies the cut itself against
  // whatever year range is active.
  const totalInstitutions = counts.size;
  const words = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([text, count]) => ({
      text,
      count,
      category: text === HOME_INSTITUTION ? "Home institution" : "Partner institution",
      byYear: Object.fromEntries(byYear.get(text) || []),
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

  const years = pubFiles.map(pubYear).filter((y) => y != null);
  const yearMin = Math.min(...years);
  const yearMax = Math.max(...years);
  const abstractCount = pubFiles.filter((p) => p.abstract && p.abstract.trim().length > 0).length;
  const pubsByYear = {};
  for (const y of years) pubsByYear[y] = (pubsByYear[y] || 0) + 1;

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
  const PUBS_BY_YEAR = ${JSON.stringify(pubsByYear)};
  // GENERATED:DATA:END`;

  const updated = html.replace(marker, () => dataBlock); // fn form avoids $-pattern interpolation
  writeFileSync(OUTPUT_FILE, updated);

  console.log(
    `Wrote ${topicWords.length} topic terms, ${authorWords.length}/${totalAuthors} authors, and ${instituteWords.length}/${totalInstitutions} institutions from ${pubFiles.length} publications (${yearMin}–${yearMax}).`
  );
}

main();
