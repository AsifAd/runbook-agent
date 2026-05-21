import {test, expect} from '@playwright/test';

test.describe('reduced motion', () => {
  test('homepage renders fully with reduced motion preference', async ({page}) => {
    await page.goto('./');
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toBeVisible();
    await expect(page.getByTestId('phase-grid')).toBeVisible();
    const opacity = await page.getByTestId('hero-title').evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
  });
});
