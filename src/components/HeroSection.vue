<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-950">
    <!-- Background slideshow -->
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <img
        v-for="(slide, i) in slides"
        :key="slide.src"
        :src="i <= loadedUpTo ? slide.src : undefined"
        :srcset="i <= loadedUpTo ? slide.srcset : undefined"
        sizes="100vw"
        alt=""
        decoding="async"
        :fetchpriority="i === 0 ? 'high' : 'low'"
        class="hero-slide"
        :class="{ 'is-active': i === current, 'is-static': reducedMotion }"
      />
      <!-- Overlay keeps the white text readable on any photo -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/25 to-cyan-900/30"></div>
      <div class="ocean-wave"></div>
    </div>

    <div class="container-custom relative z-10 text-center text-white py-20">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in heading-hero hero-text-shadow">
        {{ heroData?.title || 'Remote Sensing of Marine Systems' }}
        <span class="block text-3xl md:text-4xl mt-4 text-subtitle" style="text-transform: none;">{{ heroData?.subtitle || "Yoav Lehahn's group" }}</span>
      </h1>

      <p class="text-xl md:text-2xl mb-12 max-w-5xl mx-auto opacity-90 animate-slide-up text-subtitle hero-text-shadow">
        {{ heroData?.tagline || "A bird's eye view on processes and patterns in the marine environment" }}
      </p>
    </div>

    <!-- Slideshow controls -->
    <div
      v-if="slides.length > 1"
      class="absolute bottom-8 left-4 md:left-8 z-10 flex items-center gap-3"
    >
      <button
        type="button"
        class="hero-control"
        :aria-label="paused ? 'Play background slideshow' : 'Pause background slideshow'"
        @click="togglePause"
      >
        <svg v-if="paused" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>
      <button
        v-for="(slide, i) in slides"
        :key="'dot-' + slide.src"
        type="button"
        class="hero-dot"
        :class="{ 'is-active': i === current }"
        :aria-label="`Show background image ${i + 1}${slide.caption ? ': ' + slide.caption : ''}`"
        :aria-current="i === current"
        @click="goTo(i)"
      ></button>
    </div>

    <!-- Caption -->
    <Transition name="caption" mode="out-in">
      <p
        v-if="currentCaption"
        :key="current"
        class="absolute bottom-8 right-4 md:right-8 z-10 max-w-[60vw] text-right text-sm text-white/85 hero-text-shadow"
      >
        {{ currentCaption }}
      </p>
    </Transition>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
      <svg class="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
}

interface HeroSlide {
  src: string;
  srcset: string;
  caption: string;
}

const props = withDefaults(defineProps<{
  heroData?: HeroData;
  slides?: HeroSlide[];
}>(), {
  slides: () => [],
});

const INTERVAL_MS = 7000;

const current = ref(0);
// Highest slide index whose image may load; the next slide is preloaded one step ahead.
const loadedUpTo = ref(0);
const paused = ref(false);
const reducedMotion = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

const currentCaption = computed(() => props.slides[current.value]?.caption ?? '');

function goTo(index: number) {
  current.value = index;
  loadedUpTo.value = Math.min(
    props.slides.length - 1,
    Math.max(loadedUpTo.value, index + 1)
  );
  restart();
}

function next() {
  goTo((current.value + 1) % props.slides.length);
}

function stop() {
  if (timer) clearInterval(timer);
  timer = undefined;
}

function restart() {
  stop();
  if (!paused.value && !document.hidden && props.slides.length > 1) {
    timer = setInterval(next, INTERVAL_MS);
  }
}

function togglePause() {
  paused.value = !paused.value;
  restart();
}

function onVisibilityChange() {
  restart();
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // With reduced motion, show the first image only; the dots still let visitors browse.
  paused.value = reducedMotion.value;
  loadedUpTo.value = Math.min(props.slides.length - 1, 1);
  document.addEventListener('visibilitychange', onVisibilityChange);
  restart();
});

onBeforeUnmount(() => {
  stop();
  document.removeEventListener('visibilitychange', onVisibilityChange);
});
</script>

<style scoped>
/* Stacked slides: the active one fades in and slowly zooms ("Ken Burns").
   An outgoing slide keeps its zoom while fading out, then resets once invisible. */
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1);
  transition: opacity 1.5s ease-in-out, transform 0s linear 1.5s;
}

.hero-slide.is-active {
  opacity: 1;
  transform: scale(1.08);
  transition: opacity 1.5s ease-in-out, transform 9s linear;
}

.hero-slide.is-static,
.hero-slide.is-static.is-active {
  transform: none;
  transition: opacity 0.3s linear;
}

.hero-text-shadow {
  text-shadow: 0 1px 3px rgba(0, 20, 50, 0.6), 0 2px 16px rgba(0, 20, 50, 0.7);
}

.hero-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}

.hero-control:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.4);
  transition: background 0.3s, width 0.3s;
}

.hero-dot.is-active {
  width: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
}

.hero-control:focus-visible,
.hero-dot:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.caption-enter-active,
.caption-leave-active {
  transition: opacity 0.75s ease;
}

.caption-enter-from,
.caption-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out 0.3s both;
}

.ocean-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up {
    animation: none;
  }
}
</style>
