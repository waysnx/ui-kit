# @waysnx/ui-form-builder

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — DynamicForm, JSON Schema to form, conditional logic, and form arrays.

Schema-driven form builder from WaysNX — renders forms from JSON Schema using `@waysnx/ui-core` components.

## Installation

```bash
npm install @waysnx/ui-form-builder
```

Requires `react` and `react-dom` (>=18) and `@waysnx/ui-core` as peer dependencies. `@waysnx/ui-form-builder` renders its fields using `@waysnx/ui-core` controls, so install both.

## Overview

`@waysnx/ui-form-builder` is a functional library rather than a component catalog. It takes a JSON Schema (and optional layout) and renders a working form from it, handling field resolution, layout, conditional logic, and submission. This lets applications describe forms as data instead of hand-wiring individual inputs.

## Exports

- `DynamicForm` — the primary component that renders a form from a schema and/or layout
- `FormArray` — repeatable field-group rendering
- `resolveField` — resolves a schema field to its rendered control
- `schemaToFormFields` — converts a JSON Schema into form field definitions
- Conditional-logic helpers: `evaluateCondition`, `evaluateConditions`, `shouldShowField`, `shouldDisableField`, `shouldRequireField`
- Types: `JSONSchema`, `JSONSchemaProperty`, `FormFieldConfig`, `ControlCondition`, `FormLayout`, `DynamicFormProps`, `FormArrayProps`, and related layout types

See the documentation site for the complete, authoritative API reference.

## Usage

```tsx
import { DynamicForm } from "@waysnx/ui-form-builder";

const schema = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First name" },
  },
};

export function Example() {
  return (
    <DynamicForm
      schema={schema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## Documentation

Full API and schema reference: https://uikit.waysnx.tech
