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
        
        <div class="hidden xl:flex items-center space-x-6 shrink-0">
          <a v-for="item in links" :key="item.href" :href="item.href" class="nav-link">{{ item.label }}</a>
          <a
            v-for="other in otherLocales"
            :key="other.code"
            :href="other.href"
            :lang="other.code"
            :hreflang="other.code"
            class="nav-link nav-link-language"
          >{{ other.name }}</a>
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
          <div class="pt-4 border-t border-gray-100 flex gap-6" :aria-label="t.nav.language">
            <a
              v-for="other in otherLocales"
              :key="other.code"
              :href="other.href"
              :lang="other.code"
              :hreflang="other.code"
              class="nav-link-mobile nav-link-language"
            >{{ other.name }}</a>
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
import { computed, ref } from 'vue';
import { defaultLocale, getStrings, locales, localizePath, switchPath, type Locale } from '../i18n';

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

const otherLocales = computed(() =>
  (Object.keys(locales) as Locale[])
    .filter((code) => code !== props.locale)
    .map((code) => ({ code, name: locales[code].name, href: switchPath(props.path, code) }))
);

const mobileMenuOpen = ref(false);

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

/* Language names are written in their own script: no uppercase or spacing tricks. */
.nav-link-language {
  text-transform: none;
  letter-spacing: normal;
}
</style>