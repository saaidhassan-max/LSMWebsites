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

const CONTENT = `Content coming soon.`;

export default function DisclaimerPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />
            <USP text="OVER 5,000,000 BINGO PLAYERS" />

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
