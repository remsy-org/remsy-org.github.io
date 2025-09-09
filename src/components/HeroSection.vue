<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700"></div>
      <div class="absolute inset-0 topographic-pattern opacity-20"></div>
      <div class="ocean-wave"></div>
    </div>
    
    <div class="container-custom relative z-10 text-center text-white py-20">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in heading-hero">
        Remote Sensing of Marine Systems
        <span class="block text-3xl md:text-4xl mt-4 text-subtitle" style="text-transform: none;">Yoav Lehahn's group</span>
      </h1>
      
      <p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 animate-slide-up text-subtitle">
        A bird's eye view on processes and patterns in the marine environment
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <svg class="w-12 h-12 mb-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2 heading-card">Satellite Monitoring</h3>
          <p class="text-sm opacity-80 text-body">Real-time ocean observation using advanced satellite imagery and sensors</p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <svg class="w-12 h-12 mb-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2 heading-card">Data Analytics</h3>
          <p class="text-sm opacity-80 text-body">Machine learning and AI for ocean pattern recognition and prediction</p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <svg class="w-12 h-12 mb-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2 heading-card">Climate Impact</h3>
          <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Ocean_Beach.jpg'/>
          <p class="text-sm opacity-80 text-body">Understanding ocean-atmosphere interactions and climate change effects</p>
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out 0.3s both;
}

.animate-slide-up-delay {
  animation: slide-up 1s ease-out 0.6s both;
}

.ocean-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}
</style>
