import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storybookPort = Number(process.env.STORYBOOK_PORT ?? 6006);
const storybookUrl = process.env.STORYBOOK_URL ?? `http://127.0.0.1:${storybookPort}`;
const storybookStaticDir = path.resolve(__dirname, 'storybook-static');

export default defineConfig({
  testDir: path.resolve(__dirname, 'tests/visual'),
  outputDir: path.resolve(__dirname, 'tests/output'),
  snapshotDir: path.resolve(__dirname, 'tests/visual/__screenshots__'),
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: storybookUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone 13 Pro'] },
    },
  ],
  webServer: {
    command: `npx http-server "${storybookStaticDir}" --port ${storybookPort} --silent`,
    url: storybookUrl,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

