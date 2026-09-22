# @waysnx/ui-core — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit) or install `@waysnx/ui-kit` and read its `LLM.md`.

---

## ⭐ What this package does

Base UI primitives — 25+ components including Input, Button, Select, DatePicker, FileUpload, and more. Use these for **standalone, non-form controls** (e.g. a search box, a toolbar button, a standalone toggle).

> **For forms** (multiple fields + submit): use `DynamicForm` from `@waysnx/ui-form-builder` with a JSON schema + layout. Do NOT hand-assemble forms from these primitives.

---

## Package info

- **npm:** `@waysnx/ui-core` v1.0.1
- **Peer deps:** `react >=18`, `react-dom >=18`, `react-datepicker ^8.0.0`
- **CSS (required):** `import '@waysnx/ui-core/dist/index.css'`
- **Also import:** `import 'react-datepicker/dist/react-datepicker.css'` (for DatePicker)

---

## Exported components

Each exports the component + a `<Name>Props` interface.

| Component | Import | Purpose |
|-----------|--------|---------|
| `Button` | `import { Button } from '@waysnx/ui-core'` | 5 variants: primary, secondary, destructive, outline, ghost |
| `Input` | `import { Input } from '@waysnx/ui-core'` | Text input with label, hint, error, password toggle, masking |
| `Currency` | `import { Currency } from '@waysnx/ui-core'` | Formatted currency input |
| `Textarea` | `import { Textarea } from '@waysnx/ui-core'` | Multi-line text |
| `Checkbox` | `import { Checkbox } from '@waysnx/ui-core'` | Single or group (+ `CheckboxOption`) |
| `Radio` | `import { Radio } from '@waysnx/ui-core'` | Radio group (+ `RadioOption`) |
| `Switch` | `import { Switch } from '@waysnx/ui-core'` | Toggle switch |
| `Select` | `import { Select } from '@waysnx/ui-core'` | Dropdown (+ `SelectOption`) |
| `Autocomplete` | `import { Autocomplete } from '@waysnx/ui-core'` | Searchable dropdown (+ `AutocompleteOption`) |
| `DatePicker` | `import { DatePicker } from '@waysnx/ui-core'` | Date selection |
| `DateRangePicker` | `import { DateRangePicker } from '@waysnx/ui-core'` | Date range |
| `DateTimePicker` | `import { DateTimePicker } from '@waysnx/ui-core'` | Date + time |
| `TimePicker` | `import { TimePicker } from '@waysnx/ui-core'` | Time only |
| `FileUpload` | `import { FileUpload } from '@waysnx/ui-core'` | Drag-drop file upload with preview |
| `HtmlEditor` | `import { HtmlEditor } from '@waysnx/ui-core'` | Rich text editor |
| `HtmlContent` | `import { HtmlContent } from '@waysnx/ui-core'` | Sanitized HTML renderer |
| `Hidden` | `import { Hidden } from '@waysnx/ui-core'` | Hidden field |
| `Link` | `import { Link } from '@waysnx/ui-core'` | Styled link |
| `Tree` | `import { Tree } from '@waysnx/ui-core'` | Tree view (+ `TreeNode`) |
| `Slider` | `import { Slider } from '@waysnx/ui-core'` | Range slider |
| `ErrorMessage` | `import { ErrorMessage } from '@waysnx/ui-core'` | Error display |
| `SpeechToTextTextarea` | `import { SpeechToTextTextarea } from '@waysnx/ui-core'` | Voice-to-text textarea |
| `IFrame` | `import { IFrame } from '@waysnx/ui-core'` | Sandboxed iframe |
| `Image` | `import { Image } from '@waysnx/ui-core'` | Image with fit/caption |

## Exported utilities

| Export | Purpose |
|--------|---------|
| `useDebounce(value, delay)` | Debounce hook |
| `validateRequired`, `validateEmail`, `validatePattern`, `validateMinLength`, `validateMaxLength`, `validateMin`, `validateMax`, `runValidations` | Validation helpers |
| `TranslationProvider`, `useTranslation` | Re-exported from `@waysnx/ui-i18n` |

