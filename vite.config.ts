import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/HolozingDecCompare/', // Matches the repository name in the URL
  build: {
    outDir: 'dist',
  },
});