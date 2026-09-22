# @waysnx/ui-diagnostics

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — runtime diagnostics, error capture, classification, and reporting.

## Purpose
Framework-agnostic client-side runtime diagnostics, UI error observability, and
form diagnostics for applications built with the WaysNX UI Kit.

It captures unexpected client-side/UI failures, classifies expected application
errors apart from unexpected runtime failures, enriches them with technical
context, redacts sensitive data by default, and hands off a safe, structured
`DiagnosticEvent` to a provider-neutral reporter.

## Architectural boundary: capture & emit only
This is a **capture and emission** library. It does not own persistent storage,
server-side aggregation, indexing, dashboards, or regression analysis. Its
responsibility ends after producing a `DiagnosticEvent` and handing it to the
configured reporter. The only contract with the receiving system is the event
schema and the `DiagnosticReporter` interface.

```
Detect → Classify → Enrich → Sanitize/Redact → DiagnosticEvent → Reporter
```

## Installation
```bash
npm install @waysnx/ui-diagnostics
```

React integration (`DiagnosticsProvider`, `DiagnosticsErrorBoundary`) is exposed
through the `@waysnx/ui-diagnostics/react` entry point and requires `react`.

## Basic setup
```ts
import { createDiagnostics, createConsoleReporter } from "@waysnx/ui-diagnostics";

const diagnostics = createDiagnostics({
  application: { name: "My Application", version: "1.0.0", environment: "production" },
  reporter: createConsoleReporter(),
});

diagnostics.installGlobalHandlers();
```

## Manual capture
```ts
try {
  await submitForm();
} catch (error) {
  diagnostics.captureError(error, { category: "FORM_SUBMISSION", operation: "submit" });
  throw error;
}
```

## React integration
```tsx
import { DiagnosticsProvider, DiagnosticsErrorBoundary } from "@waysnx/ui-diagnostics/react";

<DiagnosticsProvider diagnostics={diagnostics}>
  <DiagnosticsErrorBoundary component="CustomerForm">
    <CustomerForm />
  </DiagnosticsErrorBoundary>
</DiagnosticsProvider>
```

## Design principles
1. Diagnostics must be optional.
2. Privacy comes before observability.
3. Expected errors must not be confused with UI defects.
4. The core must remain vendor-neutral.
5. Reporting must never break the application.

## Documentation
Full API reference: https://uikit.waysnx.tech

## Release Status
Production-ready and part of the WaysNX UI Kit `1.0.0` public release. As a
functional/API library it ships zero standalone components by design; its API is
considered stable for `1.0.0`.
