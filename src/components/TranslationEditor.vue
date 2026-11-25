<template>
  <div>
    <!-- Toolbar -->
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div class="me-auto min-w-0">
          <h1 class="tool-title text-lg font-semibold text-slate-900">
            Website translation · <span :lang="locale" :dir="dir">{{ languageName }}</span>
          </h1>
          <div class="mt-1 flex items-center gap-3 text-sm text-slate-600">
            <div class="h-1.5 w-32 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
              <div class="h-full rounded-full bg-emerald-500 transition-all" :style="{ width: `${progress}%` }"></div>
            </div>
            <span>{{ checkedCount }} of {{ entries.length }} checked</span>
            <span v-if="emptyCount" class="text-amber-700">· {{ emptyCount }} empty</span>
          </div>
        </div>

        <label class="flex items-center gap-2 text-sm text-slate-700">
          Show
          <select v-model="filter" class="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm">
            <option value="all">All texts</option>
            <option value="unchecked">Not checked yet</option>
            <option value="empty">Empty</option>
            <option value="edited">Changed by me</option>
          </select>
        </label>

        <div class="flex items-center gap-2">
          <button type="button" class="tool-btn" @click="fileInput?.click()">Load file…</button>
          <input ref="fileInput" type="file" accept=".json,application/json" class="hidden" @change="loadFile" />
          <button type="button" class="tool-btn tool-btn-primary" @click="exportFile">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
            Export file
          </button>
        </div>
      </div>
      <p v-if="message" class="mx-auto max-w-6xl px-4 pb-3 text-sm" :class="message.error ? 'text-red-700' : 'text-emerald-700'" role="status">
        {{ message.text }}
      </p>
    </header>

    <div class="mx-auto max-w-6xl px-4 py-8">
      <!-- How it works -->
      <section class="mb-10 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
        <h2 class="tool-title mb-3 text-base font-semibold text-slate-900">How it works</h2>
        <ol class="list-decimal space-y-2 ps-5 text-sm leading-relaxed">
          <li>Each row shows a text from the website in English{{ referenceList ? ` (and in ${referenceList}, for reference)` : '' }}. Write the {{ languageName }} version in the box next to it.</li>
          <li>Boxes that are already filled hold a first draft. Please correct anything that's wrong or sounds unnatural, then tick <strong>Checked</strong>.</li>
          <li>Your work is saved in this browser as you type, so you can close the page and come back later.</li>
          <li>When you're done, click <strong>Export file</strong> and send the downloaded file back to whoever sent you this page. You can also export partway through; <strong>Load file…</strong> continues from an exported file, e.g. on another computer.</li>
        </ol>
        <p class="mt-4 text-sm text-slate-500">
          Keep abbreviations such as SML and numbers as they are. A box left empty shows the English text on the website.
        </p>
        <p v-if="!storageWorks" class="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          This browser doesn't allow the page to save your work. Export a file before closing the page.
        </p>
      </section>

      <p v-if="visibleGroups.length === 0" class="py-16 text-center text-slate-500">Nothing to show with this filter.</p>

      <section v-for="group in visibleGroups" :key="group.name" class="mb-10">
        <h2 class="group-title mb-3 text-sm font-semibold text-slate-500">{{ group.name }}</h2>
        <div class="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div
            v-for="entry in group.entries"
            :key="entry.id"
            class="grid gap-4 p-4 md:grid-cols-2 md:gap-6"
            :class="{ 'bg-emerald-50/40': reviewed[entry.id] }"
          >
            <div class="min-w-0">
              <p lang="en" dir="ltr" class="whitespace-pre-line text-slate-900">{{ entry.source }}</p>
              <p
                v-for="(text, code) in entry.references"
                :key="code"
                :lang="code"
                dir="auto"
                class="mt-1.5 text-sm text-slate-500"
              >{{ text }}</p>
              <p v-if="entry.note" class="mt-2 text-xs italic text-slate-500">{{ entry.note }}</p>
            </div>

            <div class="min-w-0">
              <textarea
                v-model="translations[entry.id]"
                :lang="locale"
                :dir="dir"
                :rows="rowsFor(entry)"
                :aria-label="`${languageName}: ${entry.source}`"
                class="translation-box w-full rounded-lg border px-3 py-2 text-base leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="translations[entry.id]?.trim() ? 'border-slate-300' : 'border-amber-400 bg-amber-50/50'"
              ></textarea>
              <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <label class="flex cursor-pointer items-center gap-2 text-slate-700">
                  <input v-model="reviewed[entry.id]" type="checkbox" class="h-4 w-4 accent-emerald-600" />
                  Checked
                </label>
                <template v-if="isEdited(entry)">
                  <span class="text-blue-700">Changed</span>
                  <button type="button" class="text-slate-500 underline hover:text-slate-800" @click="revert(entry)">Undo change</button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="mt-16 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <button type="button" class="underline hover:text-slate-800" @click="startOver">
          Start over from the website's current text
        </button>
        <span> (discards everything saved in this browser)</span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';

interface Entry {
  id: string;
  group: string;
  note?: string;
  source: string;
  references: Record<string, string>;
  current: string;
}

const props = defineProps<{
  locale: string;
  languageName: string;
  dir: string;
  entries: Entry[];
  reviewed: string[];
  referenceNames: Record<string, string>;
}>();

