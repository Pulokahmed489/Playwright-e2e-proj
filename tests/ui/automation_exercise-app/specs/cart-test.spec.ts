import { test } from '../../../../fixtures/uiFixtures'

test('navigate to cart', async ({ cartPage }) => {

  //const cartPage = new CartPage(page);

  await cartPage.navigate();
  await cartPage.clickOnCart();

});