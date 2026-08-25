import type React from 'react';
import { cn } from '../../lib/generic/cn';
import { brandStyle, ctaStateClasses, ctaStyle, ctaTextClass } from '../../lib/generic/cta-color';
import type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './button.types';

const solidTextClasses: Record<Exclude<ButtonVariant, 'text'>, string> = {
    primary: 'text-on-primary',
    secondary: 'text-on-surface-light',
    tertiary: 'text-on-primary'
};

const disabledClasses = 'disabled:bg-disabled-container disabled:text-disabled-content';

const textVariantClasses: Record<ButtonColor, string> = {
    light: [
        'bg-transparent text-on-surface-dark border border-transparent underline',
        'hover:border-on-surface-dark',
        'focus:bg-surface-container-low focus:border-on-surface-dark focus:outline-none',
        'disabled:text-disabled-content disabled:border-transparent'
    ].join(' '),
    dark: [
        'bg-transparent text-on-surface-light border border-transparent underline',
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

const smallPaddingClass = 'px-6 py-1';

export function Button({
    variant = 'primary',
    color = 'light',
    size = 'big',
    ctaColor,
    leadingIcon,
    trailingIcon,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps): React.ReactElement {
    const variantClass =
        variant === 'text'
            ? textVariantClasses[color]
            : cn(ctaStateClasses, solidTextClasses[variant], disabledClasses);

    const paddingClass = size === 'small' ? smallPaddingClass : paddingClasses[variant];

    const colorClass =
        ctaColor === undefined
            ? variantClass
            : cn(ctaStateClasses, ctaTextClass(ctaColor), disabledClasses);

    const stateVars =
        ctaColor !== undefined
            ? ctaStyle(ctaColor)
            : variant === 'text'
              ? undefined
              : brandStyle(variant);

    return (
        <button
            type="button"
            disabled={disabled}
            style={stateVars}
            className={cn(
                'inline-flex items-center justify-center gap-2',
                'min-w-[198px]',
                'rounded-lg',
                'text-base font-bold tracking-[0.15px]',
                'transition-colors duration-150',
                'disabled:cursor-not-allowed',
                paddingClass,
                colorClass,
                className
            )}
            {...props}
        >
            {leadingIcon !== undefined && (
                <span className="size-6 flex items-center justify-center shrink-0">
                    {leadingIcon}
                </span>
            )}
            {children}
            {trailingIcon !== undefined && (
                <span className="size-6 flex items-center justify-center shrink-0">
                    {trailingIcon}
                </span>
            )}
        </button>
    );
}
