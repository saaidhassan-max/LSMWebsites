import React, { useId } from 'react';
import type { LucideIcon } from 'lucide-react';
import { X, Info } from 'lucide-react';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  icon: LucideIcon;
  error?: string;
  onClear?: () => void;
}

export function TextField({
  label,
  icon: Icon,
  error,
  onClear,
  value,
  className = '',
  ...props
}: TextFieldProps) {
  const id = useId();
  const hasValue = value !== undefined && value !== '';
  const hasError = Boolean(error);

  const borderClass = hasError
    ? 'border-error'
    : 'border-outline-variant focus-within:border-primary';

  const bgClass = 'bg-surface-container-lowest hover:bg-surface-container';

  return (
    <div className={`w-full ${className}`}>
      {/* Input wrapper — z-10 keeps it above the error banner */}
      <div
        className={[
          'relative z-10 flex items-center gap-4 px-4 rounded-lg border',
          'h-14 transition-colors duration-150',
          bgClass,
          borderClass,
        ].join(' ')}
      >
        {/* Leading icon */}
        <Icon size={24} className="text-on-surface-dark shrink-0" />

        {/* Label + value stacked */}
        <div className="flex flex-col flex-1 min-w-0 justify-center">
          <label
            htmlFor={id}
            className="text-on-surface-dark leading-[13px] tracking-[0.4px] text-[11px] font-normal cursor-pointer"
          >
            {label}
          </label>
          <input
            id={id}
            value={value}
            className={[
              'bg-transparent outline-none text-on-surface-dark',
              'text-base font-normal leading-6 tracking-[0.5px]',
              'placeholder:text-on-surface-dark/40',
              'w-full',
            ].join(' ')}
            {...props}
          />
        </div>

        {/* Trailing icon */}
        {hasError && (
          <Info size={24} className="text-error shrink-0" />
        )}
        {!hasError && hasValue && onClear && (
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

      {/* Error banner — overlaps input by 10px (matches Figma itemSpacing: -10) */}
      {hasError && (
        <div className="bg-error rounded-b-lg px-4 pt-3 pb-0.5 -mt-[10px]">
          <p className="text-on-surface-light text-[11px] font-normal leading-[13px] tracking-[0.4px]">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
