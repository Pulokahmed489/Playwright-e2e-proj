import { test as base } from '@playwright/test';
import CartPage from '../tests/ui/automation_exercise-app/pages/cart';
import LoginPage from '../tests/ui/automation_exercise-app/pages/login';
import ProductPage from '../tests/ui/automation_exercise-app/pages/products';


type MyFixtures = {
  cartPage: CartPage;
  loginPage: LoginPage;
  productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({page}, use) => {
    await use(new ProductPage(page));  
  } 
 
});


