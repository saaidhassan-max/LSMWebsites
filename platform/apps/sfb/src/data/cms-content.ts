import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type {
    CmsHomeConfig,
    CmsHomeWelcomeContent,
    CmsLandingPage,
    CmsLandingPageContent,
    CmsOffer,
    CmsOfferPageData,
    CmsOperator,
    CmsSitePage,
    CmsSiteSettings,
    CmsSiteSettingsDirectoryItem,
    CmsSiteSettingsNavItem
} from './cms-content.types';

const CMS_DATA_DIR = path.resolve(process.cwd(), '../cms/.cms-data');
const OPERATORS_FILE = 'operators';
const OFFERS_FILE = 'offers';
const HOME_FILE = 'home-page';
const LANDING_PAGES_FILE = 'landing-pages';
const SITE_PAGES_FILE = 'site-pages';
const SITE_SETTINGS_FILE = 'site-settings';

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
    { emoji: '🎁', label: 'No Deposit Bingo', href: '/no-deposit-bingo' },
    { emoji: '🔥', label: 'Free Bingo Bonuses', href: '/' },
    { emoji: '✊', label: 'Exclusive Deals', href: '/' },
    { emoji: '💎', label: 'No Wagering Bingo', href: '/' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
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

async function readJson<T>(key: string): Promise<T | null> {
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

function normalizeNavItems(items: CmsSiteSettingsNavItem[] | undefined): CmsSiteSettingsNavItem[] {
    if (!Array.isArray(items)) return DEFAULT_NAV_ITEMS;
    const next = items.filter((item) => item.label.trim() !== '' && item.href.trim() !== '');
    return next.length > 0 ? next : DEFAULT_NAV_ITEMS;
}

function normalizeDirectorySites(
    items: CmsSiteSettingsDirectoryItem[] | undefined
): CmsSiteSettingsDirectoryItem[] {
    if (!Array.isArray(items)) return DEFAULT_DIRECTORY_SITES;
    const next = items.filter((item) => item.name.trim() !== '');
    return next.length > 0 ? next : DEFAULT_DIRECTORY_SITES;
}

function normalizeSettings(value: Partial<CmsSiteSettings> | null): CmsSiteSettings {
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
        navItems: normalizeNavItems(settings.navItems),
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

export async function getCmsHomeOfferCards(): Promise<OfferCardProps[] | null> {
    const [operators, offers, home] = await Promise.all([
        readJson<CmsOperator[]>(OPERATORS_FILE),
        readJson<CmsOffer[]>(OFFERS_FILE),
        readJson<CmsHomeConfig>(HOME_FILE)
    ]);

    if (operators === null || offers === null || home === null) return null;

    const operatorById = new Map(operators.map((operator) => [operator.id, operator]));
    const offerById = new Map(offers.map((offer) => [offer.id, offer]));
    const cards = home.offerIds
        .map((offerId) => offerById.get(offerId))
        .filter((offer): offer is CmsOffer => offer !== undefined && offer.status === 'active')
        .map((offer) => {
            const operator = operatorById.get(offer.operatorId);
            if (operator === undefined || operator.status !== 'active') return null;
            return toOfferCardProps(offer, operator);
        })
        .filter((card): card is OfferCardProps => card !== null);

    return cards.length > 0 ? cards : null;
}

export async function getCmsHomeWelcomeContent(): Promise<CmsHomeWelcomeContent | null> {
    const home = await readJson<CmsHomeConfig>(HOME_FILE);
    if (home === null) return null;
    return normalizeWelcome(home.welcome);
}

export async function getCmsSiteSettings(): Promise<CmsSiteSettings> {
    const settings = await readJson<CmsSiteSettings>(SITE_SETTINGS_FILE);
    return normalizeSettings(settings);
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
