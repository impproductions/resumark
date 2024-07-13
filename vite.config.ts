import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import string from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), string({
      include: '**/*.txt',
    })],
  css: {
    preprocessorOptions: {},
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    }
  }
})
