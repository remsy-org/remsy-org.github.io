<template>
  <div>
    <!-- Masonry grid: photos keep their own shape, portrait ones are not cropped -->
    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
      <figure
        v-for="(photo, i) in photos"
        :key="photo.thumbSrc"
        class="mb-6 break-inside-avoid"
      >
        <button
          type="button"
          class="group block w-full overflow-hidden rounded-xl bg-blue-50 shadow-sm hover:shadow-lg transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          :aria-label="`Open photo: ${photo.alt}`"
          @click="open(i, $event)"
        >
          <img
            :src="photo.thumbSrc"
            :srcset="photo.thumbSrcset"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            :width="photo.width"
            :height="photo.height"
            :alt="photo.alt"
            loading="lazy"
            decoding="async"
            class="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        <figcaption v-if="photo.caption" class="mt-2 text-sm text-gray-600">
          {{ photo.caption }}
        </figcaption>
      </figure>
    </div>

    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="activeIndex !== null && active"
        class="fixed inset-0 z-[100] flex flex-col bg-slate-950/95"
        role="dialog"
        aria-modal="true"
        :aria-label="active.alt"
        @click.self="close"
      >
        <div class="flex items-center justify-between px-4 py-3 text-white/80 text-sm">
          <span>{{ activeIndex + 1 }} / {{ photos.length }}</span>
          <button
            ref="closeButton"
            type="button"
            class="lightbox-btn"
            aria-label="Close"
            @click="close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20" @click.self="close">
          <img
            :key="active.fullSrc"
            :src="active.fullSrc"
            :srcset="active.fullSrcset"
            sizes="100vw"
            :alt="active.alt"
            class="max-w-full max-h-full object-contain rounded-md shadow-2xl"
          />

          <template v-if="photos.length > 1">
            <button
              type="button"
              class="lightbox-btn absolute left-2 md:left-6 top-1/2 -translate-y-1/2"
              aria-label="Previous photo"
              @click="step(-1)"
            >
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              type="button"
              class="lightbox-btn absolute right-2 md:right-6 top-1/2 -translate-y-1/2"
              aria-label="Next photo"
              @click="step(1)"
            >
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </template>
        </div>

        <p class="px-4 py-4 min-h-[3.5rem] text-center text-white/90">
          {{ active.caption }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';

interface GalleryPhoto {
  thumbSrc: string;
  thumbSrcset: string;
  fullSrc: string;
  fullSrcset: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
}

const props = defineProps<{ photos: GalleryPhoto[] }>();

const activeIndex = ref<number | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
let returnFocusTo: HTMLElement | null = null;

const active = computed(() =>
  activeIndex.value === null ? null : props.photos[activeIndex.value]
);

async function open(index: number, event: MouseEvent) {
  returnFocusTo = event.currentTarget as HTMLElement;
  activeIndex.value = index;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeydown);
  await nextTick();
  closeButton.value?.focus();
}

function close() {
  activeIndex.value = null;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeydown);
  returnFocusTo?.focus();
}

function step(delta: number) {
  if (activeIndex.value === null) return;
  const n = props.photos.length;
  activeIndex.value = (activeIndex.value + delta + n) % n;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close();
  else if (event.key === 'ArrowLeft') step(-1);
  else if (event.key === 'ArrowRight') step(1);
  else return;
  event.preventDefault();
  event.stopPropagation();
}

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.lightbox-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.2s;
}

.lightbox-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
