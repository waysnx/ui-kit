# @waysnx/ui-accessibility — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

User-facing accessibility settings center. Provides a centralized control panel where users can adjust contrast, font size, focus indicators, motion, and more — settings persist across sessions and apply to all components automatically.

---

## Package info

- **npm:** `@waysnx/ui-accessibility` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-accessibility`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-accessibility/dist/index.css'`

---

## Quick start

```tsx
import {
  AccessibilityProvider,
  AccessibilityCenter,
  SkipLinks,
  ReadingGuide,
  Magnifier,
} from '@waysnx/ui-accessibility';
import '@waysnx/ui-accessibility/dist/index.css';

function App() {
  return (
    <AccessibilityProvider>
      <SkipLinks />
      <YourApp />
      <AccessibilityCenter position="bottom-right" variant="floating-button" />

      {/* REQUIRED for the "Reading Guide" and "Magnifier" settings to work.
          These render nothing until the user enables the matching toggle,
          but they MUST be mounted or those toggles silently do nothing. */}
      <ReadingGuide />
      <Magnifier />
    </AccessibilityProvider>
  );
}
```

> ⚠️ **Reading Guide / Magnifier:** The Accessibility Center exposes toggles for these features, but the visual effect is produced by the `<ReadingGuide />` and `<Magnifier />` components. If you don't render them, the toggles change state (and persist) but nothing appears on screen. Always mount both inside `AccessibilityProvider`.

---

## Exports

### Context
`AccessibilityProvider`, `AccessibilityContext`

### Components
`AccessibilityCenter`, `FloatingButton`, `ReadingGuide`, `Magnifier`, `SkipLinks`

### Hooks (core)
`useAccessibility`, `useAccessibilityChange`, `useAccessibilityAnalytics`

### Hooks (granular)
`useAccessibilityProfile`, `useContrast`, `useFontScale`, `useFocus`, `useMotion`, `useSpeech`

### Preset profiles
`PROFILE_LOW_VISION`, `PROFILE_DYSLEXIA`, `PROFILE_ADHD`, `PROFILE_MOTOR_DISABILITIES`, `PROFILE_BLIND`, `PROFILE_DEUTERANOPIA`, `PROFILE_PROTANOPIA`, `PROFILE_TRITANOPIA`, `PROFILE_ELDERLY`, `PROFILE_SEIZURE_SAFE`

### Services
`keyboardManager`, `focusManager`, `announcementService`

### Utilities
`DEFAULT_SETTINGS`, `PRESET_PROFILES`, `CSS_VARIABLE_MAP`, `loadSettings`, `saveSettings`, `clearSettings`, `updateCSSVariables`, `clearCSSVariables`, `isAccessibilityEnabled`

---

## Key types

`AccessibilitySettings`, `AccessibilityProfile`, `AccessibilityEvent`, `AccessibilityProviderProps`, `AccessibilityCenterProps`, `FloatingButtonProps`, `SkipLinksProps`, `SkipLink`, `ContrastMode`, `TextSize`, `FocusMode`, `SpeechOptions`, `KeyboardShortcut`


---

## Global CSS — Auto-Applied Styles

The library ships global CSS (`dist/index.css`) that applies styles via `data-*` attributes and classes set on `<html>` (`document.documentElement`) by `AccessibilityProvider`. No app-level CSS needed.

| Setting | Selector (on `<html>`) | Effect |
|---------|------------------------|--------|
| Font: Dyslexia | `.wx-dyslexia-friendly-font` (class) | OpenDyslexic font family (cascades to all, `!important`) |
| Spacing: Loose | `[data-accessibility-text-spacing="loose"]` | Applies `--wx-accessibility-*` spacing vars to body |
| Spacing: Extra Loose | `[data-accessibility-text-spacing="extra-loose"]` | Applies `--wx-accessibility-*` spacing vars to body |
| Text Size | `[data-accessibility-text-size="large\|x-large\|xx-large"]` | Overrides `--wx-font-size-*` tokens |
| Focus: High Visibility | `[data-accessibility-focus-mode="high-visibility"]` | 4px solid outline on focus |
| Focus: Box Outline | `[data-accessibility-focus-mode="box-outline"]` | 3px border + box-shadow on focus |
| Highlight Links | `[data-accessibility-highlight-links="true"]` | Underline with 2px thickness |
| Color: Grayscale | CSS function `grayscale(100%)` on `body.style.filter` | Full grayscale |
| Color: Deuteranopia | Data URI SVG filter on `body.style.filter` | Red-green (red-blind) simulation |
| Color: Protanopia | Data URI SVG filter on `body.style.filter` | Red-green (green-blind) simulation |
| Color: Tritanopia | Data URI SVG filter on `body.style.filter` | Blue-yellow simulation |
| Contrast: High | `[data-accessibility-contrast="high"]` | Black text on white surface |
| Contrast: Yellow-Black | `[data-accessibility-contrast="yellow-black"]` | Yellow text on black surface |

> **Color blind filters:** Applied via self-contained data URI SVG filters on `document.body.style.filter` — no SVG element is injected into the DOM. The previous `url(#id)` approach was removed because an id defined inside the filtered element's subtree (at any level — `body` or `html`) can never be resolved by the browser. Data URI filters embed the `feColorMatrix` directly in the filter value, bypassing DOM id lookup entirely. The SVG markup is **percent-encoded** (`<`→`%3C`, `>`→`%3E`) — required for Firefox, which rejects unencoded `data:image/svg+xml` in the `filter` property. The trailing `#d`/`#p`/`#t` fragment stays literal.

> **Magnifier:** The `<Magnifier />` component only activates when `settings.magnifier === true`. It does **not** auto-activate on text size or contrast changes. Enable it via the Magnifier checkbox in the Settings tab, or by applying the Low Vision profile (the only preset with `magnifier: true`).

All styles are scoped to the presence of these attributes/classes — zero effect when the user hasn't changed accessibility settings.

**Text spacing is customizable** — the apply rule consumes `--wx-accessibility-letter-spacing`, `--wx-accessibility-word-spacing`, and `--wx-accessibility-line-height`. Override these variables under `:root[data-accessibility-text-spacing='loose']` to tune spacing. `letter-spacing`/`word-spacing` apply via a universal (`*`) selector so they reach form controls (button/input/select/textarea don't inherit them); `line-height` applies to `body` only to avoid layout breakage.

> **Note:** `OpenDyslexic` is not bundled — falls back to `Trebuchet MS`/`sans-serif` unless the app loads the font. Monospace font option is not currently wired in the CSS.

**Reading Guide** — the `<ReadingGuide />` is a thin 2px accent line + 1px contrast outline (visible on light and dark backgrounds). Customize via `--wx-reading-guide-color`, `--wx-reading-guide-outline`, `--wx-reading-guide-height`. Requires `<ReadingGuide />` to be mounted (see Quick start).
