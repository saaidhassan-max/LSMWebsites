import type { OffersItem, SitePageSection, SitePageSectionType } from './site-pages.types';

export const DEFAULT_BANNER_MOBILE = '/sfb/banners/operator-banner-mobile.jpg';
export const DEFAULT_BANNER_DESKTOP = '/sfb/banners/operator-banner-desktop.jpg';

export function createBannerItem(): OffersItem {
    return {
        kind: 'banner',
        mobileSrc: DEFAULT_BANNER_MOBILE,
        desktopSrc: DEFAULT_BANNER_DESKTOP,
        href: ''
    };
}

function normalizeOffersItems(content: unknown): OffersItem[] {
    const raw = (content ?? {}) as { items?: unknown; offerIds?: unknown };
    if (Array.isArray(raw.items)) {
        return raw.items
            .map((item): OffersItem | null => {
                const entry = item as Partial<OffersItem> & { offerId?: string };
                if (entry.kind === 'banner') {
                    return {
                        kind: 'banner',
                        mobileSrc: typeof entry.mobileSrc === 'string' ? entry.mobileSrc : DEFAULT_BANNER_MOBILE,
                        desktopSrc:
                            typeof entry.desktopSrc === 'string' ? entry.desktopSrc : DEFAULT_BANNER_DESKTOP,
                        href: typeof entry.href === 'string' ? entry.href : ''
                    };
                }
                if (typeof entry.offerId === 'string') return { kind: 'offer', offerId: entry.offerId };
                return null;
            })
            .filter((item): item is OffersItem => item !== null);
    }
    if (Array.isArray(raw.offerIds)) {
        return raw.offerIds
            .filter((id): id is string => typeof id === 'string')
            .map((id) => ({ kind: 'offer', offerId: id }));
    }
    return [];
}

export interface AssetDef {
    type: SitePageSectionType;
    label: string;
    description: string;
}

export const SITE_PAGE_ASSETS: AssetDef[] = [
    { type: 'welcome', label: 'Welcome banner', description: 'Hero-style visual intro section.' },
    { type: 'richText', label: 'Rich text', description: 'Heading and body copy block.' },
    { type: 'terms', label: 'Top terms bar', description: 'Short legal line below the hero.' },
    { type: 'offers', label: 'Offers collection', description: 'A stack of selected offer cards.' },
    { type: 'signup', label: 'Signup form', description: 'Lead capture form with consent.' },
    { type: 'directory', label: 'Website directory', description: 'Directory links block.' }
];

export function sectionTypeLabel(type: SitePageSectionType): string {
    const found = SITE_PAGE_ASSETS.find((asset) => asset.type === type);
    return found === undefined ? type : found.label;
}

function makeSectionId(type: SitePageSectionType): string {
    return type + '_' + Math.random().toString(36).slice(2, 8);
}

export function createSection(type: SitePageSectionType): SitePageSection {
    const id = makeSectionId(type);
    switch (type) {
        case 'welcome':
            return {
                id,
                type,
                content: {
                    textHighlight: 'TOP',
                    text: ' BINGO DEALS 2026',
                    textSuffix: '',
                    features: ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure'],
                    imageLeftSrc: '/sfb/welcome-images/image-left.png',
                    imageRightSrc: '/sfb/welcome-images/image-right.png'
                }
            };
        case 'terms':
            return {
                id,
                type,
                content: {
                    text: 'Special terms apply – including age verification. Click "How To Claim" for full details.'
                }
            };
        case 'richText':
            return {
                id,
                type,
                content: { heading: 'Section heading', body: 'Write your content here.' }
            };
        case 'signup':
            return { id, type, content: { heading: 'Sign up for the latest offers' } };
        case 'directory':
            return { id, type, content: { title: 'Super Free Bingo Directory' } };
        case 'offers':
            return { id, type, content: { items: [] } };
    }
}

export function normalizeSection(raw: { id: string; type: SitePageSectionType; content?: unknown }): SitePageSection {
    const fresh = createSection(raw.type);
    if (raw.type === 'offers') {
        return { id: raw.id, type: 'offers', content: { items: normalizeOffersItems(raw.content) } };
    }
    if (raw.content === undefined || raw.content === null) {
        return { ...fresh, id: raw.id } as SitePageSection;
    }
    return {
        id: raw.id,
        type: raw.type,
        content: { ...fresh.content, ...(raw.content as object) }
    } as SitePageSection;
}
