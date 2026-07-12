import { test, expect } from '@playwright/test';

test.describe('LeapSkills App', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Leap Skills/);
    await expect(page.locator('text=Your All-in-One')).toBeVisible();
  });

  test('navbar has correct links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.locator('text=Home')).toBeVisible();
    await expect(nav.locator('text=Explore')).toBeVisible();
    await expect(nav.locator('text=Privacy')).toBeVisible();
    await expect(nav.locator('text=Terms')).toBeVisible();
  });

  test('navbar has no Webinars or Cohorts', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header >> text=Webinars')).toHaveCount(0);
    await expect(page.locator('header >> text=Cohorts')).toHaveCount(0);
  });

  test('navbar has no Join Platform button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header >> text=Join Platform')).toHaveCount(0);
  });

  test('Sign In button opens auth modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign In")').click();
    await expect(page.locator('text=Create your account')).toBeVisible();
    await expect(page.locator('text=Continue with Google')).toBeVisible();
    await expect(page.locator('text=Continue with GitHub')).toBeVisible();
  });

  test('auth modal has email and password fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign In")').click();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('auth modal can toggle sign up / sign in', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign In")').click();
    await expect(page.locator('text=Create your account')).toBeVisible();
    await page.locator('text=Sign In').last().click();
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('auth modal closes on backdrop click', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign In")').click();
    await expect(page.locator('text=Create your account')).toBeVisible();
    await page.locator('.fixed.inset-0 > div').first().click({ position: { x: 10, y: 10 } });
    await expect(page.locator('text=Create your account')).not.toBeVisible();
  });

  test('footer links navigate correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer a:has-text("Privacy Policy")').first().click();
    await expect(page).toHaveURL(/\/privacy/);
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();

    await page.locator('footer a:has-text("Terms & Conditions")').first().click();
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.getByRole('heading', { name: 'Terms & Conditions' })).toBeVisible();
  });

  test('explore page loads', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByRole('heading', { name: 'Discover Professional Mentors' })).toBeVisible();
  });

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
  });

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('h1:has-text("Terms & Conditions")')).toBeVisible();
  });

  test('Get Started button opens auth modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Get Started")').click();
    await expect(page.locator('text=Create your account')).toBeVisible();
  });

  test('navbar nav links navigate correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav button:has-text("Explore")').click();
    await expect(page).toHaveURL(/\/explore/);

    await page.locator('header nav button:has-text("Home")').click();
    await expect(page).toHaveURL(/\/$/);
  });
});
