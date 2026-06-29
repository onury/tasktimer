// @ts-check
// Per-project Astro + Starlight config. The shared THEME comes from
// @onury/docs-kit via the CSS string paths in `customCss` below.
//
// NOTE: do NOT `import` from @onury/docs-kit here. It is ESM-only, and importing
// it into the Astro config makes Vite externalize @astrojs/starlight and load its
// TypeScript entry under Node, which fails on Node >=22.18.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { createStarlightTypeDocPlugin } from 'starlight-typedoc';

const [starlightTypeDoc, typeDocSidebarGroup] = createStarlightTypeDocPlugin();

/**
 * Drops the auto-generated `## Constructors` heading from the TypeDoc API
 * pages (each class has a single constructor, so the title is noise).
 */
function remarkDropConstructorsHeading() {
  return (/** @type {any} */ tree) => {
    tree.children = tree.children.filter(
      (/** @type {any} */ node) =>
        !(
          node.type === 'heading' &&
          node.depth === 2 &&
          node.children?.length === 1 &&
          node.children[0].value === 'Constructors'
        )
    );
  };
}

export default defineConfig({
  site: 'https://onury.io',
  base: "/tasktimer",
  markdown: { remarkPlugins: [remarkDropConstructorsHeading] },
  integrations: [
    starlight({
      title: "TaskTimer",
      description: "An accurate timer utility for running periodic tasks on the given interval ticks or dates.",
      // Header wordmark — colored icon + white text on dark, black text on light.
      logo: {
        light: './src/assets/tasktimer-black.svg',
        dark: './src/assets/tasktimer-white.svg',
        replacesTitle: true,
        alt: 'TaskTimer'
      },
      social: [{ icon: 'github', label: 'GitHub', href: "https://github.com/onury/tasktimer" }],
      // Shared <head> (Cloudflare Web Analytics beacon) — token lives in the kit.
      components: { Head: '@onury/docs-kit/components/Head.astro' },
      customCss: [
        '@onury/docs-kit/styles/custom.css',
        '@onury/docs-kit/styles/theme.css',
        './src/styles/overrides.css',
        './src/styles/hero.css'
      ],
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'],
          tsconfig: '../tsconfig.build.json',
          output: 'api',
          sidebar: { label: 'API Reference', collapsed: false },
          typeDoc: { githubPages: false, excludeInternal: true, sort: ['source-order'] }
        })
      ],
      sidebar: [
        {
          "label": "Start Here",
          "items": [
            { "label": "Getting Started", "slug": "getting-started" },
            { "label": "What's New", "slug": "whats-new" }
          ]
        },
        {
          "label": "Concepts",
          "items": [
            { "label": "Ticks & Intervals", "slug": "concepts/ticks-and-intervals" },
            { "label": "Precision", "slug": "concepts/precision" },
            { "label": "Tasks", "slug": "concepts/tasks" },
            { "label": "Timer Lifecycle", "slug": "concepts/timer-lifecycle" },
            { "label": "Events", "slug": "concepts/events" }
          ]
        },
        {
          "label": "Guides",
          "items": [
            { "label": "Scheduling Tasks", "slug": "guides/scheduling" },
            { "label": "Async Tasks", "slug": "guides/async-tasks" },
            { "label": "Scheduling by Date", "slug": "guides/date-scheduling" },
            { "label": "Pause, Resume & Cleanup", "slug": "guides/control" }
          ]
        },
        {
          "label": "Help",
          "items": [
            { "label": "FAQ", "slug": "faq" },
            { "label": "Changelog", "slug": "changelog" }
          ]
        },
        typeDocSidebarGroup
      ]
    })
  ]
});
