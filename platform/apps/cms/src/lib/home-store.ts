import type { HomePageConfig } from './home.types';
import type { OffersItem, SitePageSection, WelcomeContent } from './site-pages.types';
import { createSection, normalizeSection } from './site-page-content';
import { listOffers } from './cms-content-store';
import { readDoc, writeDoc } from './cms-storage';

const HOME_KEY = 'home-page';

function now(): string {
    return new Date().toISOString();
}

const DEFAULT_WELCOME: WelcomeContent = {
    textHighlight: 'TOP',
    text: ' BINGO DEALS 2026',
    textSuffix: '',
    features: ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure'],
    imageLeftSrc: '/sfb/welcome-images/image-left.png',
    imageRightSrc: '/sfb/welcome-images/image-right.png',
    imageLeftWidthMobile: 83,
    imageLeftWidthDesktop: 204
};

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

function offersSection(items: OffersItem[]): SitePageSection {
    const base = createSection('offers');
    return { id: base.id, type: 'offers', content: { items } };
}

function welcomeSection(content: WelcomeContent): SitePageSection {
    const base = createSection('welcome');
    return { id: base.id, type: 'welcome', content };
}

interface LegacyHomeConfig {
    sections?: unknown;
    sectionIds?: unknown;
    welcome?: Partial<WelcomeContent>;
    offerItems?: unknown;
    offerIds?: unknown;
    updatedAt?: string;
}

function legacyToSections(raw: LegacyHomeConfig): SitePageSection[] {
    const sectionIds = Array.isArray(raw.sectionIds)
        ? (raw.sectionIds as string[])
        : ['welcome', 'terms', 'offers', 'signup', 'directory'];
    const offerItems = normalizeOfferItems(raw);
    const welcome: WelcomeContent = {
        ...DEFAULT_WELCOME,
        ...(raw.welcome ?? {}),
        features: Array.isArray(raw.welcome?.features) ? raw.welcome.features : DEFAULT_WELCOME.features
    };
    const sections: SitePageSection[] = [];

    for (const id of sectionIds) {
        if (id === 'welcome') sections.push(welcomeSection(welcome));
        else if (id === 'terms') sections.push(createSection('terms'));
        else if (id === 'offers') sections.push(offersSection(offerItems));
    }
    return sections;
}

export function normalizeHomeConfig(raw: LegacyHomeConfig): HomePageConfig {
    return normalizeConfig(raw);
}

function normalizeConfig(raw: LegacyHomeConfig): HomePageConfig {
    const sections = Array.isArray(raw.sections)
        ? (raw.sections as { id: string; type: SitePageSection['type']; content?: unknown }[]).map(
              (section) => normalizeSection(section)
          )
              .filter((section) => section.type !== 'directorySignup')
        : legacyToSections(raw);
    return {
        sections,
        updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now()
    };
}

async function seedConfig(): Promise<HomePageConfig> {
    const offers = await listOffers();
    const items: OffersItem[] = offers
        .filter((offer) => offer.status === 'active')
        .map((offer) => ({ kind: 'offer', offerId: offer.id }));
    return {
        sections: [
            welcomeSection(DEFAULT_WELCOME),
            createSection('terms'),
            offersSection(items)
        ],
        updatedAt: now()
    };
}

export async function getHomeConfig(): Promise<HomePageConfig> {
    const raw = await readDoc<LegacyHomeConfig>(HOME_KEY, seedConfig);
    return normalizeConfig(raw);
}

export async function setHomeConfig(config: HomePageConfig): Promise<void> {
    await writeDoc(HOME_KEY, { ...normalizeConfig(config), updatedAt: now() });
}

function isOffersSection(
    section: SitePageSection
): section is Extract<SitePageSection, { type: 'offers' }> {
    return section.type === 'offers';
}

export async function addHomeOfferId(offerId: string): Promise<void> {
    const config = await getHomeConfig();
    const sections = [...config.sections];
    const index = sections.findIndex(isOffersSection);
    if (index === -1) {
        sections.push(offersSection([{ kind: 'offer', offerId }]));
        await setHomeConfig({ ...config, sections });
        return;
    }
    const section = sections[index] as Extract<SitePageSection, { type: 'offers' }>;
    const alreadyPlaced = section.content.items.some(
        (item) => item.kind === 'offer' && item.offerId === offerId
    );
    if (alreadyPlaced) return;
    sections[index] = {
        id: section.id,
        type: 'offers',
        content: { items: [{ kind: 'offer', offerId }, ...section.content.items] }
    };
    await setHomeConfig({ ...config, sections });
}

export async function removeHomeOfferIds(offerIds: string[]): Promise<void> {
    if (offerIds.length === 0) return;
    const config = await getHomeConfig();
    const sections: SitePageSection[] = config.sections.map((section) => {
        if (!isOffersSection(section)) return section;
        return {
            id: section.id,
            type: 'offers',
            content: {
                items: section.content.items.filter(
                    (item) => item.kind === 'banner' || !offerIds.includes(item.offerId)
                )
            }
        };
    });
    await setHomeConfig({ ...config, sections });
}
