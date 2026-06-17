import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type {
    CmsHomeConfig,
    CmsHomeSectionId,
    CmsHomeWelcomeContent,
    CmsLandingPage,
    CmsLandingPageContent,
    CmsOffer,
    CmsOfferPageData,
    CmsOperator,
    CmsOffersItem,
    CmsSitePage,
    CmsSiteSettings,
    CmsSiteSettingsDirectoryItem,
    CmsSiteSettingsNavItem
} from './cms-content.types';

export type CmsHomeRenderItem =
    | { kind: 'offer'; props: OfferCardProps }
    | { kind: 'banner'; mobileSrc: string; desktopSrc: string; href: string };

const CMS_DATA_DIR = path.resolve(process.cwd(), '../cms/.cms-data');
const OPERATORS_FILE = 'operators';
const OFFERS_FILE = 'offers';
const HOME_FILE = 'home-page';
const LANDING_PAGES_FILE = 'landing-pages';
const SITE_PAGES_FILE = 'site-pages';
const SITE_SETTINGS_FILE = 'site-settings';
const CONTENT_PAGES_FILE = 'content-pages';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';
const useSupabase = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';

let supabaseClient: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
    if (supabaseClient === null) {
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: { persistSession: false }
        });
    }
    return supabaseClient;
}

const DEFAULT_NAV_ITEMS: CmsSiteSettingsNavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '📋', label: 'Sign Up', href: '/signup' }
];

const DEFAULT_DIRECTORY_SITES: CmsSiteSettingsDirectoryItem[] = [
    { name: 'Betfair Casino' },
    { name: 'Ladbrokes' },
    { name: 'Buzz Bingo' },
    { name: 'Gala Bingo' },
    { name: 'MrQ' },
    { name: 'Sun Vegas' },
    { name: 'Sky Vegas' },
    { name: 'Glossy Bingo' },
    { name: 'Sun Bingo' },
    { name: 'Foxy Bingo' },
    { name: 'Heart Bingo' }
];

const DEFAULT_FOOTER_LEGAL_TEXT =
    'BeGambleAware.org — Free, confidential advice for anyone affected by problem gambling. Call the National Gambling Helpline: 0808 8020 133.\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Free Bingo. All rights reserved. Unauthorised reproduction is a violation of applicable laws.';

const DEFAULT_WELCOME: CmsHomeWelcomeContent = {
    textHighlight: 'TOP',
    text: ' BINGO DEALS 2026',
    textSuffix: '',
    features: ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure'],
    imageLeftSrc: '/sfb/welcome-images/image-left.png',
    imageRightSrc: '/sfb/welcome-images/image-right.png',
    imageLeftWidthMobile: 83,
    imageLeftWidthDesktop: 204
};
const DEFAULT_HOME_SECTION_IDS: CmsHomeSectionId[] = ['welcome', 'terms', 'offers', 'signup', 'directory'];

const PUBLISHED_KEY = 'published-site';

const SNAPSHOT_FIELD: Record<string, string> = {
    [OPERATORS_FILE]: 'operators',
    [OFFERS_FILE]: 'offers',
    [HOME_FILE]: 'home',
    [LANDING_PAGES_FILE]: 'landingPages',
    [SITE_PAGES_FILE]: 'sitePages',
    [SITE_SETTINGS_FILE]: 'settings',
    [CONTENT_PAGES_FILE]: 'contentPages'
};

async function readPublishedSnapshot(): Promise<Record<string, unknown> | null> {
    if (useSupabase) {
        const { data, error } = await getSupabase()
            .from('cms_documents')
            .select('data')
            .eq('key', PUBLISHED_KEY)
            .maybeSingle();
        if (error !== null || data === null) return null;
        return data.data as Record<string, unknown>;
    }
    try {
        const raw = await fs.readFile(path.join(CMS_DATA_DIR, PUBLISHED_KEY + '.json'), 'utf8');
        return JSON.parse(raw) as Record<string, unknown>;
    } catch {
        return null;
    }
}

async function readJson<T>(key: string): Promise<T | null> {
    const snapshot = await readPublishedSnapshot();
    if (snapshot === null) return readDraftJson<T>(key);
    const field = SNAPSHOT_FIELD[key];
    if (field === undefined) return null;
    const value = snapshot[field];
    return value === undefined ? null : (value as T);
}

