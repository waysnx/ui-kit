# @waysnx/ui-kit — AI Agent Integration Guide

> **Purpose:** This file is a self-contained, copy-paste-ready reference for AI coding agents (and developers) building apps with `@waysnx/ui-kit`. It lists every published package, exact install commands, exact import specifiers (including CSS), the full export surface, and working examples. Everything here is accurate for the versions listed. Do **not** invent component names or props that are not in this document.

---

## 1. What this package is

`@waysnx/ui-kit` is a **meta-package** for the WaysNX UI Kit: an enterprise-grade, modular React component library. Installing it pulls in five core packages and re-exports everything from them, so you can `import { ... } from '@waysnx/ui-kit'`.

- **Framework:** React 18+ (peer dependency)
- **Language:** TypeScript (full type definitions shipped)
- **Styling:** CSS custom properties with the `--wx-` prefix. CSS is **side-effect based** — you must import each package's compiled CSS once.
- **Registry:** Public npm — `https://registry.npmjs.org/`
- **License:** Apache-2.0

> The scope `@waysnx` resolves to the public npm registry by default. No auth/token is required to install published versions.

---

## 2. Install

### Complete kit (recommended)

```bash
npm install @waysnx/ui-kit react-datepicker @tanstack/react-table
```

`@waysnx/ui-kit@1.0.0` bundles:

| Bundled package | Version | npm name |
|---|---|---|
| Core components | ^1.0.0 | `@waysnx/ui-core` |
| Form builder | ^1.0.0 | `@waysnx/ui-form-builder` |
| Layout | ^1.0.0 | `@waysnx/ui-layout` |
| Feedback | ^1.0.0 | `@waysnx/ui-feedback` |
| Grid builder | ^1.0.0 | `@waysnx/ui-grid-builder` |

**Peer dependencies you must also install:** `react >=18`, `react-dom >=18`, `react-datepicker ^8.0.0`, `@tanstack/react-table ^8.0.0`.

### Companion packages (install separately as needed)

These are **not** included in the meta-package. Each peer-depends on some of the core packages above.

```bash
npm install @waysnx/ui-navigation      # v1.0.1  menus, sidebar, breadcrumbs, command palette
npm install @waysnx/ui-dashboard       # v1.0.1  chart-agnostic dashboard framework
npm install @waysnx/ui-security        # v1.0.1  auth, MFA, sessions, authorization gates
npm install @waysnx/ui-accessibility   # v1.0.1  accessibility control center
npm install @waysnx/ui-i18n            # v1.0.1  translations (no CSS)
```

---

## 3. CSS imports (required — do this once, e.g. in `main.tsx`)

Components are unstyled without these. Each package ships CSS at **both** `/dist/index.css` and `/dist/styles/index.css` (identical). Use `/dist/index.css`.

```ts
// Only import CSS for packages you actually use:
import '@waysnx/ui-core/dist/index.css';
import '@waysnx/ui-form-builder/dist/index.css';
import '@waysnx/ui-layout/dist/index.css';
import '@waysnx/ui-feedback/dist/index.css';
import '@waysnx/ui-grid-builder/dist/index.css';

// Third-party CSS required by ui-core DatePicker:
import 'react-datepicker/dist/react-datepicker.css';

// Companion packages (if installed):
import '@waysnx/ui-navigation/dist/index.css';
import '@waysnx/ui-dashboard/dist/index.css';
import '@waysnx/ui-security/dist/index.css';
import '@waysnx/ui-accessibility/dist/index.css';
// @waysnx/ui-i18n ships NO CSS.
```

> When importing from the meta-package `@waysnx/ui-kit`, still import the individual `dist/index.css` files above. The meta-package re-exports JS/TS but does not bundle a single combined stylesheet.

---

## 4. Import patterns

All of the following resolve through the meta-package:

