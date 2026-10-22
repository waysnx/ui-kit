# Integrating WaysNX UI Kit into Existing Applications

This guide covers best practices for adopting WaysNX UI Kit components in applications with existing design systems or UI libraries.

---

## Overview

When integrating WaysNX UI Kit into an existing application, conflicts may arise from:

- **CSS variable collisions** — existing and WaysNX token names overlap
- **Global style resets** — conflicting normalize/reset stylesheets
- **Component replacement** — swapping existing UI with WaysNX components mid-project
- **Theming conflicts** — multiple design systems active simultaneously

This document provides strategies to minimize disruption and maintain both design systems during transition.

---

## CSS Isolation Strategies

### 1. Namespace CSS Variables (Recommended)

Scope WaysNX tokens to avoid collisions with existing variables:

```css
/* Your existing app tokens */
:root {
  --color-primary: #007bff;
  --spacing-md: 16px;
}

/* WaysNX tokens scoped under .waysnx-scope */
.waysnx-scope {
  --wx-color-primary: #f19924;
  --wx-spacing-md: 1rem;
}
```

Wrap WaysNX components in the scoped container:

```tsx
import { Sidebar, Menu } from '@waysnx/ui-navigation';

function App() {
  return (
    <div className="waysnx-scope">
      <Sidebar>
        <Menu items={menuItems} />
      </Sidebar>
    </div>
  );
}
```

**Tradeoff:** Requires wrapping every WaysNX component subtree.

### 2. CSS Layer Isolation (Modern Browsers)

Use CSS `@layer` to control cascade order. **Note:** Because WaysNX packages use tsup for bundling (not a build tool with native `@layer` support), you must import the CSS files normally, then wrap your overrides in application layers:

```css
/* main.css - Import WaysNX styles globally */
@import '@waysnx/ui-core/dist/index.css';
@import '@waysnx/ui-navigation/dist/index.css';

/* Define your application layers for cascade control */
@layer app {
  /* Layered styles - see limitation below */
  .button {
    /* Attempts to override WaysNX button */
  }
}
```

**Limitation:** The imported WaysNX CSS is not wrapped in a cascade layer, so normal unlayered declarations take precedence over normal declarations inside `@layer app`, regardless of selector specificity. To override them, place your overrides in unlayered CSS, or use `!important` only when necessary.

**Alternative (unlayered overrides):**

```css
/* Import WaysNX styles */
@import '@waysnx/ui-core/dist/index.css';

/* Place your overrides in unlayered CSS (not in @layer) */
.my-app {
  /* Override tokens */
  --wx-color-primary: #007bff;
}

.my-app .wx-button--primary {
  /* Override component classes directly */
  font-weight: 600;
}
```

**Browser support:** Chrome 99+, Firefox 97+, Safari 15.4+

### 3. Shadow DOM Encapsulation (Advanced)

**Status:** Illustrative example. Requires bundler configuration and has not been tested against WaysNX package output.

For maximum isolation, render WaysNX components in Shadow DOM:

```tsx
import { createRoot } from 'react-dom/client';
import { Sidebar } from '@waysnx/ui-navigation';

// Import CSS as a raw string (requires Vite raw loader or similar)
import navigationStyles from '@waysnx/ui-navigation/dist/index.css?raw';

function mountIsolatedSidebar(container: HTMLElement) {
  const shadow = container.attachShadow({ mode: 'open' });
  const root = document.createElement('div');
  shadow.appendChild(root);
  
  // Inject WaysNX styles into shadow root
  const style = document.createElement('style');
  style.textContent = navigationStyles;
  shadow.appendChild(style);
  
  createRoot(root).render(<Sidebar>{/* ... */}</Sidebar>);
}
```

**Requirements:**
- Configure your bundler to import CSS as raw text:
  - **Vite:** Use `?raw` suffix (as shown above)
  - **Webpack:** Use `raw-loader`
  - **Other bundlers:** Consult bundler documentation for CSS-as-string imports
- Verify that WaysNX component styles are self-contained and do not depend on global selectors

**Tradeoff:** Complex setup, event propagation quirks, no SSR support, requires bundler configuration.

**Validation needed:** This approach has not been verified against the actual WaysNX package build output. Test thoroughly in your environment before production use.

---

## Component Migration Patterns

### Incremental Adoption

