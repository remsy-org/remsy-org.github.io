// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
  base: '/remsy-org.github.io/', // Replace with your repository name
});