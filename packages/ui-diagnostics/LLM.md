# @waysnx/ui-diagnostics — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see [`@waysnx/ui-kit` LLM.md](https://www.npmjs.com/package/@waysnx/ui-kit).

---

## ⭐ What this package does

Framework-agnostic client-side runtime diagnostics and UI error observability. Captures unexpected client-side failures, classifies errors (expected vs. unexpected), enriches with technical context, redacts sensitive data by default, and emits structured `DiagnosticEvent` to a provider-neutral reporter.

> **No components.** This is a functional/API library — it provides programmatic capture, classification, and reporting, not UI components. React integration (hooks, providers, error boundaries) is available via `@waysnx/ui-diagnostics/react`.

---

## Package info

- **npm:** `@waysnx/ui-diagnostics` v1.0.1
- **Install:** `npm install @waysnx/ui-diagnostics`
- **Peer deps:** `react >=18`, `react-dom >=18` (both optional — only required for `/react` entry point)
- **CSS:** None (this package ships no CSS)
- **Exports:**
  - `@waysnx/ui-diagnostics` — framework-agnostic core
  - `@waysnx/ui-diagnostics/react` — React integration (provider, error boundary, hooks)

---

## Exported functions & utilities

### Core (`@waysnx/ui-diagnostics`)

| Export | Purpose |
|--------|---------|
| `createDiagnostics(config)` | Creates a diagnostics instance |
| `classifyError(error, context)` | Classifies error into a `DiagnosticCategory` |
| `classifyHttpStatus(status)` | Maps HTTP status to category |
| `computeFingerprint(event)` | Generates stable fingerprint for deduplication |
| `createConsoleReporter(options?)` | Reporter that logs to console (dev default) |
| `createHttpReporter(options)` | Reporter that POSTs to an HTTP endpoint |
| `createNoopReporter()` | No-op reporter (production default if no reporter provided) |
| `createMemoryReporter()` | In-memory reporter for testing |
| `composeReporters(...reporters)` | Combines multiple reporters |
| `captureFormSubmissionError(...)` | Captures form submission errors with form context |
| `captureFormValidationError(...)` | Captures validation errors |
| `captureRuleEngineError(...)` | Captures rule engine errors |
| `captureSchemaError(...)` | Captures JSON schema errors |
| `EXPECTED_CATEGORIES` | Array of expected error categories |

### React integration (`@waysnx/ui-diagnostics/react`)

Re-exports all core exports, plus:

| Export | Purpose |
|--------|---------|
| `DiagnosticsProvider` | Context provider (wraps app) |
| `DiagnosticsErrorBoundary` | Error boundary for React component trees |
| `DiagnosticsContext` | React context (use via hook, not directly) |
| `useDiagnostics()` | Hook → `Diagnostics` instance |
| `useCaptureError()` | Hook → `(error, context?) => void` |

---

## Key type interfaces

### Diagnostics instance

```ts
interface Diagnostics {
  captureError(error: unknown, context?: DiagnosticContext): void;
  captureEvent(event: Partial<DiagnosticEvent> & { message: string }): void;
  setContext(context: Partial<DiagnosticContext>): void;
  setCorrelationId(correlationId: string | undefined): void;
  installGlobalHandlers(): void;
  removeGlobalHandlers(): void;
  setReporter(reporter: DiagnosticReporter): void;
  flush(): Promise<void>;
  shutdown(): Promise<void>;
}
```

### DiagnosticsConfig

```ts
interface DiagnosticsConfig {
  application?: {
    name?: string;
    version?: string;
    environment?: string;
    release?: string;
  };
  uiKit?: {
    version?: string;
    package?: string;
  };
  reporter?: DiagnosticReporter;
  capture?: {
    globalErrors?: boolean;           // default: true
    unhandledRejections?: boolean;    // default: true
    formErrors?: boolean;             // default: true
  };
  privacy?: {
    redactFields?: string[];          // fields to redact from metadata
    sanitize?: (metadata: Record<string, unknown>) => Record<string, unknown>;
    maxPayloadBytes?: number;
  };
  sampling?: {
    rate?: number;                    // 0..1, default: 1 (no sampling)
  };
  dedupe?: {
    windowMs?: number;                // suppress identical fingerprints within window
  };
  sessionId?: string;
  environment?: string;
  enabled?: boolean;                  // default: true
  beforeReport?: (event: DiagnosticEvent) => DiagnosticEvent | null;
  classify?: (error: unknown, context: DiagnosticContext) => DiagnosticCategory | undefined;
}
```