```tsx
import {
  // ui-core
  Input, Button, Select, DatePicker, FileUpload,
  // ui-form-builder
  DynamicForm, FormArray, schemaToFormFields,
  // ui-layout
  Grid, Row, Column, Card, Tabs, Tab, TabList, TabPanels, TabPanel, Wizard, WizardStep,
  // ui-feedback
  Modal, Drawer, ToastProvider, useToast, Tooltip, Badge,
  // ui-grid-builder
  Grid as DataGrid, // NOTE name clash with layout Grid — alias one of them
} from '@waysnx/ui-kit';
```

> ⚠️ **Name clash:** `@waysnx/ui-layout` exports a layout `Grid` (CSS grid container) and `@waysnx/ui-grid-builder` exports a data `Grid` (table). Both are re-exported by the meta-package. When you need both, import the data grid with an alias, e.g. `import { Grid as DataGrid } from '@waysnx/ui-grid-builder'`, or import each from its own package to be explicit.

You can also import directly from a sub-package (recommended when you want to be unambiguous):

```tsx
import { Input, Button } from '@waysnx/ui-core';
import { DynamicForm } from '@waysnx/ui-form-builder';
import { Grid as DataGrid } from '@waysnx/ui-grid-builder';
```

---

## 5. Package export reference

### 5.1 `@waysnx/ui-core` (v1.0.1)
**Peer:** `react`, `react-dom`, `react-datepicker ^8`. **CSS:** `@waysnx/ui-core/dist/index.css`.

Each component ships alongside a `<Name>Props` type. Some also export option types.

**Components:** `Button`, `Input`, `Currency`, `Textarea`, `Checkbox` (+`CheckboxOption`), `Radio` (+`RadioOption`), `Switch`, `Select` (+`SelectOption`), `Autocomplete` (+`AutocompleteOption`), `DatePicker`, `DateRangePicker`, `DateTimePicker`, `TimePicker`, `FileUpload`, `HtmlEditor`, `HtmlContent`, `Hidden`, `Link`, `Tree` (+`TreeNode`), `Slider`, `ErrorMessage`, `SpeechToTextTextarea`, `IFrame`, `Image`.

**Utilities/hooks:** `useDebounce`; validation helpers `validateRequired`, `validateEmail`, `validatePattern`, `validateMinLength`, `validateMaxLength`, `validateMin`, `validateMax`, `runValidations`. Also re-exports `TranslationProvider`/`useTranslation` from ui-i18n.

Key props:
- **Input** (extends `InputHTMLAttributes`): `label?`, `error?`, `hint?`, `showPasswordToggle?`, `validateOnChange?`, `validateOnBlur?`, `onValidation?`, `errorMessage?`, `mask?` (`boolean | string`), `thousandSeparator?`, `decimalSeparator?`, `decimalScale?`, `allowNegative?`, `ariaLabel?`, `ariaDescribedBy?`, `testId?`.
- **Button** (extends `ButtonHTMLAttributes`): `children` (required), `variant?` (`'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'`), `className?`, `ariaLabel?`, `ariaPressed?`, `testId?`.
- **Select** (extends `SelectHTMLAttributes` minus `multiple`/`onChange`/`onError`): `label?`, `options?: SelectOption[]`, plus async/xref option support.
- **FileUpload:** `label?`, `accept?`, `multiple?`, `maxSize?` (bytes), `onChange?(files: File[] | string[])`, `onError?(error)`, `hint?`, `error?`, `disabled?`, `id?`, `className?`, `format?` (`'blob' | 'binary'`), `showPreview?`, `autoUpload?`, `browseButtonText?`, `uploadedFiles?: {name; url}[]`, `onUpload?(files)`, `onDelete?(file)`, `uploadStatus?` (`'idle' | 'uploading' | 'success' | 'error'`), `uploadProgress?` (0-100), `showLastModified?`, `testId?`.
- **DatePicker:** `value?: Date | null`, `onChange?(date: Date | null)`, plus `label`/format options.

### 5.2 `@waysnx/ui-form-builder` (v1.0.1)
**Peer:** `@waysnx/ui-core`, `react`, `react-dom`. **CSS:** `@waysnx/ui-form-builder/dist/index.css`.

