import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: [
      'tests/visual/**',
      'tests/output/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        'node_modules/',
        'storybook-static/',
        'dist/',
        '**/*.stories.*',
        '**/stories/**',
        'src/main.tsx',
        'src/App.tsx',
      ],
    },
  },
});

