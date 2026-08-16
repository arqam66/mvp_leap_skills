import { test, expect } from '@playwright/test';

test.describe('LeapSkills App', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Leap Skills/);
    await expect(page.locator('text=Monetize your expertise')).toBeVisible();
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

  test('Sign Up navigates to login page', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign Up")').click();
    await page.waitForURL(/\/login/, { timeout: 30000 });
    await expect(page.getByRole('heading', { name: 'Create your Leap Skills Account' })).toBeVisible();
  });

  test('signup form has email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('signup form has Google and GitHub buttons', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: /Sign in with Google/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign in with GitHub/ })).toBeVisible();
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
    await page.waitForURL(/\/privacy/, { timeout: 30000 });
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();

    await page.locator('footer a:has-text("Terms & Conditions")').first().click();
    await page.waitForURL(/\/terms/, { timeout: 30000 });
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

  test('login page has no brand logo', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Create your Leap Skills Account' })).toBeVisible();
    await expect(page.locator('text=⚡')).toHaveCount(0);
  });

  test('loading screen is premium and has no logo', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.locator('text=LOADING')).toBeVisible();
    await expect(page.locator('text=EXPERIENCE')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Leap Skills' })).toBeVisible();
    await expect(page.locator('.spin-slow')).toBeVisible();
    await expect(page.locator('div.w-14')).toHaveCount(0);
    await expect(page.locator('text=100%')).toBeVisible({ timeout: 15000 });
  });
});
