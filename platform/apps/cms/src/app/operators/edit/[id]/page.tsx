import type React from 'react';
import { notFound } from 'next/navigation';
import { OperatorEditor } from '@/components/operator-editor';
import { getOperator, listOffers } from '@/lib/cms-content-store';
import { getHomeConfig } from '@/lib/home-store';
import { getPublishedSnapshot } from '@/lib/published-store';
import { listSitePages } from '@/lib/site-pages-store';
import type { HomePageConfig } from '@/lib/home.types';
import type { SitePage, SitePageSection } from '@/lib/site-pages.types';

export const dynamic = 'force-dynamic';

function collectOfferIds(home: HomePageConfig, pages: SitePage[]): Set<string> {
    const ids = new Set<string>();
    const addFromSections = (sections: SitePageSection[]): void => {
        sections.forEach((section) => {
            if (section.type !== 'offers') return;
            section.content.items.forEach((item) => {
                if (item.kind === 'offer') ids.add(item.offerId);
            });
        });
    };
    addFromSections(home?.sections ?? []);
    (pages ?? []).forEach((page) => addFromSections(page?.sections ?? []));
    return ids;
}

export default async function EditOperatorScreen({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [operator, offers, home, pages, published] = await Promise.all([
        getOperator(id),
        listOffers(),
        getHomeConfig(),
        listSitePages(),
        getPublishedSnapshot()
    ]);
    if (operator === undefined) notFound();
    const operatorOffers = offers
        .filter((offer) => offer.operatorId === id)
        .sort((a, b) => a.id.localeCompare(b.id));
    const draftIds = collectOfferIds(home, pages);
    const liveIds = collectOfferIds(
        published.home,
        published.sitePages.filter((page) => page.status === 'published')
    );
    const offerUsage = operatorOffers.reduce<Record<string, 'live' | 'draft' | 'notPlaced'>>((acc, offer) => {
        acc[offer.id] = liveIds.has(offer.id) ? 'live' : draftIds.has(offer.id) ? 'draft' : 'notPlaced';
        return acc;
    }, {});
    return <OperatorEditor operator={operator} offers={operatorOffers} offerUsage={offerUsage} />;
}