### DiagnosticContext

```ts
interface DiagnosticContext {
  category?: DiagnosticCategory;
  severity?: DiagnosticSeverity;    // 'debug' | 'info' | 'warning' | 'error' | 'fatal'
  source?: string;
  operation?: string;
  component?: { name?: string; version?: string };
  form?: { formId?: string; schemaVersion?: string; operation?: string };
  route?: { path?: string; screen?: string };
  correlationId?: string;
  metadata?: Record<string, unknown>;
  httpStatus?: number;              // for classification hints
}
```

### DiagnosticCategory

```ts
// Expected (application/API errors — not UI defects)
type ExpectedDiagnosticCategory =
  | 'VALIDATION'
  | 'BUSINESS_RULE'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT';

// Unexpected (potential UI/runtime defects)
type UnexpectedDiagnosticCategory =
  | 'UI_RUNTIME'
  | 'COMPONENT'
  | 'FORM'
  | 'FORM_SUBMISSION'
  | 'SCHEMA'
  | 'RULE_ENGINE'
  | 'RENDER'
  | 'UNHANDLED_REJECTION'
  | 'UNKNOWN';

type DiagnosticCategory =
  | ExpectedDiagnosticCategory
  | UnexpectedDiagnosticCategory;
```

### DiagnosticEvent (emitted to reporter)

```ts
interface DiagnosticEvent {
  id: string;                       // unique event ID
  timestamp: string;                // ISO 8601
  category: DiagnosticCategory;
  severity: DiagnosticSeverity;
  message: string;
  errorName?: string;
  stack?: string;
  source?: string;
  operation?: string;
  application?: DiagnosticApplicationContext;
  uiKit?: DiagnosticUiKitContext;
  component?: DiagnosticComponentContext;
  form?: DiagnosticFormContext;
  route?: DiagnosticRouteContext;
  runtime?: DiagnosticRuntimeContext;
  correlationId?: string;
  sessionId?: string;
  fingerprint?: string;             // for deduplication
  metadata?: Record<string, unknown>;
}
```

### DiagnosticReporter

```ts
interface DiagnosticReporter {
  report(event: DiagnosticEvent): void | Promise<void>;
  flush?(): Promise<void>;
  shutdown?(): void | Promise<void>;
}
```

---

## Usage examples

### Basic setup (framework-agnostic)

```ts
import { createDiagnostics, createConsoleReporter } from '@waysnx/ui-diagnostics';

const diagnostics = createDiagnostics({
  application: {
    name: 'My App',
    version: '1.0.0',
    environment: 'production',
  },
  reporter: createConsoleReporter(),
});

// Install global error handlers
diagnostics.installGlobalHandlers();
```

### Manual capture

```ts
try {
  await submitForm();
} catch (error) {
  diagnostics.captureError(error, {
    category: 'FORM_SUBMISSION',
    operation: 'submit',
    form: { formId: 'customer-form' },
  });
  throw error;
}
```

### React integration

```tsx
import { DiagnosticsProvider, DiagnosticsErrorBoundary } from '@waysnx/ui-diagnostics/react';

function App() {
  return (
    <DiagnosticsProvider diagnostics={diagnostics}>
      <DiagnosticsErrorBoundary component="App">
        <MyApp />
      </DiagnosticsErrorBoundary>
    </DiagnosticsProvider>
  );
}
```

### Using the hook

```tsx
import { useDiagnostics } from '@waysnx/ui-diagnostics/react';

function MyComponent() {
  const diagnostics = useDiagnostics();

  const handleClick = async () => {
    try {
      await someOperation();
    } catch (error) {
      diagnostics.captureError(error, {
        category: 'COMPONENT',
        component: { name: 'MyComponent' },
      });
    }
  };

  return <button onClick={handleClick}>Do Something</button>;
}
```

### HTTP reporter (send to backend)

```ts
import { createHttpReporter } from '@waysnx/ui-diagnostics';

const diagnostics = createDiagnostics({
  application: { name: 'My App', version: '1.0.0', environment: 'production' },
  reporter: createHttpReporter({
    endpoint: 'https://api.example.com/diagnostics',
    headers: { 'X-API-Key': 'your-key' },
    batchSize: 10,
    flushInterval: 5000,
  }),
});
```

