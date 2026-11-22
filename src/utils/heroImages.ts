import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// The curated photo set: every image in src/assets/hero/, in filename order.
// Captions and crop focus come from src/content/hero.md (keyed by filename).
// Used by the homepage hero slideshow and the /gallery page.

const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/hero/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

interface HeroFrontmatter {
  captions?: Record<string, string>;
  focus?: Record<string, string>;
}

export interface CuratedImage {
  fileName: string;
  image: ImageMetadata;
  caption: string;
  focus: string;
}

const warned = new Set<string>();

// Captions and focus are matched by filename, so a renamed image silently loses them.
// Point out entries in hero.md that no longer match any image (usually a rename or typo).
function warnAboutUnmatchedKeys(settings: Record<string, Record<string, string>>) {
  const fileNames = new Set(Object.keys(imageFiles).map((path) => path.split('/').pop()));
  for (const [setting, entries] of Object.entries(settings)) {
    for (const key of Object.keys(entries)) {
      const message = `⚠ hero.md: ${setting} for "${key}" doesn't match any image in src/assets/hero/`;
      if (!fileNames.has(key) && !warned.has(message)) {
        warned.add(message);
        console.warn(message);
      }
    }
  }
}

export async function getCuratedImages(): Promise<CuratedImage[]> {
  const heroFile = await import('../content/hero.md');
  const { captions = {}, focus = {} } = heroFile.frontmatter as HeroFrontmatter;

  warnAboutUnmatchedKeys({ caption: captions, focus });

  return Object.entries(imageFiles)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const fileName = path.split('/').pop() ?? '';
      return {
        fileName,
        image: mod.default,
        caption: captions[fileName] ?? '',
        focus: focus[fileName] ?? 'center',
      };
    });
}

/** Full-screen background versions for the hero slideshow. */
export async function getHeroSlides() {
  const images = await getCuratedImages();
  return Promise.all(
    images.map(async ({ image, caption, focus }) => {
      const optimized = await getImage({
        src: image,
        widths: [960, 1600, 2400],
        sizes: '100vw',
        format: 'webp',
      });
      return {
        src: optimized.src,
        srcset: optimized.srcSet.attribute,
        caption,
        focus,
      };
    })
  );
}

/** Thumbnail and full-size versions for the gallery page. */
export async function getGalleryPhotos() {
  const images = await getCuratedImages();
  return Promise.all(
    images.map(async ({ fileName, image, caption }) => {
      const [thumb, full] = await Promise.all([
        getImage({ src: image, widths: [480, 800, 1200], format: 'webp' }),
        getImage({ src: image, widths: [1600, 2400], format: 'webp' }),
      ]);
      return {
        thumbSrc: thumb.src,
        thumbSrcset: thumb.srcSet.attribute,
        fullSrc: full.src,
        fullSrcset: full.srcSet.attribute,
        // Already the displayed (EXIF-rotated) dimensions.
        width: image.width,
        height: image.height,
        caption,
        alt: caption || fileName.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
      };
    })
  );
}
