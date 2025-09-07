<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img src="/images/logo-icon.svg" alt="Marine Sensing Lab Logo" class="w-10 h-10 brightness-0 invert opacity-80">
            <div>
              <h3 class="text-xl font-bold heading-subsection">Marine Remote Sensing Lab</h3>
              <p class="text-sm text-gray-400 text-body">Advancing Ocean Science</p>
            </div>
          </div>
          <p class="text-gray-400 mb-4 text-body">
            Dedicated to understanding and protecting our oceans through cutting-edge remote sensing technology and interdisciplinary research.
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4 heading-small">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#research" class="text-gray-400 hover:text-cyan-400 transition-colors">Research Areas</a></li>
            <li><a href="#team" class="text-gray-400 hover:text-cyan-400 transition-colors">Our Team</a></li>
            <li><a href="#publications" class="text-gray-400 hover:text-cyan-400 transition-colors">Publications</a></li>
            <li><a href="#projects" class="text-gray-400 hover:text-cyan-400 transition-colors">Projects</a></li>
            <li><a href="#contact" class="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4 heading-small">Resources</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Data Portal</a></li>
            <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Software Tools</a></li>
            <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
            <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Training Materials</a></li>
            <li><a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors">Collaborations</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400 mb-4 md:mb-0 text-body">
          © {{ currentYear }} Marine Remote Sensing Laboratory. All rights reserved.
        </p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms of Use</a>
          <a href="#" class="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Typography is handled by global.css classes */
</style>