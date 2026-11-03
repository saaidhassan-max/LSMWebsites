import type React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbetsNav } from '../../../components/sfbets-nav';
import { categoryPages } from '../../../data/category-pages';
import { ctaColorForBrand } from '../../../data/operator-cta-colors';
import { directorySites, legalText } from '../../../data/site-content';

interface CategoryPageParams {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
    return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
    const { slug } = await params;
    const page = categoryPages.find((entry) => entry.slug === slug);
    if (page === undefined) return { title: 'Super Free Bets MI' };

    return {
        title: page.title + ' | Super Free Bets MI',
        description:
            'Compare the latest ' +
            page.title.toLowerCase() +
            ' from licensed Michigan online casinos.'
    };
}

export default async function CategoryRoute({ params }: CategoryPageParams): Promise<React.ReactElement> {
    const { slug } = await params;
    const page = categoryPages.find((entry) => entry.slug === slug);
    if (page === undefined) notFound();

    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbetsNav />

            <WelcomeBanner
                uspText="OVER 150,000 OFFERS CLAIMED"
                uspVariant="slots"
                textPrefix=""
                textHighlight={page.headlineHighlight}
                text={page.headlineRest}
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfbets/welcome-images/image-left.png"
                imageRightSrc="/sfbets/welcome-images/image-right.png"
                variant="merged"
            />

            <div className="flex w-full max-w-[1440px] mx-auto flex-col gap-[10px] px-4 py-4 md:px-16 md:py-8">
                {page.offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} ctaColor={ctaColorForBrand(offer.logoAlt)} />
                ))}
            </div>

            <WebsiteDirectory title="Super Free Bets MI Directory" sites={directorySites} splitAtDot />

            <SfbetsFooter legalText={legalText} state="mi" />
        </main>
    );
}
