import { readDoc, writeDoc } from './cms-storage';
import { getHomeConfig, normalizeHomeConfig } from './home-store';
import { listOffers, listOperators } from './cms-content-store';
import { listCampaigns } from './campaign-store';
import { listSitePages } from './site-pages-store';
import { listLandingPages } from './landing-store';
import { getSiteSettings } from './site-settings-store';
import { getContentPages } from './content-pages-store';
import { CONTENT_PAGE_KEYS } from './content-pages.types';
import type { HomePageConfig } from './home.types';
import type { CmsCampaign, CmsOffer, CmsOperator } from './cms-content.types';
import type { SitePage } from './site-pages.types';
import type { LandingPage } from './landing-pages.types';
import type { SiteSettings } from './site-settings.types';
import type { ContentPagesDoc } from './content-pages.types';

const PUBLISHED_KEY = 'published-site';

export interface PublishableSnapshot {
    home: HomePageConfig;
    offers: CmsOffer[];
    operators: CmsOperator[];
    campaigns: CmsCampaign[];
    sitePages: SitePage[];
    landingPages: LandingPage[];
    settings: SiteSettings;
    contentPages: ContentPagesDoc;
}

export interface PublishedSnapshot extends PublishableSnapshot {
    publishedAt: string;
}

export interface PublishStatus {
    hasUnpublishedChanges: boolean;
    publishedAt: string | null;
    changes: string[];
}

function now(): string {
    return new Date().toISOString();
}

async function buildPublishableSnapshot(): Promise<PublishableSnapshot> {
    const [home, offers, operators, campaigns, sitePages, landingPages, settings, contentPages] =
        await Promise.all([
            getHomeConfig(),
            listOffers(),
            listOperators(),
            listCampaigns(),
            listSitePages(),
            listLandingPages(),
            getSiteSettings(),
            getContentPages()
        ]);
    return { home, offers, operators, campaigns, sitePages, landingPages, settings, contentPages };
}

async function seedSnapshot(): Promise<PublishedSnapshot> {
    const body = await buildPublishableSnapshot();
    return { ...body, publishedAt: now() };
}

async function normalizeSnapshot(raw: PublishedSnapshot): Promise<PublishedSnapshot> {
    const publishedAt = raw.publishedAt ?? now();
    return {
        home: normalizeHomeConfig(raw.home ?? { sections: [], updatedAt: publishedAt }),
        offers: raw.offers ?? [],
        operators: raw.operators ?? [],
        campaigns: raw.campaigns ?? [],
        sitePages: raw.sitePages ?? [],
        landingPages: raw.landingPages ?? [],
        settings: raw.settings ?? (await getSiteSettings()),
        contentPages: raw.contentPages ?? (await getContentPages()),
        publishedAt
    };
}

export async function getPublishedSnapshot(): Promise<PublishedSnapshot> {
    const raw = await readDoc<PublishedSnapshot>(PUBLISHED_KEY, seedSnapshot);
    return normalizeSnapshot(raw);
}

export async function publishSite(): Promise<void> {
    const body = await buildPublishableSnapshot();
    await writeDoc<PublishedSnapshot>(PUBLISHED_KEY, { ...body, publishedAt: now() });
}

function publishableView(snapshot: PublishableSnapshot): string {
    return JSON.stringify({
        home: snapshot.home,
        offers: snapshot.offers,
        operators: snapshot.operators,
        campaigns: snapshot.campaigns,
        sitePages: snapshot.sitePages,
        landingPages: snapshot.landingPages,
        settings: snapshot.settings,
        contentPages: snapshot.contentPages
    });
}

function byId<T extends { id: string }>(items: T[]): Map<string, T> {
    return new Map(items.map((item) => [item.id, item]));
}

function hasChanged<T>(draft: T, published: T): boolean {
    return JSON.stringify(draft) !== JSON.stringify(published);
}

function itemName(value: string | undefined, fallback: string): string {
    const trimmed = value?.trim();
    return trimmed === undefined || trimmed === '' ? fallback : trimmed;
}

