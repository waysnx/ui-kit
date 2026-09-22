# @waysnx/ui-form-builder — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ CRITICAL: ALL forms MUST use `DynamicForm`

When building ANY form in an application that uses this library, you MUST:
1. Define a **JSON `schema`** (data shape, validation, types)
2. Define a **`FormLayout`** (rows, cells, column widths, buttons)
3. Render `<DynamicForm schema={schema} formLayout={layout} onSubmit={...} />`

**Do NOT hand-build forms from `Input`/`Textarea`/`Select`/`Checkbox`/`DatePicker`.** Those primitives exist in `@waysnx/ui-core` for standalone non-form controls only.

---

## Package info

- **npm:** `@waysnx/ui-form-builder` v1.0.1
- **Peer deps:** `@waysnx/ui-core >=1.0.0`, `react >=18`, `react-dom >=18`
- **CSS (required):**
  ```ts
  import '@waysnx/ui-core/dist/index.css';
  import '@waysnx/ui-form-builder/dist/index.css';
  import 'react-datepicker/dist/react-datepicker.css';
  ```

---

## Exports

**Components:** `DynamicForm` (+`DynamicFormProps`), `FormArray` (+`FormArrayProps`)

**Functions:** `schemaToFormFields`, `resolveField`, `evaluateCondition`, `evaluateConditions`, `shouldShowField`, `shouldDisableField`, `shouldRequireField`

**Types:** `JSONSchema`, `JSONSchemaProperty`, `FormFieldConfig`, `ControlCondition`, `FormLayout`, `GridRow`, `GridCell`, `CellSettings`, `RowSettings`, `LayoutSettings`, `LayoutButton`

---

## DynamicForm — Complete example

```tsx
import { DynamicForm } from '@waysnx/ui-form-builder';
import type { JSONSchema, FormLayout } from '@waysnx/ui-form-builder';

const schema: JSONSchema = {
  type: 'object',
  title: 'Invoice',
  properties: {
    invoiceNumber: { type: 'string', title: 'Invoice Number', default: 'INV-1001' },
    issueDate:     { type: 'string', format: 'date', title: 'Issue Date' },
    dueDate:       { type: 'string', format: 'date', title: 'Due Date', 'x-show-past-dates': false },
    fromName:      { type: 'string', title: 'From Name' },
    fromEmail:     { type: 'string', format: 'email', title: 'From Email' },
    fromAddress:   { type: 'string', title: 'From Address' },
    billToName:    { type: 'string', title: 'Bill To Name' },
    billToEmail:   { type: 'string', format: 'email', title: 'Bill To Email' },
    billToAddress: { type: 'string', title: 'Bill To Address' },
    notes:         { type: 'string', title: 'Notes' },
  },
  required: ['invoiceNumber', 'issueDate', 'fromName', 'billToName'],
};

const layout: FormLayout = {
  rows: [
    {
      cells: [
        { settings: { fieldName: 'invoiceNumber', title: 'Invoice Number', controlType: 'input', inputType: 'text', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'issueDate', title: 'Issue Date', controlType: 'input', inputType: 'date', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'dueDate', title: 'Due Date', controlType: 'input', inputType: 'date', 'x-col-size': 4 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'fromName', title: 'Name', controlType: 'input', inputType: 'text', 'x-col-size': 6, required: true } },
        { settings: { fieldName: 'fromEmail', title: 'Email', controlType: 'input', inputType: 'email', 'x-col-size': 6 } },
        { settings: { fieldName: 'fromAddress', title: 'Address', controlType: 'textarea', 'x-col-size': 12, 'x-rows': 2 } },
      ],
      settings: { cssClass: 'from-section' },
    },
    {
      cells: [
        { settings: { fieldName: 'billToName', title: 'Name', controlType: 'input', inputType: 'text', 'x-col-size': 6, required: true } },
        { settings: { fieldName: 'billToEmail', title: 'Email', controlType: 'input', inputType: 'email', 'x-col-size': 6 } },
        { settings: { fieldName: 'billToAddress', title: 'Address', controlType: 'textarea', 'x-col-size': 12, 'x-rows': 2 } },
      ],
      settings: { cssClass: 'bill-to-section' },
    },
    {
      cells: [
        { settings: { fieldName: 'notes', title: 'Notes', controlType: 'textarea', 'x-col-size': 12, 'x-rows': 3 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Invoice',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Cancel', name: 'cancel', type: 'button', appearance: 'accent' },
      { label: 'Save', name: 'save', type: 'submit', appearance: 'primary' },
    ],
  },
};

export function InvoiceForm() {
  return (
    <DynamicForm
      schema={schema}
      formLayout={layout}
      onSubmit={(data) => console.log('Submitted:', data)}
      onBtnClick={(name) => console.log('Button clicked:', name)}
    />
  );
}
```

