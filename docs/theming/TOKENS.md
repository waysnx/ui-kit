# Design Tokens Reference

WaysNX UI Kit uses CSS custom properties (CSS variables) as design tokens to provide consistent theming across all components.

All tokens are prefixed with `--wx-` to avoid naming collisions with existing application styles.

---

## Color Tokens (20 total)

### Brand Colors (4 tokens)

Primary color used for buttons, links, and interactive elements:

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-color-primary` | `#f19924` | Primary brand color |
| `--wx-color-primary-hover` | `#e08916` | Hover state for primary elements |
| `--wx-color-primary-contrast` | `#ffffff` | Text on primary backgrounds |
| `--wx-color-primary-light` | `#fff5e6` | Subtle primary backgrounds |

**Example:**
```css
.my-button {
  background-color: var(--wx-color-primary);
  color: var(--wx-color-primary-contrast);
}

.my-button:hover {
  background-color: var(--wx-color-primary-hover);
}
```

### Text Colors (3 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-color-text` | `#1e293b` | Primary body text |
| `--wx-color-text-muted` | `#64748b` | Secondary text, labels |
| `--wx-color-text-light` | `#94a3b8` | Tertiary text, placeholders |

**Example:**
```css
.my-label {
  color: var(--wx-color-text-muted);
}

.my-placeholder {
  color: var(--wx-color-text-light);
}
```

### Surface Colors (3 tokens)

Background colors for cards, panels, and surfaces:

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-color-surface` | `#ffffff` | Card backgrounds, panels |
| `--wx-color-surface-alt` | `#f8fafc` | Alternate surface (zebra stripes, disabled inputs) |
| `--wx-color-surface-hover` | `#f1f5f9` | Hover state for interactive surfaces |

**Example:**
```css
.my-card {
  background-color: var(--wx-color-surface);
  border: 1px solid var(--wx-color-border);
}

.my-card:hover {
  background-color: var(--wx-color-surface-hover);
}
```

### Border Colors (1 token)

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-color-border` | `#e2e8f0` | Default border color |

### Status Colors (9 tokens)

Colors for feedback states (error, success, warning, info):

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-color-error` | `#ef4444` | Error states, destructive actions |
| `--wx-color-error-hover` | `#b91c1c` | Error hover state |
| `--wx-color-error-light` | `#fef2f2` | Error background (alerts, badges) |
| `--wx-color-success` | `#22c55e` | Success states, confirmations |
| `--wx-color-success-light` | `#f0fdf4` | Success background |
| `--wx-color-warning` | `#f59e0b` | Warning states |
| `--wx-color-info` | `#3b82f6` | Informational states |
| `--wx-color-destructive` | `#dc2626` | Alias for error (used in buttons) |
| `--wx-color-destructive-hover` | `#b91c1c` | Destructive hover state |

**Example:**
```css
.alert--error {
  background-color: var(--wx-color-error-light);
  color: var(--wx-color-error);
  border-left: 4px solid var(--wx-color-error);
}

.alert--success {
  background-color: var(--wx-color-success-light);
  color: var(--wx-color-success);
}
```

---

## Spacing Tokens (5 total)

Consistent spacing scale for padding, margins, and gaps:

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-spacing-xs` | `4px` | Tight spacing (icon padding, inline gaps) |
| `--wx-spacing-sm` | `8px` | Small spacing (button padding, compact layouts) |
| `--wx-spacing-md` | `16px` | Medium spacing (default padding, content gaps) |
| `--wx-spacing-lg` | `24px` | Large spacing (section padding) |
| `--wx-spacing-xl` | `32px` | Extra-large spacing (page margins) |

**Example:**
```css
.my-container {
  padding: var(--wx-spacing-md);
  gap: var(--wx-spacing-sm);
}

.my-section {
  margin-bottom: var(--wx-spacing-lg);
}
```

---

## Typography Tokens (8 total)

### Font Family (1 token)

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-font-family` | `inherit` | Inherits from application base font |

**Override example:**
```css
:root {
  --wx-font-family: 'Inter', system-ui, sans-serif;
}
```

### Font Sizes (7 tokens)

All font sizes support accessibility font scaling:

| Token | Base Size | Actual Definition | Usage |
|-------|-----------|-------------------|-------|
| `--wx-font-size-xs` | `12px` | `calc(12px * var(--wx-accessibility-font-scale, 1))` | Small labels, captions |
| `--wx-font-size-sm` | `14px` | `calc(14px * var(--wx-accessibility-font-scale, 1))` | Secondary text, form labels |
| `--wx-font-size-md` | `15px` | `calc(15px * var(--wx-accessibility-font-scale, 1))` | Body text (default) |
| `--wx-font-size-lg` | `18px` | `calc(18px * var(--wx-accessibility-font-scale, 1))` | Subheadings |
| `--wx-font-size-xl` | `20px` | `calc(20px * var(--wx-accessibility-font-scale, 1))` | Headings (H4) |
| `--wx-font-size-2xl` | `24px` | `calc(24px * var(--wx-accessibility-font-scale, 1))` | Headings (H3) |
| `--wx-font-size-3xl` | `32px` | `calc(32px * var(--wx-accessibility-font-scale, 1))` | Headings (H1, H2) |

