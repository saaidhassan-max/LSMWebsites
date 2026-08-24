import type React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbNav } from '../../../components/sfb-nav';
import { categoryPages } from '../../../data/category-pages';
import { getCmsSiteSettings } from '../../../data/cms-content';

interface CategoryPageParams {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
    return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
    const { slug } = await params;
    const page = categoryPages.find((entry) => entry.slug === slug);
    if (page === undefined) return { title: 'Super Free Bingo' };

    return {
        title: page.title + ' | Super Free Bingo',
        description:
            'Compare the latest ' +
            page.title.toLowerCase() +
            ' from UK licensed bingo and slots sites.'
    };
}

export default async function CategoryRoute({ params }: CategoryPageParams): Promise<React.ReactElement> {
    const { slug } = await params;
    const page = categoryPages.find((entry) => entry.slug === slug);
    if (page === undefined) notFound();

    const settings = await getCmsSiteSettings();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbNav />

            <WelcomeBanner
                uspText={settings.uspText}
                textPrefix=""
                textHighlight={page.headlineHighlight}
                text={page.headlineRest}
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfb/welcome-images/left_sfb_welcome.png"
                imageRightSrc="/sfb/welcome-images/right_sfb_welcome.png"
                variant="merged"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <div className="flex w-full max-w-[1440px] mx-auto flex-col gap-[10px] px-4 py-4 md:px-16 md:py-8">
                {page.offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
            </div>

            <WebsiteDirectory
                title={settings.directoryTitle}
                sites={settings.directorySites}
                splitAtDot
            />

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
