<template>
  <section id="projects" class="py-20 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">Current Projects</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
          Ongoing research initiatives advancing marine remote sensing capabilities
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="project in projects" :key="project.id" class="card overflow-hidden group hover:shadow-xl transition-shadow">
          <div class="relative h-48 overflow-hidden">
            <div :class="`absolute inset-0 bg-gradient-to-br ${project.gradient}`"></div>
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <span class="inline-block px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-gray-800">
                {{ project.status }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2 heading-card">{{ project.title }}</h3>
            <p class="text-sm text-blue-600 mb-3 text-body">{{ project.funding }}</p>
            <p class="text-gray-600 mb-4 text-body">{{ project.description }}</p>
            
            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-500">Duration</span>
                <span class="text-sm font-medium text-gray-900">{{ project.duration }}</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-500">Principal Investigator</span>
                <span class="text-sm font-medium text-gray-900">{{ project.pi }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Budget</span>
                <span class="text-sm font-medium text-gray-900">{{ project.budget }}</span>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t">
              <p class="text-sm font-medium text-gray-700 mb-2 heading-small">Key Objectives:</p>
              <ul class="space-y-1">
                <li v-for="objective in project.objectives" :key="objective" class="text-sm text-gray-600 flex items-start">
                  <span class="text-blue-500 mr-2">•</span>
                  {{ objective }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: 'AI-Enhanced Detection of Marine Plastic Pollution',
    funding: 'National Science Foundation (NSF)',
    description: 'Developing deep learning algorithms to identify and track plastic debris in ocean surface waters using multi-spectral satellite imagery.',
    duration: '2023-2026',
    pi: 'Dr. Sarah Mitchell',
    budget: '$1.2M',
    status: 'Active',
    gradient: 'from-blue-600 to-purple-600',
    objectives: [
      'Develop CNN-based detection algorithms',
      'Validate with in-situ observations',
      'Create global plastic pollution maps'
    ]
  },
  {
    id: 2,
    title: 'Climate Impact on Coastal Ecosystem Dynamics',
    funding: 'NOAA Climate Program Office',
    description: 'Investigating how climate change affects coastal marine ecosystems through integrated satellite observations and modeling.',
    duration: '2022-2025',
    pi: 'Dr. James Chen',
    budget: '$850K',
    status: 'Active',
    gradient: 'from-green-600 to-teal-600',
    objectives: [
      'Monitor ecosystem response to warming',
      'Predict future ecosystem shifts',
      'Develop adaptation strategies'
    ]
  },
  {
    id: 3,
    title: 'Real-time HAB Monitoring System',
    funding: 'EPA Environmental Research',
    description: 'Creating an operational system for early detection and prediction of harmful algal blooms in coastal waters.',
    duration: '2023-2024',
    pi: 'Dr. Maria Rodriguez',
    budget: '$500K',
    status: 'Active',
    gradient: 'from-red-600 to-orange-600',
    objectives: [
      'Implement real-time data processing',
      'Develop predictive models',
      'Create public warning system'
    ]
  },
  {
    id: 4,
    title: 'Arctic Ocean Monitoring Initiative',
    funding: 'NASA Earth Science Division',
    description: 'Monitoring Arctic sea ice dynamics and ocean-atmosphere interactions using next-generation satellite sensors.',
    duration: '2024-2027',
    pi: 'Dr. Ahmed Hassan',
    budget: '$2.3M',
    status: 'Starting Soon',
    gradient: 'from-cyan-600 to-blue-600',
    objectives: [
      'Track sea ice extent changes',
      'Analyze heat flux patterns',
      'Model future Arctic conditions'
    ]
  }
];
</script>

<style scoped>
/* Typography is handled by global.css classes */
</style>