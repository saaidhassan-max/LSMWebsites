import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { termsAndConditionsText } from '../../data/legal-content';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Regler og Vilkår | Super Spillemaskiner',
    description: 'Regler og vilkår for brug af Super Spillemaskiner.'
};

export default function TermsAndConditionsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" variant="ssm" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Regler og Vilkår
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {termsAndConditionsText}
                    </p>
                </div>
            </section>

            <SsmFooter legalText={legalText} />
        </main>
    );
}
