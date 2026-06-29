---
title: What's New
description: Highlights of TaskTimer v4 and how to migrate from v3.
---

TaskTimer **v4** is a modernization release. The public API is unchanged — the `TaskTimer` and `Task` classes, the `TaskTimer.State` and `TaskTimer.Event` namespaces, the options, and the events all work exactly as before. What changed is the **module format** and the **toolchain**.

## Highlights

- **ESM-only.** TaskTimer is now a pure ES module (`"type": "module"`). Import it; there's no CommonJS entry.
- **Zero runtime dependencies.** The `eventemitter3` dependency was replaced with a small built-in emitter that keeps the same `on` / `once` / `off` / `emit` surface.
- **Node 22+.** The minimum supported Node.js is 22 (the active LTS floor).
- **Fully typed**, built with TypeScript and shipping declaration maps.

## Migrating from v3

### Import as ESM

v4 has no CommonJS build. Replace `require` with `import`:

```js
// v3
const { TaskTimer } = require('tasktimer');

// v4
import { TaskTimer } from 'tasktimer';
```

If your project isn't ESM yet, set `"type": "module"` in your `package.json` (or use a bundler / a dynamic `import()`). See the [ESM notice](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7) for the common cases.

### Browser usage

v4 no longer ships a UMD `<script>` bundle (`tasktimer.min.js`). For the browser, bundle TaskTimer with your app using any modern bundler — Vite, esbuild, Rollup, or webpack. The library's Node-only fast paths fall back gracefully when `process.hrtime` is unavailable.

### Node version

Make sure you're on **Node 22 or newer**.

That's the whole migration — no code changes to the timer or task API. The full list of changes is in the [Changelog](/tasktimer/changelog/).

:::tip
Coming from v1? v2 was a full TypeScript rewrite with several breaking API changes (`addTask` → `add`, `name` → `id`, and more). The [Changelog](/tasktimer/changelog/) documents those releases in full.
:::