**Components:** `DynamicForm` (+`DynamicFormProps`), `FormArray` (+`FormArrayProps`).
**Functions:** `schemaToFormFields`, `resolveField`, `evaluateCondition`, `evaluateConditions`, `shouldShowField`, `shouldDisableField`, `shouldRequireField`.
**Types:** `JSONSchema`, `JSONSchemaProperty`, `FormFieldConfig`, `ControlCondition`, `FormLayout`, `GridRow`, `GridCell`, `CellSettings`, `RowSettings`, `LayoutSettings`, `LayoutButton`.

**DynamicForm props:** `schema?` (`JSONSchema | string`), `formLayout?` (`FormLayout | string`), `formLayoutId?` (string — loads schema+layout from the WaysNX API `https://api.apiformbuilder.com/pageLayouts/layout/{formLayoutId}`), `formData?`, `formClass?`, `isFormReadonly?`, `onSubmit?(data)`, `onBtnClick?(buttonName)`, `onFieldChange?(name, value, formData)`, `onFormReady?({ getData, reset, validate })`.

### 5.3 `@waysnx/ui-layout` (v1.0.1)
**Peer:** `react`. **CSS:** `@waysnx/ui-layout/dist/index.css`.

**Components (+`Props`):** `PageLayout`, `PageHeader`, `PageContent`, `SidebarLayout`, `Container`, `Section`, `Grid`, `Row`, `Column`, `Stack`, `Divider`, `Spacer`, `Card`, `Panel`, `Tabs` (+`TabList`, `Tab`, `TabPanels`, `TabPanel`), `Accordion` (+`AccordionItem`), `Collapsible`, `Breadcrumb` (+`BreadcrumbItem`), `Stepper` (+`StepItem`), `PageTabs` (+`PageTab`), `SplitLayout`, `Wizard` (+`WizardStep`).

Sample props: `Container{ maxWidth?: 'sm'|'md'|'lg'|'xl'|'full' }`, `Grid{ columns?: number | string }`, `Stack{ direction?: 'vertical'|'horizontal' }`, `Card{ title?, className?, testId? }`, `Stepper{ steps: StepItem[]; currentStep }`.

### 5.4 `@waysnx/ui-feedback` (v1.0.1)
**Peer:** `react`. **CSS:** `@waysnx/ui-feedback/dist/index.css`.

**Components (+`Props`):** `Modal`, `ConfirmDialog`, `Toast`, `Tooltip`, `Drawer`, `Skeleton`, `Progress`, `CircularProgress`, `Badge`, `Alert`, `Spinner`, `EmptyState`.
**Toast system:** `ToastProvider` (+`ToastProviderProps`), `useToast()` hook (throws if used outside a provider), types `ToastItem`, `ToastType` (`'success'|'error'|'info'|'warning'`), `ToastPosition`.

Key props: `Modal{ open (required), onClose (required), ... }`, `Drawer{ open (required), onClose (required), ... }`, `ConfirmDialog{ open, title?, ... }`, `ToastProvider{ position?, ... }`.

### 5.5 `@waysnx/ui-grid-builder` (v1.0.1)
**Peer:** `@tanstack/react-table ^8`, `react`, `react-dom`. **CSS:** `@waysnx/ui-grid-builder/dist/index.css`.

**Component:** `Grid` (the data grid). **Function:** `schemaToGridConfig`.
**Types:** `GridProps`, `GridColumn`, `GridAction`, `GridColumnType`, `GridSchema`, `GridSchemaProperty`, `GridActionDef`, `GridConfig`, `GridSettingsGroup`, `GridPaginationGroup`, `GridFiltersGroup`, `GridColumnsGroup`, `GridActionsGroup`, `GridSelectionGroup`.

**GridProps:** `data` (required, `Record<string, any>[]`), `columns` (required, `GridColumn[]`), `title?`, `pageSize?`, `pageSizeOptions?`, `actions?: GridAction[]`, `loading?`, `emptyMessage?`, `showColumnToggle?`, `showColumnFilter?` (default true), `showGlobalFilter?` (default false), `actionsAsMenu?` (default true), `showRowSelection?` (default false), `selectionMode?` (`'checkbox'|'radio'`), `selectionActions?`, `onSelectionChange?(rows)`, `toolbarActions?`, `onRowClick?(row)`, `className?`, `serverSide?`, `totalCount?`, `onPageFetch?({ pageIndex, pageSize })`, `testId?`.

