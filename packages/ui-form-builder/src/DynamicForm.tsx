import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Button, useTranslation } from '@waysnx/ui-core';
import type {
  JSONSchema,
  JSONSchemaProperty,
  FormLayout,
  LayoutSettings,
  GridRow,
  GridCell,
  CellSettings,
  FormFieldConfig,
} from './types';
import { DEFAULT_LAYOUT_SETTINGS } from './types';
import { resolveField } from './DynamicField';
import { shouldShowField, shouldDisableField, shouldRequireField } from './conditionalLogic';
import { FORM_BUILDER_API_URL } from './config';
import './DynamicForm.css';

function DismissibleInfo({ text, dismissLabel }: { text: string; dismissLabel: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="wx-df-info">
      <span>{text}</span>
      <button type="button" className="wx-df-info-close" onClick={() => setDismissed(true)} aria-label={dismissLabel}>×</button>
    </div>
  );
}

export interface DynamicFormProps {
  /** JSON Schema for the form. Required unless formLayoutId is provided. */
  schema?: JSONSchema | string;
  /** Layout configuration for the form. Required unless formLayoutId is provided. */
  formLayout?: FormLayout | string;
  /**
   * Page layout ID to load schema and layout from the WaysNX API.
   * When provided, schema and formLayout props are not needed.
   * The library fetches from: https://api.apiformbuilder.com/pageLayouts/layout/{formLayoutId}
   */
  formLayoutId?: string;
  formData?: Record<string, any>;
  formClass?: string;
  isFormReadonly?: boolean;
  onSubmit?: (data: Record<string, any>) => void;
  onBtnClick?: (buttonName: string) => void;
  onFieldChange?: (name: string, value: any, formData: Record<string, any>) => void;
  onFormReady?: (form: { getData: () => Record<string, any>; reset: () => void; validate: () => boolean }) => void;
  /**
   * Field-level translations. Keys are field names, values contain translated text.
   * Example: { firstName: { label: 'Nombre', placeholder: 'Ingrese nombre' } }
   */
  translations?: Record<string, { label?: string; placeholder?: string; helpText?: string; validation?: Record<string, string>; options?: Record<string, string> }>;
  /**
   * Whether to show the top-level error summary block when form validation fails on submit.
   * Individual fields always show their own inline error messages regardless of this setting.
   * Default: false (summary hidden — inline field errors are sufficient for most cases).
   * Set to true to show the accessible error summary list above the form for screen reader users.
   */
  showErrorSummary?: boolean;
  /** Test ID for targeting the form element in tests */
  testId?: string;
}

function mapControlType(cellSettings: CellSettings): string | undefined {
  const ct = cellSettings.controlType;
  if (!ct) return undefined;
  const map: Record<string, string> = {
    hidden: 'hidden', textarea: 'textarea', select: 'select', multiselect: 'multiselect',
    autocomplete: 'autocomplete', 'auto-complete': 'autocomplete',
    'html-editor': 'html-editor', 'html-content': 'html-content', 'file-upload': 'file-upload',
    toggle: 'toggle', checkbox: 'checkbox', radio: 'radio',
    slider: 'slider', button: 'button', link: 'link', html: 'html',
    tree: 'tree', 'date-range': 'date-range-picker',
  };
  return map[ct];
}

function mergeWithSchema(
  schemaProperty: JSONSchemaProperty | undefined,
  cellSettings: CellSettings,
): JSONSchemaProperty {
  const base: JSONSchemaProperty = { ...(schemaProperty || { type: 'string' }) };
  if (cellSettings.title) base.title = cellSettings.title;
  if (cellSettings.pattern) base.pattern = cellSettings.pattern;
  if (cellSettings.readonly) base.readOnly = true;
  if (cellSettings['x-col-size']) base['x-col-size'] = cellSettings['x-col-size'];
  if (cellSettings['x-columns']) base['x-columns'] = cellSettings['x-columns'];
  const mapped = mapControlType(cellSettings);
  if (mapped && !schemaProperty?.['x-component']) base['x-component'] = mapped;
  if (cellSettings.controlType === 'input' && cellSettings.inputType) {
    const formatMap: Record<string, string> = { email: 'email', tel: 'tel', password: 'password', url: 'uri' };
    if (formatMap[cellSettings.inputType]) base.format = formatMap[cellSettings.inputType];
  }
  return base;
}

