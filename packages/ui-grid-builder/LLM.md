# @waysnx/ui-grid-builder — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Data grid with sorting, filtering, pagination, column types, row actions, and row selection. Built on TanStack Table. Use this for displaying tabular data.

---

## Package info

- **npm:** `@waysnx/ui-grid-builder` v1.0.1
- **Peer deps:** `@tanstack/react-table ^8.0.0`, `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-grid-builder/dist/index.css'`

---

## Exports

**Component:** `Grid` (data grid)
**Function:** `schemaToGridConfig` (converts JSON schema to grid column config)
**Types:** `GridProps`, `GridColumn`, `GridAction`, `GridColumnType`, `GridSchema`, `GridSchemaProperty`, `GridActionDef`, `GridConfig`, `GridSettingsGroup`, `GridPaginationGroup`, `GridFiltersGroup`, `GridColumnsGroup`, `GridActionsGroup`, `GridSelectionGroup`

> ⚠️ **Name clash:** `@waysnx/ui-layout` also exports a layout `Grid`. When using both, alias this one: `import { Grid as DataGrid } from '@waysnx/ui-grid-builder'`.

---

## GridProps

```ts
interface GridProps {
  data: Record<string, any>[];       // required — row data
  columns: GridColumn[];             // required — column definitions
  title?: string;
  pageSize?: number;                 // default rows per page
  pageSizeOptions?: number[];        // e.g. [10, 25, 50]
  actions?: GridAction[];            // row action buttons
  loading?: boolean;
  emptyMessage?: string;
  showColumnToggle?: boolean;        // toggle column visibility
  showColumnFilter?: boolean;        // default true — per-column filter icons
  showGlobalFilter?: boolean;        // default false — search across all columns
  actionsAsMenu?: boolean;           // default true — kebab ⋮ dropdown
  showRowSelection?: boolean;        // default false
  selectionMode?: 'checkbox' | 'radio';
  selectionActions?: GridAction[];   // bulk actions when rows selected
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  toolbarActions?: ReactNode;        // custom toolbar buttons
  onRowClick?: (row: Record<string, any>) => void;
  className?: string;
  serverSide?: boolean;              // external pagination
  totalCount?: number;               // total records (server-side)
  onPageFetch?: (params: { pageIndex: number; pageSize: number }) => void;
  tableLayout?: 'auto' | 'fixed';   // default 'auto' — 'fixed' enforces strict widths, supports %
  testId?: string;
}
```

## GridColumn

```ts
interface GridColumn {
  key: string;                       // required — data field key
  title: string;                     // required — header label
  type?: 'text' | 'number' | 'currency' | 'percentage' | 'email' | 'date' | 'boolean' | 'badge' | 'image' | 'custom';
  render?: (value: any, row: Record<string, any>) => ReactNode;  // custom renderer
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  dateFormat?: string;
  currencySymbol?: string;           // e.g. '$', '€'
  currencyPosition?: 'start' | 'end';
  decimals?: number;
  align?: 'left' | 'center' | 'right';
  badgeMap?: Record<string, { label?: string; color: string; bg: string }>;
}
```

## GridAction

```ts
interface GridAction {
  label: string;
  icon?: ReactNode;
  onClick: (row: Record<string, any>) => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  hidden?: (row: Record<string, any>) => boolean;
}
```

---

## Complete example

```tsx
import { Grid as DataGrid } from '@waysnx/ui-grid-builder';
import type { GridColumn, GridAction } from '@waysnx/ui-grid-builder';
import '@waysnx/ui-grid-builder/dist/index.css';

const columns: GridColumn[] = [
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', type: 'email' },
  { key: 'amount', title: 'Amount', type: 'currency', currencySymbol: '$', decimals: 2 },
  { key: 'date', title: 'Date', type: 'date', dateFormat: 'MMM dd, yyyy' },
  {
    key: 'status',
    title: 'Status',
    type: 'badge',
    badgeMap: {
      active:   { label: 'Active',   color: '#166534', bg: '#dcfce7' },
      inactive: { label: 'Inactive', color: '#991b1b', bg: '#fee2e2' },
      pending:  { label: 'Pending',  color: '#92400e', bg: '#fef3c7' },
    },
  },
];

const actions: GridAction[] = [
  { label: 'Edit', onClick: (row) => console.log('Edit', row), variant: 'primary' },
  { label: 'Delete', onClick: (row) => console.log('Delete', row), variant: 'destructive' },
];

function UsersTable({ data }: { data: Record<string, any>[] }) {
  return (
    <DataGrid
      title="Users"
      data={data}
      columns={columns}
      actions={actions}
      pageSize={10}
      showGlobalFilter
      showColumnToggle
    />
  );
}
```

---

## Table Layout

Use `tableLayout="fixed"` to enforce strict column widths. Supports pixel and percentage values. Columns without `width` share remaining space equally.

```tsx
const columns: GridColumn[] = [
  { key: 'id', title: 'ID', width: '60px' },
  { key: 'name', title: 'Name', width: '30%' },
  { key: 'email', title: 'Email' },  // auto — takes remaining space
];

<DataGrid columns={columns} data={data} tableLayout="fixed" />
```

| Mode | `width` behavior | No `width` behavior |
|------|-----------------|-------------------|
| `auto` (default) | Suggestion — browser adjusts | Sized by content |
| `fixed` | Strictly enforced (px, %) | Equal share of remaining space |


---

## i18n Keys

The Grid component uses the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `grid.rowsPerPage` | "Rows per page:" | Pagination label |
| `grid.of` | "of" | Pagination info "X–Y of Z" |
| `grid.noRecords` | "0 records" | Empty pagination state |
| `grid.rowsSelected` | "{count} row(s) selected" | Selection bar count |
| `grid.clear` | "Clear" | Selection bar clear button |
| `grid.searchAllColumns` | "Search all columns..." | Global search placeholder |
| `grid.clearSearch` | "Clear search" | Clear search button title |
| `grid.totalRecords` | "Total Records:" | Toolbar record count |
| `grid.columns` | "Columns" | Column toggle button + dropdown title |
| `grid.actions` | "Actions" | Row actions column header (override per-grid with `actionsColumnTitle` prop) |
