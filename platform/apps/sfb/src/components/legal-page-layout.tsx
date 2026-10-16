import type React from 'react';
import type { LegalPageLayoutProps } from './legal-page-layout.types';
import { LegalContent } from '@lsm/ui/components/legal-content/legal-content';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { getCmsSiteSettings } from '../data/cms-content';
import { SfbNav } from './sfb-nav';

export async function LegalPageLayout({ page }: LegalPageLayoutProps): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />
            <USP text={settings.uspText} variant="bingo" />

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

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
