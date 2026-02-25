import { expect, Page, Locator } from '@playwright/test';

export default class AccountPage {
  readonly page: Page;

  // Locators
  readonly signupLoginLink: Locator;
  readonly newUserHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  readonly genderRadio: Locator;
  readonly passwordInput: Locator;

  readonly daysDropdown: Locator;
  readonly monthsDropdown: Locator;
  readonly yearsDropdown: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobile: Locator;

  readonly createAccountBtn: Locator;
  readonly continueLink: Locator;

  readonly deleteAccountBtn: Locator;
  readonly continuebtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.newUserHeading = page.getByRole('heading', {
      name: 'New User Signup!',
    });
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.getByPlaceholder('Email Address').nth(1);
    this.signupButton = page.getByRole('button', { name: 'Signup' });

    this.genderRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');

    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');

    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobile = page.locator('#mobile_number');

    this.createAccountBtn = page.getByText('Create Account');
    this.continueLink = page.getByRole('link', { name: 'Continue' });

    this.deleteAccountBtn = page.locator('text="Delete Account"');
    this.continuebtn = page.locator('text="Continue"');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('Automation Exercise');
  }

  async openSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
    await expect(this.newUserHeading).toBeVisible();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
    await expect(
      this.page.getByText('Enter Account Information'),
    ).toBeVisible();
  }

  async fillAccountInformation(password: string): Promise<void> {
    await this.genderRadio.click();
    await this.passwordInput.fill(password);

    await this.daysDropdown.selectOption('1');
    await this.monthsDropdown.selectOption('5');
    await this.yearsDropdown.selectOption('1990');
  }

  async fillAddressDetails(): Promise<void> {
    await this.firstName.fill('lakhan');
    await this.lastName.fill('mia');
    await this.company.fill('lakhan_company');
    await this.address.fill('address');
    await this.country.selectOption('United States');
    await this.state.fill('california');
    await this.city.fill('san francisco');
    await this.zipcode.fill('94107');
    await this.mobile.fill('1234567890');
  }

  async createAccount(): Promise<void> {
    await this.createAccountBtn.click();
    await expect(this.page).toHaveTitle(
      'Automation Exercise - Account Created',
    );
    await this.continueLink.click();
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountBtn.click();
    await this.continuebtn.click();
  }
}
