import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsContentPage, getCmsSiteSettings } from '../../data/cms-content';
import { ContentPageBody } from '../../components/content-page-body';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Bingo',
    description: 'Terms and Conditions for Super Free Bingo.'
};

const FALLBACK_TITLE = 'Terms and Conditions';
const FALLBACK_BODY = `<p>This website is not for use by those under the age of 18 years and/or those living outside the UK. If you are over 18 and live in the UK, you are welcome to use our website.</p>
<p>If you browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use which, together with our disclaimer, copyright notice and privacy policy, govern Super Free Bingo's relationship with you in relation to this website.</p>
<p>The term 'Super Free Bingo' or 'us' or 'we' refers to the owner of the website whose registered office is Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.</p>
<p>The term 'you' refers to the user or viewer of our website.</p>
<ul>
<li>By signing up to the Super Free Bingo website (entering your name, email address and/or mobile number), you agree to receive marketing communications from Super Free Bingo and their associated websites, including emails and SMS messages.</li>
<li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
<li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
<li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.</li>
<li>This website contains material which is owned by or licensed to us. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
<li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>
<li>Unauthorised use of this website may give to a claim for damages and/or be a criminal offence.</li>
<li>This website includes links to other websites operated by third parties. We have no responsibility for the content of linked website(s).</li>
<li>You may not create a link to this website from another website or document without Super Free Bingo's prior written consent.</li>
<li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of England and Wales.</li>
</ul>
<p>Little Star Media is registered under the Data Protection Act 2018. Registration Number Z1426156. We comply with UK GDPR.</p>
<p>For more information, please read our Privacy Policy and Disclaimer.</p>`;

export default async function TermsPage(): Promise<React.ReactElement> {
    const [settings, cms] = await Promise.all([getCmsSiteSettings(), getCmsContentPage('terms')]);
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
