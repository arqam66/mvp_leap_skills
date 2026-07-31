# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> LeapSkills App >> explore page loads
- Location: tests\app.spec.ts:90:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/explore
Call log:
  - navigating to "http://localhost:3000/explore", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('LeapSkills App', () => {
  4   |   test('homepage loads correctly', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     await expect(page).toHaveTitle(/Leap Skills/);
  7   |     await expect(page.locator('text=Monetize your expertise')).toBeVisible();
  8   |   });
  9   | 
  10  |   test('navbar has correct links', async ({ page }) => {
  11  |     await page.goto('/');
  12  |     const nav = page.locator('header nav');
  13  |     await expect(nav.locator('text=Home')).toBeVisible();
  14  |     await expect(nav.locator('text=Explore')).toBeVisible();
  15  |   });
  16  | 
  17  |   test('navbar has no Webinars, Cohorts, or Join Platform', async ({ page }) => {
  18  |     await page.goto('/');
  19  |     await expect(page.locator('header >> text=Webinars')).toHaveCount(0);
  20  |     await expect(page.locator('header >> text=Cohorts')).toHaveCount(0);
  21  |     await expect(page.locator('header >> text=Join Platform')).toHaveCount(0);
  22  |   });
  23  | 
  24  |   test('navbar has no Privacy or Terms links', async ({ page }) => {
  25  |     await page.goto('/');
  26  |     const nav = page.locator('header nav');
  27  |     await expect(nav.locator('text=Privacy')).toHaveCount(0);
  28  |     await expect(nav.locator('text=Terms')).toHaveCount(0);
  29  |   });
  30  | 
  31  |   test('navbar has no Get Started button', async ({ page }) => {
  32  |     await page.goto('/');
  33  |     await expect(page.locator('header >> text=Get Started')).toHaveCount(0);
  34  |   });
  35  | 
  36  |   test('Sign In navigates to signup page', async ({ page }) => {
  37  |     await page.goto('/');
  38  |     await page.locator('header button:has-text("Sign Up")').click();
  39  |     await expect(page).toHaveURL(/\/signup/);
  40  |     await expect(page.locator('text=Create your account')).toBeVisible();
  41  |   });
  42  | 
  43  |   test('signup page has email and password fields', async ({ page }) => {
  44  |     await page.goto('/signup');
  45  |     await expect(page.locator('#email')).toBeVisible();
  46  |     await expect(page.locator('#password')).toBeVisible();
  47  |   });
  48  | 
  49  |   test('signup page has Google and GitHub buttons', async ({ page }) => {
  50  |     await page.goto('/signup');
  51  |     await expect(page.locator('text=Continue with Google')).toBeVisible();
  52  |     await expect(page.locator('text=Continue with GitHub')).toBeVisible();
  53  |   });
  54  | 
  55  |   test('signup page can toggle sign up / sign in', async ({ page }) => {
  56  |     await page.goto('/signup');
  57  |     await expect(page.locator('text=Create your account')).toBeVisible();
  58  |     await page.locator('text=Sign In').last().click();
  59  |     await expect(page.locator('text=Welcome back')).toBeVisible();
  60  |   });
  61  | 
  62  |   test('signup page has back to home link', async ({ page }) => {
  63  |     await page.goto('/signup');
  64  |     await page.locator('text=Back to home').click();
  65  |     await expect(page).toHaveURL(/\/$/);
  66  |   });
  67  | 
  68  |   test('footer has no Monetize column', async ({ page }) => {
  69  |     await page.goto('/');
  70  |     await expect(page.locator('footer >> text=Monetize')).toHaveCount(0);
  71  |     await expect(page.locator('footer >> text=1:1 Sessions')).toHaveCount(0);
  72  |   });
  73  | 
  74  |   test('footer has no LeapSkills brand logo or name', async ({ page }) => {
  75  |     await page.goto('/');
  76  |     await expect(page.locator('footer >> text=LeapSkills')).toHaveCount(0);
  77  |   });
  78  | 
  79  |   test('footer links navigate correctly', async ({ page }) => {
  80  |     await page.goto('/');
  81  |     await page.locator('footer a:has-text("Privacy Policy")').first().click();
  82  |     await expect(page).toHaveURL(/\/privacy/);
  83  |     await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  84  | 
  85  |     await page.locator('footer a:has-text("Terms & Conditions")').first().click();
  86  |     await expect(page).toHaveURL(/\/terms/);
  87  |     await expect(page.getByRole('heading', { name: 'Terms & Conditions' })).toBeVisible();
  88  |   });
  89  | 
  90  |   test('explore page loads', async ({ page }) => {
> 91  |     await page.goto('/explore');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/explore
  92  |     await expect(page.getByRole('heading', { name: 'Discover Professional Mentors' })).toBeVisible();
  93  |   });
  94  | 
  95  |   test('privacy page loads', async ({ page }) => {
  96  |     await page.goto('/privacy');
  97  |     await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  98  |   });
  99  | 
  100 |   test('terms page loads', async ({ page }) => {
  101 |     await page.goto('/terms');
  102 |     await expect(page.getByRole('heading', { name: 'Terms & Conditions' })).toBeVisible();
  103 |   });
  104 | 
  105 |   test('navbar nav links navigate correctly', async ({ page }) => {
  106 |     await page.goto('/');
  107 |     await page.locator('header nav button:has-text("Explore")').click();
  108 |     await expect(page).toHaveURL(/\/explore/);
  109 | 
  110 |     await page.locator('header nav button:has-text("Home")').click();
  111 |     await expect(page).toHaveURL(/\/$/);
  112 |   });
  113 | });
  114 | 
```