Replace components one page/route at a time:

```tsx
// OLD: Existing design system
import { OldButton } from '@yourlib/ui';

// NEW: WaysNX component
import { Button } from '@waysnx/ui-core';

function CheckoutPage() {
  return (
    <>
      {/* Keep old button for now */}
      <OldButton onClick={handleBack}>Back</OldButton>
      
      {/* Adopt new button */}
      <Button variant="primary" onClick={handleCheckout}>
        Complete Order
      </Button>
    </>
  );
}
```

**Strategy:** Start with low-risk pages (admin panels, internal tools) before public-facing routes.

### Adapter Components

Create compatibility wrappers to match your existing API:

```tsx
// your-ui-adapters/Button.tsx
import { Button as WaysNXButton } from '@waysnx/ui-core';

export function Button({ 
  type = 'default', // Your old API
  ...props 
}) {
  // Map old props to WaysNX props
  const variant = type === 'default' ? 'secondary' : type;
  
  return <WaysNXButton variant={variant} {...props} />;
}
```

Replace imports gradually:

```diff
- import { Button } from '@yourlib/ui';
+ import { Button } from '@/ui-adapters';
```

**Benefit:** Minimize code changes during migration.

###

 Parallel Implementation

Run both systems side-by-side with clear boundaries:

```tsx
// App.tsx
import '@yourlib/ui/styles.css'; // Legacy styles
import '@waysnx/ui-kit/dist/styles.css'; // WaysNX styles

function App() {
  return (
    <div className="app">
      {/* Legacy UI */}
      <header className="legacy-header">
        <OldNav />
      </header>
      
      {/* WaysNX UI */}
      <aside className="waysnx-scope">
        <Sidebar />
      </aside>
      
      <main className="legacy-main">
        {children}
      </main>
    </div>
  );
}
```

---

## Theming Coexistence

### Token Bridge

Map WaysNX tokens to your existing system:

```css
:root {
  /* Your tokens */
  --app-primary: #007bff;
  --app-spacing: 16px;
  
  /* Bridge WaysNX to your tokens */
  --wx-color-primary: var(--app-primary);
  --wx-spacing-md: var(--app-spacing);
}
```

**Benefit:** WaysNX components adopt your brand automatically.

### Two-Theme Setup

Explicit scoping for each design system:

```css
/* Scope legacy tokens */
.legacy-header, .legacy-main {
  --color-primary: #007bff;
}

/* Scope WaysNX tokens */
.waysnx-scope {
  --wx-color-primary: #f19924;
}
```

---

## Common Integration Pitfalls

### ❌ Global CSS Reset Conflicts

**Problem:** WaysNX and your app both apply normalize/reset stylesheets, causing unpredictable rendering.

**Solution:** Import only one global reset. If both are needed, audit for conflicts and merge manually.

```css
/* Pick one: */
@import 'your-reset.css'; /* OR */
@import '@waysnx/ui-core/dist/reset.css';
```

### ❌ Navigation Replacement Breaks Layout

**Problem:** Replacing your existing `<Header>` with `<Sidebar>` changes layout structure, breaking page flow.

**Solution:** Keep your header initially; add Sidebar alongside it. Refactor layout in a dedicated sprint.

```tsx
// Phase 1: Add sidebar, keep header
<div className="app-shell">
  <YourExistingHeader />
  <div className="app-body">
    <Sidebar /> {/* New */}
    <main>{children}</main>
  </div>
</div>

// Phase 2: Remove header after layout refactor
<div className="app-shell">
  <Sidebar>{/* Header content moved here */}</Sidebar>
  <main>{children}</main>
</div>
```

### ❌ TypeScript Errors from Duplicate Dependencies

**Problem:** Your app and WaysNX both depend on `react` 19, but npm/yarn installs two copies, causing type mismatches.

**Solution:** Use peer dependencies and ensure single React installation:

```bash
# Check for duplicate React
npm ls react

# Deduplicate
npm dedupe
# or
pnpm dedupe
```

### ❌ Dark Mode Fighting

**Problem:** Your app and WaysNX both implement dark mode via `prefers-color-scheme`, but with different token values.

**Solution:** Disable one dark mode implementation. Either:

1. Use WaysNX dark mode exclusively (override your tokens with WaysNX values in dark mode)
2. Use your dark mode exclusively (override `--wx-*` tokens with your dark values)

