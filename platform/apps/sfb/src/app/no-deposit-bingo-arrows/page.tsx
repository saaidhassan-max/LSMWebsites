import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbNav } from '../../components/sfb-nav';
import { ScrollArrowOfferList } from '../../components/scroll-arrow-offer-list';
import { categoryOffers } from '../../data/category-offers';
import { getCmsSiteSettings } from '../../data/cms-content';

export const metadata: Metadata = {
    title: 'No Deposit Bingo Arrows | Super Free Bingo',
    description:
        'Compare no deposit bingo offers using arrow controls that step through one offer at a time.'
};

export default async function NoDepositBingoArrowsPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} variant="bingo" />

            <WelcomeBanner
                textHighlight="NO DEPOSIT"
                text=" BINGO"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfb/welcome-images/image-left.png"
                imageRightSrc="/sfb/welcome-images/image-right.png"
                imageLeftWidthMobile={83}
                imageLeftWidthDesktop={204}
                variant="modern"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <ScrollArrowOfferList offers={categoryOffers} />

            <WebsiteDirectory
                title={settings.directoryTitle}
                sites={settings.directorySites}
                splitAtDot
            />

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
