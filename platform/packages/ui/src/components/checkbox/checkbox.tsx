'use client';

import type React from 'react';
import { useId, useRef, useEffect } from 'react';
import { cn } from '../../lib/generic/cn';
import { Check, Minus } from 'lucide-react';
import type { CheckboxProps } from './checkbox.types';

export function Checkbox({
    checked,
    indeterminate = false,
    error = false,
    disabled = false,
    onChange,
    label,
    id: externalId,
    className = ''
}: CheckboxProps): React.ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const isActive = checked === true || indeterminate === true;
    const showError = error === true && !isActive;

    const containerClasses = cn(
        'w-[18px] h-[18px] rounded-[2px] border-2 flex items-center justify-center shrink-0 transition-colors duration-150',
        showError
            ? 'bg-error border-error'
            : isActive
              ? disabled
                  ? 'bg-on-surface-dark border-on-surface-dark'
                  : 'bg-tertiary border-tertiary'
              : 'bg-on-surface-light border-on-surface-dark'
    );

    const stateLayerClasses = cn(
        'absolute inset-0 rounded-full transition-colors duration-200 pointer-events-none',
        !disabled && isActive && 'group-hover:bg-tertiary/[0.08] peer-focus-visible:bg-tertiary/[0.12]',
        !disabled && !isActive && 'group-hover:bg-on-surface-dark/[0.08] peer-focus-visible:bg-on-surface-dark/[0.12]'
    );

    const iconColor = disabled && isActive ? 'text-surface-inverse-new' : 'text-on-surface-dark';

    return (
        <label
            htmlFor={id}
            className={cn(
                'flex items-center',
                disabled ? 'opacity-[0.38] cursor-not-allowed' : 'cursor-pointer',
                className
            )}
        >
            <div className="group w-10 h-10 flex items-center justify-center shrink-0 relative">
                <input
                    ref={inputRef}
                    type="checkbox"
                    id={id}
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <span className={stateLayerClasses} aria-hidden="true" />
                <span className={containerClasses} aria-hidden="true">
                    {showError === false && indeterminate === true && (
                        <Minus size={12} className={iconColor} strokeWidth={3} />
                    )}
                    {showError === false && checked === true && indeterminate === false && (
                        <Check size={12} className={iconColor} strokeWidth={3} />
                    )}
                </span>
            </div>
            {label !== undefined && (
                <span className="text-sm font-normal leading-5 text-on-surface-light">{label}</span>
            )}
        </label>
    );
}
