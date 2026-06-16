import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsSiteSettings } from '../../data/cms-content';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Bingo',
    description: 'Terms and Conditions for Super Free Bingo.'
};

const INTRO = `This website is not for use by those under the age of 18 years and/or those living outside the UK. If you are over 18 and live in the UK, you are welcome to use our website.

If you browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use which, together with our disclaimer, copyright notice and privacy policy, govern Super Free Bingo's relationship with you in relation to this website.

The term 'Super Free Bingo' or 'us' or 'we' refers to the owner of the website whose registered office is Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.

The term 'you' refers to the user or viewer of our website.`;

const TERMS = [
    'By signing up to the Super Free Bingo website (entering your name, email address and/or mobile number), you agree to receive marketing communications from Super Free Bingo and their associated websites, including emails and SMS messages.',
    'The content of the pages of this website is for your general information and use only. It is subject to change without notice.',
    'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
    'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.',
    'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
    'All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.',
    'Unauthorised use of this website may give to a claim for damages and/or be a criminal offence.',
    'This website includes links to other websites, including bingo sites operated by third parties. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of linked website(s). It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties.',
    'Please note that where third party sites offer \'free bingo\' or \'free play\' schemes, they will be subject to the rules of the particular site operator. There may be restrictions upon how you can use and/or withdraw any sums or winnings from \'free bingo\' or \'free play\' schemes. Such schemes may only apply to new, first time players. Rules vary from scheme to scheme and you should check the terms and conditions and scheme rules appearing on the particular third party website. If in doubt, you should contact customer support for the relevant site operator.',
    'The offers that are shown within our advertising and communications may not appear or may differ from those on site, according to which device you are browsing on, e.g. mobile, desktop or tablet.',
    'You may not create a link to this website from another website or document without Super Free Bingo\'s prior written consent.',
    'Your use of this website and any dispute arising out of such use of the website is subject to the laws of England and Wales.'
];

const DATA_PROTECTION = `Little Star Media is registered under the Data Protection Act 2018. Registration Number Z1426156. We comply with UK GDPR.

For more information, please read our Privacy Policy and Disclaimer.`;

export default async function TermsPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Terms and Conditions
                        </h1>
                    </div>
                    <div className="w-full md:max-w-[948px] flex flex-col gap-6 text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        <p className="whitespace-pre-line">{INTRO}</p>
                        <ul className="flex flex-col gap-3 list-none">
                            {TERMS.map((term, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="shrink-0 text-tertiary font-bold">•</span>
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="whitespace-pre-line">{DATA_PROTECTION}</p>
                    </div>
                </div>
            </section>

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