**GridColumn:** `key` (required), `title` (required), `type?` (`'text'|'number'|'currency'|'percentage'|'email'|'date'|'boolean'|'badge'|'image'|'custom'`), `render?(value, row)`, `width?`, `sortable?`, `filterable?`, `visible?`, `dateFormat?`, `currencySymbol?`, `currencyPosition?` (`'start'|'end'`), `decimals?`, `align?` (`'left'|'center'|'right'`), `badgeMap?: Record<string, { label?; color; bg }>`.

**GridAction:** `label`, `icon?`, `onClick(row)`, `variant?` (`'primary'|'secondary'|'destructive'|'ghost'`), `hidden?(row)`.

### 5.6 `@waysnx/ui-navigation` (v1.0.1) — companion
**Peer:** `react`, `react-dom`. **CSS:** `@waysnx/ui-navigation/dist/index.css`.

**Provider:** `NavigationProvider` (+`NavigationContextType`).
**Components (+`Props`):** `Menu`, `MenuItemComponent` (the `MenuItem` *component*, aliased to avoid clashing with the `MenuItem` *type*), `Sidebar`, `Navbar`, `Header`, `Breadcrumb`, `ContextMenu`, `MegaMenu`, `TreeMenu`, `Tabs`, `Drawer`, `CommandPalette`, `SearchNavigation`, `UserMenu`, `NotificationCenter`, `WorkspaceSwitcher`, `QuickActions`, `StepNavigation`, `FavoritesMenu`, `RecentItems`.
**Hooks:** `useNavigation`, `useSidebar`, `useMenu`, `useTabs`, `useDrawer`, `useBreadcrumb`, `useWorkspace`, `useCommandPalette`.
**Utils:** `createMenu`, `flattenMenu`, `findMenuItem`, `buildBreadcrumb`, `filterMenuByPermissions`, and related helpers.

### 5.7 `@waysnx/ui-dashboard` (v1.0.1) — companion
**Peer:** `react`, `react-dom`. **CSS:** `@waysnx/ui-dashboard/dist/index.css`.

**Provider:** `DashboardProvider`, `DashboardContext`.
**Hooks:** `useDashboard`, `useRefresh`, `useFullscreen`, `useWidget`, `useDashboardFilters`.
**Components:** `Dashboard`, `DashboardHeader`, `DashboardToolbar`, `DashboardSidebar`, `DashboardFooter`, `Widget` (+ states `WidgetLoading`/`WidgetEmpty`/`WidgetError`/`WidgetOffline`/`WidgetPermissionDenied`), `StatCard`, `MetricCard`, `ProgressCard`, `WidgetGrid`, `WidgetRow`, `WidgetColumn`, `WidgetContainer`, `ChartWidget`, `TableWidget`, `FormWidget`, `MarkdownWidget`, `HtmlWidget`, `DashboardFilterBar`, `DashboardSearch`.
**Utils:** persistence (`saveLayout`/`loadLayout`/`saveFilters`/`loadFilters`/`saveWidgets`/`loadWidgets`/`saveDashboard`/`loadDashboard`/`clearDashboard`/`clearAllDashboards`/`serializeDashboard`/`importDashboard`) and export (`exportDashboardAsPNG`/`exportDashboardAsPDF`/`exportDataAsCSV`/`exportDataAsExcel`/`printDashboard`/`exportDashboard`).
**Types:** `DashboardConfig`, `WidgetConfig`, `KPIData`, `MetricData`, `ChartWidgetProps`, `DashboardContextType`, `ExportConfig`, `RefreshConfig`, `FilterConfig`; unions `DashboardTheme` (`'light'|'dark'|'highContrast'|'enterprise'`), `WidgetVariant`, `WidgetState`, `TrendDirection`, `StatusType`.

> This dashboard framework is **chart-agnostic** — bring your own chart library and render it inside `ChartWidget`.

