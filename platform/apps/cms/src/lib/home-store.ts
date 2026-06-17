import type { HomePageConfig, HomeSectionId, HomeWelcomeContent } from './home.types';
import type { OffersItem } from './site-pages.types';
import { listOffers } from './cms-content-store';
import { readDoc, writeDoc } from './cms-storage';

function normalizeOfferItems(value: { offerItems?: unknown; offerIds?: unknown }): OffersItem[] {
    if (Array.isArray(value.offerItems)) {
        return value.offerItems
            .map((raw): OffersItem | null => {
                const entry = raw as Partial<OffersItem> & { offerId?: string };
                if (entry.kind === 'banner') {
                    return {
                        kind: 'banner',
                        mobileSrc: typeof entry.mobileSrc === 'string' ? entry.mobileSrc : '',
                        desktopSrc: typeof entry.desktopSrc === 'string' ? entry.desktopSrc : '',
                        href: typeof entry.href === 'string' ? entry.href : ''
                    };
                }
                if (typeof entry.offerId === 'string') return { kind: 'offer', offerId: entry.offerId };
                return null;
            })
            .filter((item): item is OffersItem => item !== null);
    }
    if (Array.isArray(value.offerIds)) {
        return value.offerIds
            .filter((id): id is string => typeof id === 'string')
            .map((id) => ({ kind: 'offer', offerId: id }));
    }
    return [];
}

const HOME_KEY = 'home-page';
const DEFAULT_SECTION_IDS: HomeSectionId[] = ['welcome', 'terms', 'offers', 'signup', 'directory'];

function now(): string {
    return new Date().toISOString();
}

const DEFAULT_WELCOME: HomeWelcomeContent = {
    textHighlight: 'TOP',
    text: ' BINGO DEALS 2026',
    textSuffix: '',
    features: ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure'],
    imageLeftSrc: '/sfb/welcome-images/image-left.png',
    imageRightSrc: '/sfb/welcome-images/image-right.png',
    imageLeftWidthMobile: 83,
    imageLeftWidthDesktop: 204
};

function normalizeWelcome(value: Partial<HomeWelcomeContent> | undefined): HomeWelcomeContent {
    return {
        ...DEFAULT_WELCOME,
        ...(value ?? {}),
        features: Array.isArray(value?.features) ? value.features : DEFAULT_WELCOME.features
    };
}

function normalizeConfig(value: Partial<HomePageConfig>): HomePageConfig {
    const sectionIds = Array.isArray(value.sectionIds)
        ? value.sectionIds.filter((id): id is HomeSectionId => DEFAULT_SECTION_IDS.includes(id as HomeSectionId))
        : DEFAULT_SECTION_IDS;
    const normalizedSectionIds = sectionIds.includes('offers') ? sectionIds : insertOffersSection(sectionIds);

    return {
        offerItems: normalizeOfferItems(value as { offerItems?: unknown; offerIds?: unknown }),
        sectionIds: normalizedSectionIds,
        welcome: normalizeWelcome(value.welcome),
        updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : now()
    };
}

function insertOffersSection(sectionIds: HomeSectionId[]): HomeSectionId[] {
    const next = [...sectionIds];
    const termsIndex = next.indexOf('terms');
    const insertAt = termsIndex >= 0 ? termsIndex + 1 : Math.min(2, next.length);
    next.splice(insertAt, 0, 'offers');
    return next;
}

async function seedConfig(): Promise<HomePageConfig> {
    const offers = await listOffers();
    const offerItems: OffersItem[] = offers
        .filter((offer) => offer.status === 'active')
        .map((offer) => ({ kind: 'offer', offerId: offer.id }));
    return { offerItems, sectionIds: DEFAULT_SECTION_IDS, welcome: DEFAULT_WELCOME, updatedAt: now() };
}

export async function getHomeConfig(): Promise<HomePageConfig> {
    const raw = await readDoc<Partial<HomePageConfig>>(HOME_KEY, seedConfig);
    return normalizeConfig(raw);
}

export async function setHomeConfig(config: HomePageConfig): Promise<void> {
    await writeDoc(HOME_KEY, { ...normalizeConfig(config), updatedAt: now() });
}

export async function addHomeOfferId(offerId: string): Promise<void> {
    const config = await getHomeConfig();
    const alreadyPlaced = config.offerItems.some((item) => item.kind === 'offer' && item.offerId === offerId);
    if (alreadyPlaced) return;
    await setHomeConfig({ ...config, offerItems: [{ kind: 'offer', offerId }, ...config.offerItems] });
}

export async function removeHomeOfferIds(offerIds: string[]): Promise<void> {
    if (offerIds.length === 0) return;
    const config = await getHomeConfig();
    const next = config.offerItems.filter(
        (item) => item.kind === 'banner' || !offerIds.includes(item.offerId)
    );
    await setHomeConfig({ ...config, offerItems: next });
}
