import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
});
