'use client';

import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { HomeWelcomeContent } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';

export interface HomeCard {
    offerId: string;
    props: OfferCardProps;
}

export type HomeSectionId = 'header' | 'usp' | 'welcome' | 'terms' | 'directory' | 'signup' | 'footer';

interface HomePageViewProps {
    cards: HomeCard[];
    welcome: HomeWelcomeContent;
    settings: SiteSettings;
    editable?: boolean;
    selectedOfferId?: string | null;
    selectedSectionId?: HomeSectionId | null;
    onSelectOffer?: (offerId: string) => void;
    onSelectSection?: (sectionId: HomeSectionId) => void;
}

function noop(): void {
    void 0;
}

export function HomePageView({
    cards,
    welcome,
    settings,
    editable = false,
    selectedOfferId = null,
    selectedSectionId = null,
    onSelectOffer,
    onSelectSection
}: HomePageViewProps): React.ReactElement {
    function cardWrapClass(offerId: string): string {
        if (!editable) return '';
        return 'cms-editable' + (selectedOfferId === offerId ? ' cms-editable-selected' : '');
    }

    function sectionWrapClass(sectionId: HomeSectionId): string {
        if (!editable) return '';
        return 'cms-editable' + (selectedSectionId === sectionId ? ' cms-editable-selected' : '');
    }

    function sectionProps(sectionId: HomeSectionId): React.HTMLAttributes<HTMLDivElement> {
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

            <div className={sectionWrapClass('terms')} {...sectionProps('terms')}>
                <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />
            </div>

            <div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    {cards.length === 0 && (
                        <div className="rounded-lg border border-dashed border-outline-variant p-8 text-center text-on-surface-light">
                            No offer cards on this page yet. Add one from the panel.
                        </div>
                    )}
                    {cards.map((card) => {
                        if (!editable) return <OfferCard key={card.offerId} {...card.props} />;
                        return (
                            <div
                                key={card.offerId}
                                data-offer-id={card.offerId}
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelectOffer?.(card.offerId);
                                }}
                                className={cardWrapClass(card.offerId)}
                            >
                                <OfferCard {...card.props} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={'md:hidden w-full ' + sectionWrapClass('directory')} {...sectionProps('directory')}>
                <WebsiteDirectory
                    title={settings.directoryTitle}
                    sites={settings.directorySites}
                    splitAtDot
                />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className={'flex-1 ' + sectionWrapClass('directory')} {...sectionProps('directory')}>
                    <WebsiteDirectory
                        title={settings.directoryTitle}
                        sites={settings.directorySites}
                        splitAtDot
                    />
                </div>
                <div className={'flex-1 ' + sectionWrapClass('signup')} {...sectionProps('signup')}>
                    <SignupForm
                        variant="sfb-sfsg"
                        brandName="Super Free Bingo"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                    />
                </div>
            </div>

            <div className={sectionWrapClass('footer')} {...sectionProps('footer')}>
                <SfbFooter legalText={settings.footerLegalText} />
            </div>
        </main>
    );
}
