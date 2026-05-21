import {test, expect} from '@playwright/test';
import {expectNoHorizontalScroll, trackConsoleErrors} from './helpers';

test.describe('homepage', () => {
  test('loads hero, pipeline, phases, and tech stack', async ({page}) => {
    const errors = trackConsoleErrors(page);
    await page.goto('./');

    await expect(page).toHaveTitle(/Runbook Agent/);
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Runbook Agent');
    await expect(page.getByTestId('pipeline-section')).toBeVisible();
    await expect(page.getByTestId('phase-grid')).toBeVisible();
    await expect(page.getByTestId('phase-grid').locator('article')).toHaveCount(5);
    await expect(page.getByText('Python', {exact: true})).toBeVisible();
    await expect(page.getByRole('link', {name: /Read the documentation/i}).first()).toBeVisible();

    expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('primary CTAs navigate correctly', async ({page}) => {
    await page.goto('./');
    await page.getByRole('link', {name: /Read the documentation/i}).first().click();
    await expect(page).toHaveURL(/\/docs\/intro$/);
  });

  test('GitHub link has correct href', async ({page}) => {
    await page.goto('./');
    const gh = page.getByRole('link', {name: /View on GitHub/i}).first();
    await expect(gh).toHaveAttribute('href', 'https://github.com/AsifAd/runbook-agent');
  });
});
