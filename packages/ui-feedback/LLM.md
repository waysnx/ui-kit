# @waysnx/ui-feedback — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Overlay and feedback components — Modal, Toast, Drawer, Tooltip, Badge, Skeleton, Progress, and more. Use these for notifications, loading states, confirmation dialogs, and side panels.

---

## Package info

- **npm:** `@waysnx/ui-feedback` v1.0.1
- **Peer deps:** `react >=18`
- **CSS (required):** `import '@waysnx/ui-feedback/dist/index.css'`

---

## Exported components

| Component | Key props | Purpose |
|-----------|-----------|---------|
| `Modal` | `open` (req), `onClose` (req), `title?`, `children` | Dialog overlay |
| `ConfirmDialog` | `open`, `onClose`, `onConfirm`, `title?`, `message?` | Confirmation prompt |
| `Drawer` | `open` (req), `onClose` (req), `position?` | Slide-in panel |
| `Tooltip` | `content`, `position?` (`'top'\|'bottom'\|'left'\|'right'`) | Hover info |
| `Badge` | `count?`, `variant?` | Notification dot/count |
| `Alert` | `type?`, `message` | Inline alert |
| `EmptyState` | `title?`, `description?`, `icon?` | Empty content placeholder |
| `Skeleton` | `width?`, `height?`, `variant?` | Loading placeholder |
| `Progress` | `value`, `max?` | Progress bar |
| `CircularProgress` | `value`, `size?` | Circular progress |
| `Spinner` | `size?` | Loading spinner |

## Toast system

```tsx
import { ToastProvider, useToast } from '@waysnx/ui-feedback';

// Wrap your app (required):
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Use anywhere inside the provider:
function MyComponent() {
  const toast = useToast();
  toast.success('Saved!');
  toast.error('Failed');
  toast.info('Note');
  toast.warning('Careful');
}
```

> ⚠️ `useToast()` throws if used outside `<ToastProvider>`.

Types: `ToastType` = `'success' | 'error' | 'info' | 'warning'`; `ToastPosition` for provider placement.

---

## Usage example

```tsx
import { useState } from 'react';
import { Modal, ToastProvider, useToast } from '@waysnx/ui-feedback';
import { Button } from '@waysnx/ui-core';
import '@waysnx/ui-feedback/dist/index.css';

function Example() {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm">
        <p>Are you sure?</p>
        <Button variant="primary" onClick={() => { toast.success('Done!'); setOpen(false); }}>
          Yes
        </Button>
      </Modal>
    </>
  );
}
```


---

## i18n Keys

Feedback components use the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `modal.close` | "Close modal" | Modal close button aria-label |
| `confirm.confirm` | "Confirm" | ConfirmDialog confirm button |
| `confirm.cancel` | "Cancel" | ConfirmDialog cancel button |
| `toast.close` | "Close notification" | Toast close button aria-label |
| `toast.successNotification` | "Success notification" | Toast success aria-label |
| `toast.errorNotification` | "Error notification" | Toast error aria-label |
| `toast.infoNotification` | "Info notification" | Toast info aria-label |
| `toast.warningNotification` | "Warning notification" | Toast warning aria-label |
| `drawer.close` | "Close drawer" | Drawer close button aria-label |
