import { test } from '@playwright/test';
import AccountPage from '../pages/account';
import LoginPage from '../pages/login';
import users from '../test-data/users.json';
import { UserData } from '../types/user';

const userData = users as UserData;

test.describe('@smoke @regression - AutomationExercise Account Tests', () => {
  test('User should be able to create account', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.navigate();
    await accountPage.openSignupLogin();
    await accountPage.signup(
      userData.validUser.name,
      userData.validUser.email
    );
    await accountPage.fillAccountInformation(
      userData.validUser.password
    );
    await accountPage.fillAddressDetails();
    await accountPage.createAccount();
    await accountPage.deleteAccount();
  });

  test('User login and delete account', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await accountPage.openSignupLogin();
    await accountPage.signup(
      userData.validUser.name,
      userData.validUser.email
    );
    await accountPage.fillAccountInformation(
      userData.validUser.password
    );
    await accountPage.fillAddressDetails();
    await accountPage.createAccount();

    await loginPage.logout();
    await loginPage.login(
      userData.validUser.email,
      userData.validUser.password,
      'positive'
    );
    await loginPage.deleteAccount();
  });

  test('Login with incorrect email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      userData.invalidUser.email,
      userData.invalidUser.password,
      'negative'
    );
  });
});