**Note:** `--wx-accessibility-font-scale` is a **multiplier variable** (not a declared token). It is referenced in font-size token definitions via `calc()` but is not provided a default value in `tokens.css`.

**Source code:** Each font-size token uses this pattern:
```css
--wx-font-size-md: calc(15px * var(--wx-accessibility-font-scale, 1));
```

This means:
- **Default behavior:** If you don't define `--wx-accessibility-font-scale`, the fallback value `1` is used (no scaling)
- **Scaling enabled:** Define `--wx-accessibility-font-scale` at `:root` or on a parent element to scale all WaysNX font sizes proportionally

**Accessibility scaling:**
```css
/* User prefers larger text */
:root {
  --wx-accessibility-font-scale: 1.25; /* All font sizes × 1.25 */
}
```

**Result:** `--wx-font-size-md` becomes `calc(15px * 1.25)` = `18.75px`

**Important:** This is a **multiplication factor only**. WaysNX does not automatically detect user font preferences or apply scaling. Your application must implement the detection and set the variable accordingly (e.g., via media queries or JavaScript).

**Example:**
```css
.my-heading {
  font-size: var(--wx-font-size-2xl);
}

.my-body-text {
  font-size: var(--wx-font-size-md);
}
```

---

## Border Radius Tokens (4 total)

Consistent rounding for corners:

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-radius-sm` | `4px` | Buttons, badges, small elements |
| `--wx-radius-md` | `8px` | Cards, inputs, default rounding |
| `--wx-radius-lg` | `12px` | Panels, modals |
| `--wx-radius-xl` | `16px` | Large surfaces |

**Example:**
```css
.my-input {
  border-radius: var(--wx-radius-sm);
}

.my-card {
  border-radius: var(--wx-radius-md);
}
```

---

## Shadow Tokens (5 total)

Elevation shadows for depth:

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift (buttons, inputs) |
| `--wx-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07)` | Cards, dropdowns |
| `--wx-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08)` | Modals, drawers |
| `--wx-shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.08)` | Maximum elevation (overlays) |
| `--wx-shadow-focus` | `0 0 0 3px rgba(241, 153, 36, 0.1)` | Focus ring |

**Example:**
```css
.my-modal {
  box-shadow: var(--wx-shadow-lg);
}

.my-button:focus-visible {
  box-shadow: var(--wx-shadow-focus);
}
```

---

## Component-Specific Tokens (2 total)

### Input (1 token)

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-input-height` | `40px` | Default input height |

### Overlay (1 token)

| Token | Value | Usage |
|-------|-------|-------|
| `--wx-overlay-bg` | `rgba(0, 0, 0, 0.4)` | Modal/drawer backdrop |

**Usage:**
```css
.my-backdrop {
  background-color: var(--wx-overlay-bg);
}
```

---

## Navigation-Specific Variables

The `@waysnx/ui-navigation` package uses unprefixed CSS variables for component theming (these are **not** core WaysNX tokens):

### Menu Component Variables

| Variable | Default | Usage |
|----------|---------|-------|
| `--nav-menu-bg` | `var(--wx-color-surface)` | Menu background |
| `--nav-menu-text` | `var(--wx-color-text)` | Menu text color |
| `--nav-menu-item-height` | `2.5rem` | Menu item height |
| `--nav-menu-item-padding` | `0.5rem 1rem` | Menu item padding |
| `--nav-menu-gap` | `0.5rem` | Gap between menu items (horizontal) |
| `--nav-menu-submenu-indent` | `1.5rem` | Submenu indentation |

**Example:**
```css
/* Override Menu styling */
.compact-menu {
  --nav-menu-item-height: 2rem;
  --nav-menu-item-padding: 0.25rem 0.75rem;
}
```

**Note:** These `--nav-menu-*` variables are component-scoped customization hooks, not core design tokens. The Sidebar component uses dynamic inline styles for width rather than design tokens.

---

## Application-Level Token Examples

The WaysNX UI Kit does **not** provide z-index tokens (`--wx-z-*`). Z-index layering is application-specific and should be managed by your application's CSS architecture.

**Example application-level z-index system:**
```css
/* your-app/styles/tokens.css */
:root {
  --app-z-dropdown: 1000;
  --app-z-modal: 2000;
  --app-z-toast: 3000;
}
```

Similarly, some layout concerns (viewport sizing, application-specific spacing multipliers) are best handled at the application level rather than through the design system.

---

## Customizing Tokens

### Global Override

Override tokens at the `:root` level to rebrand the entire UI Kit:

