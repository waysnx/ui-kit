# @waysnx/ui-kit

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — meta-package that installs all WaysNX UI libraries.

The aggregate WaysNX UI Kit package — install the primary libraries through one dependency.

## Installation

```bash
npm install @waysnx/ui-kit
```

Requires `react` and `react-dom` (>=18) as peer dependencies, plus `react-datepicker` (^8) and `@tanstack/react-table` (^8) for the date and grid capabilities of the bundled libraries.

## Overview

`@waysnx/ui-kit` is a convenience meta-package, not a separate component catalog. It re-exports the primary WaysNX UI Kit libraries so applications can depend on a single package. It bundles exactly:

- `@waysnx/ui-core`
- `@waysnx/ui-form-builder`
- `@waysnx/ui-layout`
- `@waysnx/ui-feedback`
- `@waysnx/ui-grid-builder`

Other WaysNX UI libraries (for example accessibility, navigation, security, and diagnostics) are published separately and are not included here. If you need a smaller dependency surface, install the individual focused packages instead.

## Usage

```tsx
import { Button } from "@waysnx/ui-kit";

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

## Documentation

Refer to the individual package READMEs for library-specific details, and the documentation site for the complete reference: https://uikit.waysnx.tech
