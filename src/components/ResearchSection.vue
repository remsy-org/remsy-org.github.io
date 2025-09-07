<template>
  <section id="research" class="py-20 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">Research Areas</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
          Our interdisciplinary approach combines satellite technology, oceanography, and data science to address critical marine challenges
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="area in researchAreas" :key="area.id" class="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
          <div class="relative h-48 overflow-hidden">
            <div :class="`absolute inset-0 bg-gradient-to-br ${area.gradient}`"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="area.icon" class="w-20 h-20 text-white opacity-80" />
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-3 heading-card">{{ area.title }}</h3>
            <p class="text-gray-600 mb-4 text-body">{{ area.description }}</p>
            <ul class="space-y-2">
              <li v-for="topic in area.topics" :key="topic" class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-700 text-body">{{ topic }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';

const WaveIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M17 8C17 8 15.5 10 12 10S7 8 7 8C4.5 8 2 10.5 2 13S4.5 18 7 18C7 18 8.5 16 12 16S17 18 17 18C19.5 18 22 15.5 22 13S19.5 8 17 8Z' })
    ]);
  }
};

const SatelliteIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M7 4v8l-4 4 4 4v-4h10v4l4-4-4-4V4l-5 3-5-3z' })
    ]);
  }
};

const ChartIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
    ]);
  }
};

const GlobeIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ]);
  }
};

const BeakerIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
    ]);
  }
};

const DatabaseIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' })
    ]);
  }
};

const researchAreas = [
  {
    id: 1,
    title: 'Ocean Color Remote Sensing',
    description: 'Monitoring phytoplankton dynamics and water quality using spectral analysis',
    gradient: 'from-blue-500 to-cyan-500',
    icon: WaveIcon,
    topics: [
      'Chlorophyll-a concentration mapping',
      'Harmful algal bloom detection',
      'Primary productivity estimation',
      'Coastal water quality assessment'
    ]
  },
  {
    id: 2,
    title: 'Sea Surface Temperature',
    description: 'Tracking thermal patterns and ocean-atmosphere heat exchange',
    gradient: 'from-orange-500 to-red-500',
    icon: SatelliteIcon,
    topics: [
      'Climate variability studies',
      'Upwelling detection',
      'Marine heatwave monitoring',
      'Fisheries management support'
    ]
  },
  {
    id: 3,
    title: 'Ocean Dynamics & Circulation',
    description: 'Understanding current systems and mesoscale features',
    gradient: 'from-purple-500 to-indigo-500',
    icon: ChartIcon,
    topics: [
      'Eddy detection and tracking',
      'Current velocity estimation',
      'Frontal zone identification',
      'Transport pathway analysis'
    ]
  },
  {
    id: 4,
    title: 'Coastal Zone Management',
    description: 'Monitoring coastal environments and human impacts',
    gradient: 'from-green-500 to-teal-500',
    icon: GlobeIcon,
    topics: [
      'Shoreline change detection',
      'Sediment transport mapping',
      'Mangrove/coral reef monitoring',
      'Maritime traffic analysis'
    ]
  },
  {
    id: 5,
    title: 'Bio-Optical Modeling',
    description: 'Developing algorithms for marine ecosystem parameters',
    gradient: 'from-pink-500 to-rose-500',
    icon: BeakerIcon,
    topics: [
      'Algorithm development',
      'Validation with in-situ data',
      'Machine learning applications',
      'Uncertainty quantification'
    ]
  },
  {
    id: 6,
    title: 'Big Data & AI Applications',
    description: 'Leveraging advanced computing for ocean insights',
    gradient: 'from-gray-600 to-gray-800',
    icon: DatabaseIcon,
    topics: [
      'Deep learning for pattern recognition',
      'Time series forecasting',
      'Data fusion techniques',
      'Cloud computing platforms'
    ]
  }
];
</script>

<style scoped>
/* Typography is handled by global.css classes */
</style>