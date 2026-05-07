'use client';

import React, { useId, useRef, useEffect } from 'react';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  error?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export function Checkbox({
  checked,
  indeterminate = false,
  error = false,
  onChange,
  label,
  id: externalId,
  className = '',
}: CheckboxProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const showError = error && !checked && !indeterminate;

  const boxClasses = [
    'w-5 h-5 rounded-[2px] border-2 flex items-center justify-center transition-colors duration-150 shrink-0',
    showError
      ? 'bg-error border-error'
      : checked || indeterminate
      ? 'bg-tertiary border-on-surface-light'
      : 'bg-surface-container-low border-on-surface-light',
  ].join(' ');

  return (
    <label
      htmlFor={id}
      className={`flex items-center cursor-pointer ${className}`}
    >
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
          {!showError && indeterminate && (
            <Minus size={12} className="text-on-surface-light" strokeWidth={3} />
          )}
          {!showError && checked && !indeterminate && (
            <Check size={12} className="text-on-surface-light" strokeWidth={3} />
          )}
        </span>
      </div>
      {label && (
        <span className="text-sm font-normal leading-5 text-on-surface-light">
          {label}
        </span>
      )}
    </label>
  );
}
