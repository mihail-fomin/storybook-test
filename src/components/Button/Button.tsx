import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Основной визуальный вариант кнопки
   * @default primary
   */
  variant?: ButtonVariant;
  /**
   * Размер кнопки
   * @default md
   */
  size?: ButtonSize;
  /**
   * Иконка слева от текста
   */
  leadingIcon?: ReactNode;
  /**
   * Иконка справа от текста
   */
  trailingIcon?: ReactNode;
  /**
   * Отображать состояние загрузки
   */
  loading?: boolean;
  /**
   * Растягивать кнопку на всю ширину контейнера
   */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      loading = false,
      disabled,
      children,
      className,
      fullWidth = false,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        className={clsx(
          'ds-button',
          `ds-button--${variant}`,
          `ds-button--${size}`,
          {
            'ds-button--loading': loading,
            'ds-button--full-width': fullWidth,
          },
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {loading && (
          <span className="ds-button__spinner" aria-hidden="true" />
        )}
        {leadingIcon && (
          <span className="ds-button__icon ds-button__icon--leading">
            {leadingIcon}
          </span>
        )}
        <span className="ds-button__label">{children}</span>
        {trailingIcon && (
          <span className="ds-button__icon ds-button__icon--trailing">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

