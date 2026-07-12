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
  });

  test('navbar has no Webinars, Cohorts, or Join Platform', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header >> text=Webinars')).toHaveCount(0);
    await expect(page.locator('header >> text=Cohorts')).toHaveCount(0);
    await expect(page.locator('header >> text=Join Platform')).toHaveCount(0);
  });

  test('navbar has no Privacy or Terms links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.locator('text=Privacy')).toHaveCount(0);
    await expect(nav.locator('text=Terms')).toHaveCount(0);
  });

  test('navbar has no Get Started button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header >> text=Get Started')).toHaveCount(0);
  });

  test('Sign In navigates to signup page', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign In")').click();
    await expect(page).toHaveURL(/\/signup/);
    await expect(page.locator('text=Create your account')).toBeVisible();
  });

  test('signup page has email and password fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('signup page has Google and GitHub buttons', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('text=Continue with Google')).toBeVisible();
    await expect(page.locator('text=Continue with GitHub')).toBeVisible();
  });

  test('signup page can toggle sign up / sign in', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('text=Create your account')).toBeVisible();
    await page.locator('text=Sign In').last().click();
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('signup page has back to home link', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('text=Back to home').click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('footer has no Monetize column', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer >> text=Monetize')).toHaveCount(0);
    await expect(page.locator('footer >> text=1:1 Sessions')).toHaveCount(0);
  });

  test('footer has no LeapSkills brand logo or name', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer >> text=LeapSkills')).toHaveCount(0);
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
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.getByRole('heading', { name: 'Terms & Conditions' })).toBeVisible();
  });

  test('navbar nav links navigate correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header nav button:has-text("Explore")').click();
    await expect(page).toHaveURL(/\/explore/);

    await page.locator('header nav button:has-text("Home")').click();
    await expect(page).toHaveURL(/\/$/);
  });
});
