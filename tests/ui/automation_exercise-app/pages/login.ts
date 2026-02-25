import { expect, Page, Locator } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;

  // Locators
  readonly signupLoginLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedInText: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedText: Locator;
  readonly incorrectPass: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.emailInput = page.getByPlaceholder('Email Address').first();
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loggedInText = page.getByText('Logged in as');
    this.logoutButton = page.getByText('Logout');
    this.deleteAccountLink = page.getByText('Delete Account');
    this.accountDeletedText = page.getByText('Account Deleted!');
    this.incorrectPass = page.getByText(
      'Your email or password is incorrect!',
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async login(
    email: string,
    password: string,
    scenario: 'positive' | 'negative'
  ): Promise<void> {
    await this.signupLoginLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    if (scenario === 'negative') {
      await expect(this.incorrectPass).toBeVisible();
    } else {
      await expect(this.loggedInText).toBeVisible();
    }
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await expect(this.accountDeletedText).toBeVisible();
  }
}