### Compose multiple reporters

```ts
import { createConsoleReporter, createHttpReporter, composeReporters } from '@waysnx/ui-diagnostics';

const diagnostics = createDiagnostics({
  reporter: composeReporters(
    createConsoleReporter({ verbose: true }),
    createHttpReporter({ endpoint: 'https://api.example.com/diagnostics' }),
  ),
});
```

### Form diagnostics helpers

```ts
import { captureFormSubmissionError, captureFormValidationError } from '@waysnx/ui-diagnostics';

try {
  await submitForm(data);
} catch (error) {
  captureFormSubmissionError(diagnostics, error, {
    formId: 'customer-form',
    schemaVersion: '1.0',
  });
}

// Validation error
captureFormValidationError(diagnostics, validationErrors, {
  formId: 'customer-form',
  fieldName: 'email',
});
```

### Privacy/redaction

```ts
const diagnostics = createDiagnostics({
  privacy: {
    redactFields: ['password', 'ssn', 'creditCard', 'token'],
    maxPayloadBytes: 10000,
    sanitize: (metadata) => {
      // Custom sanitization logic
      if (metadata.email) {
        metadata.email = '[REDACTED]';
      }
      return metadata;
    },
  },
});
```

### Sampling and deduplication

```ts
const diagnostics = createDiagnostics({
  sampling: {
    rate: 0.1,  // Keep 10% of events
  },
  dedupe: {
    windowMs: 60000,  // Suppress identical fingerprints within 60s
  },
});
```

### Custom classification

```ts
const diagnostics = createDiagnostics({
  classify: (error, context) => {
    if (error instanceof MyCustomError) {
      return 'BUSINESS_RULE';
    }
    if (context.httpStatus === 404) {
      return 'NOT_FOUND';
    }
    return undefined; // fall back to built-in classification
  },
});
```

---

## Design principles

1. **Diagnostics must be optional** — Apps work with or without diagnostics installed
2. **Privacy comes before observability** — Redaction by default, sanitization hooks
3. **Expected errors must not be confused with UI defects** — Category taxonomy separates application/API errors from runtime bugs
4. **The core must remain vendor-neutral** — Reporter interface is the only contract with receiving systems
5. **Reporting must never break the application** — All reporter failures are caught silently

---

## React component props

### DiagnosticsProvider

```ts
interface DiagnosticsProviderProps {
  diagnostics: Diagnostics;
  children: ReactNode;
}
```

### DiagnosticsErrorBoundary

```ts
interface DiagnosticsErrorBoundaryProps {
  children: ReactNode;
  component?: string;               // component name for context
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

---

## Architecture

```
Detect → Classify → Enrich → Sanitize/Redact → DiagnosticEvent → Reporter
```

- **Capture:** Global handlers (`window.onerror`, `unhandledrejection`) + manual `captureError` calls
- **Classify:** Taxonomizes errors (expected vs. unexpected) using built-in rules + optional app override
- **Enrich:** Adds runtime context (browser, OS, route, component, form)
- **Privacy:** Redacts sensitive fields, applies custom sanitization, enforces payload limits
- **Dedupe & Sampling:** Fingerprint-based deduplication + probabilistic sampling
- **Emit:** Hands off structured `DiagnosticEvent` to the reporter

---

## Reporter implementations

| Reporter | Use Case |
|----------|----------|
| `createConsoleReporter()` | Development (default when `environment !== 'production'`) |
| `createHttpReporter(options)` | Production (POST to backend API) |
| `createNoopReporter()` | Disable reporting entirely |
| `createMemoryReporter()` | Testing (stores events in memory) |
| `composeReporters(...reporters)` | Send to multiple destinations |

---

## Notes for AI agents

- This package is **framework-agnostic** at its core — the base import works in any JS environment
- React integration is **opt-in** via the `/react` entry point
- **No UI components** — this is a functional/API library for observability
- Expected errors (VALIDATION, API_ERROR, etc.) are automatically classified as `info` or `warning`, not `error`
- Fingerprinting is automatic — used for deduplication and identifying repeat issues
- Privacy is enforced **before** the `beforeReport` hook, so apps cannot accidentally expose redacted data
- Reporters are fire-and-forget — failures are swallowed to prevent crashing the application

---

## Full documentation

https://uikit.waysnx.tech/components/ui-diagnostics