---

## DynamicForm props

| Prop | Type | Description |
|------|------|-------------|
| `schema` | `JSONSchema \| string` | JSON schema (required unless `formLayoutId` used) |
| `formLayout` | `FormLayout \| string` | Layout config (required unless `formLayoutId` used) |
| `formLayoutId` | `string` | Fetches schema+layout from WaysNX API automatically |
| `formData` | `Record<string, any>` | Pre-fill values |
| `formClass` | `string` | CSS class on the `<form>` |
| `isFormReadonly` | `boolean` | Read-only mode |
| `onSubmit` | `(data) => void` | Submit handler |
| `onBtnClick` | `(buttonName) => void` | Non-submit button clicks |
| `onFieldChange` | `(name, value, formData) => void` | Field change events |
| `onFormReady` | `(form) => void` | Exposes `getData()`, `reset()`, `validate()` |
| `translations` | `Record<string, {...}>` | Field-level i18n overrides — also used in validation error summary for field labels and error messages |
| `showErrorSummary` | `boolean` | Show/hide the top-level error summary block on failed submit. Default: `false` (inline field errors are sufficient). Set to `true` to render an accessible `role="alert"` list above the form. |
| `testId` | `string` | Test automation ID |

---

## Layout cell settings (`controlType` values)

| controlType | inputType | Renders |
|-------------|-----------|---------|
| `input` | `text` | Text input |
| `input` | `number` | Number input |
| `input` | `email` | Email input |
| `input` | `tel` | Phone input |
| `input` | `password` | Password input |
| `input` | `date` | DatePicker |
| `textarea` | — | Textarea |
| `select` | — | Dropdown (needs `enum` in schema or `x-data`) |
| `multiselect` | — | Multi-select dropdown with checkboxes + Select All (needs `enum` in schema or `x-data`) |
| `autocomplete` | — | Searchable dropdown |
| `checkbox` | — | Checkbox(es) |
| `radio` | — | Radio group |
| `toggle` | — | Switch/toggle |
| `slider` | — | Range slider |
| `file-upload` | — | File upload |
| `html-editor` | — | Rich text editor |
| `date-range` | — | Date range picker |
| `hidden` | — | Hidden field |
| `tree` | — | Tree select |
| `link` | — | Display link |
| `button` | — | Button (non-field) |

### Cell settings reference

| Setting | Type | Description |
|---------|------|-------------|
| `fieldName` | `string` | Maps to schema property |
| `title` | `string` | Label |
| `controlType` | `string` | See table above |
| `inputType` | `string` | Sub-type for `input` |
| `x-col-size` | `number` (1–12) | Column width in 12-grid |
| `required` | `boolean` | Field required |
| `readonly` | `boolean` | Read-only |
| `disabled` | `boolean` | Disabled |
| `x-columns` | `number` | Grid columns for radio/checkbox |
| `x-rows` | `number` | Rows for textarea |
| `x-searchable` | `boolean` | Searchable select |
| `x-date-format` | `string` | e.g. `"dd/MM/yyyy"` |
| `cssClass` | `string` | CSS class on cell |

---

## FormArray — repeatable sections

```tsx
import { FormArray } from '@waysnx/ui-form-builder';

<FormArray
  label="Line Items"
  itemSchema={{
    type: 'object',
    properties: {
      description: { type: 'string', title: 'Description' },
      qty:         { type: 'number', title: 'Qty' },
      unitPrice:   { type: 'number', title: 'Unit Price' },
    },
    required: ['description', 'qty', 'unitPrice'],
  }}
  value={items}
  onChange={setItems}
  addButtonTitle="Add Item"
  minItems={1}
  maxItems={20}
/>
```

