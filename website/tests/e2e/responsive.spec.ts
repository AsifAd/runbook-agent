import {test, expect} from '@playwright/test';
import {expectNoHorizontalScroll} from './helpers';

const VIEWPORTS = [
  {name: 'mobile', width: 390, height: 844},
  {name: 'tablet', width: 768, height: 1024},
  {name: 'desktop', width: 1280, height: 800},
  {name: 'wide', width: 1920, height: 1080},
] as const;

const PAGES = ['./', 'docs/intro', 'docs/phases/phase-3-runbook-agent'] as const;

test.describe('responsive layout', () => {
  for (const viewport of VIEWPORTS) {
    for (const path of PAGES) {
      test(`${viewport.name} — ${path} has no horizontal overflow`, async ({page}) => {
        await page.setViewportSize({width: viewport.width, height: viewport.height});
        await page.goto(path);
        await expectNoHorizontalScroll(page);
        await expect(page.locator('h1').first()).toBeVisible();
      });
    }
  }

  test('mobile stacks phase nodes in single column', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('./');
    const grid = page.getByTestId('phase-grid');
    const first = grid.locator('a').first();
    const second = grid.locator('a').nth(1);
    const firstBox = await first.boundingBox();
    const secondBox = await second.boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 20);
  });

  test('desktop shows phase orbit in multi-column layout', async ({page}) => {
    await page.setViewportSize({width: 1280, height: 800});
    await page.goto('./');
    const first = page.getByTestId('phase-grid').locator('a').nth(0);
    const second = page.getByTestId('phase-grid').locator('a').nth(1);
    const firstBox = await first.boundingBox();
    const secondBox = await second.boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(40);
    expect(secondBox!.x).toBeGreaterThan(firstBox!.x);
  });

  test('hero CTAs wrap on mobile without overflow', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('./');
    await expect(page.getByRole('link', {name: /Read the docs/i}).first()).toBeVisible();
    await expect(page.getByRole('link', {name: /^GitHub$/i}).first()).toBeVisible();
    await expectNoHorizontalScroll(page);
  });

  test('mobile doc page has navigation control and readable content', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('docs/intro');
    await expect(page.locator('.theme-doc-markdown h1')).toBeVisible();
    const navControl = page
      .locator('button.navbar__toggle, button[aria-label*="sidebar" i], button[aria-label*="menu" i]')
      .first();
    await expect(navControl).toBeVisible();
  });
});
