# @waysnx/ui-feedback

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — alerts, notifications, toasts, and user feedback components.

Feedback and overlay components from WaysNX — Modal, Toast, Drawer, Tooltip, Skeleton, Progress, Badge, and more.

## Installation

```bash
npm install @waysnx/ui-feedback
```

Requires `react` (>=18) as a peer dependency.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-feedback/dist/index.css";
```

## Overview

`@waysnx/ui-feedback` provides overlay and status components for communicating state and capturing user attention. It covers dialogs, transient notifications, loading and empty states, and inline status indicators.

## Representative exports

- Overlays & dialogs: `Modal`, `ConfirmDialog`, `Drawer`, `Tooltip`
- Notifications: `Toast`, `Alert`, `Badge`
- Status & loading: `Spinner`, `Skeleton`, `Progress`, `CircularProgress`, `EmptyState`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { Alert } from "@waysnx/ui-feedback";

export function Example() {
  return <Alert>Your changes have been saved.</Alert>;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
