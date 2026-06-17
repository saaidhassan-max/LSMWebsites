import type React from 'react';
import { notFound } from 'next/navigation';
import { OfferEditor, type OfferPlacement } from '@/components/offer-editor';
import { getOffer, listOperators } from '@/lib/cms-content-store';
import { getHomeConfig } from '@/lib/home-store';
import { listSitePages } from '@/lib/site-pages-store';

export const dynamic = 'force-dynamic';

export default async function EditOfferScreen({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ returnTo?: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const { returnTo } = await searchParams;
    const [offer, operators, home, pages] = await Promise.all([
        getOffer(id),
        listOperators(),
        getHomeConfig(),
        listSitePages()
    ]);
    if (offer === undefined) notFound();
    const placements: OfferPlacement[] = [
        {
            id: 'home',
            type: 'home',
            label: 'Home page',
            slug: '/',
            placed: home.offerItems.some((item) => item.kind === 'offer' && item.offerId === offer.id),
            status: 'published'
        },
        ...pages.map((page): OfferPlacement => ({
            id: page.id,
            type: 'sitePage',
            label: page.name,
            slug: '/' + page.slug,
            placed: page.sections.some(
                (section) =>
                    section.type === 'offers' &&
                    section.content.items.some((item) => item.kind === 'offer' && item.offerId === offer.id)
            ),
            status: page.status
        }))
    ];
    return <OfferEditor offer={offer} operators={operators} placements={placements} returnTo={returnTo} />;
}
