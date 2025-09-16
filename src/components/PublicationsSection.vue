<template>
  <section id="publications" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">Research Highlights</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
        </p>
      </div>
      
      <div class="max-w-5xl mx-auto">
        <!-- Featured Publications -->
        <FeaturedPublications v-if="featuredPublications.length > 0" :featuredPublications="featuredPublications" />
        
        <!-- Fallback if no featured publications -->
        <p v-else class="text-center text-gray-600 mb-8 text-body">
          View our recent publications and research outputs
        </p>
        
        <!-- View All Publications Link -->
        <div class="text-center mt-12">
          <a href="/publications" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors heading-small text-lg">
            View Recent Publications
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeaturedPublications from './FeaturedPublications.vue';

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
const props = defineProps<{
  featuredPublications?: Publication[]
}>();

// Use default empty array if not provided
const featuredPublications = props.featuredPublications || [];
</script>

<style scoped>
/* Typography is handled by global.css classes */
article {
  transition: all 0.3s ease;
}

article:hover {
  padding-left: 1.75rem;
}
</style>