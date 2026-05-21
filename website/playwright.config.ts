import {defineConfig, devices} from '@playwright/test';

const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}/runbook-agent/`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
      testIgnore: [/reduced-motion\.spec\.ts/],
    },
    {
      name: 'mobile-chromium',
      use: {...devices['Pixel 5']},
      testMatch: [/homepage\.spec\.ts/, /navigation\.spec\.ts/, /responsive\.spec\.ts/],
    },
    {
      name: 'reduced-motion',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {reducedMotion: 'reduce'},
      },
      testMatch: [/reduced-motion\.spec\.ts/],
    },
  ],
  webServer: {
    command: `npm run build && npm run serve -- --host 127.0.0.1 --port ${PORT}`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
