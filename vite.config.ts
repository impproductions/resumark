import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import string from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(),
      dts(),
      string({
        include: '**/*.txt',
      }),
      svgr(),
    ],
    test: {
        environment: 'node',
    },
    css: {
        preprocessorOptions: {},
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
    },
});
