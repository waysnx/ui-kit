# @waysnx/ui-accessibility

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — AccessibilityProvider, preset profiles, and granular hooks.

Enterprise-grade accessibility control center for WaysNX UI Kit — centralized settings with real-time application across components.

## Installation

```bash
npm install @waysnx/ui-accessibility
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-accessibility/dist/index.css";
```

## Overview

`@waysnx/ui-accessibility` provides an accessibility control center that manages user accessibility settings and applies them across an application in real time. An `AccessibilityProvider` supplies context, and a set of components and hooks expose controls and settings.

## Representative exports

- Provider & context: `AccessibilityProvider`, `AccessibilityContext`
- Components: `AccessibilityCenter`, `FloatingButton`, `ReadingGuide`, `Magnifier`, `SkipLinks`
- Hooks: `useAccessibility`, `useContrast`, `useFontScale`, `useFocus`, `useMotion`, `useSpeech`, `useAccessibilityProfile`, `useAccessibilityAnalytics`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { AccessibilityProvider, AccessibilityCenter } from "@waysnx/ui-accessibility";

export function App() {
  return (
    <AccessibilityProvider>
      <AccessibilityCenter />
    </AccessibilityProvider>
  );
}
```

## Testing status

This package contains unit tests under `src/__tests__/` (components, hooks, utils, and a service) written for **Vitest**. As of 1.0.0 these tests are **not wired up**: the repository intentionally ships no unit-test runner (no Vitest/Jest dependency, config, or `test` script). The tests are retained for a future, repository-wide unit-testing decision and are **deferred post-1.0.0**.

The operational test layer for 1.0.0 is Storybook + Playwright (browser-level), which covers the P0 release-contract regressions.

## Documentation

Full component and API reference: https://uikit.waysnx.tech