async function readDraftJson<T>(key: string): Promise<T | null> {
    if (useSupabase) {
        const { data, error } = await getSupabase()
            .from('cms_documents')
            .select('data')
            .eq('key', key)
            .maybeSingle();
        if (error !== null || data === null) return null;
        return data.data as T;
    }
    try {
        const raw = await fs.readFile(path.join(CMS_DATA_DIR, key + '.json'), 'utf8');
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

function normalizeImagePath(src: string): string {
    if (src.trim() === '') return '/sfb/brands/placeholder.png';
    return src;
}

function normalizeWelcome(value: Partial<CmsHomeWelcomeContent> | undefined): CmsHomeWelcomeContent {
    return {
        ...DEFAULT_WELCOME,
        ...(value ?? {}),
        features: Array.isArray(value?.features) ? value.features : DEFAULT_WELCOME.features
    };
}

function normalizeHomeSectionIds(value: CmsHomeSectionId[] | undefined): CmsHomeSectionId[] {
    if (!Array.isArray(value)) return DEFAULT_HOME_SECTION_IDS;
    const next = value.filter((id): id is CmsHomeSectionId =>
        DEFAULT_HOME_SECTION_IDS.includes(id as CmsHomeSectionId)
    );
    if (next.length === 0) return DEFAULT_HOME_SECTION_IDS;
    if (next.includes('offers')) return next;
    const termsIndex = next.indexOf('terms');
    const insertAt = termsIndex >= 0 ? termsIndex + 1 : Math.min(2, next.length);
    next.splice(insertAt, 0, 'offers');
    return next;
}

function normalizeOffersItems(home: CmsHomeConfig): CmsOffersItem[] {
    if (Array.isArray(home.offerItems)) {
        return home.offerItems
            .map((item): CmsOffersItem | null => {
                const entry = item as Partial<CmsOffersItem> & { offerId?: string };
                if (entry.kind === 'banner') {
                    return {
                        kind: 'banner',
                        mobileSrc:
                            typeof entry.mobileSrc === 'string'
                                ? entry.mobileSrc
                                : '/sfb/banners/operator-banner-mobile.jpg',
                        desktopSrc:
                            typeof entry.desktopSrc === 'string'
                                ? entry.desktopSrc
                                : '/sfb/banners/operator-banner-desktop.jpg',
                        href: typeof entry.href === 'string' ? entry.href : ''
                    };
                }
                if (typeof entry.offerId === 'string') return { kind: 'offer', offerId: entry.offerId };
                return null;
            })
            .filter((item): item is CmsOffersItem => item !== null);
    }
    if (Array.isArray(home.offerIds)) {
        return home.offerIds
            .filter((id): id is string => typeof id === 'string')
            .map((offerId) => ({ kind: 'offer', offerId }));
    }
    return [];
}

function normalizeNavItems(items: CmsSiteSettingsNavItem[] | undefined): CmsSiteSettingsNavItem[] {
    if (!Array.isArray(items)) return DEFAULT_NAV_ITEMS;
    const next = items.filter((item) => item.label.trim() !== '' && item.href.trim() !== '');
    return next.length > 0 ? next : DEFAULT_NAV_ITEMS;
}

function toSitePageNavItem(
    page: CmsSitePage,
    existing: CmsSiteSettingsNavItem | undefined
): CmsSiteSettingsNavItem {
    return {
        emoji: existing?.emoji ?? '📄',
        label: page.name,
        href: '/' + page.slug,
        pageId: page.id
    };
}

function sameNavItem(a: CmsSiteSettingsNavItem, b: CmsSiteSettingsNavItem): boolean {
    if (a.pageId !== undefined && b.pageId !== undefined) return a.pageId === b.pageId;
    return a.href === b.href;
}

function mergeNavItems(
    items: CmsSiteSettingsNavItem[] | undefined,
    pages: CmsSitePage[] | null
): CmsSiteSettingsNavItem[] {
    const saved = normalizeNavItems(items);
    if (pages === null) return saved;

    const publishedPages = pages.filter((page) => page.status === 'published');
    const pageItems = publishedPages.map((page) =>
        toSitePageNavItem(
            page,
            saved.find((item) => item.pageId === page.id || item.href === '/' + page.slug)
        )
    );
    const available = [
        ...DEFAULT_NAV_ITEMS.filter((item) => item.href !== '/signup'),
        ...pageItems,
        DEFAULT_NAV_ITEMS[DEFAULT_NAV_ITEMS.length - 1]
    ].filter((item): item is CmsSiteSettingsNavItem => item !== undefined);
    const ordered: CmsSiteSettingsNavItem[] = [];

    saved.forEach((item) => {
        const match = available.find(
            (option) =>
                (item.pageId !== undefined && option.pageId === item.pageId) ||
                option.href === item.href
        );
        if (match !== undefined && !ordered.some((option) => sameNavItem(option, match))) {
            ordered.push(match);
        }
    });

    available.forEach((item) => {
        if (!ordered.some((option) => sameNavItem(option, item))) ordered.push(item);
    });

    return ordered;
}

function normalizeDirectorySites(
    items: CmsSiteSettingsDirectoryItem[] | undefined
): CmsSiteSettingsDirectoryItem[] {
    if (!Array.isArray(items)) return DEFAULT_DIRECTORY_SITES;
    const next = items.filter((item) => item.name.trim() !== '');
    return next.length > 0 ? next : DEFAULT_DIRECTORY_SITES;
}

function normalizeSettings(
    value: Partial<CmsSiteSettings> | null,
    pages: CmsSitePage[] | null
): CmsSiteSettings {
    const settings = value ?? {};
    return {
        uspText:
            typeof settings.uspText === 'string' && settings.uspText.trim() !== ''
                ? settings.uspText
                : 'OVER 150,000 OFFERS CLAIMED',
        howToClaimUspText:
            typeof settings.howToClaimUspText === 'string' && settings.howToClaimUspText.trim() !== ''
                ? settings.howToClaimUspText
                : 'OVER 5,000,000 SUBSCRIBERS',
        directoryTitle:
            typeof settings.directoryTitle === 'string' && settings.directoryTitle.trim() !== ''
                ? settings.directoryTitle
                : 'Super Free Bingo Directory',
        directorySites: normalizeDirectorySites(settings.directorySites),
        footerLegalText:
            typeof settings.footerLegalText === 'string' && settings.footerLegalText.trim() !== ''
                ? settings.footerLegalText
                : DEFAULT_FOOTER_LEGAL_TEXT,
        navItems: mergeNavItems(settings.navItems, pages),
        updatedAt: typeof settings.updatedAt === 'string' ? settings.updatedAt : ''
    };
}

function normalizeSteps(offer: CmsOffer, operator: CmsOperator): string[] {
    if (Array.isArray(offer.howToClaimSteps) && offer.howToClaimSteps.length > 0) {
        return offer.howToClaimSteps;
    }
    return [
        'Click "Click To Claim" to visit ' + operator.name + '.',
        'Register a new account with your details.',
        'Follow the offer instructions shown on the operator site.'
    ];
}

function toOfferCardProps(offer: CmsOffer, operator: CmsOperator): OfferCardProps {
    return {
        label: offer.label,
        labelColor: offer.labelColor,
        logoSrc: normalizeImagePath(operator.logoSrc),
        logoAlt: operator.name,
        offerMain: offer.headline,
        details: Array.isArray(offer.details) ? offer.details : [],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: offer.ctaHref || '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/' + offer.id,
        termsText: offer.termsText
    };
}

export async function getCmsHomeRenderItems(): Promise<CmsHomeRenderItem[] | null> {
    const [operators, offers, home] = await Promise.all([
        readJson<CmsOperator[]>(OPERATORS_FILE),
        readJson<CmsOffer[]>(OFFERS_FILE),
        readJson<CmsHomeConfig>(HOME_FILE)
    ]);

    if (operators === null || offers === null || home === null) return null;

    const operatorById = new Map(operators.map((operator) => [operator.id, operator]));
    const offerById = new Map(offers.map((offer) => [offer.id, offer]));
    const items = normalizeOffersItems(home)
        .map((item): CmsHomeRenderItem | null => {
            if (item.kind === 'banner') return item;
            const offer = offerById.get(item.offerId);
            if (offer === undefined || offer.status !== 'active') return null;
            const operator = operatorById.get(offer.operatorId);
            if (operator === undefined || operator.status !== 'active') return null;
            return { kind: 'offer', props: toOfferCardProps(offer, operator) };
        })
        .filter((item): item is CmsHomeRenderItem => item !== null);

    return items.length > 0 ? items : null;
}

export async function getCmsOfferCardsByIds(offerIds: string[]): Promise<OfferCardProps[]> {
    if (offerIds.length === 0) return [];

    const [operators, offers] = await Promise.all([
        readJson<CmsOperator[]>(OPERATORS_FILE),
        readJson<CmsOffer[]>(OFFERS_FILE)
    ]);

    if (operators === null || offers === null) return [];

    const operatorById = new Map(operators.map((operator) => [operator.id, operator]));
    const offerById = new Map(offers.map((offer) => [offer.id, offer]));

    return offerIds
        .map((offerId) => offerById.get(offerId))
        .filter((offer): offer is CmsOffer => offer !== undefined && offer.status === 'active')
        .map((offer) => {
            const operator = operatorById.get(offer.operatorId);
            if (operator === undefined || operator.status !== 'active') return null;
            return toOfferCardProps(offer, operator);
        })
        .filter((card): card is OfferCardProps => card !== null);
}

export async function getCmsOfferCardMap(offerIds: string[]): Promise<Record<string, OfferCardProps>> {
    if (offerIds.length === 0) return {};

    const [operators, offers] = await Promise.all([
        readJson<CmsOperator[]>(OPERATORS_FILE),
        readJson<CmsOffer[]>(OFFERS_FILE)
    ]);

    if (operators === null || offers === null) return {};

    const operatorById = new Map(operators.map((operator) => [operator.id, operator]));
    const offerById = new Map(offers.map((offer) => [offer.id, offer]));
    const map: Record<string, OfferCardProps> = {};

    offerIds.forEach((id) => {
        const offer = offerById.get(id);
        if (offer === undefined || offer.status !== 'active') return;
        const operator = operatorById.get(offer.operatorId);
        if (operator === undefined || operator.status !== 'active') return;
        map[id] = toOfferCardProps(offer, operator);
    });

    return map;
}

export async function getCmsHomeWelcomeContent(): Promise<CmsHomeWelcomeContent | null> {
    const home = await readJson<CmsHomeConfig>(HOME_FILE);
    if (home === null) return null;
    return normalizeWelcome(home.welcome);
}

export async function getCmsHomeSectionIds(): Promise<CmsHomeSectionId[]> {
    const home = await readJson<CmsHomeConfig>(HOME_FILE);
    if (home === null) return DEFAULT_HOME_SECTION_IDS;
    return normalizeHomeSectionIds(home.sectionIds);
}

export async function getCmsSiteSettings(): Promise<CmsSiteSettings> {
    const [settings, pages] = await Promise.all([
        readJson<CmsSiteSettings>(SITE_SETTINGS_FILE),
        readJson<CmsSitePage[]>(SITE_PAGES_FILE)
    ]);
    return normalizeSettings(settings, pages);
}

export async function getCmsOfferPage(slug: string): Promise<CmsOfferPageData | null> {
    const [operators, offers] = await Promise.all([
        readJson<CmsOperator[]>(OPERATORS_FILE),
        readJson<CmsOffer[]>(OFFERS_FILE)
    ]);

    if (operators === null || offers === null) return null;

    const offer =
        offers.find((item) => item.id === slug && item.status === 'active') ??
        offers.find((item) => {
            const operator = operators.find((candidate) => candidate.id === item.operatorId);
            return operator?.slug === slug && item.status === 'active';
        });

    if (offer === undefined) return null;

    const operator = operators.find((item) => item.id === offer.operatorId && item.status === 'active');
    if (operator === undefined) return null;

    return {
        id: offer.id,
        operatorSlug: operator.slug,
        logoSrc: normalizeImagePath(operator.logoSrc),
        logoAlt: operator.name,
        offerHeadline: offer.headline,
        trustBadges: Array.isArray(offer.details) ? offer.details : [],
        howToSteps: normalizeSteps(offer, operator),
        howToTermsText: offer.termsText,
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: operator.name + ' offer',
        ctaText: 'CLICK TO CLAIM',
        ctaHref: offer.ctaHref || '#',
        reviewIntro: operator.reviewIntro,
        reviewBody: operator.reviewBody
    };
}

export async function getCmsSitePage(slug: string): Promise<CmsSitePage | null> {
    const pages = await readJson<CmsSitePage[]>(SITE_PAGES_FILE);
    if (pages === null) return null;
    const page = pages.find((item) => item.slug === slug && item.status === 'published');
    return page ?? null;
}

export type CmsContentPageKey = 'about' | 'privacy' | 'terms' | 'disclaimer';

export interface CmsContentPage {
    key: CmsContentPageKey;
    title: string;
    subtitle: string;
    bodyHtml: string;
}

export async function getCmsContentPage(key: CmsContentPageKey): Promise<CmsContentPage | null> {
    const doc = await readJson<Record<string, Partial<CmsContentPage>>>(CONTENT_PAGES_FILE);
    const page = doc?.[key];
    if (page === undefined || typeof page.bodyHtml !== 'string') return null;
    return {
        key,
        title: typeof page.title === 'string' ? page.title : '',
        subtitle: typeof page.subtitle === 'string' ? page.subtitle : '',
        bodyHtml: page.bodyHtml
    };
}

export async function getCmsLandingPageContent(slug: string): Promise<CmsLandingPageContent | null> {
    const pages = await readJson<CmsLandingPage[]>(LANDING_PAGES_FILE);
    if (pages === null) return null;

    const page = pages.find((item) => item.slug === slug && item.status === 'published');
    if (page === undefined) return null;

    return {
        ...page.content,
        backgroundImage: normalizeImagePath(page.content.backgroundImage)
    };
}