FormArray props: `label`, `itemSchema` (required), `value`, `onChange`, `canAdd`, `canDelete`, `addButtonTitle`, `deleteButtonTitle`, `minItems`, `maxItems`, `disabled`.

Nested arrays: use `type: 'array'` + `items: { type: 'object', properties: {...} }` in the itemSchema. Unlimited depth.

---

## Conditional logic (in schema properties)

| Extension | Purpose | Example |
|-----------|---------|---------|
| `x-show-when` | Show field when condition(s) met | `[{ name: 'type', value: 'business' }]` |
| `x-disable-when` | Disable field | `[{ name: 'locked', value: true }]` |
| `x-required-when` | Make required | `[{ name: 'method', value: 'email' }]` |

Operators: `==` (default), `!=`, `>`, `<`, `>=`, `<=`, `notEmpty`, `isEmpty`.

---

## Schema property extensions (`x-*`)

| Key | Type | Purpose |
|-----|------|---------|
| `x-component` | `string` | Force a specific component |
| `x-placeholder` | `string` | Placeholder text |
| `x-error-message` | `string` | Custom validation message |
| `x-mask` | `boolean \| string` | Input masking |
| `x-currency-symbol` | `string` | e.g. `'$'` |
| `x-accept` | `string` | File types for upload |
| `x-file-size` | `number` | Max file size (bytes) |
| `x-rows` | `number` | Textarea rows |
| `x-searchable` | `boolean` | Searchable select |
| `x-show-past-dates` | `boolean` | Allow past dates |
| `x-show-future-dates` | `boolean` | Allow future dates |
| `x-can-add` | `boolean` | FormArray add button |
| `x-can-delete` | `boolean` | FormArray delete button |
| `x-min-items` | `number` | FormArray minimum |
| `x-max-items` | `number` | FormArray maximum |

---

## Remote form loading

```tsx
<DynamicForm formLayoutId="your-layout-id" onSubmit={(data) => console.log(data)} />
// Fetches from https://api.apiformbuilder.com/pageLayouts/layout/{formLayoutId}
```


---

## i18n Keys

The DynamicForm component uses the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `formBuilder.loading` | "Loading form..." | Form loading state |
| `formBuilder.loadFailed` | "Failed to load form layout" | Error when schema/layout fails to parse |
| `formBuilder.fixErrors` | "Please fix the following errors:" | Validation error summary heading (only shown when `showErrorSummary={true}`) |
| `formBuilder.dismissInfo` | "Dismiss info" | Info banner dismiss button |
| `validation.required` | "This field is required" | Required field error message |

### Validation Error Summary — Translation Priority

Error summary field labels resolve as: `translations[field].label` → `schema.title` → `fieldName`.
Error messages resolve as: `translations[field].validation.required` → `t('validation.required')`.

```tsx
translations={{ firstName: { label: 'Nombre', validation: { required: 'Campo obligatorio' } } }}
// Error: "Nombre — Campo obligatorio"
```

---

## Inline field validation errors

All field types show an inline error message (red border + text below the field) on failed submit — not just `Input`. This includes:

| Component | Inline error shown |
|---|---|
| `Input`, `Textarea`, `Currency` | ✅ via own `error` prop |
| `DatePicker`, `DateTimePicker`, `TimePicker`, `DateRangePicker` | ✅ via own `error` prop |
| `Autocomplete` | ✅ via own `error` prop |
| `HtmlEditor`, `SpeechToTextTextarea`, `FileUpload` | ✅ via own `error` prop |
| `Select` (single, searchable, multi) | ✅ via `error` prop — red border + text below trigger |
| `Radio` | ✅ via `error` prop — red border around group + text below |
| `Checkbox` (group mode) | ✅ via `error` prop — red border around group + text below |

The error text is the same string that would appear in the error summary (`"Field Label — This field is required"`), with the label prefix stripped — only the error message part is shown inline.

Inline errors are cleared automatically when the user changes the field value.
