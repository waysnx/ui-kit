# @waysnx/ui-dashboard — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Chart-agnostic dashboard framework. Provides widget containers, KPI/metric cards, grid layout, persistence, and export utilities. Bring your own chart library (Recharts, Chart.js, ECharts, etc.) and render charts inside `ChartWidget`.

---

## Package info

- **npm:** `@waysnx/ui-dashboard` v1.0.1 (companion package — NOT included in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-dashboard`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-dashboard/dist/index.css'`

---

## Architecture

This is a **chart-agnostic** dashboard framework. It provides the grid system, widget containers, KPI cards, and persistence layer. Bring your own chart library (Recharts, Chart.js, ECharts, etc.) and render charts inside `ChartWidget`.

---

## Provider

```tsx
import { DashboardProvider } from '@waysnx/ui-dashboard';

<DashboardProvider config={dashboardConfig}>
  <YourDashboard />
</DashboardProvider>
```

---

## Exported components

### Dashboard shell
`Dashboard`, `DashboardHeader`, `DashboardToolbar`, `DashboardSidebar`, `DashboardFooter`

### Widget system
`Widget`, `WidgetLoading`, `WidgetEmpty`, `WidgetError`, `WidgetOffline`, `WidgetPermissionDenied`

### KPI / Metric cards
`StatCard`, `MetricCard`, `ProgressCard`

**StatCard** accepts an optional `trendIcons` prop to override default SVG arrows:
```tsx
trendIcons?: { up?: ReactNode; down?: ReactNode; neutral?: ReactNode }
// Default: built-in SVG arrows (↗ ↘ →) that inherit color via currentColor
```

All KPI card text (StatCard value/change/target, MetricCard value) scales with `--wx-accessibility-font-scale` — uses `--wx-font-size-*` tokens or `calc(px * var(--wx-accessibility-font-scale, 1))`.

### Widget layout
`WidgetGrid`, `WidgetRow`, `WidgetColumn`, `WidgetContainer`

**WidgetGrid** is mobile-first responsive:
```tsx
columns?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
// Breakpoints: xs=0, sm=576px, md=768px, lg=1024px, xl=1280px
```

### Content widgets
`ChartWidget`, `TableWidget`, `FormWidget`, `MarkdownWidget`, `HtmlWidget`

### Filters & search
`DashboardFilterBar`, `DashboardSearch`

---

## Hooks

`useDashboard`, `useRefresh`, `useFullscreen`, `useWidget`, `useDashboardFilters`

---

## Utilities

### Persistence
`saveLayout`, `loadLayout`, `saveFilters`, `loadFilters`, `saveWidgets`, `loadWidgets`, `saveDashboard`, `loadDashboard`, `clearDashboard`, `clearAllDashboards`, `serializeDashboard`, `importDashboard`

### Export
`exportDashboardAsPNG`, `exportDashboardAsPDF`, `exportDataAsCSV`, `exportDataAsExcel`, `printDashboard`, `exportDashboard`

---

## Key types

`DashboardConfig`, `WidgetConfig`, `KPIData`, `MetricData`, `ChartWidgetProps`, `DashboardContextType`, `ExportConfig`, `RefreshConfig`, `FilterConfig`

Unions: `DashboardTheme` (`'light' | 'dark' | 'highContrast' | 'enterprise'`), `WidgetVariant`, `WidgetState`, `TrendDirection`, `StatusType`

---

## Example

```tsx
import { DashboardProvider, Dashboard, WidgetGrid, WidgetRow, WidgetColumn, StatCard, ChartWidget } from '@waysnx/ui-dashboard';
import '@waysnx/ui-dashboard/dist/index.css';

function MyDashboard() {
  return (
    <DashboardProvider config={{ title: 'Sales', theme: 'light' }}>
      <Dashboard>
        <WidgetGrid>
          <WidgetRow>
            <WidgetColumn span={4}><StatCard title="Revenue" value="$12K" trend="up" /></WidgetColumn>
            <WidgetColumn span={4}><StatCard title="Users" value="1,234" /></WidgetColumn>
            <WidgetColumn span={4}><StatCard title="Orders" value="567" /></WidgetColumn>
          </WidgetRow>
          <WidgetRow>
            <WidgetColumn flex={1}>
              <ChartWidget title="Monthly Sales">
                {/* Render your chart here (Recharts, Chart.js, etc.) */}
              </ChartWidget>
            </WidgetColumn>
          </WidgetRow>
        </WidgetGrid>
      </Dashboard>
    </DashboardProvider>
  );
}
```


---

## i18n Keys

Dashboard components use the following translation keys internally via `useTranslation()`. Override these by passing custom messages to `<TranslationProvider>`.

| Key | Default (English) | Used in |
|-----|-------------------|---------|
| `dashboard.skipToContent` | "Skip to main content" | Skip link for accessibility |
| `dashboard.loading` | "Loading" | Widget loading state title |
| `dashboard.loadingMessage` | "Please wait while we fetch your data..." | Widget loading description |
| `dashboard.empty` | "Empty" | Widget empty state title |
| `dashboard.emptyMessage` | "No data available" | Widget empty description |
| `dashboard.error` | "Error" | Widget error state title |
| `dashboard.errorMessage` | "An error occurred while loading data" | Widget error description |
| `dashboard.offline` | "Offline" | Widget offline state title |
| `dashboard.offlineMessage` | "You are currently offline" | Widget offline description |
| `dashboard.permissionDenied` | "Permission Denied" | Widget permission state title |
| `dashboard.permissionDeniedMessage` | "You do not have permission to view this widget" | Widget permission description |
| `dashboard.tryAgain` | "Try Again" | Error retry button |
