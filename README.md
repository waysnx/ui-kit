<p align="center">
  <img
    src="assets/branding/waysnx-ui-kit-logo.png"
    alt="WaysNX UI Kit"
    width="180"
  />
</p>

<h1 align="center">WaysNX UI Kit</h1>

<p align="center">
  Modular React UI libraries for building consistent, accessible, and scalable applications.
</p>

<p align="center">
  <a href="https://uikit.waysnx.tech">Documentation</a> ·
  <a href="https://www.npmjs.com/org/waysnx">NPM</a> ·
  <a href="https://github.com/waysnx">WaysNX on GitHub</a>
</p>

---

## Overview

WaysNX UI Kit is a modular React UI ecosystem built for modern enterprise applications.

It provides focused libraries for core UI, forms, layout, feedback, navigation, accessibility, security, communication, visualization, dashboards, data, files, media, maps, documentation, and advanced application capabilities.

The project is designed around reusable APIs, shared design tokens, accessibility, framework-neutral integrations, testability, and predictable package boundaries.

### Current scope

- **18 focused libraries**
- **242 documented components** (see the [Libraries](#libraries) table; documented does not mean every component is production-ready — some are adapter/integration shells or planned "coming soon" components. See [Component maturity](#component-maturity).)
- **1 aggregate package:** `@waysnx/ui-kit`
- React 19 + TypeScript
- Vite, Storybook, Vitest and Playwright
- Shared CSS variables and design tokens
- Accessibility and security validation
- Generated documentation through WDG

> `@waysnx/ui-kit` is an aggregate package and is not counted as an additional focused library.

### Public Release

**Version:** `1.0.0`  
**Initial public release: September 2026**

The WaysNX UI Kit public release is `1.0.0`. All 18 focused libraries — including `@waysnx/ui-diagnostics` — and the `@waysnx/ui-kit` aggregate package are released at `1.0.0`.

---

## Libraries

| Package | Components | Purpose |
|---|---:|---|
| `@waysnx/ui-accessibility` | 5 | Accessibility-focused UI capabilities and helpers |
| `@waysnx/ui-communication` | 15 | Messaging, collaboration and communication UI |
| `@waysnx/ui-core` | 24 | Core controls, tokens and foundational UI |
| `@waysnx/ui-dashboard` | 13 | Dashboard structures and reusable dashboard UI |
| `@waysnx/ui-data` | 6 | Data-oriented UI and integration capabilities |
| `@waysnx/ui-diagnostics` | 0 | Client-side runtime diagnostics and UI error observability (functional library) |
| `@waysnx/ui-docs` | 12 | Documentation-oriented UI components |
| `@waysnx/ui-feedback` | 12 | Alerts, dialogs, toasts and feedback states |
| `@waysnx/ui-files` | 2 | File upload, preview and file-management UI |
| `@waysnx/ui-form-builder` | 0 | Schema/metadata-driven form functionality |
| `@waysnx/ui-grid-builder` | 6 | Reusable grid and data-listing functionality |
| `@waysnx/ui-i18n` | 0 | Internationalization, localization and RTL functionality |
| `@waysnx/ui-layout` | 22 | Layout primitives and application page structures |
| `@waysnx/ui-maps` | 9 | Maps, geolocation and spatial UI |
| `@waysnx/ui-media` | 12 | Media playback and rich-media UI |
| `@waysnx/ui-navigation` | 20 | Menus, navigation and application-shell UI |
| `@waysnx/ui-security` | 74 | Security-oriented UI and authorization capabilities |
| `@waysnx/ui-visualization` | 10 | Hierarchies, trees and structured visualization UI |

The **Components** column reflects documented components. Documented components are not all production-ready in the same way — see Component maturity below.

---

## Component maturity

Not every documented component is a fully self-contained, production-ready implementation in `1.0.0`. Components fall into these categories:

- **Production-ready** — the majority of components; fully functional standalone.
- **Adapter / integration** — render UI but require an external adapter or backend to become functional. These do not bundle a vendor SDK. Examples: all of `@waysnx/ui-maps` (`MapView`, `AddressAutocomplete`, `AddressSelector`, `DistanceCalculator`, etc.) and `@waysnx/ui-media` `OCRScanner`.
- **Shell / documented-limitation** — provide the intended UI/chrome but do not perform the full underlying operation in `1.0.0`, and say so. Examples: `@waysnx/ui-files` `PDFViewer` (viewer chrome; integrate PDF.js to render pages), `@waysnx/ui-media` `Cropper` (`onCrop` returns the source image plus crop geometry, not cropped pixels).
- **Coming soon / planned** — placeholder components that render a "Coming Soon" state and are intentionally non-functional. These are the six `@waysnx/ui-docs` placeholders (`DependencyGraph`, `Playground`, `TokenViewer`, `ThemeExplorer`, `AISection`, `WorkflowViewer`) and are **excluded from production-ready expectations**.

Each such component documents its status in its own README/JSDoc and on the documentation site. The `242` figure counts documented components across all categories, not production-ready components only.

---

## Aggregate Package

For applications that want a curated core set of WaysNX UI Kit libraries through one dependency:

```bash
pnpm add @waysnx/ui-kit
```

For `1.0.0`, the aggregate package intentionally re-exports a **curated subset** of five libraries (not all 18):

- `@waysnx/ui-core`
- `@waysnx/ui-form-builder`
- `@waysnx/ui-layout`
- `@waysnx/ui-feedback`
- `@waysnx/ui-grid-builder`

The remaining focused libraries (e.g. `@waysnx/ui-security`, `@waysnx/ui-navigation`, `@waysnx/ui-media`, `@waysnx/ui-data`, `@waysnx/ui-files`, `@waysnx/ui-maps`, `@waysnx/ui-communication`, `@waysnx/ui-dashboard`, `@waysnx/ui-docs`, `@waysnx/ui-visualization`, `@waysnx/ui-accessibility`, `@waysnx/ui-i18n`, `@waysnx/ui-diagnostics`) are installed directly as needed. The aggregate is also ESM-only for `1.0.0`.

The aggregate package is a convenience entry point and is **not counted as an additional focused library**.

Applications can also install focused packages independently.

---

## Installation

Install the published package you need.

### Aggregate package

```bash
pnpm add @waysnx/ui-kit
```

or:

```bash
npm install @waysnx/ui-kit
```

### Individual libraries

For example:

```bash
pnpm add @waysnx/ui-core
```

```bash
pnpm add @waysnx/ui-feedback
```

```bash
pnpm add @waysnx/ui-layout
```

```bash
pnpm add @waysnx/ui-form-builder
```

Choose individual libraries when you only need specific WaysNX UI capabilities.

---

## Basic Usage

```tsx
import { Button } from "@waysnx/ui-core";

export function Example() {
  return (
    <Button variant="primary">
      Save
    </Button>
  );
}
```

Use the documentation for library-specific APIs, props, types, examples, accessibility information, and integration details.

---

## Functional Libraries

Not every library is a traditional component catalog.

`@waysnx/ui-form-builder`, `@waysnx/ui-i18n` and `@waysnx/ui-diagnostics` are functional libraries. Their generated metadata can legitimately contain zero standalone components while still providing important application functionality.

WDG represents these packages at the library level rather than treating them as broken or empty component catalogs.

This behavior is generic and is not implemented as a library-specific exception.

---

## Documentation

The primary documentation site is:

**https://uikit.waysnx.tech**

It includes generated:

- Library documentation
- Component documentation
- API information
- Props and types
- Examples
- Design-token information
- Relationships
- Search metadata

Example:

**https://uikit.waysnx.tech/components/ui-feedback/Drawer**

Generated documentation is produced through the WaysNX Documentation Generator (WDG).

---

## Storybook

Storybook provides the interactive component-development and validation environment.

It is used for:

- Component examples
- Variants and states
- Interactive controls
- Theme validation
- Accessibility inspection
- Responsive behavior

See [`storybook/README.md`](storybook/README.md).

---

## Playwright

Playwright provides browser-level validation for critical UI behavior.

Release validation targets:

- Chromium
- Firefox
- WebKit
- Keyboard interaction
- Responsive behavior
- Forms and dialogs
- Navigation
- Accessibility-sensitive interactions

See [`playwright/README.md`](playwright/README.md).

---

## Reference Application

The repository includes a reference application:

```text
examples/
└── waysnx-admin-demo/
```

It contains reference screens for:

- Dashboard
- Complete Form
- Grid Listing

The demo also demonstrates shared application-shell behavior including:

- Header
- Sidebar
- User menu
- Language selection
- Theme switching
- Accessibility controls
- Notifications

See:

- [`examples/README.md`](examples/README.md)
- [`examples/waysnx-admin-demo/README.md`](examples/waysnx-admin-demo/README.md)

---

## Design System

WaysNX UI Kit uses shared design tokens and CSS variables to provide consistent:

- Colors
- Typography
- Spacing
- Radius
- Borders
- Shadows
- Interaction states
- Themes

All tokens are prefixed with `--wx-` and can be customized by overriding CSS variables.

### Design Resources

- **[Design Tokens Reference](docs/theming/TOKENS.md)** — Complete catalog of all 44 CSS custom properties with usage examples
- **[Integrating into Existing Apps](docs/integrations/EXISTING_APPS.md)** — Best practices for adopting WaysNX UI Kit in applications with existing design systems

### Quick Token Reference

Common tokens you'll use frequently:

| Category | Token | Value | Usage |
|----------|-------|-------|-------|
| Brand | `--wx-color-primary` | `#f19924` | Primary actions, links |
| Spacing | `--wx-spacing-md` | `16px` | Default padding/margins |
| Text | `--wx-color-text` | `#1e293b` | Body text |
| Surface | `--wx-color-surface` | `#ffffff` | Card backgrounds |
| Radius | `--wx-radius-md` | `8px` | Default rounding |

See the [complete token reference](docs/theming/TOKENS.md) for all 44 tokens.

### Customization Example

Override tokens to match your brand:

```css
:root {
  --wx-color-primary: #007bff;  /* Your brand blue */
  --wx-spacing-md: 20px;         /* Larger spacing */
}
```

Applications should prefer the public UI Kit tokens and components rather than creating parallel implementations of the same design patterns.

---

## Accessibility

Accessibility is a core engineering requirement.

Validation covers areas such as:

- Keyboard navigation
- Focus management
- ARIA semantics
- Screen-reader behavior
- Color contrast
- Reduced motion
- Responsive behavior
- RTL where applicable

The public-release process treats critical accessibility findings as release blockers.

---

## Security

Security-sensitive UI capabilities are primarily provided through `@waysnx/ui-security`.

Security validation includes areas such as:

- Sensitive input handling
- Secure uploads
- URL handling
- Unsafe content handling
- Permission and role boundaries
- Session-related UI
- Verification and trusted-device flows

Security issues that qualify as P0 release blockers must be resolved before public release.

---

## WDG and Generated Documentation

WaysNX UI Kit uses the WaysNX Documentation Generator (WDG) to generate structured documentation and machine-readable metadata.

Generated outputs can include:

- Library metadata
- Component metadata
- API information
- Search indexes
- Relationships
- Schemas
- Markdown documentation
- AI-oriented documentation

Generated JSON is treated as the machine-readable documentation source of truth.

WDG must:

- Produce schema-valid output
- Derive metadata from source evidence
- Avoid inventing unsupported information
- Generate deterministic output
- Allow representative source-to-output validation

Extraction problems should be fixed in WDG rather than manually patching generated JSON.

---

## Repository Structure

```text
waysnx-ui-kit/
├── .github/
├── assets/
│   └── branding/
│       ├── waysnx-ui-kit-logo.png
│       ├── waysnx-ui-kit-logo@2x.png
│       └── waysnx-ui-kit-mark.png
├── decisions/
├── docs/
├── examples/
│   ├── README.md
│   └── waysnx-admin-demo/
│       └── README.md
├── packages/
├── schemas/
├── specification/
├── storybook/
│   └── README.md
├── playwright/
│   └── README.md
├── templates/
├── tests/
├── tools/
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

Each top-level directory has a defined purpose. Documentation is intentionally kept at the appropriate repository and project levels rather than adding a README to every source folder.

---

## Development

The commands in this section are for developers working on the `waysnx-ui-kit` repository.

### Install repository dependencies

```bash
pnpm install
```

### Build the workspace

```bash
pnpm build
```

### Run the development environment

```bash
pnpm dev
```

### Run tests

```bash
pnpm test
```

> The currently operational validation layers are Storybook and Playwright (see below). A package-level unit-test layer is not yet configured, so `pnpm test` is a placeholder until a unit-test runner is added.

### Run Playwright

```bash
pnpm test:e2e
```

### Run Storybook

```bash
pnpm storybook
```

### Run the reference application

```bash
pnpm demo
```

This starts the WaysNX Admin Demo at `http://localhost:5173`.

> Build the workspace packages first (`pnpm build`) before running the demo, as the application depends on the compiled library output.

> The repository package scripts are the authoritative command set. If scripts change during release stabilization, use the current scripts defined by the repository.

---

## Quality and Release Validation

The public-release validation covers:

- Library builds
- Type declarations
- CSS output
- Public exports
- Package metadata
- Peer dependencies
- Clean package installation
- Generated JSON schema
- Representative source-to-metadata validation
- Storybook production build
- Playwright critical flows
- Chromium, Firefox and WebKit
- SSR/hydration smoke tests
- Accessibility
- Security
- Documentation consistency

The release process follows:

**Freeze → Validate → Standardize → Fix → Document → Package → Release**

Non-blocking improvements should move to the post-release backlog rather than expanding the release scope.

---

## Contributing

Contributions are welcome.

Before submitting a change:

1. Review the repository documentation.
2. Check whether the capability already exists.
3. Keep changes focused.
4. Preserve public API consistency.
5. Add or update the narrowest appropriate tests.
6. Consider accessibility and keyboard behavior.
7. Validate package/build impact when exports or dependencies change.
8. Update documentation when public behavior changes.

See:

- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)
- [`SECURITY.md`](SECURITY.md)

---

## License

WaysNX UI Kit is released under the **Apache License 2.0**.

See [`LICENSE`](LICENSE).

---

## WaysNX Ecosystem

WaysNX UI Kit is part of the broader WaysNX engineering ecosystem.

Related projects include:

- WaysNX Business Framework (WBF)
- Development Quality Platform (DQP)
- WaysNX Studio
- PrjNx
- QA Catalyst
- API Form Builder
- HRMinder
- AI StrideFlow

The UI Kit focuses on reusable UI capabilities and is not intended to replace an application or backend framework.

---

## Links

- **Documentation:** https://uikit.waysnx.tech
- **NPM Organization:** https://www.npmjs.com/org/waysnx
- **GitHub:** https://github.com/waysnx
- **WaysNX:** https://waysnx.tech

---

**WaysNX Technologies Private Limited**  
**Initial public release: `1.0.0` · September 2026**
