import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  outputDir: 'artifacts',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: 'cd app/api && pnpm dev',
      cwd: '..',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'cd app/web && pnpm dev',
      cwd: '..',
      port: 5173,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
});
