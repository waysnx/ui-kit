# Contributing to WaysNX UI Kit

Thank you for your interest in contributing to WaysNX UI Kit.

WaysNX UI Kit is an open-source React UI ecosystem maintained by WaysNX Technologies. Contributions are welcome from developers who want to improve components, accessibility, documentation, testing, tooling, and the overall developer experience.

This document provides the contribution process. Detailed technical documentation is maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Before You Start

Before making a change:

1. Read the repository [README](README.md).
2. Review the relevant documentation in the [Developer Handbook](https://uikit.waysnx.tech).
3. Search existing issues and pull requests to avoid duplicating work.
4. Check whether the required capability already exists in another WaysNX UI Kit library.
5. Keep the scope of the change focused.

WaysNX UI Kit follows a composition-over-duplication approach. New functionality should reuse existing UI Kit capabilities whenever practical rather than introducing duplicate components or utilities.

---

## Types of Contributions

Contributions may include:

- Bug fixes
- Component improvements
- Accessibility improvements
- Security improvements
- Performance improvements
- Test coverage
- Documentation improvements
- Storybook examples
- Playwright coverage
- WDG improvements
- Developer tooling
- Build and packaging improvements

New features and new libraries should be discussed before implementation.

---

## Repository Setup

WaysNX UI Kit uses a pnpm workspace.

Clone the repository and install dependencies:

```bash
git clone https://github.com/waysnx/ui-kit.git
cd ui-kit
pnpm install
```

Use the repository's current package scripts for development, building, testing, Storybook, and Playwright.

Detailed development instructions are maintained in the [Developer Handbook](https://uikit.waysnx.tech).

---

## Making Changes

When making a change:

1. Identify the appropriate library or repository area.
2. Understand the existing implementation and public API.
3. Make the smallest appropriate change.
4. Preserve existing behavior unless the change intentionally modifies it.
5. Add or update tests.
6. Update Storybook examples when component behavior or states change.
7. Consider accessibility and keyboard behavior.
8. Consider SSR and hydration behavior where applicable.
9. Update documentation when public behavior changes.
10. Run the relevant validation before opening a pull request.

Avoid unrelated refactoring in the same pull request.

---

## Component Contributions

When adding or modifying a component:

- Follow the existing library architecture.
- Reuse shared design tokens.
- Follow established naming conventions.
- Provide appropriate TypeScript types.
- Consider controlled and uncontrolled behavior where applicable.
- Handle loading, disabled, error, and empty states where relevant.
- Support keyboard interaction where applicable.
- Provide appropriate ARIA semantics.
- Consider responsive behavior.
- Add Storybook coverage for meaningful states and variants.
- Add automated tests for important behavior.

Detailed component development standards are maintained in the Developer Handbook.

---

## Accessibility

Accessibility is a core requirement of WaysNX UI Kit.

Contributors should consider:

- Keyboard navigation
- Focus management
- Screen-reader behavior
- ARIA semantics
- Color contrast
- Reduced motion
- Visible focus states
- Responsive behavior
- RTL behavior where applicable

Accessibility regressions should be treated seriously and should be resolved before merging when they affect existing supported functionality.

---

## Security

Security-sensitive changes require additional review.

Examples include changes involving:

- Authentication-related UI
- Authorization and permission gates
- Sensitive inputs
- File uploads
- URLs
- HTML rendering
- Session handling
- Device verification
- Trusted devices
- Security-related providers or utilities

Do not disclose security vulnerabilities through public issues.

See [SECURITY.md](SECURITY.md) for reporting security vulnerabilities.

---

## Tests and Validation

Contributors should run the narrowest appropriate validation for their change.

Depending on the change, this may include:

```bash
pnpm test
```

```bash
pnpm test:e2e
```

```bash
pnpm build
```

```bash
pnpm storybook
```

Use the repository's current package scripts as the authoritative commands.

For changes affecting public APIs, packaging, accessibility, SSR, or browser behavior, additional validation may be required.

See the [Developer Handbook](https://uikit.waysnx.tech) for the current validation requirements.

---

## Documentation

Documentation is part of the implementation.

If a change modifies public behavior, update the appropriate documentation.

The detailed Developer Handbook is maintained at:

**https://uikit.waysnx.tech**

Generated library and component documentation should be updated through the WaysNX Documentation Generator (WDG) process rather than manually editing generated output.

Do not manually patch generated JSON or generated documentation to hide extraction problems. Fix the underlying source or WDG behavior and regenerate the affected output.

---

## Pull Requests

Before opening a pull request:

- Ensure the change has a clear purpose.
- Keep the pull request focused.
- Ensure tests relevant to the change pass.
- Check the build when applicable.
- Check Storybook when component behavior changes.
- Check Playwright when browser-level behavior changes.
- Review accessibility impact.
- Review security impact.
- Update documentation when necessary.
- Ensure generated documentation is regenerated when required.

A pull request should explain:

1. **What changed**
2. **Why it changed**
3. **How it was validated**
4. **Any compatibility or migration considerations**

Screenshots or recordings are useful for visual or interaction changes.

---

## Commit Messages

Use clear and meaningful commit messages.

Recommended format:

```text
<type>: <short description>
```

Examples:

```text
feat: add keyboard navigation to command palette
fix: correct drawer focus restoration
docs: update form builder usage
test: add grid selection coverage
refactor: simplify modal state handling
chore: update build tooling
```

Keep commits focused on a logical change.

---

## Breaking Changes

Public API changes require additional care.

A change may be considered breaking when it modifies or removes:

- Public exports
- Component props
- Event contracts
- Type definitions
- CSS or design-token contracts
- Required peer dependencies
- Runtime behavior relied upon by consumers

Breaking changes should be clearly identified in the pull request and documented appropriately.

Do not introduce breaking changes merely for internal code-style or architectural preferences.

---

## Generated Files

Some repository documentation and metadata are generated by WDG.

Generated files must follow the repository's generation workflow.

Do not manually modify generated metadata to produce a desired result.

When generated output is incorrect:

1. Identify the source of the problem.
2. Correct the source or generator.
3. Regenerate the affected output.
4. Validate the generated result.
5. Commit the resulting generated files when required by the repository workflow.

---

## Adding a New Library

New libraries should not be added solely to increase the package count.

Before proposing a new library, establish:

- A clear functional boundary
- A distinct responsibility
- A meaningful reuse case
- Appropriate dependency boundaries
- A sustainable public API
- Documentation requirements
- Testing requirements
- Accessibility considerations where applicable
- Packaging and release implications

Discuss the proposal with the maintainers before implementation.

The existing 17-library structure should be preserved unless there is a clear architectural reason to change it.

---

## Issue Reports

When reporting a bug, provide enough information to reproduce the problem.

Include, where applicable:

- Package name
- Package version
- React version
- Browser and version
- Operating system
- Reproduction steps
- Expected behavior
- Actual behavior
- Minimal reproduction
- Relevant console or build output

For security vulnerabilities, do **not** use a public issue. Follow [SECURITY.md](SECURITY.md).

---

## Feature Requests

Feature requests should explain:

- The problem being solved
- Why the existing API is insufficient
- The expected behavior
- The intended consumers
- Whether the capability belongs in an existing library or requires a new library

Requests that duplicate existing functionality or introduce unnecessary abstraction may not be accepted.

---

## Code Review

Pull requests are reviewed for:

- Correctness
- API consistency
- Maintainability
- Test coverage
- Accessibility
- Security
- Performance
- Package boundaries
- Documentation
- Backward compatibility

Review comments should focus on the code and the proposed change rather than the contributor.

---

## Release and Versioning

The initial public release of the WaysNX UI Kit is targeted as version **1.0.0**.

All focused libraries and the aggregate package are intended to enter the public release at `1.0.0`.

After the public release, package versioning follows the project's release and compatibility policy.

Contributors should not independently change package versions unless the change is part of the approved release process.

---

## Code of Conduct

By participating in this project, contributors are expected to follow the project's [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

By contributing to WaysNX UI Kit, you agree that your contributions will be licensed under the repository's [Apache License 2.0](LICENSE).

---

## Developer Handbook

The GitHub repository intentionally keeps contributor guidance concise.

Detailed technical documentation is maintained in the WaysNX UI Kit Developer Handbook:

**https://uikit.waysnx.tech**

The handbook is the preferred source for:

- Architecture
- Library development
- Component standards
- Design tokens
- Theming
- Accessibility
- Security
- Testing
- Storybook
- Playwright
- WDG
- Packaging
- Publishing
- Release procedures

When repository-level contributor instructions and the handbook overlap, the repository's explicit contribution and security policies take precedence.

---

Thank you for helping improve WaysNX UI Kit.