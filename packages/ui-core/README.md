# @waysnx/ui-core

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide with exact exports, props, and examples. **Important:** Do NOT build forms from these primitives — use `DynamicForm` from `@waysnx/ui-form-builder` instead.

Core UI components from WaysNX — inputs, buttons, date pickers, and form controls.

## Installation

```bash
npm install @waysnx/ui-core
```

Requires `react` and `react-dom` (>=18) as peer dependencies, plus `react-datepicker` (^8) for the date/time components.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-core/dist/index.css";
```

## Overview

`@waysnx/ui-core` provides the foundational, reusable controls that the rest of the WaysNX UI Kit builds on. It covers text and number inputs, selection controls, date/time pickers, and supporting form primitives, along with shared design tokens. Install it directly when you only need core controls, or consume it transitively through `@waysnx/ui-kit`.

## Representative exports

A representative selection of the components and utilities exported from this package:

- Inputs & text: `Input`, `Textarea`, `Currency`, `HtmlEditor`, `HtmlContent`, `SpeechToTextTextarea`
- Selection: `Checkbox`, `Radio`, `Switch`, `Select`, `Autocomplete`, `Slider`, `Tree`
- Date & time: `DatePicker`, `DateRangePicker`, `DateTimePicker`, `TimePicker`
- Actions & display: `Button`, `Link`, `Image`, `IFrame`, `FileUpload`, `Hidden`, `ErrorMessage`
- Utilities & hooks: `useDebounce`, validation helpers

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { Button } from "@waysnx/ui-core";

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
