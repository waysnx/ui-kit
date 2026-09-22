# @waysnx/ui-i18n — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Shared i18n provider for all WaysNX UI Kit packages. Wrap your app with `TranslationProvider` to set locale and messages — all WaysNX components will render in the selected language.

---

## Package info

- **npm:** `@waysnx/ui-i18n` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta, but re-exported by `@waysnx/ui-core`)
- **Install:** `npm install @waysnx/ui-i18n` (or get it via `@waysnx/ui-core` / `@waysnx/ui-kit`)
- **Peer deps:** `react >=18`
- **CSS:** None (this package ships no CSS)

---

## Exports

| Export | Purpose |
|--------|---------|
| `TranslationProvider` | Wrap app to set locale + messages |
| `useTranslation()` | Hook → `{ t, locale, direction }` |
| `withTranslation(Component)` | HOC alternative to hook |
| `defaultMessages` | English messages (fallback) |
| `esMessages` | Spanish locale pack |
| `frMessages` | French locale pack |
| `arMessages` | Arabic locale pack (RTL) |

### Types
`TranslationMessages`, `TranslationConfig`, `TranslationProviderProps`, `AllMessages`, `UICoreMessages`, `UIFormBuilderMessages`, `UIGridBuilderMessages`, `UILayoutMessages`, `UIFeedbackMessages`, `UINavigationMessages`, `UIDashboardMessages`, `UIAccessibilityMessages`, and more.

---

## Usage

```tsx
import { TranslationProvider, esMessages } from '@waysnx/ui-i18n';

function App() {
  return (
    <TranslationProvider locale="es" messages={esMessages}>
      {/* All WaysNX components render in Spanish */}
      <YourApp />
    </TranslationProvider>
  );
}
```

### Custom translations (partial override)

```tsx
const germanMessages = {
  'validation.required': 'Dieses Feld ist erforderlich',
  'wizard.next': 'Weiter',
  'grid.rowsPerPage': 'Zeilen pro Seite:',
};

<TranslationProvider locale="de" messages={germanMessages}>
  <App />
</TranslationProvider>
```

### Using the hook

```tsx
import { useTranslation } from '@waysnx/ui-i18n';

function MyComponent() {
  const { t, locale, direction } = useTranslation();
  return (
    <div dir={direction}>
      <p>{t('validation.required')}</p>
      <p>{t('validation.minLength', { min: 5 })}</p>
    </div>
  );
}
```

---

## Features

- Zero breaking changes — components work without provider (English defaults)
- 50+ translatable keys (validation, buttons, labels, aria-text)
- Partial overrides — provide only what you need, rest falls back to English
- RTL auto-detection for Arabic, Hebrew, Persian, Urdu
- Interpolation: `t('key', { variable: value })`

---

## FileUpload translation keys

All user-visible text in `FileUpload` (including aria labels) is routed through `t()`:

| Key | Default | Notes |
|---|---|---|
| `fileUpload.dropHere` | `"Drop files here or"` | |
| `fileUpload.browse` | `"Browse File"` | Also overridable via `browseButtonText` prop |
| `fileUpload.accepted` | `"Accepted:"` | |
| `fileUpload.maxSize` | `"Max size:"` | |
| `fileUpload.uploading` | `"Uploading..."` | |
| `fileUpload.uploaded` | `"Uploaded"` | |
| `fileUpload.uploadFailed` | `"Upload failed"` | |
| `fileUpload.readyToUpload` | `"Ready to upload"` | |
| `fileUpload.upload` | `"Upload"` | Button label + aria-label |
| `fileUpload.uploadedFiles` | `"Uploaded Files:"` | Section header for pre-existing server files |
| `fileUpload.uploadedFilesRegion` | `"Uploaded files"` | `aria-label` on the uploaded files region |
