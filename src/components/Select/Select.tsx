import { forwardRef, useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Select.css';

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  options: SelectOption[];
  placeholder?: ReactNode;
  size?: SelectSize;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      error = false,
      options,
      placeholder,
      size = 'md',
      className,
      disabled,
      required,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const errorId = errorText ? `${selectId}-error` : undefined;

    return (
      <label className={clsx('ds-field', className)} data-disabled={disabled || undefined}>
        {label && (
          <span className="ds-field__label">
            {label}
            {required && (
              <span className="ds-field__required" aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
        <span
          className={clsx(
            'ds-select',
            `ds-select--${size}`,
            {
              'ds-select--error': error,
            },
          )}
        >
          <select
            ref={ref}
            id={selectId}
            aria-describedby={clsx(helperId, errorId)}
            aria-invalid={error || undefined}
            className="ds-select__control"
            disabled={disabled}
            required={required}
            data-size={size}
            value={value}
            defaultValue={defaultValue}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled hidden={Boolean(value ?? defaultValue)}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={String(option.value)} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="ds-select__chevron" aria-hidden="true">
            ▾
          </span>
        </span>
        {!error && helperText && (
          <span id={helperId} className="ds-field__helper">
            {helperText}
          </span>
        )}
        {error && errorText && (
          <span id={errorId} className="ds-field__error">
            {errorText}
          </span>
        )}
      </label>
    );
  },
);

Select.displayName = 'Select';

