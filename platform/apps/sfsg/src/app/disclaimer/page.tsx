import type React from 'react';
import type { Metadata } from 'next';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfsgNav } from '../../components/sfsg-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Disclaimer | Super Free Slot Games',
    description: 'Disclaimer for Super Free Slot Games.'
};

const CONTENT = `The information provided on this website is for general information purposes only. Super Free Slot Games makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related graphics contained on this website.

Any reliance you place on information from this website is strictly at your own risk. We expressly exclude all liability for any loss or damage — direct or indirect — arising from the use of, or inability to use, this website or any content found on it.

Third-Party Links

This website contains links to third-party casino and slot operator websites. We have no control over the content, nature, or availability of those sites. The inclusion of any link does not imply endorsement of the operator or their services. It is your responsibility to make yourself familiar with the terms and conditions and play rules operated by those third parties before registering or depositing.

Free Play Schemes

Free spin and free slot offers featured on this website are provided by third-party operators. These schemes may carry restrictions on usage and withdrawals, and may be limited to new customers only. Terms vary by operator — please review the full terms on the relevant operator's website and contact their customer support team if anything is unclear.

Availability

While we make every effort to keep this website running smoothly, we accept no responsibility for any technical unavailability caused by circumstances beyond our control. We reserve the right to take the website offline for maintenance at any time without prior notice.

This disclaimer is subject to the laws of England and Wales.`;

export default function DisclaimerPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfsgNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Disclaimer
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {CONTENT}
                    </p>
                </div>
            </section>

            <SfsgFooter legalText={legalText} />
        </main>
    );
}
