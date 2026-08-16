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

  test('Sign Up navigates to signup page', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button:has-text("Sign Up")').click();
    await page.waitForURL(/\/signup/, { timeout: 30000 });
    await expect(page.getByRole('heading', { name: 'Create your Leap Skills Account' })).toBeVisible();
  });

  test('signup form has email and password fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('signup form has Google and GitHub buttons', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('button', { name: /Sign in with Google/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign in with GitHub/ })).toBeVisible();
  });

  test('signup page links to sign-in page', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Create your Leap Skills Account' })).toBeVisible();
    await page.locator('text=Sign in').last().click();
    await page.waitForURL(/\/login/, { timeout: 30000 });
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.locator('text=⚡')).toHaveCount(0);
  });

  test('loading screen is retro 8-bit and has no logo', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.locator('text=LOADING')).toBeVisible();
    await expect(page.getByRole('progressbar')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Leap Skills' })).toHaveCount(0);
    await expect(page.locator('div.w-14')).toHaveCount(0);
    await expect(page.locator('text=100%')).toBeVisible({ timeout: 20000 });
  });

  test('fingerprint is recorded silently on landing page (no visible badge)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('visitor-id-badge')).toHaveCount(0);
    await expect
      .poll(
        () => page.evaluate(() => localStorage.getItem('leap_fingerprint')),
        { timeout: 20000 },
      )
      .toMatch(/^\{.*visitorId":"[0-9a-f]{32}".*$/);
  });

  test('fingerprint is recorded on every page (no visible badge)', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByTestId('visitor-id-badge')).toHaveCount(0);
    await expect
      .poll(
        () => page.evaluate(() => localStorage.getItem('leap_fingerprint')),
        { timeout: 20000 },
      )
      .toMatch(/^\{.*visitorId":"[0-9a-f]{32}".*$/);

    await page.goto('/about');
    await expect
      .poll(
        () => page.evaluate(() => localStorage.getItem('leap_fingerprint')),
        { timeout: 20000 },
      )
      .toMatch(/^\{.*visitorId":"[0-9a-f]{32}".*$/);
  });
});