### 5.8 `@waysnx/ui-security` (v1.0.1) — companion
**Peer:** `react`, `react-dom`. **Deps:** `@waysnx/ui-core`, `@waysnx/ui-feedback`, `@waysnx/ui-layout`, `@waysnx/ui-i18n`. **CSS:** `@waysnx/ui-security/dist/index.css`.

**Providers/hooks:** `AuthenticationProvider`/`useAuthentication`, `SessionProvider`/`useSession`, `AuthorizationProvider`/`useAuthorization`, `MFAProvider`/`useMFA`; plus `useAuth`, `useIdleDetection`, `usePasswordValidation`, `useSecureStorage`, `useBiometricAuth`, `useOTP`.

**Component groups:**
- Authentication: `LoginForm`, `LoginCard`, `ChangePasswordForm`, `ForgotPasswordForm`
- Password: `PasswordInput`, `PasswordStrengthMeter`, `PasswordRequirements`, `PasswordGenerator`
- OTP: `OTPInput`, `OTPResendButton`, `OTPVerificationCard`
- Verification: `EmailVerificationCard`, `PhoneVerificationCard`, `DeviceVerificationDialog`, `VerificationStatus`
- Authorization gates: `PermissionGate`, `RoleGate`, `FeatureGate`, `ScopeGate`, `PolicyGate`, `AccessDenied`, `UnauthorizedPage`
- Session: `SessionTimeoutDialog`, `SessionCountdown`, `IdleMonitor`, `ActiveSessions`, `ConcurrentSessionDialog`, `KeepAliveButton`
- Secure inputs: `SecureInput`, `SecureTextarea`, `SecureUploader`, `SecureDownloadButton`, `SecureClipboardButton`, `SensitiveText`, `MaskedInput`, `PINInput`
- MFA: `MFASetupWizard`, `MFAVerificationDialog`, `AuthenticatorQRCode`, `BackupCodesCard`, `TrustedDeviceSelector`, `MFAStatus`, `BiometricButton`, `SecurityKeyButton`
- Security dashboard: `SecurityBanner`, `SecurityAlert`, `SecurityStatusCard`, `SecurityScore`, `EncryptionBadge`, `PasswordAgeIndicator`, `RiskScoreBadge`, `SecurityHealthIndicator`
- Audit: `AuditTimeline`, `AuditHistoryTable`, `LoginHistory`, `SecurityEventLog`, `ActivityFeed`
- Settings: `SecuritySettingsPanel`, `PasswordPolicyPanel`, `MFASettingsPanel`, `SessionPolicyPanel`, `TrustedDevicesPanel`, `PrivacySettingsPanel`, `SecurityLogsPanel`, `SecurityAlertsPanel`
- Captcha: `GoogleCaptcha`, `TurnstileCaptcha`, `HCaptcha`, `CaptchaContainer`
- SSO buttons: `GoogleLoginButton`, `MicrosoftLoginButton`, `GitHubLoginButton`, `OktaLoginButton`, `Auth0LoginButton`

**Types:** `User`, `Session`, `Permission`, `Role`, `AuthorizationContext`, `AuditEvent`, `LoginCredentials`, `PasswordPolicy`, `SecurityPolicy`, `RiskScore`, and more.

### 5.9 `@waysnx/ui-i18n` (v1.0.1) — companion
**Peer:** `react`. **No dependencies, no CSS.**

**Exports:** `TranslationProvider`, `useTranslation`, `withTranslation`, `defaultMessages`; locale packs `esMessages`, `frMessages`, `arMessages`; types `TranslationMessages`, `TranslationConfig`, `AllMessages`, and per-package message types (`UICoreMessages`, `UIFormBuilderMessages`, etc.).

### 5.10 `@waysnx/ui-accessibility` (v1.0.1) — companion
**Peer:** `react`, `react-dom`. **CSS:** `@waysnx/ui-accessibility/dist/index.css`.

