<template>
  <section id="publications" class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Recent Publications</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our latest contributions to marine remote sensing research
        </p>
      </div>
      
      <div class="space-y-6 max-w-4xl mx-auto">
        <div v-for="pub in publications" :key="pub.id" class="card p-6 hover:shadow-xl transition-shadow">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ pub.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ pub.authors }}</p>
              <p class="text-sm text-gray-500 mb-3">
                <span class="font-medium">{{ pub.journal }}</span> • {{ pub.year }} • {{ pub.volume }}
              </p>
              <div class="flex space-x-4">
                <a :href="pub.doi" target="_blank" class="text-blue-600 hover:underline text-sm">DOI</a>
                <a href="#" class="text-blue-600 hover:underline text-sm">PDF</a>
                <button class="text-blue-600 hover:underline text-sm">Cite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a href="#" class="btn-secondary">View All Publications</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const publications = [
  {
    id: 1,
    title: 'Machine Learning Approaches for Detecting Harmful Algal Blooms from Satellite Ocean Color Imagery',
    authors: 'Mitchell, S., Chen, J., Rodriguez, M., et al.',
    journal: 'Remote Sensing of Environment',
    year: '2024',
    volume: 'Vol. 298',
    doi: 'https://doi.org/10.1016/j.rse.2024.123456'
  },
  {
    id: 2,
    title: 'Quantifying Marine Heatwave Impacts on Coral Reef Ecosystems Using Multi-Sensor Satellite Data',
    authors: 'Chen, J., Thompson, L., Hassan, A.',
    journal: 'Nature Climate Change',
    year: '2024',
    volume: 'Vol. 14(3)',
    doi: 'https://doi.org/10.1038/s41558-024-01234'
  },
  {
    id: 3,
    title: 'A New Algorithm for Estimating Primary Productivity in Coastal Waters',
    authors: 'Rodriguez, M., Mitchell, S., Petrov, E.',
    journal: 'Journal of Geophysical Research: Oceans',
    year: '2023',
    volume: 'Vol. 128(12)',
    doi: 'https://doi.org/10.1029/2023JC019876'
  },
  {
    id: 4,
    title: 'Deep Learning for Automated Detection of Ocean Eddies in SAR Imagery',
    authors: 'Brown, M., Kim, R., Zhang, W.',
    journal: 'IEEE Transactions on Geoscience and Remote Sensing',
    year: '2023',
    volume: 'Vol. 61',
    doi: 'https://doi.org/10.1109/TGRS.2023.3234567'
  },
  {
    id: 5,
    title: 'Assessing Coastal Vulnerability to Sea Level Rise Using Integrated Remote Sensing Approaches',
    authors: 'Kim, R., Martinez, C., Park, D.',
    journal: 'Coastal Management',
    year: '2023',
    volume: 'Vol. 51(4)',
    doi: 'https://doi.org/10.1080/08920753.2023.2198765'
  }
];
</script>

<style scoped>
</style>