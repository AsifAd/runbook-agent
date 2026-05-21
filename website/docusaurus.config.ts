import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Runbook Agent',
  tagline: 'Bounded AI incident triage & Ansible remediation for Kubernetes',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://asifad.github.io',
  baseUrl: '/runbook-agent/',
  organizationName: 'AsifAd',
  projectName: 'runbook-agent',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/AsifAd/runbook-agent/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Runbook Agent',
      logo: {
        alt: 'Runbook Agent',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/AsifAd/runbook-agent',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://asifad.github.io',
          label: 'Portfolio',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Architecture', to: '/docs/architecture/system-design'},
            {label: 'Roadmap', to: '/docs/roadmap/timeline'},
            {label: 'Tech Stack', to: '/docs/tech-stack'},
          ],
        },
        {
          title: 'Phases',
          items: [
            {label: 'Phase 1 — Classifier', to: '/docs/phases/phase-1-classifier'},
            {label: 'Phase 2 — Investigator', to: '/docs/phases/phase-2-investigator'},
            {label: 'Phase 3 — Runbook Agent', to: '/docs/phases/phase-3-runbook-agent'},
            {label: 'Phase 4 — Platform', to: '/docs/phases/phase-4-platform'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'GitHub', href: 'https://github.com/AsifAd/runbook-agent'},
            {label: 'Portfolio', href: 'https://asifad.github.io'},
            {label: 'OSS Hub', href: 'https://asifad.github.io/opensource-contributions'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Asif Draxi`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'python', 'json'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
