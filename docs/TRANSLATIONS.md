# Translations

The site has three languages:

| Language | Address | Status |
|----------|---------|--------|
| English  | `/`     | Source text |
| Hebrew   | `/he/`  | Public, linked from the language switcher |
| Arabic   | `/ar/`  | Built but not linked, and hidden from search engines until the translation is reviewed |

The Arabic translation is done through a **translation page** at `/translate/ar`. The translator works there in a browser and exports a **translation file**, which is then imported into the site with one command. The translator doesn't need the code or an account.

## Workflow

1. **Send the link.** Give the translator the address of the translation page, e.g. `https://remsy-org.github.io/translate/ar`. Nothing on the site links to it, and it's hidden from search engines.
2. **The translator works on the page** (see [For the translator](#for-the-translator)) and sends back the exported file, e.g. `translation-ar-2026-11-25.json`.
3. **Import the file:**

   ```sh
   npm run translations:import -- path/to/translation-ar-2026-11-25.json
   ```

4. **Review** the changes with `git diff`, and preview with `npm run dev` at http://localhost:4321/ar/.
5. **Commit and push.** After the deploy, the translation page shows the imported text, so the translator can carry on from there in a later round.
6. **Publish Arabic** once the translation is reviewed: in `src/i18n/index.ts`, change `ar` to `public: true`. Arabic then appears in the language switcher and in the `hreflang` links, and its pages are no longer marked `noindex`.

## For the translator

What to send along with the link:

- Each row shows a text from the website in English, with the Hebrew version for reference. Write the Arabic version in the box next to it.
- Tick **Checked** when a text is final. Use the filter at the top to see only texts that aren't checked, are still empty, or were changed by you.
- **Undo change** puts a text back to what the website currently shows.
- Your work is saved in your browser as you type, so you can close the page and come back later on the same computer and browser. A private window doesn't keep it.
- When you're done, click **Export file** and send the downloaded file back. You can also export partway through.
- **Load file…** continues from an exported file, e.g. on another computer.
- **Start over** at the bottom discards your changes in this browser and starts from the website's current text.
- A text left empty shows in English on the site.

## What the import writes

The import **replaces** these files with what the export contains:

| Texts in the file | Written to |
|-------------------|------------|
| `strings/...` (menus, buttons, headings) | `src/i18n/strings/ar.json` |
| `hero/...` (home page title, tagline, photo captions) | `src/content/hero.ar.md` |
| `research/...` (research intro, areas and topics) | `src/content/research.ar.md` |
| `contact/...` (contact title, address, office hours) | `src/content/contact.ar.md` |
| texts marked **Checked** | `src/i18n/reviewed/ar.json` |

Notes:

- Because the files are replaced, edit Arabic text through the translation page, not by hand in these files. Otherwise the next import overwrites the hand edits. If you do edit by hand, deploy before the translator's next round, so the page starts from your edits.
- Email and phone always come from `src/content/contact.md`. Image focus points always come from `src/content/hero.md`.
- Research areas are matched to `src/content/research.md` by `id`, and topics by their position. If you add, remove or reorder topics in English, the Arabic topics need to follow.
- The import refuses files that weren't exported from the translation page.

## The file format

The exported file is JSON:

```json
{
  "format": "site-translation",
  "version": 1,
  "locale": "ar",
  "exported": "2026-11-25T10:00:00.000Z",
  "translations": {
    "strings/nav/home": "الرئيسية",
    "hero/title": "…",
    "hero/captions/<image file name>": "…",
    "research/areas/plankton/title": "…",
    "research/areas/plankton/topics/0": "…",
    "contact/address/city": "…"
  },
  "reviewed": ["strings/nav/home"]
}
```

- `translations` maps each text's id to its translation. An empty string means "not translated yet".
- `reviewed` lists the ids the translator marked as **Checked**.
- The ids follow the files they're written to, e.g. `strings/nav/home` is `nav.home` in `ar.json`.

## Not covered by the translation page

- **Publications** stay in English.
- **Team members:** names, titles, positions and research lines can be translated in each member's file under `src/pages/team/` with the optional fields `title_ar`, `position_ar` and `research_ar` (or `_he`). Without them, positions come from the role labels in the interface text, and the rest shows in English. Bios show in English.
- **Hebrew** is edited directly in the code: interface text in `src/i18n/strings/he.ts`, and page text in `src/content/{hero,research,contact}.he.md`.
