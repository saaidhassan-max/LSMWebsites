import type { HomePageConfig, HomeWelcomeContent } from './home.types';
import { listOffers } from './cms-content-store';
import { readDoc, writeDoc } from './cms-storage';

const HOME_KEY = 'home-page';

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
    return {
        offerIds: Array.isArray(value.offerIds) ? value.offerIds : [],
        welcome: normalizeWelcome(value.welcome),
        updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : now()
    };
}

async function seedConfig(): Promise<HomePageConfig> {
    const offers = await listOffers();
    const offerIds = offers.filter((offer) => offer.status === 'active').map((offer) => offer.id);
    return { offerIds, welcome: DEFAULT_WELCOME, updatedAt: now() };
}

export async function getHomeConfig(): Promise<HomePageConfig> {
    const raw = await readDoc<Partial<HomePageConfig>>(HOME_KEY, seedConfig);
    return normalizeConfig(raw);
}

export async function setHomeOfferIds(offerIds: string[]): Promise<void> {
    const current = await getHomeConfig();
    await setHomeConfig({ ...current, offerIds });
}

export async function setHomeConfig(config: HomePageConfig): Promise<void> {
    await writeDoc(HOME_KEY, { ...normalizeConfig(config), updatedAt: now() });
}

export async function removeHomeOfferIds(offerIds: string[]): Promise<void> {
    if (offerIds.length === 0) return;
    const config = await getHomeConfig();
    const next = config.offerIds.filter((id) => !offerIds.includes(id));
    await setHomeOfferIds(next);
}
