import type React from 'react';
import type { LegalPageLayoutProps } from './legal-page-layout.types';
import { LegalContent } from '@lsm/ui/components/legal-content/legal-content';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { legalText } from '../data/site-content';
import { SfsgNav } from './sfsg-nav';

export const LegalPageLayout = ({ page }: LegalPageLayoutProps): React.ReactElement => (
    <main className="flex w-full flex-col bg-surface">
        <SfsgNav />
        <USP text="OVER 150,000 OFFERS CLAIMED" variant="slots" />

        <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
            <div className="flex flex-col gap-8">
                <div className="px-4 py-3">
                    <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                        {page.title}
                    </h1>
                </div>
                <div className="px-4">
                    <LegalContent blocks={page.blocks} />
                </div>
            </div>
        </section>

        <SfsgFooter legalText={legalText} />
    </main>
);
