<template>
  <section id="publications" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">Recent Publications</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
          Our latest contributions to marine remote sensing research
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <p class="text-center text-gray-600 mb-8 text-body">
          View our recent publications and research outputs
        </p>
        
        <!-- View All Publications Link -->
        <div class="text-center">
          <a href="/publications" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors heading-small text-lg">
            View All Publications
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
// Publications are now managed through markdown files in /src/pages/publications/
// This component serves as a simple gateway to the full publications page
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