---

## Key prop interfaces

### Button
```ts
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode; // required
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  testId?: string;
}
```

### Input
```ts
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onValidation?: (isValid: boolean) => void;
  errorMessage?: string;
  mask?: boolean | string;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  testId?: string;
}
```

### Select
```ts
interface SelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  error?: string;       // Shows red border + error text below the dropdown
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  // ... plus async/xref options
}
interface SelectOption { label: string; value: string; }
```

### Radio
```ts
interface RadioProps {
  label?: string;
  name: string;
  options?: RadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  columns?: number;
  error?: string;       // Shows red border around group + error text below
  ariaDescribedBy?: string;
  // ... plus async/xref options
}
interface RadioOption { label: string; value: string | number; }
```

### Checkbox
```ts
interface CheckboxProps {
  // Single checkbox mode
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean | (string | number)[]) => void;
  disabled?: boolean;
  error?: string;       // Shows red border around group + error text below

  // Checkbox group mode
  options?: CheckboxOption[];
  value?: (string | number)[];
  columns?: number;
  groupLabel?: string;
  // ... plus async/xref options
}
interface CheckboxOption { label: string; value: string | number; }
```

### FileUpload
```ts
interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  onChange?: (files: File[] | string[]) => void;
  onError?: (error: string) => void;
  format?: 'blob' | 'binary';
  showPreview?: boolean;
  autoUpload?: boolean;
  browseButtonText?: string;
  uploadedFiles?: Array<{ name: string; url: string }>;
  onUpload?: (files: File[]) => void;
  onDelete?: (file: { name: string; url: string }) => void;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  uploadProgress?: number;
  testId?: string;
}
```

All visible FileUpload text is translatable via `@waysnx/ui-i18n`:

| Translation Key | Default (English) | Shown where |
|---|---|---|
| `fileUpload.dropHere` | `"Drop files here or"` | Drop zone primary text |
| `fileUpload.browse` | `"Browse File"` | Drop zone browse text (also overridable via `browseButtonText` prop) |
| `fileUpload.accepted` | `"Accepted:"` | Accepted types label |
| `fileUpload.maxSize` | `"Max size:"` | Max size label |
| `fileUpload.uploading` | `"Uploading..."` | Upload progress status |
| `fileUpload.uploaded` | `"Uploaded"` | Upload success status |
| `fileUpload.uploadFailed` | `"Upload failed"` | Upload error status |
| `fileUpload.readyToUpload` | `"Ready to upload"` | Manual upload mode status |
| `fileUpload.upload` | `"Upload"` | Manual upload button |
| `fileUpload.uploadedFiles` | `"Uploaded Files:"` | Section header for pre-existing server files |
| `fileUpload.uploadedFilesRegion` | `"Uploaded files"` | `aria-label` on the uploaded files region |
```

---

## Theming

Override `--wx-*` CSS variables:
```css
:root {
  --wx-color-primary: #2563eb;
  --wx-color-primary-hover: #1d4ed8;
  --wx-font-family: 'Poppins', sans-serif;
  --wx-radius-md: 12px;
  --wx-input-height: 44px;
}
```

---

## Accessibility Font Scaling

All `--wx-font-size-*` tokens use `calc(Xpx * var(--wx-accessibility-font-scale, 1))`. When `@waysnx/ui-accessibility` changes text size, all components scale automatically — no per-component overrides needed.

---

## Component Notes

- **Button** — `display: inline-flex` with `align-items: center; gap: 6px`. Icon+text children align properly without extra wrappers.
- **Input** — Has `width: 100%` by default. Won't overflow grid/flex parent containers.
- **Radio** — Uses `<fieldset>` internally but resets browser border/padding to `none`. No unwanted box styling. Pass `error` prop to show a red border around the group and an error text below.
- **Checkbox** — In group mode uses `<fieldset>`. Pass `error` prop to show a red border around the group and an error text below.
- **Select** — All three render modes (single, searchable single, multi) support the `error` prop — adds `wx-select-error` class for red border and renders `wx-select-error-text` below the trigger.
