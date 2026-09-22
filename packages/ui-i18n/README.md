# @waysnx/ui-i18n

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — TranslationProvider and locale management.

Internationalization (i18n) provider for WaysNX UI Kit — shared translation context across all packages.

## Installation

```bash
npm install @waysnx/ui-i18n
```

Requires `react` (>=18) as a peer dependency.

## Overview

`@waysnx/ui-i18n` is a functional library rather than a component catalog. It provides the shared translation context that WaysNX UI Kit packages use for localized text, exposing a provider, a hook, a higher-order component, and default and locale message packs.

## Exports

- `TranslationProvider` — supplies translation context to the tree
- `useTranslation` — hook to access translations
- `withTranslation` — higher-order component wrapper
- `defaultMessages` and locale packs: `esMessages`, `frMessages`, `arMessages`
- Message/config types: `TranslationProviderProps`, `AllMessages`, `TranslationMessages`, `TranslationConfig`, and per-package message types

See the documentation site for the complete, authoritative API reference.

## Usage

```tsx
import { TranslationProvider } from "@waysnx/ui-i18n";

export function App({ children }: { children: React.ReactNode }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
```

## Documentation

Full API reference: https://uikit.waysnx.tech
