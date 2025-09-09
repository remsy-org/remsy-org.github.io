<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img src="/images/logo-icon.svg" alt="Marine Sensing Lab Logo" class="w-10 h-10 brightness-0 invert opacity-80">
            <div>
              <h3 class="text-xl font-bold heading-subsection">Remote Sensing of Marine Systems</h3>
              <p class="text-sm text-gray-400 text-body">Yoav Lehahn's research group</p>
            </div>
          </div>
          <p class="text-gray-400 mb-4 text-body">
          </p>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400 mb-4 md:mb-0 text-body">
          © {{ currentYear }} Remote Sensing of Marine Systems. All rights reserved.
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