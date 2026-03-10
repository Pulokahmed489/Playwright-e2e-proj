const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test.describe('faker test suite', (async) => {
  test('register user with synthetic data', async ({ page }) => {
    // SYNTHETIC: Generated automatically
    const user = {
      firstName: faker.person.firstName(), // Random each time
      lastName: faker.person.lastName(), // Random each time
      email: faker.internet.email(), // Random each time
      birthDate: faker.date.birthdate(), // Random each time
    };

    console.log(`Testing with: ${user.firstName} ${user.lastName}`);
    // First run: "Testing with: Emma Smith"
    // Second run: "Testing with: James Johnson"
    // Third run: "Testing with: Sofia Williams"
  });

  // VS Test Data approach:
  test('register with test data ', async ({ page }) => {
    // TEST DATA: Hard-coded, always the same
    const user = {
      firstName: 'John', // Always John
      lastName: 'Doe', // Always Doe
      email: 'john@test.com', // Always same email
      birthDate: '1990-01-01', // Always same date
    };

    // Every test run uses the SAME John Doe
  });
});