function createInitialData(schema: JSONSchema): Record<string, any> {
  const data: Record<string, any> = {};
  Object.entries(schema.properties).forEach(([key, prop]) => {
    if (prop.default !== undefined) data[key] = prop.default;
    else if (prop.type === 'boolean') data[key] = false;
    else if (prop.type === 'array') data[key] = [];
    else data[key] = '';
  });
  return data;
}

function isEmpty(val: any): boolean {
  if (val === undefined || val === null || val === '') return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === 'string' && val.trim() === '') return true;
  return false;
}

/** Collect all cells from layout rows (recursive for nested grids) */
function collectCells(rows: GridRow[]): GridCell[] {
  const cells: GridCell[] = [];
  for (const row of rows) {
    for (const cell of row.cells) {
      if (cell.nestedGrid) cells.push(...collectCells(cell.nestedGrid.rows));
      else cells.push(cell);
    }
  }
  return cells;
}

/**
 * Mark all form inputs as touched by triggering focus+blur.
 * This makes each component run its own validation and show errors.
 */
function markAllTouched(formEl: HTMLFormElement) {
  const inputs = formEl.querySelectorAll('input, select, textarea');
  inputs.forEach((el) => {
    const htmlEl = el as HTMLElement;
    htmlEl.focus({ preventScroll: true });
    htmlEl.blur();
  });
}

/** Format data before returning */
function formatFormData(data: Record<string, any>, schema: JSONSchema): Record<string, any> {
  const formatted = { ...data };
  Object.entries(formatted).forEach(([key, value]) => {
    const prop = schema.properties[key];
    if (!prop) return;
    if (prop.format === 'date' && value instanceof Date) {
      const y = value.getFullYear();
      const m = String(value.getMonth() + 1).padStart(2, '0');
      const d = String(value.getDate()).padStart(2, '0');
      formatted[key] = `${y}-${m}-${d}`;
    }
    if (prop.format === 'date-time' && value instanceof Date) {
      const y = value.getFullYear();
      const mo = String(value.getMonth() + 1).padStart(2, '0');
      const d = String(value.getDate()).padStart(2, '0');
      const h = String(value.getHours()).padStart(2, '0');
      const mi = String(value.getMinutes()).padStart(2, '0');
      const s = String(value.getSeconds()).padStart(2, '0');
      formatted[key] = `${y}-${mo}-${d} ${h}:${mi}:${s}`;
    }
    if (prop.type === 'array' && Array.isArray(value)) {
      formatted[key] = value.filter((item: any) => item !== true && item !== false && item !== '' && item !== null);
    }
  });
  return formatted;
}

export function DynamicForm({
  schema: schemaProp,
  formLayout: layoutProp,
  formLayoutId,
  formData: initialData,
  formClass = '',
  isFormReadonly = false,
  onSubmit,
  onBtnClick,
  onFieldChange,
  onFormReady,
  translations,
  showErrorSummary = false,
  testId,
}: DynamicFormProps) {
  const { t } = useTranslation();
  // State for remote loading via formLayoutId
  const [remoteSchema, setRemoteSchema] = useState<JSONSchema | null>(null);
  const [remoteLayout, setRemoteLayout] = useState<FormLayout | null>(null);
  const [remoteLoading, setRemoteLoading] = useState(!!formLayoutId);
  const [remoteError, setRemoteError] = useState<string | null>(null);

  useEffect(() => {
    if (!formLayoutId) return;
    setRemoteLoading(true);
    setRemoteError(null);
    fetch(`${FORM_BUILDER_API_URL}pageLayouts/layout/${encodeURIComponent(formLayoutId)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load layout (${res.status})`);
        return res.json().catch(() => {
          throw new Error('Form layout not found or API returned empty response. Ensure the formLayoutId is valid.');
        });
      })
      .then((data) => {
        const schema = typeof data.schema === 'string' ? JSON.parse(data.schema) : data.schema;
        const layout = typeof data.layout === 'string' ? JSON.parse(data.layout) : data.layout;
        setRemoteSchema(schema);
        setRemoteLayout(layout);
        setRemoteLoading(false);
      })
      .catch((err) => {
        setRemoteError(err.message || t('formBuilder.loadFailed'));
        setRemoteLoading(false);
      });
  }, [formLayoutId]);

  // Use remote schema/layout if formLayoutId provided, otherwise use props
  const resolvedSchemaProp = remoteSchema || schemaProp;
  const resolvedLayoutProp = remoteLayout || layoutProp;

  // Show loading/error states when using formLayoutId
  if (formLayoutId && remoteLoading) {
    return (
      <div className="wx-dynamic-form" style={{ padding: '24px', textAlign: 'center', color: 'var(--wx-color-text-muted)' }}>
        {t('formBuilder.loading')}
      </div>
    );
  }

  if (formLayoutId && remoteError) {
    return (
      <div className="wx-dynamic-form" style={{ padding: '24px', color: 'var(--wx-color-error)' }}>
        {remoteError}
      </div>
    );
  }

  if (!resolvedSchemaProp || !resolvedLayoutProp) return null;

  return <DynamicFormInner
    schemaProp={resolvedSchemaProp}
    layoutProp={resolvedLayoutProp}
    initialData={initialData}
    formClass={formClass}
    isFormReadonly={isFormReadonly}
    onSubmit={onSubmit}
    onBtnClick={onBtnClick}
    onFieldChange={onFieldChange}
    onFormReady={onFormReady}
    translations={translations}
    showErrorSummary={showErrorSummary}
    testId={testId}
  />;
}