const FORMAT = 'site-translation';
const storageKey = `site-translation-${props.locale}`;

const translations = reactive<Record<string, string>>({});
const reviewed = reactive<Record<string, boolean>>({});
const filter = ref<'all' | 'unchecked' | 'empty' | 'edited'>('all');
const message = ref<{ text: string; error?: boolean } | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const storageWorks = ref(true);
let ready = false;

const knownIds = new Set(props.entries.map((entry) => entry.id));

function resetToSite() {
  for (const entry of props.entries) {
    translations[entry.id] = entry.current;
    reviewed[entry.id] = props.reviewed.includes(entry.id);
  }
}
resetToSite();

function apply(data: { translations?: Record<string, unknown>; reviewed?: unknown }) {
  let applied = 0;
  for (const [id, text] of Object.entries(data.translations ?? {})) {
    if (knownIds.has(id) && typeof text === 'string') {
      translations[id] = text;
      applied++;
    }
  }
  if (Array.isArray(data.reviewed)) {
    const ids = new Set(data.reviewed);
    for (const id of knownIds) reviewed[id] = ids.has(id);
  }
  return applied;
}

function snapshot() {
  return {
    format: FORMAT,
    version: 1,
    locale: props.locale,
    exported: new Date().toISOString(),
    translations: Object.fromEntries(props.entries.map((entry) => [entry.id, translations[entry.id] ?? ''])),
    reviewed: props.entries.filter((entry) => reviewed[entry.id]).map((entry) => entry.id),
  };
}

// Saved work is restored after the page loads (the server-rendered page shows the site's text).
onMounted(() => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      if (data?.format === FORMAT && data.locale === props.locale) apply(data);
    }
  } catch {
    storageWorks.value = false;
  }
  ready = true;
});

let saveTimer: ReturnType<typeof setTimeout> | undefined;
watch([translations, reviewed], () => {
  if (!ready) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(snapshot()));
      storageWorks.value = true;
    } catch {
      storageWorks.value = false;
    }
  }, 400);
}, { deep: true });

const isEdited = (entry: Entry) => (translations[entry.id] ?? '') !== entry.current;
const isEmpty = (entry: Entry) => !(translations[entry.id] ?? '').trim();

function revert(entry: Entry) {
  translations[entry.id] = entry.current;
}

const checkedCount = computed(() => props.entries.filter((entry) => reviewed[entry.id]).length);
const emptyCount = computed(() => props.entries.filter(isEmpty).length);
const progress = computed(() => (props.entries.length ? (checkedCount.value / props.entries.length) * 100 : 0));

const referenceList = computed(() => Object.values(props.referenceNames).join(' and '));

const visibleGroups = computed(() => {
  const keep = (entry: Entry) => {
    if (filter.value === 'unchecked') return !reviewed[entry.id];
    if (filter.value === 'empty') return isEmpty(entry);
    if (filter.value === 'edited') return isEdited(entry);
    return true;
  };
  const groups = new Map<string, Entry[]>();
  for (const entry of props.entries) {
    if (!keep(entry)) continue;
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group)!.push(entry);
  }
  return [...groups].map(([name, entries]) => ({ name, entries }));
});

function rowsFor(entry: Entry) {
  const length = Math.max(entry.source.length, (translations[entry.id] ?? '').length);
  return Math.min(10, Math.max(1, Math.ceil(length / 55)));
}

function flash(text: string, error = false) {
  message.value = { text, error };
  setTimeout(() => {
    if (message.value?.text === text) message.value = null;
  }, 6000);
}

function exportFile() {
  const blob = new Blob([JSON.stringify(snapshot(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `translation-${props.locale}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  flash(`Exported ${link.download}. Send this file back to whoever sent you this page.`);
}

async function loadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (data?.format !== FORMAT) throw new Error("This isn't a file exported from this page.");
    if (data.locale !== props.locale) throw new Error(`This file is for another language (${data.locale}).`);
    const applied = apply(data);
    flash(`Loaded ${applied} texts from ${file.name}.`);
  } catch (error) {
    flash(error instanceof Error ? error.message : "Couldn't read this file.", true);
  }
}

function startOver() {
  if (!confirm('Discard all your changes in this browser and start from the website\'s current text?')) return;
  resetToSite();
  try {
    localStorage.removeItem(storageKey);
  } catch {
    /* nothing saved */
  }
  flash('Started over from the website\'s current text.');
}
</script>

<style scoped>
.tool-title {
  font-family: var(--font-body);
  letter-spacing: normal;
  text-transform: none;
}

.group-title {
  font-family: var(--font-body);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.translation-box {
  field-sizing: content;
  min-height: 2.75rem;
  resize: vertical;
  font-family: var(--font-body);
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(30 41 59);
  transition: background 0.2s;
}

.tool-btn:hover {
  background: rgb(241 245 249);
}

.tool-btn-primary {
  border-color: rgb(37 99 235);
  background: rgb(37 99 235);
  color: white;
}

.tool-btn-primary:hover {
  background: rgb(29 78 216);
}

.tool-btn:focus-visible {
  outline: 2px solid rgb(37 99 235);
  outline-offset: 2px;
}
</style>