```css
/* your-theme.css */
:root {
  --wx-color-primary: #007bff; /* Change brand color to blue */
  --wx-spacing-md: 20px; /* Increase default spacing */
  --wx-radius-md: 12px; /* More rounded corners */
}
```

Import your theme **after** WaysNX styles:

```tsx
import '@waysnx/ui-kit/dist/styles.css'; // Base tokens
import './your-theme.css'; // Override tokens
```

### Scoped Override

Override tokens for specific sections of your app:

```css
/* Admin panel uses different brand color */
.admin-panel {
  --wx-color-primary: #8b5cf6; /* Purple */
}
```

```tsx
<div className="admin-panel">
  <Button variant="primary">Admin Action</Button> {/* Purple button */}
</div>
```

**Token Inheritance:** CSS custom properties inherit down the DOM tree. **Verified in sampled components:** Button and Sidebar components use `var(--wx-*)` with fallback values, which respect token overrides from parent elements:

```tsx
<div className="waysnx-scope" style={{ "--wx-color-primary": "#10b981" }}>
  <Button variant="primary">Green</Button>
  <Sidebar>{/* Also uses green primary color */}</Sidebar>
</div>
```

**How it works:** WaysNX components define styles like `background: var(--wx-color-primary, #f19924)`. When a parent element sets `--wx-color-primary: #10b981`, CSS inheritance makes that value available to all descendant elements, so the component uses `#10b981` instead of the fallback `#f19924`.

**Verified in source:**
- `packages/ui-core/src/components/Button/Button.css` uses `var(--wx-color-primary, #f19924)`
- `packages/ui-navigation/src/components/Sidebar/Sidebar.css` uses `var(--wx-color-surface, #ffffff)`, `var(--wx-color-text, #1e293b)`, etc.

The sampled components (Button, Sidebar) follow the `var(--wx-*, fallback)` pattern. This pattern is expected to be consistent across the UI Kit, ensuring token inheritance works for components that follow this convention.

### Component-Level Override

Override tokens for individual components:

```css
.my-custom-button {
  --wx-color-primary: #10b981; /* Green button */
}
```

```tsx
<Button className="my-custom-button" variant="primary">
  Custom Color
</Button>
```

---

## Dark Mode Support

WaysNX UI Kit supports dark mode via `prefers-color-scheme`. To enable:

```css
/* Override tokens in dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --wx-color-surface: #0f172a;
    --wx-color-surface-alt: #1e293b;
    --wx-color-text: #e2e8f0;
    --wx-color-text-muted: #94a3b8;
    --wx-color-border: #334155;
  }
}
```

Some components (e.g., `Sidebar`) support explicit dark mode via `colorScheme` prop:

```tsx
<Sidebar colorScheme="dark"> {/* Force dark mode */}
  {children}
</Sidebar>
```

---

## Token Naming Convention

All WaysNX tokens follow this pattern:

```
--wx-<category>-<property>[-<variant>]
```

**Examples:**
- `--wx-color-primary` → category: `color`, property: `primary`
- `--wx-spacing-md` → category: `spacing`, property: `md`
- `--wx-color-error-light` → category: `color`, property: `error`, variant: `light`

**Why `--wx-` prefix?**
- Avoids collisions with existing CSS variables
- Easy to search/grep in codebase
- Clear ownership (WaysNX UI Kit tokens)

---

## Browser Support

CSS custom properties (CSS variables) are supported in:

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browsers, consider a fallback:

```css
.my-element {
  color: #f19924; /* Fallback */
  color: var(--wx-color-primary); /* Modern browsers */
}
```

---

## Complete Token Reference

### All Tokens at a Glance

**Colors (20 tokens):**
- Brand: primary, primary-hover, primary-contrast, primary-light (4)
- Text: text, text-muted, text-light (3)
- Surface: surface, surface-alt, surface-hover (3)
- Border: border (1)
- Status: error, error-hover, error-light, success, success-light, warning, info, destructive, destructive-hover (9)

**Spacing (5 tokens):**
- xs, sm, md, lg, xl

**Typography (8 tokens):**
- font-family
- font-size-xs, sm, md, lg, xl, 2xl, 3xl

**Border Radius (4 tokens):**
- radius-sm, md, lg, xl

**Shadows (5 tokens):**
- shadow-sm, md, lg, xl, focus

**Component (2 tokens):**
- input-height
- overlay-bg

**Total: 44 CSS custom properties** (declared in `packages/ui-core/src/styles/tokens.css`)

**Note:** `--wx-accessibility-font-scale` is referenced as a fallback multiplier in font-size tokens but is not declared with a default value. Applications can optionally define it to scale all font sizes proportionally.

---

## Getting Help

- **Full token list:** `packages/ui-core/src/styles/tokens.css`
- **Documentation:** https://uikit.waysnx.tech
- **Examples:** See `examples/waysnx-admin-demo/` for token usage patterns

---

**Last Updated:** October 2026  
**Applies to:** WaysNX UI Kit v1.0.0+
