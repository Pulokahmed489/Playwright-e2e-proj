import { test, expect, Browser } from '@playwright/test';

// Set viewport globally for this test file
test.use({ viewport: { width: 1200, height: 1200 } });

test.describe('verify heroku app', () => {

  test('should add and remove elements correctly', async ({
    page,
    baseURL,
  }) => {

    const endpoint: string = '/add_remove_elements/';
    await page.goto(`${baseURL}${endpoint}`, { waitUntil: 'domcontentloaded' });

    const addButton = page.locator("button:has-text('Add Element')");
    await addButton.click();

    const deleteButton = page.locator("button:has-text('Delete')");
    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(addButton).toBeVisible();
  });


  test('basic auth login', async ({
    browser,
    baseURL,
  }: {
    browser: Browser;
    baseURL: string | undefined;
  }) => {

    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      },
    });

    const page = await context.newPage();
    await page.goto(`${baseURL}/basic_auth`);

    await expect(page.locator('h3')).toContainText('Basic Auth');
    await expect(page.locator('p')).toHaveText(
      'Congratulations! You must have the proper credentials.'
    );

    await context.close();
  });


  test('should have no broken images', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count: number = await images.count();

    const brokenImages: string[] = [];

    for (let i = 0; i < count; i++) {
      const isBroken: boolean = await images
        .nth(i)
        .evaluate((img: HTMLImageElement) => img.naturalWidth === 0);

      if (isBroken) {
        const src = await images.nth(i).getAttribute('src');
        brokenImages.push(src ?? `image #${i + 1}`);
      }
    }

    expect(brokenImages).toEqual([]);
  });

});



















// Select "LAX - Los Angeles International" from the airport dropdown
// const dropdown = page.locator('id=airport-select')
// await dropdown.click()

// // const selectAirport = await page.locator("//option[@value='JFK']")
// const option = await page.$('#select option[value="LAX"]');
// await page.selectOption('#select', option);
// await page.screenshot({path: 'airport.png'});

/**
 * TODO: Implement the following test steps:
 *
 * 1. Navigate to the Airport Services page
 * 2. Wait for the page to be fully loaded
 * 3. Select "LAX - Los Angeles International" from the airport dropdown
 * 4. Select "Priority Boarding" from the service type dropdown
 * 5. Click the "Check Availability" button
 * 6. Wait for the results section to become visible
 * 7. Assert that the results contain the text "Available" or specific service names
 * 8. Take a screenshot saved as 'results.png'
 *
 * Hints:
 * - Use page.selectOption() to select dropdown options
 * - Use page.waitForSelector() to wait for elements
 * - Use page.screenshot() to capture screenshots
 * - The base URL is already configured in playwright.config.js
 */
