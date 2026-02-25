import { test } from '@playwright/test';

//test.describe.configure({ mode: 'parallel' });

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  console.log('--- Before All Hook: Browser page opened ---');
});

test.afterAll(async () => {
  await page.close();
  console.log('--- After All Hook: Browser page closed ---');
});

test.beforeEach(async () => {
  console.log('--- Before Each Hook: Test is starting ---');
});

test.afterEach(async () => {
  console.log('--- After Each Hook: Test is ending ---');
});

test.skip('runs first', async ({ browser }) => {
  //const page = await browser.newPage();
  await page.goto('https://the-internet.herokuapp.com/');
  //await page.goto('https://playwright.dev/');
  console.log('test 1 executed');
});

test.skip('runs second', async ({ page }) => {
  //await page.getByText('Get Started').click();
  console.log('test 2 executed');
});

// Below tests are just examples of how to handle multiple tabs and contexts in Playwright.
//  They are not related to the signup/login functionality.
test.skip('two tabs with delay', async () => {
  const browser1 = await chromium.launch();
  const context1 = await browser1.newContext();
  const tab1 = await context1.newPage();
  const browserName = browser1.browserType().name();
  await tab1.goto('https://google.com');

  // Correct: Use waitForTimeout instead of thread.sleep
  await tab1.waitForTimeout(3000); // 5 seconds delay

  const browser = await firefox.launch();
  const context = await browser.newContext();
  const tab2 = await context.newPage();
  const browserName1 = browser.browserType().name();
  await tab2.goto('https://github.com');
  await tab2.waitForTimeout(3000); // 3 seconds delay

  console.log(browserName, 'Test completed');
  console.log(browserName1, 'Test completed');
});

test.skip('Two users', async ({ browser }) => {
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  const userPage = await userContext.newPage();
  // await adminPage.waitForTimeout(5000); // 2 seconds delay
  // await userPage.waitForTimeout(5000); // 2 seconds delay

  await page.goto('/login');
  await adminPage.goto('/login');
  await userPage.goto('/login');

  console.log(test.info().duration, 'Admin and User logged in');
});

test.skip('Metadata demo', async ({ page }, testInfo) => {
  console.log('Title:', testInfo.title);
  console.log('File:', testInfo.file);
  console.log('Browser:', testInfo.project.name);
  console.log('Retry:', testInfo.retry);
});

// Run all the tests in the file concurrently using parallel workers.
test.describe.configure({ mode: 'parallel' });
test.skip('runs in parallel 1', async ({ page }) => {
  await page.waitForTimeout(5000); // 5 seconds delay
});
test.skip('runs in parallel 2', async ({ page }) => {
  await page.waitForTimeout(5000); // 5 seconds delay
});
