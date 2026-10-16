/**
 * HTML template generator for coverage report.
 * 
 * Generates a complete, self-contained HTML document with inline CSS and JavaScript.
 */

import type { CoverageReport } from "../../types/index.js";
import { safeJsonSerialize, escapeHtml } from "./utils.js";
import { CSS_STYLES } from "./styles.js";
import { JS_SCRIPTS } from "./scripts.js";
import { WAYSNX_LOGO_BASE64 } from "./logo-base64.js";
import {
  renderSummary,
  renderPackagesTable,
  renderComponentsTable,
  renderNativeElementsTable,
  renderCustomComponentsTable,
  renderReplacementCandidatesTable,
  renderMetadata,
} from "./components.js";

/**
 * Generates the complete HTML document for the coverage report.
 * 
 * @param report - The coverage report data
 * @returns Complete HTML document as string
 */
export function generateHtml(report: CoverageReport): string {
  const timestamp = new Date().toISOString();
  const safeProjectName = escapeHtml(report.project.name);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="@waysnx/ui-kit-coverage v${report.analyzerVersion}">
  <title>UI Kit Coverage Report - ${safeProjectName}</title>
  <style>${CSS_STYLES}</style>
</head>
<body>
  <div id="top"></div>
  <div class="container">
    ${renderBrandBar(report)}
    ${renderHeader(report, timestamp)}
    ${renderToolStrip(report)}
    ${renderSummary(report)}
    ${renderPackagesTable(report)}
    ${renderComponentsTable(report)}
    ${renderNativeElementsTable(report)}
    ${renderCustomComponentsTable(report)}
    ${renderReplacementCandidatesTable(report)}
    ${renderMetadata(report)}
    ${renderFooter(report)}
  </div>
  
  <script>
    // Embedded coverage data (for future export/processing features)
    window.__COVERAGE_REPORT__ = ${safeJsonSerialize(report)};
  </script>
  <script>${JS_SCRIPTS}</script>
</body>
</html>`;
}

/**
 * Renders the brand bar with WaysNX UI Kit logo.
 */
function renderBrandBar(report: CoverageReport): string {
  return `
    <div class="brand-bar">
      <a class="brand-link" href="https://uikit.waysnx.tech" target="_blank" rel="noreferrer">
        <img class="brand-logo" src="${WAYSNX_LOGO_BASE64}" alt="WaysNX UI Kit" />
        <span>WaysNX <span class="brand-product">UI Kit</span></span>
      </a>
      <span class="brand-meta">coverage / v${report.analyzerVersion}</span>
    </div>
  `;
}

/**
 * Renders the report header with new design.
 */
function renderHeader(report: CoverageReport, timestamp: string): string {
  const safeProjectName = escapeHtml(report.project.name);
  
  return `
    <header class="report-header">
      <div>
        <p class="report-eyebrow">Static analysis report</p>
        <h1 class="report-title">UI Kit coverage</h1>
        <p class="report-subtitle">Project <span class="project-name">${safeProjectName}</span></p>
      </div>
      <div class="report-meta">
        <span>Analyzer v${report.analyzerVersion}</span>
        <span class="meta-divider">/</span>
        <span>Schema v${report.schemaVersion}</span>
        <span class="meta-divider">/</span>
        <span>Generated ${new Date(timestamp).toLocaleString()}</span>
      </div>
    </header>
  `;
}

/**
 * Renders the sticky tool strip with section navigation and controls.
 */
function renderToolStrip(report: CoverageReport): string {
  const packagesCount = report.packages.length;
  const componentsCount = report.components.length;
  const nativeCount = report.nativeUi.length;
  const customCount = report.customComponents.length;
  const candidatesCount = report.replacementCandidates.length;
  
  return `
    <div class="tool-strip">
      <nav class="section-nav" aria-label="Report sections">
        <a href="#summary">Summary</a>
        <a href="#packages">Packages</a>
        <a href="#components">Components</a>
        <a href="#native">Native</a>
        <a href="#custom">Custom</a>
        <a href="#replacements">Candidates</a>
      </nav>
      <div class="controls">
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/>
            <path d="m16 16 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input 
            type="search" 
            id="search-box" 
            class="search-box" 
            placeholder="Search report"
            aria-label="Search coverage report"
          />
          <span class="search-shortcut">⌘K</span>
        </div>
        <button 
          type="button" 
          id="theme-toggle" 
          class="theme-toggle"
          aria-label="Toggle dark mode"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 15.2A8 8 0 0 1 8.8 4a8 8 0 1 0 11.2 11.2Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders the report footer with branding and navigation.
 */
function renderFooter(report: CoverageReport): string {
  return `
    <footer class="report-footer">
      <div class="footer-left">
        <a class="footer-brand-link" href="https://uikit.waysnx.tech" target="_blank" rel="noreferrer">
          <img class="brand-logo" src="${WAYSNX_LOGO_BASE64}" alt="WaysNX UI Kit" />
          <span>WaysNX <span class="brand-product">UI Kit</span></span>
        </a>
        <span>Generated by <strong>@waysnx/ui-kit-coverage</strong> v${report.analyzerVersion}</span>
      </div>
      <div class="footer-right">
        <span><kbd>Ctrl K</kbd> Search</span>
        <span><kbd>Ctrl D</kbd> Theme</span>
        <a class="back-to-top" href="#top">Back to top ↑</a>
      </div>
    </footer>
  `;
}
