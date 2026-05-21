import {test, expect} from '@playwright/test';
import {DOC_PAGES, docMain, expectNoHorizontalScroll, trackConsoleErrors} from './helpers';

test.describe('documentation pages', () => {
  for (const path of DOC_PAGES) {
    test(`loads ${path}`, async ({page}) => {
      const errors = trackConsoleErrors(page);
      const response = await page.goto(path);
      expect(response?.status(), `Expected 200 for ${path}`).toBe(200);
      await expect(docMain(page)).toBeVisible();
      await expect(docMain(page).locator('h1').first()).not.toBeEmpty();
      await expectNoHorizontalScroll(page);
      expect(errors.filter((e) => !e.includes('favicon')), `Errors on ${path}`).toEqual([]);
    });
  }

  test('intro page has phase table and mermaid diagram', async ({page}) => {
    await page.goto('docs/intro');
    await expect(docMain(page).locator('h1')).toContainText('Runbook Agent');
    await expect(docMain(page).getByText('Docs & scaffold')).toBeVisible();
    await expect(docMain(page).locator('.docusaurus-mermaid-container')).toBeVisible();
  });

  test('phase testing gates doc covers all phases', async ({page}) => {
    await page.goto('docs/evals/phase-testing-gates');
    const main = docMain(page);
    for (const phase of ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4']) {
      await expect(main.getByRole('heading', {name: new RegExp(phase)}).first()).toBeVisible();
    }
    await expect(main.getByText(/rollback/i).first()).toBeVisible();
  });
});
