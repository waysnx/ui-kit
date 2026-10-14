import React from 'react';

export interface JSONSchemaProperty {
  type: string;
  title?: string;
  description?: string;
  enum?: string[];
  format?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  required?: boolean | string[]; // boolean for field-level, string[] for object-level
  default?: any;
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  contentMediaType?: string;
  readOnly?: boolean;

  // Component selection
  'x-component'?: string;

  // Data & options
  'x-data'?: any;
  'x-enum-labels'?: string[];
  'x-xref-url'?: string;
  'x-xref-id-prop'?: string;
  'x-xref-display-prop'?: string;

  // Button properties
  'x-button-variant'?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  'x-button-type'?: 'submit' | 'button' | 'reset';
  'x-button-action'?: string;

  // Display
  'x-placeholder'?: string;
  'x-error-message'?: string;
  'x-validate-on'?: 'blur' | 'change';
  'x-match-with'?: string;
  'x-col-size'?: number;

  // Masking properties
  'x-mask'?: boolean | string;
  'x-thousand-separator'?: string;
  'x-decimal-separator'?: string;
  'x-decimal-scale'?: number;

  // Currency properties
  'x-currency-symbol'?: string;
  'x-currency-position'?: 'start' | 'end';
  'x-precision'?: number;

  // FileUpload properties
  'x-accept'?: string;
  'x-file-size'?: number;
  'x-file-format'?: 'blob' | 'binary';
  'x-show-file-preview'?: boolean;
  'x-skip-file-upload-btn'?: boolean;
  'x-browse-button-text'?: string;
  'x-show-last-modified'?: boolean;

  // FormArray properties
  'x-can-add'?: boolean;
  'x-can-delete'?: boolean;
  'x-add-button-title'?: string;
  'x-delete-button-title'?: string;
  'x-min-items'?: number;
  'x-max-items'?: number;

  // Layout for options (radio, checkbox)
  'x-columns'?: number;

  // Textarea rows
  'x-rows'?: number;

  // Searchable select
  'x-searchable'?: boolean;

  // Date/Time formats
  'x-date-format'?: string;
  'x-time-format'?: string;

  // Accessibility
  'x-aria-label'?: string;
  'x-aria-described-by'?: string;

  // IFrame
  'x-src'?: string;
  'x-title'?: string;
  'x-height'?: number | string;
  'x-sandbox'?: string;

  // Image
  'x-alt'?: string;
  'x-caption'?: string;
  'x-fit'?: 'cover' | 'contain' | 'fill' | 'none';
  'x-rounded'?: boolean | 'full';
  'x-width'?: number | string;

  // Link
  'x-href'?: string;
  'x-target'?: '_blank' | '_self' | '_parent' | '_top';

  // Conditional logic
  'x-show-when'?: ControlCondition[];
  'x-disable-when'?: ControlCondition[];
  'x-required-when'?: ControlCondition[];

  'x-value'?: string;
  'x-show-past-dates'?: boolean;
  'x-show-future-dates'?: boolean
}

export interface ControlCondition {
  name: string;
  value?: any;
  operator?: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'notEmpty' | 'isEmpty';
}

export interface JSONSchema {
  type: 'object';
  title?: string;
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface FormFieldConfig {
  name: string;
  label: string;
  component: React.ReactElement;
  required: boolean;
  useFormFieldLabel: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// ---- Layout types for DynamicForm ----

export interface CellSettings {
  fieldName?: string;
  title?: string;
  controlType?: string;
  inputType?: string;
  'x-col-size'?: number;
  'x-columns'?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  pattern?: string;
  patternType?: string;
  text?: string;
  cssClass?: string;
  cssClasses?: string;
  infoText?: string;
}

export interface GridCell {
  settings: CellSettings;
  nestedGrid?: FormLayout;
}

export interface RowSettings {
  rowId?: string;
  cssClass?: string;
}

export interface GridRow {
  cells: GridCell[];
  settings?: RowSettings;
}

export interface LayoutButton {
  label: string;
  name: string;
  type: 'submit' | 'button' | 'reset';
  appearance?: string;
  pattern?: string;
  cssClasses?: string;
}

export interface LayoutSettings {
  path?: string;
  method?: string;
  cssClass?: string;
  fieldGroup?: string;
  infoText?: string;
  buttonsPosition?: 'top' | 'bottom';
  buttonsAlignment?: 'text-left' | 'text-right' | 'text-center';
  buttons?: LayoutButton[];
}

export interface FormLayout {
  rows: GridRow[];
  settings: LayoutSettings;
  childForms?: Record<string, any>;
}

/** Default settings for FormLayout - use this to ensure all required properties are set */
export const DEFAULT_LAYOUT_SETTINGS: LayoutSettings = {
  buttonsPosition: 'bottom',
  buttonsAlignment: 'text-right',
  buttons: [],
};
