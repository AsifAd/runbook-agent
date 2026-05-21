import {expect, type Page, type Locator} from '@playwright/test';

/** Main doc content container (Docusaurus 3). */
export function docMain(page: Page): Locator {
  return page.locator('.theme-doc-markdown').first();
}

/** Fail if the page has horizontal overflow (common responsive bug). */
export async function expectNoHorizontalScroll(page: Page) {
  const hasOverflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth > el.clientWidth + 2;
  });
  expect(hasOverflow, 'Page should not scroll horizontally').toBe(false);
}

/** Collect console errors during navigation. */
export function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

export const DOC_PAGES = [
  'docs/intro',
  'docs/overview/project-vision',
  'docs/overview/why-this-project',
  'docs/architecture/system-design',
  'docs/architecture/data-flow',
  'docs/architecture/monorepo-layout',
  'docs/tech-stack',
  'docs/roadmap/timeline',
  'docs/roadmap/milestones',
  'docs/phases/phase-1-classifier',
  'docs/phases/phase-2-investigator',
  'docs/phases/phase-3-runbook-agent',
  'docs/phases/phase-4-platform',
  'docs/evals/testing-strategy',
  'docs/evals/phase-testing-gates',
  'docs/security/policy-guardrails',
  'docs/getting-started/prerequisites',
  'docs/getting-started/local-setup',
] as const;
