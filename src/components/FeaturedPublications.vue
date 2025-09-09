<template>
  <div class="grid gap-6 md:gap-8">
    <article v-for="pub in featuredPublications" :key="pub.url" 
             class="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
      <div class="space-y-3">
        <h3 class="text-xl font-semibold text-gray-900 heading-small">
          <a v-if="pub.url" :href="pub.url" target="_blank" rel="noopener noreferrer" 
             class="hover:text-blue-600 transition-colors">
            {{ pub.title }}
          </a>
          <span v-else>{{ pub.title }}</span>
        </h3>
        
        <p class="text-gray-700 text-body">
          {{ pub.authors }} ({{ pub.year }})
        </p>
        
        <p class="text-gray-600 italic text-body">
          {{ pub.journal }}<span v-if="pub.volume">, {{ pub.volume }}</span><span v-if="pub.pages">: {{ pub.pages }}</span>
        </p>
        
        <div v-if="pub.abstract" class="text-gray-600 text-sm line-clamp-3">
          {{ pub.abstract }}
        </div>
        
        <div class="flex flex-wrap gap-4 items-center">
          <a v-if="pub.url" :href="pub.url" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Article
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
          
          <span v-if="pub.openAccess" class="inline-flex items-center gap-1 text-green-600 text-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2h2V7a5 5 0 00-5-5z"/>
            </svg>
            Open Access
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  featuredPublications: Publication[]
}>();
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>