**Context:** `AccessibilityProvider`, `AccessibilityContext`.
**Components:** `AccessibilityCenter`, `FloatingButton`, `ReadingGuide`, `Magnifier`, `SkipLinks`.
**Hooks:** `useAccessibility`, `useAccessibilityChange`, `useAccessibilityAnalytics`, `useAccessibilityProfile`, `useContrast`, `useFontScale`, `useFocus`, `useMotion`, `useSpeech`.
**Constants/utils:** `DEFAULT_SETTINGS`, `PRESET_PROFILES` (+ individual profiles like `PROFILE_LOW_VISION`, `PROFILE_DYSLEXIA`, etc.), `loadSettings`, `saveSettings`, `updateCSSVariables`; services `keyboardManager`, `focusManager`, `announcementService`.

---

## 6. Minimal working app

> Forms use `DynamicForm` (schema + layout), NOT hand-built primitives. See §7 for the full pattern.

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// UI Kit CSS (import once)
import '@waysnx/ui-core/dist/index.css';
import '@waysnx/ui-form-builder/dist/index.css';
import '@waysnx/ui-layout/dist/index.css';
import '@waysnx/ui-feedback/dist/index.css';
import '@waysnx/ui-grid-builder/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// App.tsx
import { DynamicForm } from '@waysnx/ui-form-builder';
import type { JSONSchema, FormLayout } from '@waysnx/ui-form-builder';
import { Card, Container } from '@waysnx/ui-layout';
import { ToastProvider, useToast } from '@waysnx/ui-feedback';

