import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './CustomCheckbox.css';

export interface CustomCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  /**
   * Пользовательский индикатор чекбокса
   */
  indicator?: ReactNode;
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ id, label, description, indicator, className, disabled, ...rest }, ref) => {
    return (
      <label
        className={clsx('ds-checkbox', className)}
        data-disabled={disabled || undefined}
        htmlFor={id}
      >
        <span className="ds-checkbox__control">
          <input
            {...rest}
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            className="ds-checkbox__input"
          />
          <span aria-hidden="true" className="ds-checkbox__indicator">
            {indicator ?? <DefaultIndicator />}
          </span>
        </span>
        <span className="ds-checkbox__content">
          {label && <span className="ds-checkbox__label">{label}</span>}
          {description && (
            <span className="ds-checkbox__description">{description}</span>
          )}
        </span>
      </label>
    );
  },
);

CustomCheckbox.displayName = 'CustomCheckbox';

const DefaultIndicator = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ds-checkbox__icon"
  >
    <path
      d="M11.6673 3.79175L5.25065 10.2084L2.33398 7.29175"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

