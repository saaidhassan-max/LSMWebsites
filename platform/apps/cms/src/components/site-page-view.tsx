'use client';

import type React from 'react';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import type { SitePageSection } from '@/lib/site-pages.types';
import type { SiteSettings } from '@/lib/site-settings.types';

interface SitePageViewProps {
    sections: SitePageSection[];
    settings: SiteSettings;
    editable?: boolean;
    selectedSectionId?: string | null;
    onSelectSection?: (sectionId: string) => void;
}

function noop(): void {
    void 0;
}

export function SitePageView({
    sections,
    settings,
    editable = false,
    selectedSectionId = null,
    onSelectSection
}: SitePageViewProps): React.ReactElement {
    function editableClass(sectionId: string): string {
        if (!editable) return '';
        return 'cms-editable' + (selectedSectionId === sectionId ? ' cms-editable-selected' : '');
    }

    function editableProps(sectionId: string): React.HTMLAttributes<HTMLDivElement> {
        if (!editable) return {};
        return {
            role: 'button',
            tabIndex: 0,
            onClick: (e) => {
                e.stopPropagation();
                onSelectSection?.(sectionId);
            }
        };
    }

    function renderSection(section: SitePageSection): React.ReactElement {
        const wrapClass = editableClass(section.id);
        const wrapProps = editableProps(section.id);

        if (section.type === 'welcome') {
            return (
                <div key={section.id} className={wrapClass} {...wrapProps}>
                    <WelcomeBanner
                        textHighlight={section.content.textHighlight}
                        text={section.content.text}
                        textSuffix={section.content.textSuffix === '' ? undefined : section.content.textSuffix}
                        features={section.content.features}
                        imageLeftSrc={section.content.imageLeftSrc}
                        imageRightSrc={section.content.imageRightSrc}
                    />
                </div>
            );
        }
        if (section.type === 'terms') {
            return (
                <div key={section.id} className={wrapClass} {...wrapProps}>
                    <TopTCs text={section.content.text} />
                </div>
            );
        }
        if (section.type === 'richText') {
            return (
                <div
                    key={section.id}
                    className={'w-full max-w-[960px] mx-auto px-4 py-6 flex flex-col gap-3 ' + wrapClass}
                    {...wrapProps}
                >
                    <h2 className="text-[24px] md:text-[32px] font-bold text-on-surface-light">
                        {section.content.heading}
                    </h2>
                    <p className="text-[14px] md:text-base text-on-surface-light whitespace-pre-wrap leading-6">
                        {section.content.body}
                    </p>
                </div>
            );
        }
        if (section.type === 'signup') {
            return (
                <div
                    key={section.id}
                    className={'w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4 ' + wrapClass}
                    {...wrapProps}
                >
                    {section.content.heading !== '' && (
                        <h2 className="text-[22px] md:text-[28px] font-bold text-on-surface-light text-center">
                            {section.content.heading}
                        </h2>
                    )}
                    <SignupForm
                        variant="sfb-sfsg"
                        brandName="Super Free Bingo"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                    />
                </div>
            );
        }
        return (
            <div key={section.id} className={wrapClass} {...wrapProps}>
                <WebsiteDirectory
                    title={section.content.title}
                    sites={settings.directorySites}
                    splitAtDot
                />
            </div>
        );
    }

    return (
        <main data-theme="bingo" className="flex flex-col w-full bg-surface min-h-screen">
            <LogoSection
                logoSrc="/sfb/logo-mobile.svg"
                logoDesktopSrc="/sfb/logo-desktop.svg"
                logoAlt="Super Free Bingo"
                logoHref="#"
                backgroundSrc="/sfb/LogoSection/Lego_Deco2.png"
                onMenuClick={noop}
            />
            <USP text={settings.uspText} />

            {sections.length === 0 && (
                <div className="w-full max-w-[720px] mx-auto p-8 text-center text-on-surface-light">
                    Add page assets from the panel.
                </div>
            )}

            {sections.map(renderSection)}

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
