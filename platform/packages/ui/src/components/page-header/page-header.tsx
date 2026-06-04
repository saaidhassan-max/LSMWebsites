import type React from 'react';
import { cn } from '../../lib/generic/cn';
import type { PageHeaderProps } from './page-header.types';

export function PageHeader({
    titlePrefix,
    titleSuffix,
    subtitle,
    badges,
    className
}: PageHeaderProps): React.ReactElement {
    const title = (
        <span>
            <span className="text-tertiary">{titlePrefix}</span>
            {titleSuffix.length > 0 && (
                <>
                    <span className="text-surface-inverse-new">.</span>
                    <span className="text-on-surface-dark">{titleSuffix}</span>
                </>
            )}
        </span>
    );

    return (
        <div className={cn('w-full bg-surface-inverse-new', className)}>
            <div className="md:hidden flex items-center justify-center py-2 px-4">
                <p className="text-[32px] font-bold leading-10 tracking-[0] text-center">
                    {title}
                </p>
            </div>

            <div className="hidden md:flex items-center py-12">
                <div className="w-full max-w-[1440px] mx-auto px-16 flex items-center gap-6">
                    <div className="flex-1 flex flex-col gap-6">
                        <p className="text-[57px] font-bold leading-16 tracking-[-0.25px]">
                            {title}
                        </p>

                        {subtitle !== undefined && (
                            <p className="text-[22px] font-normal leading-7 tracking-[0] text-primary">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {badges !== undefined && badges.length > 0 && (
                        <div className="flex flex-wrap gap-3 shrink-0">
                            {badges.map((badge, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'flex items-center justify-center',
                                        'bg-surface-container-low rounded-full',
                                        'py-2 px-4'
                                    )}
                                >
                                    <span className="text-sm font-medium leading-5 tracking-[0.25px] text-primary">
                                        {badge.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
