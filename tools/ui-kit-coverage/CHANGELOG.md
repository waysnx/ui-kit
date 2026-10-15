# Changelog

All notable changes to `@waysnx/ui-kit-coverage` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **HTML Report Generation**: New `--format html` option for the `report` command
  - Self-contained, offline-capable HTML reports with inline CSS and JavaScript
  - No external CDN dependencies required
  - Interactive features:
    - Global search across all tables
    - Column sorting (click headers)
    - Expand/collapse sections
    - Light/dark theme toggle with system preference detection
    - Keyboard shortcuts (Ctrl+K for search, Ctrl+D for theme)
  - Responsive layout (mobile, tablet, desktop)
  - Print-optimized styles
  - Accessibility features (ARIA labels, keyboard navigation, focus indicators)
  - Report sections:
    - Executive summary with KPI cards
    - Package adoption table
    - Component usage table
    - Native elements table
    - Custom components table
    - Replacement candidates table
    - Project metadata and limitations
- Security utilities for safe HTML generation:
  - `escapeHtml()` - Prevents XSS attacks
  - `safeJsonSerialize()` - Safe JSON embedding in HTML
  - `escapeAttribute()` - Safe HTML attribute values

### Changed

- Updated `ANALYZER_VERSION` to `0.2.0`
- Extended `--format` flag to support `html` option
- Updated `--format all` to include HTML in addition to JSON and Markdown

### Fixed

- None

### Security

- Implemented comprehensive HTML escaping to prevent XSS vulnerabilities
- All user data is sanitized before insertion into HTML output
- Project names are escaped in HTML title and report header

### Backward Compatibility

- ✅ 100% backward compatible with v0.1.x
- Default format remains `json` (no breaking changes)
- All existing commands work unchanged
- HTML generation is opt-in via `--format html` flag

## [0.1.0] - 2026-09-02

### Added

- Initial release of the WaysNX UI Kit Coverage Analyzer
- Core functionality:
  - `analyze` command - Static analysis of React/TypeScript applications
  - `report` command - Generate coverage reports in JSON and Markdown formats
  - `check` command - CI-ready policy enforcement with configurable thresholds
- Analysis capabilities:
  - UI Kit package detection and usage tracking
  - Component usage analysis
  - Native element detection
  - Custom component identification
  - Replacement candidate suggestions with confidence levels
- Output formats:
  - JSON report (`coverage.json`)
  - Markdown report (`coverage.md`)
- Configuration support:
  - Auto-discovery of `ui-kit-coverage.config.json`
  - CLI flag overrides
  - Include/exclude globs
- Deterministic, AST-based analysis using TypeScript Compiler API
- Read-only operation (never modifies source)
- Offline operation (no network dependencies)
- Support for `.ts`, `.tsx`, `.js`, `.jsx` files

### Principles

- Deterministic, AST-based analysis (no AI/LLM)
- Read-only (never modifies target project source)
- Portable & private (no network, no GitHub integration, no tokens, no WDG dependency)

---

[Unreleased]: https://github.com/waysnx/ui-kit/compare/ui-kit-coverage-v0.1.0...HEAD
[0.1.0]: https://github.com/waysnx/ui-kit/releases/tag/ui-kit-coverage-v0.1.0
