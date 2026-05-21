import {test, expect} from '@playwright/test';
import {docMain} from './helpers';

test.describe('navigation', () => {
  test('navbar links work', async ({page}, testInfo) => {
    await page.goto('./');
    if (testInfo.project.name === 'mobile-chromium') {
      await page.locator('button.navbar__toggle').click();
      await page.locator('.navbar-sidebar').getByRole('link', {name: 'Documentation'}).click();
    } else {
      await page.getByRole('link', {name: 'Documentation', exact: true}).click();
    }
    await expect(page).toHaveURL(/\/docs\/intro$/);
  });

  test('footer phase links resolve', async ({page}) => {
    await page.goto('./');
    await page
      .getByRole('contentinfo')
      .getByRole('link', {name: 'Phase 3 — Runbook Agent'})
      .click();
    await expect(page).toHaveURL(/\/docs\/phases\/phase-3-runbook-agent$/);
  });

  test('sidebar navigates between docs', async ({page}, testInfo) => {
    test.skip(
      testInfo.project.name === 'mobile-chromium',
      'Doc sidebar is collapsed on mobile — covered by mobile nav test',
    );
    await page.goto('docs/intro');
    await page.getByRole('complementary').getByRole('link', {name: 'Tech Stack', exact: true}).click();
    await expect(page).toHaveURL(/\/docs\/tech-stack$/);
    await expect(docMain(page).locator('h1')).toContainText('Tech Stack');
  });

  test('404 page renders', async ({page}) => {
    const response = await page.goto('this-page-does-not-exist', {timeout: 10_000});
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', {name: /page not found/i})).toBeVisible();
  });
});

test.describe('responsive navigation', () => {
  test('mobile menu opens and links work', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('./');

    const toggle = page.locator('button.navbar__toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();

    const sidebar = page.locator('.navbar-sidebar');
    await expect(sidebar).toBeVisible();
    await sidebar.getByRole('link', {name: 'Documentation'}).click();
    await expect(page).toHaveURL(/\/docs\/intro$/);
  });
});
