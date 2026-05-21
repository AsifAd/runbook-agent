import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Plan',
      collapsed: false,
      items: ['plan/current-status', 'plan/scenario-matrix'],
    },
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: ['overview/project-vision', 'overview/why-this-project'],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/system-design',
        'architecture/data-flow',
        'architecture/monorepo-layout',
      ],
    },
    {
      type: 'category',
      label: 'Tech Stack',
      collapsed: false,
      items: ['tech-stack'],
    },
    {
      type: 'category',
      label: 'Roadmap',
      collapsed: false,
      items: ['roadmap/timeline', 'roadmap/milestones'],
    },
    {
      type: 'category',
      label: 'Build Phases',
      collapsed: false,
      items: [
        'phases/phase-0-scaffold',
        'phases/phase-1-classifier',
        'phases/phase-2-investigator',
        'phases/phase-3-runbook-agent',
        'phases/phase-4-platform',
      ],
    },
    {
      type: 'category',
      label: 'Decisions',
      items: ['decisions/llm-provider'],
    },
    {
      type: 'category',
      label: 'Quality & Security',
      items: [
        'evals/testing-strategy',
        'evals/phase-testing-gates',
        'evals/ci-and-secrets',
        'security/policy-guardrails',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/prerequisites', 'getting-started/local-setup'],
    },
  ],
};

export default sidebars;
