import { test as base } from '@playwright/test';
import CartPage from '../tests/ui/automation_exercise-app/pages/cart';

type MyFixtures = {
  cartPage: CartPage;
};

export const test = base.extend<MyFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';