'use client';

import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { HomeSectionId, HomeWelcomeContent } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';

export type HomeRenderItem =
    | { kind: 'offer'; offerId: string; props: OfferCardProps }
    | { kind: 'banner'; mobileSrc: string; desktopSrc: string; href: string };

export type HomeShellSectionId = 'header' | 'usp' | 'footer';
export type HomeEditableSectionId = HomeShellSectionId | HomeSectionId;

interface HomePageViewProps {
    items: HomeRenderItem[];
    sectionIds: HomeSectionId[];
    welcome: HomeWelcomeContent;
    settings: SiteSettings;
    editable?: boolean;
    selectedSectionId?: HomeEditableSectionId | null;
    onSelectSection?: (sectionId: HomeEditableSectionId) => void;
}

function noop(): void {
    void 0;
}

export function HomePageView({
    items,
    sectionIds,
    welcome,
    settings,
    editable = false,
    selectedSectionId = null,
    onSelectSection
}: HomePageViewProps): React.ReactElement {
    function sectionWrapClass(sectionId: HomeEditableSectionId): string {
        if (!editable) return '';
        return 'cms-editable' + (selectedSectionId === sectionId ? ' cms-editable-selected' : '');
    }

    function sectionProps(sectionId: HomeEditableSectionId): React.HTMLAttributes<HTMLDivElement> {
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

    function hasSection(sectionId: HomeSectionId): boolean {
        return sectionIds.includes(sectionId);
    }

    return (
        <main data-theme="bingo" className="flex flex-col w-full bg-surface">
            <div className={sectionWrapClass('header')} {...sectionProps('header')}>
                <LogoSection
                    logoSrc="/sfb/logo-mobile.svg"
                    logoDesktopSrc="/sfb/logo-desktop.svg"
                    logoAlt="Super Free Bingo"
                    logoHref="#"
                    backgroundSrc="/sfb/LogoSection/Lego_Deco2.png"
                    onMenuClick={noop}
                />
            </div>

            <div className={sectionWrapClass('usp')} {...sectionProps('usp')}>
                <USP text={settings.uspText} />
            </div>

            {hasSection('welcome') && (
                <div className={sectionWrapClass('welcome')} {...sectionProps('welcome')}>
                    <WelcomeBanner
                        textHighlight={welcome.textHighlight}
                        text={welcome.text}
                        textSuffix={welcome.textSuffix === '' ? undefined : welcome.textSuffix}
                        features={welcome.features}
                        imageLeftSrc={welcome.imageLeftSrc}
                        imageRightSrc={welcome.imageRightSrc}
                        imageLeftWidthMobile={welcome.imageLeftWidthMobile}
                        imageLeftWidthDesktop={welcome.imageLeftWidthDesktop}
                    />
                </div>
            )}

            {hasSection('terms') && (
                <div className={sectionWrapClass('terms')} {...sectionProps('terms')}>
                    <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />
                </div>
            )}

            {hasSection('offers') && (
                <div className={'w-full max-w-[1440px] mx-auto ' + sectionWrapClass('offers')} {...sectionProps('offers')}>
                    <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                        {items.length === 0 && (
                            <div className="rounded-lg border border-dashed border-outline-variant p-8 text-center text-on-surface-light">
                                No offer cards or banners on this page yet. Add one from the panel.
                            </div>
                        )}
                        {items.map((item, index) =>
                            item.kind === 'banner' ? (
                                <OperatorBanner
                                    key={index}
                                    mobileSrc={item.mobileSrc}
                                    desktopSrc={item.desktopSrc}
                                    alt="Operator banner"
                                    href={item.href === '' ? undefined : item.href}
                                />
                            ) : (
                                <OfferCard key={index} {...item.props} />
                            )
                        )}
                    </div>
                </div>
            )}

            {hasSection('directory') && (
                <div className={'md:hidden w-full ' + sectionWrapClass('directory')} {...sectionProps('directory')}>
                    <WebsiteDirectory
                        title={settings.directoryTitle}
                        sites={settings.directorySites}
                        splitAtDot
                    />
                </div>
            )}

            {(hasSection('directory') || hasSection('signup')) && (
                <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                    {hasSection('directory') && (
                        <div className={'flex-1 ' + sectionWrapClass('directory')} {...sectionProps('directory')}>
                            <WebsiteDirectory
                                title={settings.directoryTitle}
                                sites={settings.directorySites}
                                splitAtDot
                            />
                        </div>
                    )}
                    {hasSection('signup') && (
                        <div className={'flex-1 ' + sectionWrapClass('signup')} {...sectionProps('signup')}>
                            <SignupForm
                                variant="sfb-sfsg"
                                brandName="Super Free Bingo"
                                privacyPolicyUrl="/privacy-policy"
                                termsUrl="/terms"
                            />
                        </div>
                    )}
                </div>
            )}

            <div className={sectionWrapClass('footer')} {...sectionProps('footer')}>
                <SfbFooter legalText={settings.footerLegalText} />
            </div>
        </main>
    );
}
