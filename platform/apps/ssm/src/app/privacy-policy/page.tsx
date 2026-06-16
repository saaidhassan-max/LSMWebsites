import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { privacyPolicyText } from '../../data/legal-content';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Privatlivspolitik | Super Spillemaskiner',
    description: 'Privatlivspolitik for Super Spillemaskiner — hvordan vi indsamler, anvender og beskytter dine personoplysninger.'
};

export default function PrivacyPolicyPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" variant="ssm" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Privatlivspolitik
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {privacyPolicyText}
                    </p>
                </div>
            </section>

            <SsmFooter legalText={legalText} />
        </main>
    );
}
