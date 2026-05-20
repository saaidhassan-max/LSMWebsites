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

    const showError = error === true && checked === false && indeterminate === false;

    const boxClasses = cn(
        'w-5 h-5 rounded-[2px] border-2 flex items-center justify-center transition-colors duration-150 shrink-0',
        showError === true
            ? 'bg-error border-error'
            : checked === true || indeterminate === true
              ? 'bg-tertiary border-on-surface-light'
              : 'bg-surface-container-low border-on-surface-light'
    );

    return (
        <label htmlFor={id} className={cn('flex items-center cursor-pointer', className)}>
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <input
                    ref={inputRef}
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <span className={boxClasses} aria-hidden="true">
                    {showError === false && indeterminate === true && (
                        <Minus size={12} className="text-on-surface-light" strokeWidth={3} />
                    )}
                    {showError === false && checked === true && indeterminate === false && (
                        <Check size={12} className="text-on-surface-light" strokeWidth={3} />
                    )}
                </span>
            </div>
            {label !== undefined && (
                <span className="text-sm font-normal leading-5 text-on-surface-light">{label}</span>
            )}
        </label>
    );
}
