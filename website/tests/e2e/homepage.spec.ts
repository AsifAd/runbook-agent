import {test, expect} from '@playwright/test';
import {trackConsoleErrors} from './helpers';

test.describe('homepage', () => {
  test('loads hero, incident theater, phases, and tech stack', async ({page}) => {
    const errors = trackConsoleErrors(page);
    await page.goto('./');

    await expect(page).toHaveTitle(/Runbook Agent/);
    await expect(page.getByTestId('hero')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Runbook Agent');
    await expect(page.getByTestId('incident-theater')).toBeVisible();
    await expect(page.getByTestId('phase-orbit')).toBeVisible();
    await expect(page.getByTestId('phase-grid').locator('a')).toHaveCount(5);
    await expect(page.getByText('Python', {exact: true})).toBeVisible();
    await expect(page.getByRole('link', {name: /Read the docs/i}).first()).toBeVisible();

    expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('primary CTAs navigate correctly', async ({page}) => {
    await page.goto('./');
    await page.getByRole('link', {name: /Read the docs/i}).first().click();
    await expect(page).toHaveURL(/\/docs\/intro$/);
  });

  test('GitHub link has correct href', async ({page}) => {
    await page.goto('./');
    const gh = page.getByRole('link', {name: /^GitHub$/i}).first();
    await expect(gh).toHaveAttribute('href', 'https://github.com/AsifAd/runbook-agent');
  });

  test('incident theater scrubbing pauses replay', async ({page}) => {
    await page.goto('./');
    const theater = page.getByTestId('incident-theater');
    await theater.getByRole('button', {name: /Investigating/i}).click();
    await expect(theater.getByText('Paused')).toBeVisible();
  });
});
