import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './TextInput.css';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Текст метки поля
   */
  label?: ReactNode;
  /**
   * Подсказка под полем
   */
  helperText?: ReactNode;
  /**
   * Сообщение об ошибке
   */
  errorText?: ReactNode;
  /**
   * Размер поля
   */
  size?: TextInputSize;
  /**
   * Отображать состояние ошибки
   */
  error?: boolean;
  /**
   * Ведущий элемент внутри поля
   */
  prefix?: ReactNode;
  /**
   * Замыкающий элемент внутри поля
   */
  suffix?: ReactNode;
  /**
   * Отображать индикатор обязательности
   */
  requiredIndicator?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      size = 'md',
      error = false,
      prefix,
      suffix,
      className,
      required,
      requiredIndicator = '•',
      disabled,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = helperText ? `${inputId}-helper` : undefined;
    const errorId = errorText ? `${inputId}-error` : undefined;

    return (
      <label className={clsx('ds-field', className)} data-disabled={disabled || undefined}>
        {label && (
          <span className="ds-field__label">
            {label}
            {required && (
              <span className="ds-field__required" aria-hidden="true">
                {requiredIndicator}
              </span>
            )}
          </span>
        )}
        <span
          className={clsx(
            'ds-input',
            `ds-input--${size}`,
            {
              'ds-input--with-prefix': Boolean(prefix),
              'ds-input--with-suffix': Boolean(suffix),
              'ds-input--error': error,
            },
          )}
        >
          {prefix && <span className="ds-input__affix ds-input__affix--prefix">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            className="ds-input__control"
            aria-describedby={clsx(descriptionId, errorId)}
            aria-invalid={error || undefined}
            required={required}
            disabled={disabled}
            data-size={size}
            {...rest}
          />
          {suffix && <span className="ds-input__affix ds-input__affix--suffix">{suffix}</span>}
        </span>
        {!error && helperText && (
          <span id={descriptionId} className="ds-field__helper">
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

TextInput.displayName = 'TextInput';