const schema: JSONSchema = {
  type: 'object',
  title: 'Sign up',
  properties: {
    name:  { type: 'string', title: 'Full Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
  required: ['name', 'email'],
};

const layout: FormLayout = {
  rows: [
    { cells: [
      { settings: { fieldName: 'name',  title: 'Full Name', controlType: 'input', inputType: 'text',  'x-col-size': 12, required: true } },
      { settings: { fieldName: 'email', title: 'Email',     controlType: 'input', inputType: 'email', 'x-col-size': 12, required: true } },
    ]},
  ],
  settings: {
    buttonsAlignment: 'text-right',
    buttons: [{ label: 'Submit', name: 'submit', type: 'submit', appearance: 'primary' }],
  },
};

function SignupCard() {
  const toast = useToast();
  return (
    <Card title="Sign up">
      <DynamicForm
        schema={schema}
        formLayout={layout}
        onSubmit={(data) => toast.success(`Saved ${data.name}!`)}
      />
    </Card>
  );
}

export default function App() {
  return (
    <ToastProvider position="top-right">
      <Container maxWidth="md">
        <SignupCard />
      </Container>
    </ToastProvider>
  );
}
```

> Use standalone `Input`/`Button`/`Select` from `@waysnx/ui-core` only for one-off controls that are NOT part of a form (e.g. a search box, a toolbar toggle). Anything with multiple fields and a submit action is a form → use `DynamicForm`.

---

## 7. Common recipes

### Data grid

```tsx
import { Grid as DataGrid } from '@waysnx/ui-grid-builder';
import type { GridColumn } from '@waysnx/ui-grid-builder';

const columns: GridColumn[] = [
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'price', title: 'Price', type: 'currency', currencySymbol: '$' },
  {
    key: 'status',
    title: 'Status',
    type: 'badge',
    badgeMap: {
      active:   { label: 'Active',   color: '#166534', bg: '#dcfce7' },
      inactive: { label: 'Inactive', color: '#991b1b', bg: '#fee2e2' },
    },
  },
];

<DataGrid
  data={rows}
  columns={columns}
  showGlobalFilter
  pageSize={10}
  actions={[{ label: 'Edit', onClick: (row) => console.log(row) }]}
/>
```

### ⭐ Forms — ALWAYS use `DynamicForm` with a JSON schema + layout

> **This is the single most important rule for this kit.** When you build ANY form (login, invoice, settings, checkout, contact, multi-section forms, etc.), you MUST generate a **JSON `schema`** + **`FormLayout`** and render them through `<DynamicForm>`. **Do NOT hand-assemble forms from `Input`, `Textarea`, `Select`, `Checkbox`, `DatePicker`, etc.** The primitives exist for one-off standalone controls, not for building forms. Hand-building a form from primitives is the wrong approach and defeats the purpose of this library (validation, layout, conditional logic, accessibility, and buttons are all handled by `DynamicForm`).

`DynamicForm` takes two objects:
1. **`schema`** (`JSONSchema`) — describes the *data*: field names, types, formats, validation (`required`, `pattern`, `minLength`, `enum`, etc.), and `x-*` behaviors.
2. **`formLayout`** (`FormLayout`) — describes the *presentation*: rows → cells, each cell binding a `fieldName` to a `controlType`, column widths (`x-col-size`, 1–12 grid), field groups, and buttons.

**Complete, runnable example — an invoice form (multiple sections):**

```tsx
import { DynamicForm } from '@waysnx/ui-form-builder';
import type { JSONSchema, FormLayout } from '@waysnx/ui-form-builder';
import '@waysnx/ui-core/dist/index.css';
import '@waysnx/ui-form-builder/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';

const schema: JSONSchema = {
  type: 'object',
  title: 'Invoice',
  properties: {
    invoiceNumber: { type: 'string', title: 'Invoice Number', default: 'INV-1001' },
    issueDate:     { type: 'string', format: 'date', title: 'Issue Date' },
    dueDate:       { type: 'string', format: 'date', title: 'Due Date', 'x-show-past-dates': false },
    fromName:      { type: 'string', title: 'Name' },
    fromEmail:     { type: 'string', format: 'email', title: 'Email' },
    fromAddress:   { type: 'string', title: 'Address' },
    billToName:    { type: 'string', title: 'Name' },
    billToEmail:   { type: 'string', format: 'email', title: 'Email' },
    billToAddress: { type: 'string', title: 'Address' },
  },
  required: ['invoiceNumber', 'issueDate', 'fromName', 'billToName'],
};

const layout: FormLayout = {
  rows: [
    // Section 1 — Invoice details (3 columns)
    {
      cells: [
        { settings: { fieldName: 'invoiceNumber', title: 'Invoice Number', controlType: 'input', inputType: 'text', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'issueDate', title: 'Issue Date', controlType: 'input', inputType: 'date', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'dueDate', title: 'Due Date', controlType: 'input', inputType: 'date', 'x-col-size': 4 } },
      ],
    },
    // Section 2 — From (2 columns + full-width textarea)
    {
      cells: [
        { settings: { fieldName: 'fromName', title: 'Name', controlType: 'input', inputType: 'text', 'x-col-size': 6, required: true } },
        { settings: { fieldName: 'fromEmail', title: 'Email', controlType: 'input', inputType: 'email', 'x-col-size': 6 } },
        { settings: { fieldName: 'fromAddress', title: 'Address', controlType: 'textarea', 'x-col-size': 12, 'x-rows': 2 } },
      ],
    },
    // Section 3 — Bill To
    {
      cells: [
        { settings: { fieldName: 'billToName', title: 'Name', controlType: 'input', inputType: 'text', 'x-col-size': 6, required: true } },
        { settings: { fieldName: 'billToEmail', title: 'Email', controlType: 'input', inputType: 'email', 'x-col-size': 6 } },
        { settings: { fieldName: 'billToAddress', title: 'Address', controlType: 'textarea', 'x-col-size': 12, 'x-rows': 2 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Invoice Details',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Cancel', name: 'cancel', type: 'button', appearance: 'accent' },
      { label: 'Save Invoice', name: 'save', type: 'submit', appearance: 'primary' },
    ],
  },
};

export function InvoiceForm() {
  return (
    <DynamicForm
      schema={schema}
      formLayout={layout}
      onSubmit={(data) => console.log('submit', data)}
      onBtnClick={(name) => console.log('button', name)}
      onFieldChange={(name, value) => console.log(name, value)}
    />
  );
}
```

**Repeatable rows (e.g. invoice line items) — use `FormArray`:**

```tsx
import { FormArray } from '@waysnx/ui-form-builder';

<FormArray
  label="Line Items"
  itemSchema={{
    type: 'object',
    properties: {
      description: { type: 'string', title: 'Description' },
      qty:         { type: 'number', title: 'Qty' },
      unitPrice:   { type: 'number', title: 'Unit Price', 'x-currency-symbol': '$' },
    },
    required: ['description', 'qty', 'unitPrice'],
  }}
  value={lineItems}
  onChange={setLineItems}
  addButtonTitle="Add Item"
  minItems={1}
/>
```

**`controlType` → component mapping** (use these strings in `layout.cells[].settings.controlType`):
`input` (with `inputType`: `text | number | email | tel | password | date`), `textarea`, `select`, `autocomplete`, `checkbox`, `radio`, `toggle`, `slider`, `file-upload`, `html-editor`, `date-range`, `tree`, `hidden`, `link`, `button`, `html`.

**Loading schema+layout from the WaysNX API instead of inline objects:**

```tsx
<DynamicForm formLayoutId="your-layout-id" onSubmit={(data) => console.log(data)} />
// Fetches from https://api.apiformbuilder.com/pageLayouts/layout/{formLayoutId}
```

> Both `schema` and `formLayout` are required together (unless you use `formLayoutId`). If either is missing, `DynamicForm` renders nothing.

### Modal

```tsx
import { useState } from 'react';
import { Modal } from '@waysnx/ui-feedback';
import { Button } from '@waysnx/ui-core';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Hello">
        Modal content
      </Modal>
    </>
  );
}
```

### Internationalization

```tsx
import { TranslationProvider, esMessages } from '@waysnx/ui-i18n';

<TranslationProvider locale="es" messages={esMessages}>
  <App />
</TranslationProvider>
```

---

## 8. Theming

Override `--wx-*` CSS custom properties in your global stylesheet (after the kit CSS imports):

```css
:root {
  --wx-color-primary: #2563eb;
  --wx-color-primary-hover: #1d4ed8;
  --wx-font-family: 'Poppins', sans-serif;
  --wx-radius-md: 12px;
  --wx-input-height: 44px;
}
```

Tokens cover colors, typography, radius, shadows, spacing, input height, focus rings, and overlays. Dark mode is supported via the token system.

---

## 9. Rules for AI agents (do / don't)

- ⭐ **FORMS: always use `DynamicForm` with a JSON `schema` + `FormLayout`** (see §7). Generate the schema and layout objects; let `DynamicForm` render the fields, validation, and buttons. **Never hand-assemble a form out of `Input`/`Textarea`/`Select`/`Checkbox`/`DatePicker`.** Primitives are for standalone, non-form controls only.
- ⭐ **Repeatable form sections** (line items, contacts, addresses) → use `FormArray`, not a manually mapped array of inputs.
- ✅ **Do** import CSS for every kit package you use (see §3). Missing CSS = unstyled components.
- ✅ **Do** install the peer deps: `react-datepicker@^8` (needed by ui-core DatePicker) and `@tanstack/react-table@^8` (needed by ui-grid-builder).
- ✅ **Do** alias the data grid (`Grid as DataGrid`) when also using the layout `Grid`.
- ✅ **Do** wrap toast usage in `<ToastProvider>` — `useToast()` throws outside it.
- ✅ **Do** use only the component and prop names in this document.
- ❌ **Don't** build forms field-by-field with primitives — that is the most common mistake with this kit. If you find yourself writing `<Input>`/`<Textarea>` for form fields, stop and switch to `DynamicForm` with a schema + layout.
- ❌ **Don't** assume the meta-package ships a single combined CSS file — import each sub-package's `dist/index.css`.
- ❌ **Don't** invent props. If a prop isn't listed here, read the package's `.d.ts` types (shipped in `dist/`) before using it.
- ❌ **Don't** use companion packages (`ui-navigation`, `ui-dashboard`, `ui-security`, `ui-accessibility`, `ui-i18n`) without installing them separately — they are not in the meta-package.

---

## 10. Verifying available versions

```bash
npm view @waysnx/ui-kit version
npm view @waysnx/ui-kit dependencies
npm view @waysnx/ui-core version
```

If a version listed here differs from what `npm view` reports, trust `npm view` — this document reflects the versions at the time of writing (meta v1.0.1).
