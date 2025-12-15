import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This is critical for GitHub Pages to load assets correctly from a subdirectory
  build: {
    outDir: 'dist',
  },
});