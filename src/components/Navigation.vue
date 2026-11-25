<template>
  <nav class="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
    <div class="container-custom">
      <div class="flex justify-between items-center h-20 md:h-20">
        <div class="flex items-center min-w-0 me-4">
          <a :href="link('/')" class="flex items-center space-x-3 min-w-0">
            <div class="min-w-0">
              <h1 class="text-base sm:text-lg xl:text-xl font-bold text-gray-900 nav-brand leading-tight text-balance">{{ t.site.brandTitle }}</h1>
              <p class="text-xs text-gray-600 nav-brand hidden sm:block mt-1" style="font-weight: 400; text-transform: uppercase;">{{ t.site.brandSubtitle }}</p>
            </div>
          </a>
        </div>
        
        <div class="hidden xl:flex items-center space-x-5 shrink-0">
          <a v-for="item in links" :key="item.href" :href="item.href" class="nav-link">{{ item.label }}</a>
          <div ref="languageMenu" class="relative" @keydown.esc="languageMenuOpen = false">
            <button
              type="button"
              class="language-button"
              :aria-expanded="languageMenuOpen"
              aria-haspopup="true"
              :aria-label="`${t.nav.language}: ${locales[locale].name}`"
              @click="languageMenuOpen = !languageMenuOpen"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>
              </svg>
              <span>{{ locale.toUpperCase() }}</span>
              <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': languageMenuOpen }" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <ul v-if="languageMenuOpen" class="absolute end-0 top-full mt-2 min-w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              <li v-for="option in languageOptions" :key="option.code">
                <a
                  :href="option.href"
                  :lang="option.code"
                  :hreflang="option.code"
                  :aria-current="option.current ? 'true' : undefined"
                  class="language-option"
                  :class="{ 'is-current': option.current }"
                >
                  <span>{{ option.name }}</span>
                  <svg v-if="option.current" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div class="ms-2 ps-4 shrink-0">
            <a :href="t.site.universityUrl" target="_blank" class="flex items-center hover:opacity-80 transition-opacity">
              <img :src="logo.src" :alt="t.site.universityName" :width="logo.width" :height="logo.height" class="w-auto max-w-none shrink-0" :class="tallLogo ? 'h-16' : 'h-14'">
            </a>
          </div>
        </div>
        
        <!-- Medium screens: logo beside the menu button (too cramped on phones, where it stays in the menu) -->
        <a :href="t.site.universityUrl" target="_blank" class="hidden sm:flex xl:hidden items-center ms-auto me-3 shrink-0 hover:opacity-80 transition-opacity">
          <img :src="logo.src" :alt="t.site.universityName" :width="logo.width" :height="logo.height" class="w-auto max-w-none" :class="tallLogo ? 'h-14' : 'h-10'">
        </a>

        <button @click="mobileMenuOpen = !mobileMenuOpen" class="xl:hidden p-2 shrink-0" :aria-expanded="mobileMenuOpen" :aria-label="t.nav.menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div v-if="mobileMenuOpen" class="xl:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-4">
          <a v-for="item in mobileLinks" :key="item.href" :href="item.href" @click="closeMobileMenu" class="nav-link-mobile">{{ item.label }}</a>
          <div class="pt-4 border-t border-gray-100">
            <div class="inline-flex rounded-lg bg-gray-100 p-1" role="group" :aria-label="t.nav.language">
              <a
                v-for="option in languageOptions"
                :key="option.code"
                :href="option.href"
                :lang="option.code"
                :hreflang="option.code"
                :aria-current="option.current ? 'true' : undefined"
                class="language-segment"
                :class="{ 'is-current': option.current }"
              >{{ option.name }}</a>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100 flex justify-center sm:hidden">
            <a :href="t.site.universityUrl" target="_blank" class="flex items-center hover:opacity-80 transition-opacity">
              <img :src="t.site.universityLogoMenu" :alt="t.site.universityName" class="w-auto" :class="tallLogo ? 'h-20' : 'h-14'">
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { defaultLocale, getStrings, locales, localizePath, publicLocales, switchPath, type Locale } from '../i18n';

const props = withDefaults(defineProps<{
  locale?: Locale;
  /** English address of the current page, so the language switcher can stay on it. */
  path?: string;
}>(), {
  locale: defaultLocale,
  path: '/',
});

const t = computed(() => getStrings(props.locale));
const link = (path: string) => localizePath(path, props.locale);

const logo = computed(() => t.value.site.universityLogo);
// A logo with stacked lines of text (like the three-language one) is shown taller, so it stays legible.
const tallLogo = computed(() => logo.value.height / logo.value.width > 0.45);

const links = computed(() => [
  { href: link('/'), label: t.value.nav.home },
  { href: link('/#research'), label: t.value.nav.research },
  { href: link('/#publications'), label: t.value.nav.publications },
  { href: link('/#team'), label: t.value.nav.team },
  { href: link('/gallery'), label: t.value.nav.gallery },
  { href: link('/#contact'), label: t.value.nav.contact },
]);

const mobileLinks = computed(() => [
  ...links.value.slice(0, 2),
  { href: link('/#projects'), label: t.value.nav.projects },
  ...links.value.slice(2),
]);

// Every public language, the current one included (marked), so the picker always shows the full set.
const languageOptions = computed(() =>
  publicLocales.map((code) => ({
    code,
    name: locales[code].name,
    href: switchPath(props.path, code),
    current: code === props.locale,
  }))
);

const mobileMenuOpen = ref(false);

const languageMenuOpen = ref(false);
const languageMenu = ref<HTMLElement | null>(null);
const closeOnOutsideClick = (event: MouseEvent) => {
  if (languageMenu.value && !languageMenu.value.contains(event.target as Node)) languageMenuOpen.value = false;
};
onMounted(() => document.addEventListener('click', closeOnOutsideClick));
onBeforeUnmount(() => document.removeEventListener('click', closeOnOutsideClick));

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.nav-link {
  color: rgb(55 65 81);
  font-family: var(--font-heading);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: rgb(37 99 235);
}

.nav-link-mobile {
  color: rgb(55 65 81);
  font-family: var(--font-heading);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: color 0.2s;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.nav-link-mobile:hover {
  color: rgb(37 99 235);
}

/* Language picker. Language names are written in their own script: no uppercase or spacing tricks. */
.language-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid rgb(229 231 235);
  border-radius: 9999px;
  color: rgb(55 65 81);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.2s, border-color 0.2s;
}

.language-button:hover,
.language-button[aria-expanded='true'] {
  color: rgb(37 99 235);
  border-color: rgb(147 197 253);
}

.language-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  color: rgb(55 65 81);
  font-size: 0.95rem;
  transition: background-color 0.15s, color 0.15s;
}

.language-option:hover {
  background-color: rgb(239 246 255);
  color: rgb(37 99 235);
}

.language-option.is-current {
  color: rgb(37 99 235);
  font-weight: 500;
}

.language-segment {
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  color: rgb(75 85 99);
  font-size: 0.95rem;
  transition: background-color 0.15s, color 0.15s;
}

.language-segment:hover {
  color: rgb(37 99 235);
}

.language-segment.is-current {
  background-color: white;
  color: rgb(37 99 235);
  font-weight: 500;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
}
</style>