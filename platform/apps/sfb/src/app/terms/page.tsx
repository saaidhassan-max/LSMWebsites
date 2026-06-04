import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Bingo',
    description: 'Terms and Conditions for Super Free Bingo.'
};

const CONTENT = `This website is operated by Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.

Age and Location Restrictions

This site is strictly for users aged 18 or over who reside in the United Kingdom. Access by anyone under 18, or anyone located outside the UK, is prohibited.

Agreement to These Terms

By browsing this website you agree to be bound by these Terms and Conditions, our Disclaimer, our Copyright Notice, and our Privacy Policy. If you do not agree with any part of these terms, please do not use this website.

Marketing Communications

By signing up through this website you agree to receive marketing messages by email and SMS from Super Free Bingo and our associated websites. You may unsubscribe at any time using the link in any of our communications.

Content and Liability

The information on this website is provided for general information and use only. We make no representations or warranties — express or implied — regarding the accuracy, completeness, or suitability of any content. To the maximum extent permitted by law, we exclude liability for any inaccuracies or errors on this site.

Intellectual Property

The design, layout, graphics, and all materials on this website are protected by copyright. Reproduction of any part of this site is prohibited except as set out in our Copyright Notice.

Third-Party Links

This website contains links to third-party bingo and casino operators. We accept no responsibility for the content of any linked site and strongly advise you to review the terms and conditions of any site you visit.

Free Play Schemes

Free bingo and free spin offers featured on this site are provided by third-party operators. These schemes may carry restrictions on play and withdrawal, and may be limited to new customers only. Terms vary by operator — always read the full terms before claiming any offer.

Governing Law

Your use of this website and any dispute arising from such use is subject to the laws of England and Wales.

Data Protection

Little Star Media Ltd complies with the Data Protection Act 2018 (Registration Z1426156) and all applicable UK GDPR requirements. Please see our Privacy Policy for full details of how we collect and use your data.`;

export default function TermsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Terms and Conditions
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {CONTENT}
                    </p>
                </div>
            </section>

            <SfbFooter legalText={legalText} />
        </main>
    );
}