function collectRecordChanges<T extends { id: string }>(
    singular: string,
    draftItems: T[],
    publishedItems: T[],
    label: (item: T) => string,
    detail?: (draft: T, published: T) => string | null
): string[] {
    const changes: string[] = [];
    const publishedById = byId(publishedItems);
    const draftById = byId(draftItems);

    for (const draft of draftItems) {
        const published = publishedById.get(draft.id);
        if (published === undefined) {
            changes.push('New ' + singular + ': ' + label(draft));
            continue;
        }
        const detailed = detail?.(draft, published);
        if (detailed !== undefined && detailed !== null) {
            changes.push(detailed);
        } else if (hasChanged(draft, published)) {
            changes.push(
                singular.charAt(0).toUpperCase() + singular.slice(1) + ' changed: ' + label(draft)
            );
        }
    }

    for (const published of publishedItems) {
        if (!draftById.has(published.id))
            changes.push('Removed ' + singular + ': ' + label(published));
    }

    return changes;
}

function collectPublishChanges(
    draft: PublishableSnapshot,
    published: PublishableSnapshot
): string[] {
    const changes: string[] = [];

    if (hasChanged(draft.home, published.home))
        changes.push('Home page content or offer placement changed');
    if (hasChanged(draft.settings, published.settings)) changes.push('Site-wide settings changed');

    for (const key of CONTENT_PAGE_KEYS) {
        const draftPage = draft.contentPages[key];
        const publishedPage = published.contentPages?.[key];
        if (publishedPage === undefined || hasChanged(draftPage, publishedPage)) {
            changes.push('Content page changed: ' + itemName(draftPage.title, key));
        }
    }

    changes.push(
        ...collectRecordChanges(
            'offer',
            draft.offers,
            published.offers,
            (offer) => itemName(offer.headline, offer.id),
            (draftOffer, publishedOffer) => {
                if (draftOffer.status !== publishedOffer.status) {
                    return (
                        'Offer ' +
                        (draftOffer.status === 'hidden' ? 'hidden' : 'shown') +
                        ': ' +
                        itemName(draftOffer.headline, draftOffer.id)
                    );
                }
                return hasChanged(draftOffer, publishedOffer)
                    ? 'Offer changed: ' + itemName(draftOffer.headline, draftOffer.id)
                    : null;
            }
        )
    );

    changes.push(
        ...collectRecordChanges(
            'operator',
            draft.operators,
            published.operators,
            (operator) => itemName(operator.name, operator.id),
            (draftOperator, publishedOperator) => {
                if (draftOperator.status !== publishedOperator.status) {
                    return (
                        'Operator ' +
                        (draftOperator.status === 'hidden' ? 'hidden' : 'shown') +
                        ': ' +
                        itemName(draftOperator.name, draftOperator.id)
                    );
                }
                return hasChanged(draftOperator, publishedOperator)
                    ? 'Operator changed: ' + itemName(draftOperator.name, draftOperator.id)
                    : null;
            }
        )
    );

    changes.push(
        ...collectRecordChanges('custom page', draft.sitePages, published.sitePages, (page) =>
            itemName(page.name, page.id)
        )
    );
    changes.push(
        ...collectRecordChanges(
            'landing page',
            draft.landingPages,
            published.landingPages,
            (page) => itemName(page.name, page.id)
        )
    );
    changes.push(
        ...collectRecordChanges(
            'campaign',
            draft.campaigns,
            published.campaigns,
            (campaign) => itemName(campaign.name, campaign.id),
            (draftCampaign, publishedCampaign) => {
                if (draftCampaign.status !== publishedCampaign.status) {
                    return (
                        'Campaign ' +
                        (draftCampaign.status === 'hidden' ? 'paused' : 'activated') +
                        ': ' +
                        itemName(draftCampaign.name, draftCampaign.id)
                    );
                }
                return hasChanged(draftCampaign, publishedCampaign)
                    ? 'Campaign changed: ' + itemName(draftCampaign.name, draftCampaign.id)
                    : null;
            }
        )
    );

    return changes;
}

export async function getPublishStatus(): Promise<PublishStatus> {
    const [draft, published] = await Promise.all([
        buildPublishableSnapshot(),
        getPublishedSnapshot()
    ]);
    const changes = collectPublishChanges(draft, published);
    return {
        hasUnpublishedChanges: publishableView(draft) !== publishableView(published),
        publishedAt: published.publishedAt,
        changes
    };
}
