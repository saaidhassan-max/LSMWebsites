import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsContentPage, getCmsSiteSettings } from '../../data/cms-content';
import { ContentPageBody, contentPageBodyHtml } from '../../components/content-page-body';

export const metadata: Metadata = {
    title: 'About Us | Super Free Bingo',
    description: 'Learn more about Super Free Bingo — the UK\'s independent bingo comparison platform.'
};

const FALLBACK_TITLE = 'About Super Free Bingo';
const FALLBACK_BODY = contentPageBodyHtml([
    'Super Free Bingo is an independent bingo comparison site, founded in 2006. We are operated by Little Star Media, who also operate our sister site, Super Free Slot Games.',
    "At Super Free Bingo you're in safe hands, as our well-established bingo comparison portal has been nominated several times for the EGR Bingo Affiliate of the Year award and, to ensure that our customers have a first class experience, we only work with UK licensed brands.",
    "We're here to make finding the right bingo bonus deal as simple as possible, so we gather top deals from quality bingo brands on one fantastic site.",
    'Super Free Bingo is regularly updated with the latest offers from new sites, as well as old favourites. We work hard to secure brilliant bonuses, many of which are enhanced deals, giving you more than the standard welcome offers on each site.',
    'To help you along the way, we offer bingo site reviews and handy step-by-step guides to make it easier to choose from the wide variety of deals on offer. We can also send all the latest offers and exclusives direct to you if you sign up to receive regular emails and SMS updates.',
    "We're here to help make sure your gaming experience doesn't involve any hard work, just smart play, so we find the latest free and generous deposit bingo offers for you, as well as exclusive deals that give you more than the standard offer available at each site.",
    'So if you want to get started, all you have to do is choose from one of our huge selection of bingo offers and click to claim your bingo bonus!'
]);

export default async function AboutPage(): Promise<React.ReactElement> {
    const [settings, cms] = await Promise.all([getCmsSiteSettings(), getCmsContentPage('about')]);
    const title = cms?.title ?? FALLBACK_TITLE;
    const subtitle = cms?.subtitle ?? '';
    const bodyHtml = cms?.bodyHtml ?? FALLBACK_BODY;

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            {title}
                        </h1>
                        {subtitle !== '' && (
                            <p className="mt-2 text-sm text-on-surface-light">{subtitle}</p>
                        )}
                    </div>
                    <ContentPageBody bodyHtml={bodyHtml} />
                </div>
            </section>

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