```css
/* Option 1: Use WaysNX dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --app-bg: var(--wx-color-surface); /* Inherit from WaysNX */
  }
}

/* Option 2: Override WaysNX tokens */
@media (prefers-color-scheme: dark) {
  :root {
    --wx-color-surface: var(--app-bg); /* Force WaysNX to use your tokens */
  }
}
```

### ❌ Z-Index Conflicts

**Problem:** Modals, dropdowns, and tooltips from both systems compete for stacking order.

**Solution:** Establish a z-index scale and map both systems to it:

```css
:root {
  /* Your z-index scale */
  --z-dropdown: 1000;
  --z-modal: 2000;
  --z-tooltip: 3000;
  
  /* Map WaysNX components */
  --wx-z-dropdown: var(--z-dropdown);
  --wx-z-modal: var(--z-modal);
  --wx-z-tooltip: var(--z-tooltip);
}
```

---

## Testing During Migration

### Visual Regression Testing

Capture before/after screenshots to detect unintended style changes:

```bash
# Baseline: before WaysNX
npm run test:visual:baseline

# Install WaysNX
pnpm add @waysnx/ui-kit

# Compare
npm run test:visual:compare
```

Tools: Percy, Chromatic, BackstopJS, or Playwright screenshots.

### Isolated Component Testing

Test WaysNX components in isolation before integrating:

```tsx
// storybook/WaysNXButton.stories.tsx
import { Button } from '@waysnx/ui-core';

export default {
  title: 'Migration/WaysNX/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Test</Button>;
```

Validate:
- Matches design mockups
- Works with your theme tokens
- Keyboard navigation
- Screen reader labels

### Integration Smoke Tests

After adding WaysNX to a route, verify:

1. **Layout integrity** — page structure unchanged
2. **No console errors** — check browser DevTools
3. **Click paths work** — critical user flows still function
4. **Responsive behavior** — mobile/tablet viewports render correctly

---

## Performance Considerations

### Bundle Size Impact

WaysNX UI Kit is modular. Import only what you need:

```tsx
// ❌ Imports entire aggregate (large bundle)
import { Button, Sidebar, Menu } from '@waysnx/ui-kit';

// ✅ Import specific libraries (smaller bundle)
import { Button } from '@waysnx/ui-core';
import { Sidebar, Menu } from '@waysnx/ui-navigation';
```

**Tip:** Use Webpack Bundle Analyzer or Vite's `rollup-plugin-visualizer` to audit bundle size before/after.

### CSS Loading Strategy

Avoid loading all WaysNX CSS upfront. Use route-based code splitting:

```tsx
// Lazy-load WaysNX CSS when user navigates to admin panel
const AdminPanel = lazy(async () => {
  await import('@waysnx/ui-navigation/dist/styles.css');
  return import('./AdminPanel');
});
```

---

## Rollback Strategy

Plan for rollback if integration causes critical issues:

1. **Feature flag** — gate WaysNX components behind a flag:
   ```tsx
   {featureFlags.useWaysNX ? <Sidebar /> : <OldNav />}
   ```

2. **Git branch strategy** — keep WaysNX work in a feature branch until validated in staging.

3. **Canary deployment** — roll out to 5% of users first, monitor errors, expand gradually.

---

## When to Avoid WaysNX UI Kit

**Do not integrate** if:

- Your app ships in 2 weeks and design is locked
- You have zero tolerance for visual regressions
- Your team lacks capacity for testing and iteration
- Your existing design system is mature, well-tested, and meets all needs

**Do integrate** if:

- You're starting a greenfield project
- Your current UI library is unmaintained
- You need components your system lacks (e.g., `Sidebar`, `Breadcrumb`, `Chart`)
- You're consolidating multiple apps under a shared design system

---

## Getting Help

- **Documentation:** https://uikit.waysnx.tech
- **Examples:** See `examples/waysnx-admin-demo/` in the repository
- **Issues:** Open issues on the WaysNX UI Kit GitHub repository with:
  - Your integration approach (CSS layers, namespacing, etc.)
  - Minimal reproduction of the conflict
  - Screenshots or video of unexpected behavior

---

**Last Updated:** October 2026  
**Applies to:** WaysNX UI Kit v1.0.0+
