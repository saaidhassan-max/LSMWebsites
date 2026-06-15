'use client';

import type React from 'react';
import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { ConsentForm } from '@lsm/ui/components/consent-form/consent-form';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import type { LandingPageContent } from '@/lib/landing-pages.types';
import type { SiteSettings } from '@/lib/site-settings.types';

interface LandingPageViewProps {
    content: LandingPageContent;
    settings: SiteSettings;
    editable?: boolean;
    selectedField?: string | null;
    onSelectField?: (field: keyof LandingPageContent) => void;
    onRequestImageUpload?: () => void;
}

function noop(): void {
    void 0;
}

export function LandingPageView({
    content,
    settings,
    editable = false,
    selectedField = null,
    onSelectField,
    onRequestImageUpload
}: LandingPageViewProps): React.ReactElement {
    function editClass(field: keyof LandingPageContent): string {
        if (!editable) return '';
        return ' cms-editable' + (selectedField === field ? ' cms-editable-selected' : '');
    }

    function fieldProps(field: keyof LandingPageContent): React.HTMLAttributes<HTMLElement> {
        if (!editable) return {};
        return {
            'data-field': field,
            onClick: (e) => {
                e.stopPropagation();
                onSelectField?.(field);
            },
            role: 'button',
            tabIndex: 0
        } as React.HTMLAttributes<HTMLElement>;
    }

    return (
        <div data-theme="bingo" className="flex flex-col w-full bg-surface min-h-screen gap-[10px] pb-[80px] md:pb-0">
            <div className="flex flex-col">
                <LogoSection
                    logoSrc="/sfb/logo-mobile.svg"
                    logoDesktopSrc="/sfb/logo-desktop.svg"
                    logoAlt="Super Free Bingo"
                    logoHref="#"
                    backgroundSrc="/sfb/LogoSection/Lego_Deco2.png"
                    onMenuClick={noop}
                />
                <USP text={settings.uspText} />
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
                    style={{ width: '100%', minWidth: '1440px' }}
                >
                    <Image
                        src={content.backgroundImage}
                        alt=""
                        width={1440}
                        height={768}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />
                </div>

                {editable && (
                    <button
                        type="button"
                        data-field="backgroundImage"
                        onClick={() => {
                            onSelectField?.('backgroundImage');
                            onRequestImageUpload?.();
                        }}
                        className={
                            'absolute top-3 right-3 z-20 flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md bg-black/55 text-white backdrop-blur cms-editable' +
                            (selectedField === 'backgroundImage' ? ' cms-editable-selected' : '')
                        }
                    >
                        Upload background
                    </button>
                )}

                <div className="relative z-10 flex flex-col gap-4 md:max-w-[564px] md:mx-auto md:w-full md:py-6 md:gap-8">
                    <div className="flex flex-col items-center gap-0 md:gap-2 px-4">
                        <p
                            className={
                                'text-[22px] md:text-[32px] font-bold leading-[26.4px] md:leading-10 text-on-surface-light text-center' +
                                editClass('heroPrefix')
                            }
                            {...fieldProps('heroPrefix')}
                        >
                            {content.heroPrefix}
                        </p>
                        <p
                            className={
                                'text-[45px] md:text-[80px] font-bold md:font-semibold leading-[52px] md:leading-[96px] text-on-surface-light text-center tracking-[-0.019em]' +
                                editClass('heroHeadline')
                            }
                            {...fieldProps('heroHeadline')}
                        >
                            {content.heroHeadline}
                        </p>
                        <p
                            className={
                                'text-[22px] md:text-[32px] font-medium md:font-bold leading-7 md:leading-10 text-on-surface-light text-center' +
                                editClass('heroSubline')
                            }
                            {...fieldProps('heroSubline')}
                        >
                            {content.heroSubline}
                        </p>
                    </div>

                    <div className="flex flex-col gap-[10px] pt-1 px-4 pb-4 md:p-8">
                        <p
                            className={
                                'text-sm font-normal leading-5 md:text-base md:font-bold text-on-surface-light text-center tracking-[0.15px]' +
                                editClass('instructionText')
                            }
                            {...fieldProps('instructionText')}
                        >
                            {content.instructionText}
                        </p>
                        <TextField
                            icon={Mail}
                            label="Email Address*"
                            type="email"
                            placeholder="Your Email"
                            value=""
                            error=""
                            onChange={noop}
                            onClear={noop}
                        />
                        <TextField
                            icon={Phone}
                            label="Mobile Number"
                            type="tel"
                            placeholder="Your number"
                            value=""
                            error=""
                            onChange={noop}
                            onClear={noop}
                        />
                        <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                            ** Required Information
                        </p>
                        <ConsentForm defaultExpanded={false} onChange={noop} />
                        <Button variant="primary" trailingIcon={<ArrowRight size={24} />} className="w-full">
                            Sign Me Up
                        </Button>
                        <Button variant="text" color="dark" className="w-full">
                            Skip
                        </Button>
                    </div>
                </div>
            </div>

            <div className={editClass('legalDisclaimer')} {...fieldProps('legalDisclaimer')}>
                <TopTCs text={content.legalDisclaimer} />
            </div>
            <SfbFooter legalText={settings.footerLegalText} />
        </div>
    );
}
