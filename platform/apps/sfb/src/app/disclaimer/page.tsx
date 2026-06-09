import type React from 'react';
import type { Metadata } from 'next';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbNav } from '../../components/sfb-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Disclaimer | Super Free Bingo',
    description: 'Disclaimer for Super Free Bingo.'
};

const CONTENT = `The information contained in this website is for general information purposes only. The information is provided by Super Free Bingo and whilst we endeavour to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.

In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.

Through this website you are able to link to other websites which are not under the control of Super Free Bingo. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

ANY LINKS TO THIRD PARTY SITES (INCLUDING BINGO SITES) ARE PROVIDED FOR YOUR CONVENIENCE TO PROVIDE FURTHER INFORMATION. WE HAVE NO RESPONSIBILITY FOR THE CONTENT OF LINKED WEBSITE(S). IT IS YOUR RESPONSIBILITY TO MAKE YOURSELF FAMILIAR WITH THE TERMS AND CONDITIONS AND PLAY RULES OPERATED BY THOSE THIRD PARTIES.

PLEASE NOTE THAT WHERE THIRD PARTY SITES OFFER 'FREE BINGO' OR 'FREE PLAY' SCHEMES, THEY WILL BE SUBJECT TO THE RULES OF THE PARTICULAR SITE OPERATOR. THERE MAY BE RESTRICTIONS UPON HOW YOU CAN USE AND/OR WITHDRAW ANY SUMS OR WINNINGS FROM 'FREE BINGO' OR 'FREE PLAY' SCHEMES. SUCH SCHEMES MAY ONLY APPLY TO NEW, FIRST TIME PLAYERS. RULES VARY FROM SCHEME TO SCHEME AND YOU SHOULD CHECK THE TERMS AND CONDITIONS AND SCHEME RULES APPEARING ON THE PARTICULAR THIRD PARTY WEBSITE. IF IN DOUBT, YOU SHOULD CONTACT CUSTOMER SUPPORT FOR THE RELEVANT SITE OPERATOR.

Every effort is made to keep the website up and running smoothly. However, Super Free Bingo takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.`;

export default function DisclaimerPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />
            <USP text="OVER 150,000 OFFERS CLAIMED" />

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

            <SfbFooter legalText={legalText} />
        </main>
    );
}
