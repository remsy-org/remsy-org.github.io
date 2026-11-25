import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { defaultLocale, locales, type Locale } from '../i18n';
import { getContent } from '../i18n/content';

// The curated media set: every image and video in src/assets/hero/, in filename order.
// Captions and crop focus come from src/content/hero.md (keyed by filename);
// translated captions come from hero.<locale>.md, falling back to English.
// Used by the homepage hero slideshow and the /gallery page.
//
// Videos (.mp4/.webm) are used as-is, so they should be short, silent and compressed.
// An image with the same name as a video (e.g. clip.mp4 + clip.jpg) is used as that
// video's still frame instead of appearing on its own; without one, the video's
// first frame is used.

const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/hero/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

const videoFiles = import.meta.glob<string>(
  '../assets/hero/*.{mp4,webm,MP4,WEBM}',
  { eager: true, query: '?url', import: 'default' }
);

// Only listed so they can be pointed out: GIFs should be converted to MP4.
const unsupportedFiles = import.meta.glob('../assets/hero/*.{gif,GIF,mov,MOV}', {
  query: '?url',
  import: 'default',
});

interface HeroFrontmatter {
  captions?: Record<string, string>;
  focus?: Record<string, string>;
}

interface CuratedBase {
  fileName: string;
  caption: string;
  focus: string;
}

export type CuratedItem =
  | (CuratedBase & { type: 'image'; image: ImageMetadata })
  | (CuratedBase & { type: 'video'; videoSrc: string; poster?: ImageMetadata });

const fileNameOf = (path: string) => path.split('/').pop() ?? '';
const baseNameOf = (fileName: string) => fileName.replace(/\.[^.]+$/, '');

const warned = new Set<string>();
function warnOnce(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}

// Captions and focus are matched by filename, so a renamed file silently loses them.
// Point out entries in hero.md that no longer match any file (usually a rename or typo).
function warnAboutUnmatchedKeys(contentFile: string, settings: Record<string, Record<string, string>>) {
  const fileNames = new Set(
    [...Object.keys(imageFiles), ...Object.keys(videoFiles)].map(fileNameOf)
  );
  for (const [setting, entries] of Object.entries(settings)) {
    for (const key of Object.keys(entries)) {
      if (!fileNames.has(key)) {
        warnOnce(`⚠ ${contentFile}: ${setting} for "${key}" doesn't match any file in src/assets/hero/`);
      }
    }
  }
}

const translatedCaptions = import.meta.glob<{ frontmatter: HeroFrontmatter }>(
  '../content/hero.*.md',
  { eager: true }
);

function warnAboutTranslations() {
  for (const [path, file] of Object.entries(translatedCaptions)) {
    const locale = fileNameOf(path).split('.')[1];
    if (!(locale in locales)) continue;
    warnAboutUnmatchedKeys(fileNameOf(path), { caption: file.frontmatter.captions ?? {} });
  }
}

function warnAboutUnsupportedFiles() {
  for (const path of Object.keys(unsupportedFiles)) {
    warnOnce(`⚠ src/assets/hero/${fileNameOf(path)} is skipped: convert it to .mp4 to include it`);
  }
}

export async function getCuratedItems(locale: Locale = defaultLocale): Promise<CuratedItem[]> {
  const english = getContent<HeroFrontmatter>('hero');
  const { focus = {} } = english;
  const { captions = {} } = getContent<HeroFrontmatter>('hero', locale);

  warnAboutUnmatchedKeys('hero.md', { caption: english.captions ?? {}, focus });
  warnAboutTranslations();
  warnAboutUnsupportedFiles();

  const videoBaseNames = new Set(Object.keys(videoFiles).map((p) => baseNameOf(fileNameOf(p))));
  const posters = new Map<string, ImageMetadata>();
  const items: CuratedItem[] = [];

  for (const [path, mod] of Object.entries(imageFiles)) {
    const fileName = fileNameOf(path);
    if (videoBaseNames.has(baseNameOf(fileName))) {
      posters.set(baseNameOf(fileName), mod.default);
      continue;
    }
    items.push({
      type: 'image',
      fileName,
      image: mod.default,
      caption: captions[fileName] ?? '',
      focus: focus[fileName] ?? 'center',
    });
  }

  for (const [path, url] of Object.entries(videoFiles)) {
    const fileName = fileNameOf(path);
    items.push({
      type: 'video',
      fileName,
      videoSrc: url,
      poster: posters.get(baseNameOf(fileName)),
      caption: captions[fileName] ?? '',
      focus: focus[fileName] ?? 'center',
    });
  }

  return items.sort((a, b) => a.fileName.localeCompare(b.fileName));
}

const altFor = (item: CuratedItem) =>
  item.caption || baseNameOf(item.fileName).replace(/^\d+-/, '').replace(/[-_]+/g, ' ');

export type HeroSlide =
  | { type: 'image'; src: string; srcset: string; caption: string; focus: string }
  | { type: 'video'; src: string; poster?: string; caption: string; focus: string };

/** Full-screen background versions for the hero slideshow. */
export async function getHeroSlides(locale: Locale = defaultLocale): Promise<HeroSlide[]> {
  const items = await getCuratedItems(locale);
  return Promise.all(
    items.map(async (item): Promise<HeroSlide> => {
      const { caption, focus } = item;
      if (item.type === 'video') {
        const poster = item.poster
          ? (await getImage({ src: item.poster, width: 1600, format: 'webp' })).src
          : undefined;
        return { type: 'video', src: item.videoSrc, poster, caption, focus };
      }
      const optimized = await getImage({
        src: item.image,
        widths: [960, 1600, 2400],
        sizes: '100vw',
        format: 'webp',
      });
      return {
        type: 'image',
        src: optimized.src,
        srcset: optimized.srcSet.attribute,
        caption,
        focus,
      };
    })
  );
}

export type GalleryItem =
  | {
      type: 'image';
      thumbSrc: string;
      thumbSrcset: string;
      fullSrc: string;
      fullSrcset: string;
      width: number;
      height: number;
      caption: string;
      alt: string;
    }
  | {
      type: 'video';
      videoSrc: string;
      poster?: string;
      width?: number;
      height?: number;
      caption: string;
      alt: string;
    };

/** Thumbnail and full-size versions for the gallery page. */
export async function getGalleryItems(locale: Locale = defaultLocale): Promise<GalleryItem[]> {
  const items = await getCuratedItems(locale);
  return Promise.all(
    items.map(async (item): Promise<GalleryItem> => {
      const { caption } = item;
      const alt = altFor(item);
      if (item.type === 'video') {
        const poster = item.poster
          ? (await getImage({ src: item.poster, width: 1200, format: 'webp' })).src
          : undefined;
        return {
          type: 'video',
          videoSrc: item.videoSrc,
          poster,
          width: item.poster?.width,
          height: item.poster?.height,
          caption,
          alt,
        };
      }
      const [thumb, full] = await Promise.all([
        getImage({ src: item.image, widths: [480, 800, 1200], format: 'webp' }),
        getImage({ src: item.image, widths: [1600, 2400], format: 'webp' }),
      ]);
      return {
        type: 'image',
        thumbSrc: thumb.src,
        thumbSrcset: thumb.srcSet.attribute,
        fullSrc: full.src,
        fullSrcset: full.srcSet.attribute,
        // Already the displayed (EXIF-rotated) dimensions.
        width: item.image.width,
        height: item.image.height,
        caption,
        alt,
      };
    })
  );
}
