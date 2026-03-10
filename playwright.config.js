import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  expect: {
    timeout: 5000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],

  use: {
    viewport: null,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Chromium-AutomationExercise',
      testMatch: '**/ui/automation_exercise-app/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        baseURL: 'https://automationexercise.com',
      },
    },
    {
      name: 'Chromium-HerokuApp',
      testMatch: '**/ui/heroku-app/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        baseURL: 'https://the-internet.herokuapp.com',
      },
    },
    {
      name: 'Chromium-PlaywrightApp',
      testMatch: '**/ui/playwright_test_page/**/*.spec.js',
      use: {
        browserName: 'chromium',
        baseURL: 'https://robinhood.com/',
      },
    },
  ],
});
