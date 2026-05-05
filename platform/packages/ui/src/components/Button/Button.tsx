import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-on-primary',
    'hover:bg-primary-hover',
    'focus:bg-primary-focused focus:outline-none',
    'disabled:bg-disabled-container disabled:text-disabled-content',
  ].join(' '),

  secondary: [
    'bg-secondary text-on-surface-light',
    'hover:bg-secondary-hover',
    'focus:bg-secondary-focused focus:outline-none',
    'disabled:bg-disabled-container disabled:text-disabled-content',
  ].join(' '),

  tertiary: [
    'bg-tertiary text-on-surface-light',
    'hover:bg-tertiary-hover',
    'focus:bg-tertiary-focused focus:outline-none',
    'disabled:bg-disabled-container disabled:text-disabled-content',
  ].join(' '),

  text: [
    'bg-transparent text-primary',
    'hover:text-primary-hover',
    'focus:text-primary-focused focus:outline-none',
    'disabled:text-disabled-content',
  ].join(' '),
};

const paddingClasses: Record<ButtonVariant, string> = {
  primary:   'px-6 py-3',
  secondary: 'px-6 py-3',
  tertiary:  'px-6 py-3',
  text:      'px-6 py-2',
};

export function Button({
  variant = 'primary',
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-lg',
        'text-base font-bold',
        'transition-colors duration-150',
        'disabled:cursor-not-allowed',
        paddingClasses[variant],
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {leadingIcon && (
        <span className="size-6 flex items-center justify-center shrink-0">
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon && (
        <span className="size-6 flex items-center justify-center shrink-0">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
