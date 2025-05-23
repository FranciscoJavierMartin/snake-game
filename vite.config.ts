import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/snake-game',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
