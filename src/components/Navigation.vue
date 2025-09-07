<template>
  <nav class="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
    <div class="container-custom">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-3">
            <img src="/images/logo-icon.svg" alt="Marine Sensing Lab Logo" class="w-10 h-10">
            <div>
              <h1 class="text-xl font-bold text-gray-900 nav-brand">Marine Sensing Lab</h1>
              <p class="text-xs text-gray-600 nav-brand" style="font-weight: 400; text-transform: uppercase;">Remote Sensing Research</p>
            </div>
          </a>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="nav-link">Home</a>
          <a href="/#research" class="nav-link">Research</a>
          <a href="/team" class="nav-link">Team</a>
          <div class="relative group">
            <button class="nav-link flex items-center">
              About
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/about/mission" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mission</a>
              <a href="/facilities" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Facilities</a>
            </div>
          </div>
          <a href="/resources/data-portal" class="nav-link">Data Portal</a>
          <a href="/news/latest-research" class="nav-link">News</a>
          <a href="/#contact" class="nav-link">Contact</a>
        </div>
        
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-4">
          <a href="/" @click="closeMobileMenu" class="nav-link-mobile">Home</a>
          <a href="/#research" @click="closeMobileMenu" class="nav-link-mobile">Research</a>
          <a href="/team" @click="closeMobileMenu" class="nav-link-mobile">Team</a>
          <div class="px-2">
            <div class="font-medium text-gray-700 mb-2">About</div>
            <div class="pl-4 space-y-2">
              <a href="/about/mission" @click="closeMobileMenu" class="block text-gray-600">Mission</a>
              <a href="/facilities" @click="closeMobileMenu" class="block text-gray-600">Facilities</a>
            </div>
          </div>
          <a href="/resources/data-portal" @click="closeMobileMenu" class="nav-link-mobile">Data Portal</a>
          <a href="/news/latest-research" @click="closeMobileMenu" class="nav-link-mobile">News</a>
          <a href="/#contact" @click="closeMobileMenu" class="nav-link-mobile">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

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
</style>