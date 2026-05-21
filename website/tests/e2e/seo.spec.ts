import {test, expect} from '@playwright/test';

test.describe('seo and meta', () => {
  test('homepage has og tags', async ({page}) => {
    await page.goto('./');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.+/);
  });

  test('sitemap is generated', async ({page}) => {
    const response = await page.goto('sitemap.xml');
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain('docs/intro');
  });
});
