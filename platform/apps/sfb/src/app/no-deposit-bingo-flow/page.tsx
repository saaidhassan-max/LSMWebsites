import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbNav } from '../../components/sfb-nav';
import { ScrollFlowOfferList } from '../../components/scroll-flow-offer-list';
import { categoryOffers } from '../../data/category-offers';
import { getCmsSiteSettings } from '../../data/cms-content';

export const metadata: Metadata = {
    title: 'No Deposit Bingo Flow Offers | Super Free Bingo',
    description:
        'Compare no deposit bingo offers with a continuous scroll-focused card prototype.'
};

export default async function NoDepositBingoFlowPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />
            <USP text={settings.uspText} variant="bingo" />

            <WelcomeBanner
                textHighlight="NO DEPOSIT"
                text=" BINGO FLOW"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfb/welcome-images/image-left.png"
                imageRightSrc="/sfb/welcome-images/image-right.png"
                imageLeftWidthMobile={83}
                imageLeftWidthDesktop={204}
                variant="modern"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <ScrollFlowOfferList offers={categoryOffers} />

            <WebsiteDirectory
                title={settings.directoryTitle}
                sites={settings.directorySites}
                splitAtDot
            />

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
