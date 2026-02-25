import { expect, Page, Locator } from "@playwright/test";

export default class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly emptyCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.emptyCart = page.getByRole('link', { name: 'here' });
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

    async clickOnCart(): Promise<void> {
        await this.cartLink!.click();

        // Wait for cart page to load
        await expect(this.page).toHaveURL(/view_cart/);

        // Click "here" only if visible (cart empty scenario)
        if (await this.emptyCart.isVisible()) {
            await this.emptyCart.click();
            await expect(this.page).toHaveURL(/products/);
        }
    }
}
