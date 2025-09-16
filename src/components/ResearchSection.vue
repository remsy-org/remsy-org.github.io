<template>
  <section id="research" class="py-20 bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 heading-section">Research</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto text-body">
          We integrate in-situ data with remote-sensing observations from satellites, 
          airplanes and drones to characterize variability patterns and motions over multiple spatial and temporal scales,
          providing observational insights into various aspects of marine research. 
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

const JellyfishIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M12 2C8 2 5 5 5 9c0 1.5.5 2.8 1.3 3.9L6 16c-.1.6.2 1.1.7 1.4l1.5 2.8c.2.4.6.8 1.1.8s.9-.4 1.1-.8l.6-1.2.6 1.2c.2.4.6.8 1.1.8s.9-.4 1.1-.8l.6-1.2.6 1.2c.2.4.6.8 1.1.8s.9-.4 1.1-.8l1.5-2.8c.5-.3.8-.8.7-1.4l-.3-3.1C18.5 11.8 19 10.5 19 9c0-4-3-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm-2 3c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm4 0c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z' })
    ]);
  }
};

const PhytoplanktonIcon = {
  render() {
    return h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      // Central cell
      h('circle', { cx: '12', cy: '12', r: '3', fill: 'currentColor', opacity: '0.8' }),
      // Radiating flagella/appendages
      h('path', { d: 'M12 5v4M12 15v4M19 12h-4M9 12H5', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
      // Diagonal appendages
      h('path', { d: 'M16.5 7.5L14 10M10 14l-2.5 2.5M16.5 16.5L14 14M10 10L7.5 7.5', stroke: 'currentColor', strokeWidth: '1.5', fill: 'none' }),
      // Small circular organelles
      h('circle', { cx: '8', cy: '8', r: '1.5', fill: 'currentColor', opacity: '0.6' }),
      h('circle', { cx: '16', cy: '8', r: '1.5', fill: 'currentColor', opacity: '0.6' }),
      h('circle', { cx: '8', cy: '16', r: '1.5', fill: 'currentColor', opacity: '0.6' }),
      h('circle', { cx: '16', cy: '16', r: '1.5', fill: 'currentColor', opacity: '0.6' })
    ]);
  }
};

const LakeKinneretIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '2', viewBox: '0 0 24 24' }, [
      // Map pin with water wave
      h('path', { 
        d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      h('path', { 
        d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ]);
  }
};

const SeaSurfaceLayerIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', viewBox: '0 0 24 24' }, [
      // Water surface with microlayer
      h('path', { 
        d: 'M3 8C4.5 7 5.5 7 7 8S9.5 9 11 8S13.5 7 15 8S17.5 9 19 8S20.5 7 22 8',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }),
      // Thin microlayer line above surface
      h('path', { 
        d: 'M3 6C4.5 5.5 5.5 5.5 7 6S9.5 6.5 11 6S13.5 5.5 15 6S17.5 6.5 19 6S20.5 5.5 22 6',
        strokeWidth: '2',
        opacity: '0.8',
        strokeLinecap: 'round'
      }),
      // Subsurface water
      h('path', { 
        d: 'M3 11C4.5 10 5.5 10 7 11S9.5 12 11 11S13.5 10 15 11S17.5 12 19 11S20.5 10 22 11',
        opacity: '0.4',
        strokeLinecap: 'round'
      }),
      h('path', { 
        d: 'M3 14C4.5 13 5.5 13 7 14S9.5 15 11 14S13.5 13 15 14S17.5 15 19 14S20.5 13 22 14',
        opacity: '0.3',
        strokeLinecap: 'round'
      }),
      // Particles/molecules in microlayer
      h('circle', { cx: '6', cy: '5.5', r: '0.5', fill: 'currentColor' }),
      h('circle', { cx: '10', cy: '5.8', r: '0.5', fill: 'currentColor' }),
      h('circle', { cx: '14', cy: '5.3', r: '0.5', fill: 'currentColor' }),
      h('circle', { cx: '18', cy: '5.7', r: '0.5', fill: 'currentColor' }),
      // Air-sea interface indication
      h('path', { 
        d: 'M8 4L8 3M12 4L12 3M16 4L16 3',
        strokeWidth: '1',
        opacity: '0.5',
        strokeLinecap: 'round'
      })
    ]);
  }
};

const OceanCirculationIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', viewBox: '0 0 24 24' }, [
      // Large gyre
      h('path', { 
        d: 'M12 3C7 3 3 7 3 12C3 14 3.5 15.5 4.5 16.5L6 15C5.5 14 5 13 5 12C5 8 8 5 12 5C16 5 19 8 19 12C19 16 16 19 12 19C11 19 10 18.5 9 18L7.5 19.5C8.5 20.5 10 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z',
        fill: 'none'
      }),
      // Small eddies
      h('circle', { cx: '9', cy: '9', r: '2', fill: 'none' }),
      h('circle', { cx: '15', cy: '15', r: '2', fill: 'none' }),
      // Current arrows
      h('path', { d: 'M7 12L5 10M7 12L5 14', strokeLinecap: 'round' }),
      h('path', { d: 'M17 12L19 10M17 12L19 14', strokeLinecap: 'round' })
    ]);
  }
};

const researchAreas = [
  {
    id: 1,
    title: 'Plankton biogeography and spatial patterning',
    description: '',
    gradient: 'from-blue-500 to-cyan-500',
    icon: PhytoplanktonIcon,
    topics: [
      "Global patterns of plankton patchiness",
      "Lagrangian study of phytoplankton patch dynamics",
      "Physical and biological controls on plankton organization"
    ]
  },
  {
    id: 2,
    title: 'Dynamics of jellyfish swarms',
    description: '',
    gradient: 'from-orange-500 to-red-500',
    icon: JellyfishIcon,
    topics: [
      "Characterization of swimming patterns",
      "Impact of swimming on movement",
      "Spatiotemporal distribution patterns"
    ]
  },
  {
    id: 3,
    title: 'Circulation, biogeochemistry, and ecology of the Eastern Mediterranean Sea (EMS)',
    description: '',
    gradient: 'from-purple-500 to-indigo-500',
    icon: OceanCirculationIcon,
    topics: [
      "Connectivity between coastal and pelagic waters",
      "Ecological impact of submesoscale horizontal stirring",
      "Quantification of variability patterns across space (meters to hundreds of km) and time (days to decades)"
    ]
  },
  {
    id: 4,
    title: 'Data-driven ocean research',
    description: '',
    gradient: 'from-green-500 to-teal-500',
    icon: DatabaseIcon,
    topics: [
      "Automatization of the ocean data integration process",
      "Identification of emerging patterns in multidisciplinary oceanic datasets",
    ]
  },
  {
    id: 5,
    title: 'The sea surface microlayer (SML): from dynamics to variability patterns ',
    description: '',
    gradient: 'from-pink-500 to-rose-500',
    icon: SeaSurfaceLayerIcon,
    topics: [
      "Impact of ocean circulation on SML physicochemical properties",
      "Development and implementation of remote sensing approaches",
      "Quantification of spatiotemporal variability patterns"
    ]
  },
  {
    id: 6,
    title: "Ecology of Israel's inland water bodies",
    description: '',
    gradient: 'from-gray-600 to-gray-800',
    icon: LakeKinneretIcon,
    topics: [
      "Data-driven research of Lake Kinneret ecosystem",
      "Ecosystem sensitivity to changes in weather condition",
      "Satellite remote sensing of reservoir water quality"
    ]
  }
];
</script>

<style scoped>
/* Typography is handled by global.css classes */
</style>