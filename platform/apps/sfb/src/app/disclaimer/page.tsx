import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsContentPage, getCmsSiteSettings } from '../../data/cms-content';
import { ContentPageBody, contentPageBodyHtml } from '../../components/content-page-body';

export const metadata: Metadata = {
    title: 'Disclaimer | Super Free Bingo',
    description: 'Disclaimer for Super Free Bingo.'
};

const FALLBACK_TITLE = 'Disclaimer';
const FALLBACK_BODY = contentPageBodyHtml([
    'The information contained in this website is for general information purposes only. The information is provided by Super Free Bingo and whilst we endeavour to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.',
    'In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.',
    'Through this website you are able to link to other websites which are not under the control of Super Free Bingo. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.',
    'Any links to third party sites (including bingo sites) are provided for your convenience to provide further information. We have no responsibility for the content of linked website(s). It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.',
    "Please note that where third party sites offer 'free bingo' or 'free play' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from 'free bingo' or 'free play' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third party website. If in doubt, you should contact customer support for the relevant site operator.",
    'Every effort is made to keep the website up and running smoothly. However, Super Free Bingo takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.'
]);

export default async function DisclaimerPage(): Promise<React.ReactElement> {
    const [settings, cms] = await Promise.all([
        getCmsSiteSettings(),
        getCmsContentPage('disclaimer')
    ]);
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
