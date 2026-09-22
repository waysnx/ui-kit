# Public Release Checklist

Release: 1.0.1
Status: Release Candidate

## Build & API
- [x] 18/18 libraries build
- [x] API consistency validated
- [x] CSS/design tokens validated

## Documentation
- [x] Existing generated documentation (WDG output) included
- [x] WDG P0.6 — PASS
- [x] WDG P0.7 — props-resolution issue documented/deferred to future backlog
- [x] WDG P0.8 — PASS
- [x] WDG P0.9 — PASS
- [x] Primary package READMEs complete
- [x] LLM.md AI agent guides added to all 19 packages
- [ ] WDG local integration/regeneration intentionally deferred to future backlog

## Quality & Validation
- [x] Storybook production build passes
- [x] Security P0 remediation complete
- [x] TOTP verification validated (RFC 6238)
- [x] P0 regression suite passes (Chromium / Firefox / WebKit)
- [ ] Full historical Playwright suite green (known pre-existing failures remain; not release-blocking)
- [ ] Admin Demo validated
- [ ] SSR/hydration smoke tests
- [ ] Accessibility P0 issues resolved

## Packaging & Release
- [ ] NPM clean-install validation
- [ ] NPM publication (via `pnpm publish`)
- [ ] GitHub open-source files complete
- [ ] RC frozen
- [ ] Final go/no-go approved

---

Notes:
- `@waysnx/ui-diagnostics` is released at `1.0.1` (functional/API library; zero standalone components by design).
- `@waysnx/ui-kit` aggregate is `1.0.1` and remains the curated 5-library package.
- WDG local integration/regeneration is intentionally deferred to a future backlog item.
- Repository references updated from `waysnx-tech/waysnx-ui-kit` to `waysnx/ui-kit`.
- LLM.md files provide AI agent integration guides with exact exports, props, and examples for all 19 packages.
