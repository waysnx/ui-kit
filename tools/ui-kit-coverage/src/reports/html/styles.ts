/**
 * CSS styles for HTML coverage report.
 * 
 * WaysNX UI Kit branded design with indigo accent colors,
 * light/dark theme support, responsive layout, and print styles.
 */

export const CSS_STYLES = `
/* ============================================================================
   CSS Variables - Light & Dark Theme (WaysNX Branding)
   ========================================================================== */

:root {
  /* Light theme */
  --bg-primary: #ffffff;
  --bg-secondary: #f7f8fa;
  --bg-tertiary: #eef1f4;
  --text-primary: #17202a;
  --text-secondary: #5d6878;
  --text-muted: #8993a2;
  --border-color: #dfe3e8;
  --border-strong: #cbd2da;
  --shadow: rgba(23, 32, 42, 0.08);
  
  /* Accent colors - Indigo */
  --accent-primary: #4f46e5;
  --accent-hover: #4338ca;
  --accent-soft: #eef2ff;
  
  /* Surface */
  --surface-raised: #ffffff;
  --code-bg: #f2f4f7;
  
  /* Semantic colors */
  --success: #157f5b;
  --success-bg: #e8f6f0;
  --warning: #9a6700;
  --warning-bg: #fff4d6;
  --danger: #be3a4a;
  --danger-bg: #fcecef;
  --info: #2563a8;
  --info-bg: #eaf2fb;
  
  /* Confidence levels */
  --confidence-high: #157f5b;
  --confidence-high-bg: #e8f6f0;
  --confidence-medium: #9a6700;
  --confidence-medium-bg: #fff4d6;
  --confidence-low: #be3a4a;
  --confidence-low-bg: #fcecef;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
}

[data-theme="dark"] {
  /* Dark theme */
  --bg-primary: #101216;
  --bg-secondary: #16191f;
  --bg-tertiary: #20242c;
  --text-primary: #f2f4f7;
  --text-secondary: #aeb7c4;
  --text-muted: #768190;
  --border-color: #2b3039;
  --border-strong: #3b424e;
  --shadow: rgba(0, 0, 0, 0.28);
  
  /* Accent colors (adjusted for dark) */
  --accent-primary: #8b83ff;
  --accent-hover: #a49eff;
  --accent-soft: #24223e;
  
  /* Surface */
  --surface-raised: #16191f;
  --code-bg: #20242c;
  
  /* Semantic colors (darker backgrounds) */
  --success: #60c49b;
  --success-bg: #19372d;
  --warning: #e6bd5c;
  --warning-bg: #382f19;
  --danger: #ef8490;
  --danger-bg: #3d2026;
  --info: #79afe8;
  --info-bg: #1c3045;
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
  scroll-behavior: smooth;
}

body {
  background:
    linear-gradient(180deg, var(--accent-soft) 0, transparent 22rem),
    var(--bg-secondary);
  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  color: inherit;
}

/* ============================================================================
   Layout
   ========================================================================== */

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl) var(--spacing-xl);
}

/* ============================================================================
   Brand Bar
   ========================================================================== */

.brand-bar {
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.brand-link,
.footer-brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.brand-link:hover,
.footer-brand-link:hover {
  color: var(--accent-primary);
}

.brand-mark {
  width: 1.625rem;
  height: 1.625rem;
  display: inline-grid;
  place-items: center;
  border-radius: 0.5rem;
  color: #fff;
  background: var(--accent-primary);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

.brand-mark svg {
  width: 1rem;
  height: 1rem;
}

.brand-logo {
  width: auto;
  height: 2.5rem;
  display: block;
}

.brand-product {
  color: var(--text-muted);
  font-weight: 500;
}

.brand-meta {
  color: var(--text-muted);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.75rem;
}

/* ============================================================================
   Header
   ========================================================================== */

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--spacing-xl);
  text-align: left;
  padding: 3.5rem 0 2rem;
  border-bottom: 0;
  margin-bottom: 0;
}

.report-eyebrow {
  margin-bottom: 0.5rem;
  color: var(--accent-primary);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.report-title {
  margin-bottom: 0.375rem;
  font-size: clamp(1.75rem, 4vw, 2.625rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  font-weight: 700;
  color: var(--text-primary);
}

.report-subtitle {
  color: var(--text-secondary);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.875rem;
}

.project-name {
  color: var(--text-primary);
  font-weight: 650;
}

.report-meta {
  display: flex;
  justify-content: flex-end;
  margin-top: 0;
  padding-bottom: 0.375rem;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.6875rem;
}

.meta-divider {
  color: var(--border-strong);
}

/* ============================================================================
   Tool Strip (Sticky Navigation + Controls)
   ========================================================================== */

.tool-strip {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 calc(var(--spacing-xl) * -1) var(--spacing-lg);
  padding: 0.75rem var(--spacing-xl);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--bg-primary) 88%, transparent);
  backdrop-filter: blur(16px);
}

.section-nav {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.section-nav::-webkit-scrollbar {
  display: none;
}

.section-nav a {
  flex: none;
  padding: 0.4rem 0.625rem;
  border-radius: 0.375rem;
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
}

.section-nav a:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

/* ============================================================================
   Controls
   ========================================================================== */

.controls {
  flex: none;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-bottom: 0;
  align-items: center;
}

.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  width: 0.875rem;
  height: 0.875rem;
  color: var(--text-muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.search-box {
  width: 16rem;
  min-width: 0;
  padding: 0.5rem 2.875rem 0.5rem 2.25rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.8125rem;
}

.search-box:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-shortcut {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.125rem 0.35rem;
  border: 1px solid var(--border-color);
  border-bottom-color: var(--border-strong);
  border-radius: 0.25rem;
  color: var(--text-muted);
  background: var(--bg-secondary);
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.625rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.theme-toggle {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-primary);
}

.theme-toggle svg {
  width: 1rem;
  height: 1rem;
}

/* ============================================================================
   Sections
   ========================================================================== */

.section {
  margin-bottom: 1rem;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 1px 2px var(--shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  font: inherit;
  text-align: left;
}

.section-header:hover {
  background: var(--bg-secondary);
}

.section-header:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: -2px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 680;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.section-index {
  color: var(--accent-primary);
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.9375rem;
  font-weight: 680;
}

.section-count {
  padding: 0.125rem 0.45rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  font-size: 0.6875rem;
  font-weight: 600;
}

.section-content {
  padding: 1.25rem;
}

.section-content.collapsed {
  display: none;
}

.expand-icon {
  color: var(--text-muted);
  font-size: 0.625rem;
  transition: transform 0.3s ease;
}

.expand-icon.collapsed {
  transform: rotate(-90deg);
}

/* ============================================================================
   KPI Cards
   ========================================================================== */

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0;
  margin: -0.25rem 0 1.25rem;
}

.kpi-card {
  padding: 1rem;
  border: 0;
  border-right: 1px solid var(--border-color);
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.kpi-card:last-child {
  border-right: 0;
}

.kpi-value {
  margin-bottom: 0.125rem;
  color: var(--text-primary);
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 1.75rem;
  line-height: 1.2;
  letter-spacing: -0.04em;
  font-weight: 700;
}

.kpi-label {
  color: var(--text-muted);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ============================================================================
   Confidence Row
   ========================================================================== */

.confidence-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 0.8125rem;
}

.confidence-label {
  margin-right: auto;
  color: var(--text-primary);
  font-weight: 600;
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
  font-size: 0.8125rem;
}

thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

th {
  padding: 0.7rem 0.875rem;
  text-align: left;
  font-weight: 700;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-strong);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
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
  padding: 0.65rem 0.875rem;
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
  padding: 0.125rem 0.45rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
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

code,
.file-path {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

code {
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
  background: var(--code-bg);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}

.file-path {
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
   Footer
   ========================================================================== */

.report-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  padding: 2rem 0 0.5rem;
  margin-top: 2.5rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.75rem;
}

.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-brand-link {
  font-size: 0.8125rem;
}

.footer-brand-link .brand-logo {
  height: 2.5rem;
}

.back-to-top {
  color: var(--text-secondary);
  text-decoration: none;
}

.back-to-top:hover {
  color: var(--accent-primary);
}

kbd {
  padding: 0.125rem 0.3rem;
  border: 1px solid var(--border-color);
  border-bottom-color: var(--border-strong);
  border-radius: 0.25rem;
  background: var(--bg-secondary);
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.625rem;
}

/* ============================================================================
   Responsive Design
   ========================================================================== */

@media (max-width: 980px) {
  .report-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .report-meta {
    justify-content: flex-start;
  }

  .section-nav {
    display: none;
  }

  .controls {
    width: 100%;
  }

  .search-wrap {
    flex: 1;
  }

  .search-box {
    width: 100%;
  }

  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .kpi-card:nth-child(3) {
    border-right: 0;
  }

  .kpi-card:nth-child(-n + 3) {
    border-bottom: 1px solid var(--border-color);
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 var(--spacing-md) var(--spacing-md);
  }

  .brand-product,
  .brand-meta,
  .search-shortcut {
    display: none;
  }

  .report-header {
    padding: 2.5rem 0 1.5rem;
  }

  .report-meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .meta-divider {
    display: none;
  }

  .tool-strip {
    margin-right: calc(var(--spacing-md) * -1);
    margin-left: calc(var(--spacing-md) * -1);
    padding-right: var(--spacing-md);
    padding-left: var(--spacing-md);
  }

  .controls {
    flex-direction: row;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .kpi-card,
  .kpi-card:nth-child(3) {
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .kpi-card:nth-child(even) {
    border-right: 0;
  }

  .kpi-card:nth-last-child(-n + 2) {
    border-bottom: 0;
  }

  .confidence-row,
  .report-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-right {
    flex-wrap: wrap;
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

  .brand-bar,
  .tool-strip,
  .footer-right {
    display: none;
  }
  
  .theme-toggle,
  .search-box,
  .search-wrap {
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