function DynamicFormInner({
  schemaProp,
  layoutProp,
  initialData,
  formClass = '',
  isFormReadonly = false,
  onSubmit,
  onBtnClick,
  onFieldChange,
  onFormReady,
  translations,
  showErrorSummary = false,
  testId,
}: {
  schemaProp: JSONSchema | string;
  layoutProp: FormLayout | string;
  initialData?: Record<string, any>;
  formClass?: string;
  isFormReadonly?: boolean;
  onSubmit?: (data: Record<string, any>) => void;
  onBtnClick?: (buttonName: string) => void;
  onFieldChange?: (name: string, value: any, formData: Record<string, any>) => void;
  onFormReady?: (form: { getData: () => Record<string, any>; reset: () => void; validate: () => boolean }) => void;
  translations?: Record<string, { label?: string; placeholder?: string; helpText?: string; validation?: Record<string, string> }>;
  showErrorSummary?: boolean;
  testId?: string;
}) {
  const { t } = useTranslation();
  const schema: JSONSchema = useMemo(
    () => (typeof schemaProp === 'string' ? JSON.parse(schemaProp) : schemaProp),
    [schemaProp],
  );
  const parsedLayout: FormLayout = useMemo(
    () => (typeof layoutProp === 'string' ? JSON.parse(layoutProp) : layoutProp),
    [layoutProp],
  );
  
  // Merge user-provided settings with defaults to ensure all required properties exist.
  // This prevents crashes when AI agents or users omit buttonsPosition, buttonsAlignment, or buttons.
  const layout: FormLayout = useMemo(() => ({
    ...parsedLayout,
    settings: {
      ...DEFAULT_LAYOUT_SETTINGS,
      ...parsedLayout.settings,
    },
  }), [parsedLayout]);

  const [formData, setFormData] = useState<Record<string, any>>(
    () => initialData || createInitialData(schema),
  );
  const [formErrors, setFormErrors] = useState<Array<{ fieldName: string; message: string }>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const requiredFields = useMemo(() => schema.required || [], [schema]);

  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        onFieldChange?.(name, value, next);
        return next;
      });
      // Clear the inline error for this field when user changes it
      setFormErrors((prev) => prev.filter(e => e.fieldName !== name));
    },
    [onFieldChange],
  );

  /** Check if form is valid — all visible required fields have values, patterns match */
  const isFormValid = useCallback(
    (data: Record<string, any>): boolean => {
      const allCells = collectCells(layout.rows);
      for (const cell of allCells) {
        const { settings } = cell;
        if (!settings.fieldName) continue;
        if (settings.controlType === 'hidden') continue;

        const schemaProp = schema.properties[settings.fieldName];
        const merged = mergeWithSchema(schemaProp, settings);

        const isVisible = shouldShowField(merged['x-show-when'], data);
        if (!isVisible) continue;

        const baseRequired = settings.required ?? requiredFields.includes(settings.fieldName);
        const required = shouldRequireField(merged['x-required-when'], data, baseRequired);
        const val = data[settings.fieldName];

        // Required check
        if (required && isEmpty(val)) return false;

        // Skip further checks if empty and not required
        if (isEmpty(val)) continue;

        const strVal = typeof val === 'string' ? val : String(val ?? '');

        // Email format
        if (merged.format === 'email') {
          const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(strVal)) return false;
        }

        // Pattern
        if (merged.pattern) {
          try { if (!new RegExp(merged.pattern).test(strVal)) return false; } catch { /* skip */ }
        }

        // MinLength / MaxLength
        if (merged.minLength !== undefined && strVal.length < merged.minLength) return false;
        if (merged.maxLength !== undefined && strVal.length > merged.maxLength) return false;

        // Min / Max (number)
        if (merged.minimum !== undefined) {
          const numVal = Number(val);
          if (!isNaN(numVal) && numVal < merged.minimum) return false;
        }
        if (merged.maximum !== undefined) {
          const numVal = Number(val);
          if (!isNaN(numVal) && numVal > merged.maximum) return false;
        }
      }
      return true;
    },
    [layout, schema, requiredFields],
  );

  // Expose form API
  React.useEffect(() => {
    onFormReady?.({
      getData: () => formData,
      reset: () => setFormData(initialData || createInitialData(schema)),
      validate: () => {
        if (formRef.current) markAllTouched(formRef.current);
        return isFormValid(formData);
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched so components show their own errors
    if (formRef.current) markAllTouched(formRef.current);

    if (!isFormValid(formData)) {
      // Collect validation errors for announcement
      const errors: Array<{ fieldName: string; message: string }> = [];
      const allCells = collectCells(layout.rows);
      for (const cell of allCells) {
        const { settings } = cell;
        if (!settings.fieldName) continue;
        const schemaProp = schema.properties[settings.fieldName];
        const merged = mergeWithSchema(schemaProp, settings);
        const isVisible = shouldShowField(merged['x-show-when'], formData);
        if (!isVisible) continue;
        const baseRequired = settings.required ?? requiredFields.includes(settings.fieldName);
        const required = shouldRequireField(merged['x-required-when'], formData, baseRequired);
        const val = formData[settings.fieldName];
        if (required && isEmpty(val)) {
          const fieldLabel = translations?.[settings.fieldName]?.label || merged.title || settings.fieldName;
          const errorMsg = translations?.[settings.fieldName]?.validation?.required || t('validation.required');
          errors.push({ fieldName: settings.fieldName, message: `${fieldLabel} — ${errorMsg}` });
        }
      }
      setFormErrors(errors);
      
      // Scroll to first error
      if (formRef.current) {
        const firstError = formRef.current.querySelector('.wx-input-error, .wx-textarea-error, .wx-select-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (firstError as HTMLElement).focus();
        }
      }
      return;
    }

    setFormErrors([]);
    const formatted = formatFormData(formData, schema);
    onSubmit?.(formatted);
  };

  const handleBtnClick = (btnName: string, btnType: string) => {
    if (btnType === 'submit') return;
    onBtnClick?.(btnName);
  };

  const resolveCell = (cell: GridCell): FormFieldConfig | null => {
    const { settings } = cell;
    if (!settings.fieldName) return null;
    const schemaProp = schema.properties[settings.fieldName];
    const merged = mergeWithSchema(schemaProp, settings);

    // Apply field-level translations if provided
    if (translations && translations[settings.fieldName]) {
      const fieldTrans = translations[settings.fieldName];
      if (fieldTrans.label) merged.title = fieldTrans.label;
      if (fieldTrans.placeholder) merged['x-placeholder'] = fieldTrans.placeholder;
      if (fieldTrans.helpText) merged.description = fieldTrans.helpText;
      if (fieldTrans.validation?.required) merged['x-error-message'] = fieldTrans.validation.required;
      if ((fieldTrans as any).button) merged.title = (fieldTrans as any).button;
    }

    const isVisible = shouldShowField(merged['x-show-when'], formData);
    if (!isVisible) return null;
    const isDisabled = isFormReadonly || settings.disabled || shouldDisableField(merged['x-disable-when'], formData);
    const baseRequired = settings.required ?? requiredFields.includes(settings.fieldName);
    const required = shouldRequireField(merged['x-required-when'], formData, baseRequired);
    const fieldError = formErrors.find(e => e.fieldName === settings.fieldName)?.message.split(' — ')[1];
    return resolveField(settings.fieldName, merged, formData[settings.fieldName], (val) => handleChange(settings.fieldName!, val), required, isDisabled, fieldError);
  };

  const renderCell = (cell: GridCell, index: number) => {
    if (cell.nestedGrid) {
      return (
        <div key={index} className="wx-df-col wx-df-col-12">
          {renderLayout(cell.nestedGrid, true)}
        </div>
      );
    }
    if (cell.settings.text && !cell.settings.fieldName) {
      return (
        <div key={index} className={`wx-df-col wx-df-col-${cell.settings['x-col-size'] || 12} ${cell.settings.cssClass || ''}`}>
          <div>{cell.settings.text}</div>
        </div>
      );
    }
    const field = resolveCell(cell);
    if (!field) return null;
    const colSize = cell.settings['x-col-size'] || 12;
    if (cell.settings.controlType === 'hidden') {
      return <React.Fragment key={index}>{field.component}</React.Fragment>;
    }
    return (
      <div key={index} className={`wx-df-col wx-df-col-${colSize} ${cell.settings.cssClass || ''}`}>
        {field.useFormFieldLabel && (
          <label className="wx-df-label">
            {field.label}
            {field.required && <span className="wx-df-required">*</span>}
          </label>
        )}
        {field.component}
      </div>
    );
  };

  const renderRow = (row: GridRow, rowIndex: number) => (
    <div key={row.settings?.rowId || rowIndex} className={`wx-df-row ${row.settings?.cssClass || ''}`}>
      {row.cells.map((cell, ci) => renderCell(cell, ci))}
    </div>
  );

  const renderButtons = () => {
    const buttons = layout.settings.buttons;
    if (!buttons?.length) return null;
    const align = layout.settings.buttonsAlignment || 'text-right';
    const justifyMap: Record<string, string> = { 'text-right': 'flex-end', 'text-left': 'flex-start', 'text-center': 'center' };
    return (
      <div className="wx-df-buttons" style={{ justifyContent: justifyMap[align] || 'flex-end' }}>
        {buttons.map((btn, i) => {
          // Apply translations for layout buttons
          const btnKey = `btn-${btn.label?.toLowerCase().replace(/\s+/g, '-')}`;
          const translatedLabel = (translations as any)?.[btnKey]?.button || btn.label;
          return (
            <Button 
              key={i} 
              type={btn.type || 'button'} 
              variant={btn.appearance === 'primary' ? 'primary' : 'outline'}
              onClick={() => handleBtnClick(btn.name, btn.type)}
              aria-label={translatedLabel}
            >
              {translatedLabel}
            </Button>
          );
        })}
      </div>
    );
  };

  const renderLayout = (l: FormLayout, isNested = false) => {
    // Ensure nested layouts also have default settings
    const layoutWithDefaults = {
      ...l,
      settings: { ...DEFAULT_LAYOUT_SETTINGS, ...l.settings },
    };
    
    const content = (
      <>
        {layoutWithDefaults.settings.infoText && <DismissibleInfo text={layoutWithDefaults.settings.infoText} dismissLabel={t('formBuilder.dismissInfo')} />}
        {layoutWithDefaults.rows.map((row, ri) => renderRow(row, ri))}
      </>
    );
    if (isNested && layoutWithDefaults.settings.fieldGroup) {
      return (
        <fieldset className={`wx-df-fieldset ${layoutWithDefaults.settings.cssClass || ''}`}>
          <legend className="wx-df-legend">{layoutWithDefaults.settings.fieldGroup}</legend>
          {content}
        </fieldset>
      );
    }
    return content;
  };

  const topButtons = layout.settings.buttonsPosition === 'top';
  const formLabel = layout.settings.fieldGroup || schema.title || 'Form';

  return (
    <form 
      ref={formRef} 
      className={`wx-dynamic-form ${formClass} ${layout.settings.cssClass || ''}`} 
      onSubmit={handleSubmit} 
      noValidate
      aria-label={formLabel}
      data-testid={testId}
    >
      {showErrorSummary && formErrors.length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="wx-df-form-errors"
        >
          <h3>{t('formBuilder.fixErrors')}</h3>
          <ul>
            {formErrors.map((error, i) => (
              <li key={i}>
                <a href={`#${error.fieldName}`}>
                  {error.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {layout.settings.fieldGroup && (
        <fieldset className="wx-df-fieldset">
          <legend className="wx-df-legend">{layout.settings.fieldGroup}</legend>
          {layout.settings.infoText && <DismissibleInfo text={layout.settings.infoText} dismissLabel={t('formBuilder.dismissInfo')} />}
          {topButtons && renderButtons()}
          {layout.rows.map((row, ri) => renderRow(row, ri))}
          {!topButtons && renderButtons()}
        </fieldset>
      )}
      {!layout.settings.fieldGroup && (
        <>
          {layout.settings.infoText && <DismissibleInfo text={layout.settings.infoText} dismissLabel={t('formBuilder.dismissInfo')} />}
          {topButtons && renderButtons()}
          {layout.rows.map((row, ri) => renderRow(row, ri))}
          {!topButtons && renderButtons()}
        </>
      )}
    </form>
  );
}
