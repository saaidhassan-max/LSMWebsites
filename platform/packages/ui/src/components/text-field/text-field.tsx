import type React from 'react';
import { useId, useState } from 'react';
import { cn } from '../../lib/generic/cn';
import { X, Info, Check } from 'lucide-react';
import type { TextFieldProps } from './text-field.types';

export function TextField({
    label,
    icon: Icon,
    error,
    onClear,
    valid,
    hideLabel,
    floatingLabel,
    value,
    className = '',
    ...props
}: TextFieldProps): React.ReactElement {
    const id = useId();
    const [focused, setFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';
    const hasError = Boolean(error);
    const isValid = valid === true && hasError === false;
    const floated = floatingLabel === true && (focused === true || hasValue === true);

    const borderClass = hasError
        ? 'border-error'
        : 'border-outline-variant focus-within:border-primary';

    const bgClass = 'bg-surface-container-lowest hover:bg-surface-container';

    return (
        <div className={`w-full ${className}`}>
            <div
                className={cn(
                    'relative z-10 flex items-center gap-4 px-4 rounded-lg border',
                    'h-14 transition-colors duration-150',
                    bgClass,
                    borderClass
                )}
            >
                <Icon size={24} className="text-on-surface-dark shrink-0" />

                {floatingLabel === true ? (
                    <div className="relative flex-1 min-w-0 h-full">
                        <input
                            id={id}
                            value={value}
                            aria-label={label}
                            className={cn(
                                'absolute inset-0 w-full bg-transparent outline-none text-on-surface-dark',
                                'text-base font-normal leading-6 tracking-[0.5px]',
                                'pt-4'
                            )}
                            {...props}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <label
                            htmlFor={id}
                            className={cn(
                                'absolute left-0 pointer-events-none transition-all duration-200 ease-out',
                                floated === true
                                    ? 'top-[7px] translate-y-0 text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark'
                                    : 'top-1/2 -translate-y-1/2 text-base leading-6 tracking-[0.5px] text-on-surface-dark/40'
                            )}
                        >
                            {label}
                        </label>
                    </div>
                ) : (
                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                        {hideLabel !== true && (
                            <label
                                htmlFor={id}
                                className="text-on-surface-dark leading-[13px] tracking-[0.4px] text-[11px] font-normal cursor-pointer"
                            >
                                {label}
                            </label>
                        )}
                        <input
                            id={id}
                            value={value}
                            aria-label={hideLabel === true ? label : undefined}
                            className={cn(
                                'bg-transparent outline-none text-on-surface-dark',
                                'text-base font-normal leading-6 tracking-[0.5px]',
                                'placeholder:text-on-surface-dark/40',
                                'w-full'
                            )}
                            {...props}
                        />
                    </div>
                )}

                {hasError === true && <Info size={24} className="text-error shrink-0" />}
                {hasError === false && isValid === true && (
                    <Check size={24} className="text-primary shrink-0" aria-label="Valid" />
                )}
                {hasError === false && isValid === false && hasValue === true && onClear !== undefined && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-on-surface-dark shrink-0 hover:opacity-70 transition-opacity"
                        aria-label="Clear input"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            {hasError === true && (
                <div className="bg-error rounded-b-lg px-4 pt-3 pb-0.5 -mt-[10px]">
                    <p className="text-on-surface-light text-[11px] font-normal leading-[13px] tracking-[0.4px]">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}
