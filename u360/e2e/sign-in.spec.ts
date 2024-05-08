import { test, expect } from '@playwright/test';

test('Sign in successful', async ({ page }) => {
  await page.goto('localhost:4200/sign-in');

  await expect(page).toHaveTitle(/Sign in/);
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin');
  await page.click('#sign-in-button');
  await page.waitForURL('**/home');
  await expect(page).toHaveTitle(/Home/);
});

test('Sign in unsuccessful', async ({ page }) => {
  await page.goto('localhost:4200/sign-in');

  await expect(page).toHaveTitle(/Sign in/);
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  await page.fill('#username', 'admin');
  await page.fill('#password', '123456');
  await page.click('#sign-in-button');
  await page.locator('#error-message').waitFor();
  await expect(page.locator('#error-message')).toHaveText('Invalid username or password.');
});
