/**
 * CSS styles for HTML coverage report.
 * 
 * Includes light/dark theme support, responsive layout, print styles,
 * and all component styling. No external dependencies.
 */

export const CSS_STYLES = `
/* ============================================================================
   CSS Variables - Light & Dark Theme
   ========================================================================== */

:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --border-color: #dee2e6;
  --shadow: rgba(0, 0, 0, 0.1);
  
  /* Accent colors */
  --accent-primary: #0d6efd;
  --accent-hover: #0b5ed7;
  
  /* Semantic colors */
  --success: #198754;
  --success-bg: #d1e7dd;
  --warning: #ffc107;
  --warning-bg: #fff3cd;
  --danger: #dc3545;
  --danger-bg: #f8d7da;
  --info: #0dcaf0;
  --info-bg: #cff4fc;
  
  /* Confidence levels */
  --confidence-high: #198754;
  --confidence-high-bg: #d1e7dd;
  --confidence-medium: #ffc107;
  --confidence-medium-bg: #fff3cd;
  --confidence-low: #dc3545;
  --confidence-low-bg: #f8d7da;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

[data-theme="dark"] {
  /* Dark theme */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --bg-tertiary: #3a3a3a;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --text-muted: #6c757d;
  --border-color: #495057;
  --shadow: rgba(0, 0, 0, 0.3);
  
  /* Accent colors (adjusted for dark) */
  --accent-primary: #0d6efd;
  --accent-hover: #3d8bfd;
  
  /* Semantic colors (darker backgrounds) */
  --success-bg: #1a3a2a;
  --warning-bg: #3a3420;
  --danger-bg: #3a1a1f;
  --info-bg: #1a2f3a;
}

/* ============================================================================
   Base Styles
   ========================================================================== */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ============================================================================
   Layout
   ========================================================================== */

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.section {
  margin-bottom: var(--spacing-xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;
}

.section-header:hover {
  background: var(--bg-tertiary);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.section-content {
  padding: var(--spacing-lg);
}

.section-content.collapsed {
  display: none;
}

/* ============================================================================
   Header
   ========================================================================== */

.report-header {
  text-align: center;
  padding: var(--spacing-xl) 0;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
}

.report-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.report-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.report-meta {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* ============================================================================
   Controls
   ========================================================================== */

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.search-box:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
}

.theme-toggle {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-primary);
}

/* ============================================================================
   KPI Cards
   ========================================================================== */

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.kpi-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}

.kpi-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-xs);
}

.kpi-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ============================================================================
   Tables
   ========================================================================== */

.table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-primary);
}

thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

th {
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

th:hover {
  background: var(--bg-tertiary);
}

th.sortable::after {
  content: " ⇅";
  opacity: 0.3;
}

th.sort-asc::after {
  content: " ↑";
  opacity: 1;
}

th.sort-desc::after {
  content: " ↓";
  opacity: 1;
}

td {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

tr:hover {
  background: var(--bg-secondary);
}

tr.hidden {
  display: none;
}

/* ============================================================================
   Badges
   ========================================================================== */

.badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success {
  background: var(--success-bg);
  color: var(--success);
}

.badge-warning {
  background: var(--warning-bg);
  color: var(--warning);
}

.badge-danger {
  background: var(--danger-bg);
  color: var(--danger);
}

.badge-info {
  background: var(--info-bg);
  color: var(--info);
}

.badge-high {
  background: var(--confidence-high-bg);
  color: var(--confidence-high);
}

.badge-medium {
  background: var(--confidence-medium-bg);
  color: var(--confidence-medium);
}

.badge-low {
  background: var(--confidence-low-bg);
  color: var(--confidence-low);
}

/* ============================================================================
   Code & File Paths
   ========================================================================== */

code {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}

.file-path {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  word-break: break-all;
}

/* ============================================================================
   Empty State
   ========================================================================== */

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-muted);
}

.empty-state-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.3;
}

/* ============================================================================
   Expand/Collapse
   ========================================================================== */

.expand-icon {
  transition: transform 0.3s ease;
}

.expand-icon.collapsed {
  transform: rotate(-90deg);
}

/* ============================================================================
   Responsive Design
   ========================================================================== */

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
  
  .report-title {
    font-size: 1.5rem;
  }
  
  .report-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    width: 100%;
  }
  
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}

/* ============================================================================
   Print Styles
   ========================================================================== */

@media print {
  body {
    background: white;
    color: black;
  }
  
  .theme-toggle,
  .search-box {
    display: none;
  }
  
  .section {
    page-break-inside: avoid;
    border: 1px solid #000;
  }
  
  .section-content {
    display: block !important;
  }
  
  .expand-icon {
    display: none;
  }
  
  table {
    page-break-inside: auto;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  thead {
    display: table-header-group;
  }
}

/* ============================================================================
   Accessibility
   ========================================================================== */

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
`;
