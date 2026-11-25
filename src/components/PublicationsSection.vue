<template>
  <section id="publications" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">{{ t.publications.heading }}</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
        </p>
      </div>
      
      <div class="max-w-5xl mx-auto">
        <!-- Featured Publications -->
        <FeaturedPublications v-if="featuredPublications.length > 0" :featuredPublications="featuredPublications" :locale="locale" />
        
        <!-- Fallback if no featured publications -->
        <p v-else class="text-center text-gray-600 mb-8 text-body">
          {{ t.publications.fallback }}
        </p>
        
        <!-- View All Publications Link -->
        <div class="text-center mt-12">
          <a href="/publications" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors heading-small text-lg">
            {{ t.publications.viewAll }}
            <svg class="w-6 h-6 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FeaturedPublications from './FeaturedPublications.vue';
import { defaultLocale, getStrings, type Locale } from '../i18n';

interface Publication {
  title: string;
  authors: string;
  journal: string;
  volume?: string;
  pages?: string;
  year: number;
  doi?: string;
  url?: string;
  pdf?: boolean;
  openAccess?: boolean;
  abstract?: string;
  keywords?: string[];
  featured?: boolean;
}

// Accept publications as a prop from the parent Astro component
const props = withDefaults(defineProps<{
  featuredPublications?: Publication[];
  locale?: Locale;
}>(), {
  locale: defaultLocale,
});

const t = computed(() => getStrings(props.locale));

// Use default empty array if not provided
const featuredPublications = props.featuredPublications || [];
</script>

<style scoped>
/* Typography is handled by global.css classes */
</style>
