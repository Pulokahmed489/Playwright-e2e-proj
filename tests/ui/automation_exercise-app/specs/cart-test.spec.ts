import { test } from '../../../../fixtures/uiFixtures'

test('navigate to cart', async ({ cartPage, loginPage, productPage }) => {

  //const cartPage = new CartPage(page);

  await loginPage.login
  await cartPage.navigate();
  await cartPage.clickOnCart();

});