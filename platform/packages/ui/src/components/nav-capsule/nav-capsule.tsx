import React from 'react';
import type { NavCapsuleProps } from './nav-capsule.types';

export function NavCapsule({
    emoji,
    label,
    href,
    isActive = false,
    fluid = false,
    className = ''
}: NavCapsuleProps): React.ReactElement {
    return (
        <a
            href={href}
            className={[
                'group flex items-center rounded-full transition-colors',
                fluid ? 'w-[272px] md:w-full' : 'w-[272px] md:w-[336px]',
                'pl-4 pr-6 py-2 md:gap-3',
                isActive ? 'bg-tertiary' : 'hover:bg-surface-container-highest',
                className
            ].join(' ')}
        >
            <div className="flex items-center justify-center shrink-0 p-2 w-[38px] h-[44px] md:w-[50px] md:h-[52px]">
                <span className="block text-[22px] leading-7 md:text-[30px] md:leading-9 text-center select-none">
                    {emoji}
                </span>
            </div>
            <span
                className={[
                    'text-[16px] leading-6 tracking-[0.15px]',
                    'md:text-[22px] md:leading-7 md:tracking-normal',
                    isActive
                        ? 'text-on-surface-dark font-bold md:font-medium'
                        : 'text-on-surface-light font-medium md:font-normal group-hover:text-on-surface-dark'
                ].join(' ')}
            >
                {label}
            </span>
        </a>
    );
}
