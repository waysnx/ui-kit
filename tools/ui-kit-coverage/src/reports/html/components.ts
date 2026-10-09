/**
 * Component renderers for HTML coverage report sections.
 * 
 * Each function renders a specific section of the report using safe HTML escaping.
 */

import type { CoverageReport } from "../../types/index.js";
import { escapeHtml } from "./utils.js";

/**
 * Renders the executive summary with KPI cards.
 */
export function renderSummary(report: CoverageReport): string {
  const { summary, packages, components, nativeUi, replacementCandidates } = report;
  
  const highConfidence = replacementCandidates.filter(c => c.confidence === "HIGH").length;
  const mediumConfidence = replacementCandidates.filter(c => c.confidence === "MEDIUM").length;
  const lowConfidence = replacementCandidates.filter(c => c.confidence === "LOW").length;
  
  return `
    <div class="section" id="summary">
      <div class="section-header">
        <h2 class="section-title">📊 Executive Summary</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-value">${summary.waysnxPackagesDetected}</div>
            <div class="kpi-label">UI Kit Packages</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${summary.uiKitComponentsDetected}</div>
            <div class="kpi-label">Components Used</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${summary.nativeElementsDetected}</div>
            <div class="kpi-label">Native Elements</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${summary.customComponentsDetected}</div>
            <div class="kpi-label">Custom Components</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${replacementCandidates.length}</div>
            <div class="kpi-label">Replacement Candidates</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${highConfidence}</div>
            <div class="kpi-label">High Confidence</div>
          </div>
        </div>
        
        ${replacementCandidates.length > 0 ? `
          <div style="margin-top: var(--spacing-lg);">
            <h3 style="margin-bottom: var(--spacing-sm);">Replacement Confidence Distribution</h3>
            <div style="display: flex; gap: var(--spacing-md);">
              <div><span class="badge badge-high">HIGH</span> ${highConfidence}</div>
              <div><span class="badge badge-medium">MEDIUM</span> ${mediumConfidence}</div>
              <div><span class="badge badge-low">LOW</span> ${lowConfidence}</div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Renders the package adoption table.
 */
export function renderPackagesTable(report: CoverageReport): string {
  const { packages } = report;
  
  if (packages.length === 0) {
    return `
      <div class="section" id="packages">
        <div class="section-header">
          <h2 class="section-title">📦 Package Adoption</h2>
          <span class="expand-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <p>No WaysNX UI Kit packages detected.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const rows = packages.map(pkg => `
    <tr>
      <td><code>${escapeHtml(pkg.name)}</code></td>
      <td><span class="badge ${pkg.declared ? 'badge-success' : 'badge-danger'}">${pkg.declared ? 'Yes' : 'No'}</span></td>
      <td><span class="badge ${pkg.imported ? 'badge-success' : 'badge-danger'}">${pkg.imported ? 'Yes' : 'No'}</span></td>
      <td><span class="badge ${pkg.used ? 'badge-success' : 'badge-danger'}">${pkg.used ? 'Yes' : 'No'}</span></td>
      <td>${pkg.componentsDetected}</td>
      <td>${pkg.importedButUnused ? '<span class="badge badge-warning">Yes</span>' : '-'}</td>
      <td>${pkg.referencedButNotInstalled ? '<span class="badge badge-danger">Yes</span>' : '-'}</td>
    </tr>
  `).join('');
  
  return `
    <div class="section" id="packages">
      <div class="section-header">
        <h2 class="section-title">📦 Package Adoption (${packages.length})</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th class="sortable">Package</th>
                <th class="sortable">Declared</th>
                <th class="sortable">Imported</th>
                <th class="sortable">Used</th>
                <th class="sortable">Components</th>
                <th class="sortable">Unused</th>
                <th class="sortable">Missing</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the component usage table.
 */
export function renderComponentsTable(report: CoverageReport): string {
  const { components } = report;
  
  if (components.length === 0) {
    return `
      <div class="section" id="components">
        <div class="section-header">
          <h2 class="section-title">🧩 Component Usage</h2>
          <span class="expand-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="empty-state">
            <div class="empty-state-icon">🧩</div>
            <p>No UI Kit components detected.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const rows = components.map(comp => `
    <tr>
      <td><code>${escapeHtml(comp.component)}</code></td>
      <td><code>${escapeHtml(comp.package)}</code></td>
      <td>${comp.importFiles}</td>
      <td>${comp.jsxUsages}</td>
      <td class="file-path">${comp.files.slice(0, 3).map(f => escapeHtml(f)).join(', ')}${comp.files.length > 3 ? ` +${comp.files.length - 3} more` : ''}</td>
    </tr>
  `).join('');
  
  return `
    <div class="section" id="components">
      <div class="section-header">
        <h2 class="section-title">🧩 Component Usage (${components.length})</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th class="sortable">Component</th>
                <th class="sortable">Package</th>
                <th class="sortable">Import Files</th>
                <th class="sortable">JSX Usages</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the native elements table.
 */
export function renderNativeElementsTable(report: CoverageReport): string {
  const { nativeUi } = report;
  
  if (nativeUi.length === 0) {
    return `
      <div class="section" id="native">
        <div class="section-header">
          <h2 class="section-title">🏷️ Native Elements</h2>
          <span class="expand-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="empty-state">
            <div class="empty-state-icon">🏷️</div>
            <p>No native HTML elements detected.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const rows = nativeUi.map(elem => `
    <tr>
      <td><code>&lt;${escapeHtml(elem.element)}&gt;</code></td>
      <td>${elem.count}</td>
      <td class="file-path">${elem.files.slice(0, 3).map(f => escapeHtml(f)).join(', ')}${elem.files.length > 3 ? ` +${elem.files.length - 3} more` : ''}</td>
    </tr>
  `).join('');
  
  return `
    <div class="section" id="native">
      <div class="section-header">
        <h2 class="section-title">🏷️ Native Elements (${nativeUi.length})</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th class="sortable">Element</th>
                <th class="sortable">Count</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the custom components table.
 */
export function renderCustomComponentsTable(report: CoverageReport): string {
  const { customComponents } = report;
  
  if (customComponents.length === 0) {
    return `
      <div class="section" id="custom">
        <div class="section-header">
          <h2 class="section-title">⚙️ Custom Components</h2>
          <span class="expand-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="empty-state">
            <div class="empty-state-icon">⚙️</div>
            <p>No custom components detected.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const rows = customComponents.map(comp => `
    <tr>
      <td><code>${escapeHtml(comp.component)}</code></td>
      <td>${comp.usages}</td>
      <td>${comp.wrapsUiKit ? '<span class="badge badge-info">Yes</span>' : '-'}</td>
      <td class="file-path">${comp.files.slice(0, 3).map(f => escapeHtml(f)).join(', ')}${comp.files.length > 3 ? ` +${comp.files.length - 3} more` : ''}</td>
    </tr>
  `).join('');
  
  return `
    <div class="section" id="custom">
      <div class="section-header">
        <h2 class="section-title">⚙️ Custom Components (${customComponents.length})</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th class="sortable">Component</th>
                <th class="sortable">Usages</th>
                <th class="sortable">Wraps UI Kit</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the replacement candidates table.
 */
export function renderReplacementCandidatesTable(report: CoverageReport): string {
  const { replacementCandidates } = report;
  
  if (replacementCandidates.length === 0) {
    return `
      <div class="section" id="replacements">
        <div class="section-header">
          <h2 class="section-title">💡 Replacement Candidates</h2>
          <span class="expand-icon">▼</span>
        </div>
        <div class="section-content">
          <div class="empty-state">
            <div class="empty-state-icon">💡</div>
            <p>No replacement candidates identified.</p>
          </div>
        </div>
      </div>
    `;
  }
  
  const rows = replacementCandidates.map(cand => {
    const badgeClass = cand.confidence === "HIGH" ? "badge-high" : 
                       cand.confidence === "MEDIUM" ? "badge-medium" : 
                       "badge-low";
    
    return `
      <tr>
        <td><code>${escapeHtml(cand.source)}</code></td>
        <td><span class="badge badge-info">${escapeHtml(cand.sourceKind)}</span></td>
        <td><code>${escapeHtml(cand.candidate)}</code></td>
        <td><code>${escapeHtml(cand.package)}</code></td>
        <td><span class="badge ${badgeClass}">${cand.confidence}</span></td>
        <td>${cand.occurrences}</td>
        <td class="file-path">${cand.files.slice(0, 3).map(f => escapeHtml(f)).join(', ')}${cand.files.length > 3 ? ` +${cand.files.length - 3} more` : ''}</td>
      </tr>
    `;
  }).join('');
  
  return `
    <div class="section" id="replacements">
      <div class="section-header">
        <h2 class="section-title">💡 Replacement Candidates (${replacementCandidates.length})</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th class="sortable">Source</th>
                <th class="sortable">Type</th>
                <th class="sortable">Candidate</th>
                <th class="sortable">Package</th>
                <th class="sortable">Confidence</th>
                <th class="sortable">Occurrences</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders metadata and limitations section.
 */
export function renderMetadata(report: CoverageReport): string {
  const { project, files, limitations, analyzerVersion } = report;
  
  const limitationsHtml = limitations.length > 0 ? `
    <h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);">⚠️ Limitations</h3>
    <ul style="padding-left: var(--spacing-lg); color: var(--text-secondary);">
      ${limitations.map(lim => `
        <li style="margin-bottom: var(--spacing-sm);">
          <strong>[${escapeHtml(lim.code)}]</strong>: ${escapeHtml(lim.message)}
          ${lim.location ? `<br><span class="file-path">${escapeHtml(lim.location.file)}:${lim.location.line}:${lim.location.column}</span>` : ''}
        </li>
      `).join('')}
    </ul>
  ` : '<p style="color: var(--text-secondary);">No limitations reported.</p>';
  
  return `
    <div class="section" id="metadata">
      <div class="section-header">
        <h2 class="section-title">ℹ️ Metadata & Limitations</h2>
        <span class="expand-icon">▼</span>
      </div>
      <div class="section-content">
        <h3 style="margin-bottom: var(--spacing-sm);">Project Information</h3>
        <div style="display: grid; grid-template-columns: auto 1fr; gap: var(--spacing-sm) var(--spacing-lg); margin-bottom: var(--spacing-lg);">
          <div style="font-weight: 600;">Name:</div>
          <div>${escapeHtml(project.name)}</div>
          
          <div style="font-weight: 600;">Root:</div>
          <div><code>${escapeHtml(project.root)}</code></div>
          
          <div style="font-weight: 600;">Languages:</div>
          <div>${project.language.map(l => escapeHtml(l)).join(', ')}</div>
          
          <div style="font-weight: 600;">Analyzer Version:</div>
          <div>${escapeHtml(analyzerVersion)}</div>
        </div>
        
        <h3 style="margin-bottom: var(--spacing-sm);">File Statistics</h3>
        <div style="display: grid; grid-template-columns: auto 1fr; gap: var(--spacing-sm) var(--spacing-lg); margin-bottom: var(--spacing-lg);">
          <div style="font-weight: 600;">Scanned:</div>
          <div>${files.scanned}</div>
          
          <div style="font-weight: 600;">Supported:</div>
          <div>${files.supported}</div>
          
          <div style="font-weight: 600;">Ignored:</div>
          <div>${files.ignored}</div>
        </div>
        
        ${limitationsHtml}
      </div>
    </div>
  `;
}
