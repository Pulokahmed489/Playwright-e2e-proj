import { expect, Page, Locator } from "@playwright/test";

export default class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly emptyCart: Locator;
    //readonly closeAd: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.emptyCart = page.getByRole('link', { name: 'here' });
        //this.closeAd = page.getByRole('button', { name: 'Close ad' });
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
        if (await this.emptyCart.isVisible({ timeout: 5000 })) {
            await this.emptyCart.scrollIntoViewIfNeeded();
            await this.emptyCart.click();
               // Close ad only if exists
        const closeAd = this.page.frameLocator('iframe').getByRole('button', { name: 'Close ad' });

        if (await closeAd.isVisible().catch(() => false)) {
            await closeAd.click();
        }
            await expect(this.page).toHaveURL(/products/);
        }
    }
}
