import { readDoc, writeDoc } from './cms-storage';
import { getHomeConfig } from './home-store';
import { listOffers, listOperators } from './cms-content-store';
import { listSitePages } from './site-pages-store';
import { listLandingPages } from './landing-store';
import { getSiteSettings } from './site-settings-store';
import type { HomePageConfig } from './home.types';
import type { CmsOffer, CmsOperator } from './cms-content.types';
import type { SitePage } from './site-pages.types';
import type { LandingPage } from './landing-pages.types';
import type { SiteSettings } from './site-settings.types';

const PUBLISHED_KEY = 'published-site';

export interface PublishableSnapshot {
    home: HomePageConfig;
    offers: CmsOffer[];
    operators: CmsOperator[];
    sitePages: SitePage[];
    landingPages: LandingPage[];
    settings: SiteSettings;
}

export interface PublishedSnapshot extends PublishableSnapshot {
    publishedAt: string;
}

export interface PublishStatus {
    hasUnpublishedChanges: boolean;
    publishedAt: string | null;
}

function now(): string {
    return new Date().toISOString();
}

async function buildPublishableSnapshot(): Promise<PublishableSnapshot> {
    const [home, offers, operators, sitePages, landingPages, settings] = await Promise.all([
        getHomeConfig(),
        listOffers(),
        listOperators(),
        listSitePages(),
        listLandingPages(),
        getSiteSettings()
    ]);
    return { home, offers, operators, sitePages, landingPages, settings };
}

async function seedSnapshot(): Promise<PublishedSnapshot> {
    const body = await buildPublishableSnapshot();
    return { ...body, publishedAt: now() };
}

export async function getPublishedSnapshot(): Promise<PublishedSnapshot> {
    return readDoc<PublishedSnapshot>(PUBLISHED_KEY, seedSnapshot);
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
        sitePages: snapshot.sitePages,
        landingPages: snapshot.landingPages,
        settings: snapshot.settings
    });
}

export async function getPublishStatus(): Promise<PublishStatus> {
    const [draft, published] = await Promise.all([buildPublishableSnapshot(), getPublishedSnapshot()]);
    return {
        hasUnpublishedChanges: publishableView(draft) !== publishableView(published),
        publishedAt: published.publishedAt
    };
}
