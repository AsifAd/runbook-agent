import {test, expect} from '@playwright/test';

test.describe('theme', () => {
  test('toggles color mode', async ({page}) => {
    await page.goto('./');
    const toggle = page.getByRole('button', {name: /Switch between dark and light mode/i});
    await expect(toggle).toBeVisible();

    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');
    let changed = false;

    for (let i = 0; i < 3; i++) {
      await toggle.click();
      await page.waitForTimeout(300);
      const current = await html.getAttribute('data-theme');
      if (current !== initial) {
        changed = true;
        break;
      }
    }

    expect(changed, `Theme should change from "${initial}" after toggle`).toBe(true);
  });

  test('theme persists on doc pages', async ({page}) => {
    await page.goto('./');
    const toggle = page.getByRole('button', {name: /Switch between dark and light mode/i});
    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');

    for (let i = 0; i < 3; i++) {
      await toggle.click();
      await page.waitForTimeout(300);
      if ((await html.getAttribute('data-theme')) !== initial) break;
    }

    const theme = await html.getAttribute('data-theme');
    await page.goto('docs/intro');
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
  });
});
