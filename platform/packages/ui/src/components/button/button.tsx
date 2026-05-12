import type React from 'react';
import type { ButtonColor, ButtonProps, ButtonVariant } from './button.types';

const solidVariantClasses: Record<Exclude<ButtonVariant, 'text'>, string> = {
    primary: [
        'bg-primary text-on-primary',
        'hover:bg-primary-hover',
        'focus:bg-primary-focused focus:outline-none',
        'disabled:bg-disabled-container disabled:text-disabled-content'
    ].join(' '),

    secondary: [
        'bg-secondary text-on-primary',
        'hover:bg-secondary-hover',
        'focus:bg-secondary-focused focus:outline-none',
        'disabled:bg-disabled-container disabled:text-disabled-content'
    ].join(' '),

    tertiary: [
        'bg-tertiary text-on-primary',
        'hover:bg-tertiary-hover',
        'focus:bg-tertiary-focused focus:outline-none',
        'disabled:bg-disabled-container disabled:text-disabled-content'
    ].join(' ')
};

const textVariantClasses: Record<ButtonColor, string> = {
    light: [
        'bg-transparent text-on-surface-dark border border-transparent',
        'hover:border-on-surface-dark',
        'focus:bg-surface-container-low focus:border-on-surface-dark focus:outline-none',
        'disabled:text-disabled-content disabled:border-transparent'
    ].join(' '),
    dark: [
        'bg-transparent text-on-surface-light border border-transparent',
        'hover:border-on-surface-light',
        'focus:bg-outline-variant focus:border-on-surface-light focus:outline-none',
        'disabled:text-disabled-content disabled:border-transparent'
    ].join(' ')
};

const paddingClasses: Record<ButtonVariant, string> = {
    primary: 'px-6 py-3',
    secondary: 'px-6 py-3',
    tertiary: 'px-6 py-3',
    text: 'px-6 py-2'
};

export function Button({
    variant = 'primary',
    color = 'light',
    leadingIcon,
    trailingIcon,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps): React.ReactElement {
    const variantClass = variant === 'text'
        ? textVariantClasses[color]
        : solidVariantClasses[variant];

    return (
        <button
            type="button"
            disabled={disabled}
            className={[
                'inline-flex items-center justify-center gap-2',
                'min-w-[198px]',
                'rounded-lg',
                'text-base font-bold tracking-[0.15px]',
                'transition-colors duration-150',
                'disabled:cursor-not-allowed',
                paddingClasses[variant],
                variantClass,
                className
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
