import type React from 'react';
import { Menu } from 'lucide-react';
import type { GoodChoiceLogoSectionProps } from './good-choice-logo-section.types';

function Wordmark(): React.ReactElement {
    return (
        <>
            <span className="md:hidden font-futura text-[24px] font-semibold leading-7 tracking-[-0.46px]">
                <span className="text-tertiary">Good.</span>
                <span className="text-on-primary">Choice</span>
            </span>
            <span className="hidden md:inline text-[32px] font-bold leading-10 tracking-[0]">
                <span className="text-tertiary">Good.</span>
                <span className="text-on-primary">Choice</span>
            </span>
        </>
    );
}

export function GoodChoiceLogoSection({
    onMenuClick,
    logoHref
}: GoodChoiceLogoSectionProps): React.ReactElement {
    return (
        <header className="w-full bg-surface h-11 md:h-22">
            <div className="w-full max-w-[1440px] mx-auto h-full flex items-center justify-between px-4 md:px-16">
                <div
                    className="flex items-center gap-2 p-2 invisible"
                    aria-hidden="true"
                >
                    <span className="hidden md:block text-base font-medium leading-6 tracking-[0.15px]">
                        Menu
                    </span>
                    <Menu className="w-6 h-6 md:w-10 md:h-10 text-tertiary" />
                </div>

                {logoHref !== undefined ? (
                    <a href={logoHref} className="shrink-0">
                        <Wordmark />
                    </a>
                ) : (
                    <div className="shrink-0">
                        <Wordmark />
                    </div>
                )}

                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="flex items-center gap-2 p-2"
                >
                    <span className="hidden md:block text-surface-inverse-new text-base font-medium leading-6 tracking-[0.15px]">
                        Menu
                    </span>
                    <Menu className="w-6 h-6 md:w-10 md:h-10 text-tertiary" />
                </button>
            </div>
        </header>
    );
}
