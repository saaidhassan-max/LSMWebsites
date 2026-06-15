import type { SitePageSection, SitePageSectionType } from './site-pages.types';

export interface AssetDef {
    type: SitePageSectionType;
    label: string;
    description: string;
}

export const SITE_PAGE_ASSETS: AssetDef[] = [
    { type: 'welcome', label: 'Welcome banner', description: 'Hero-style visual intro section.' },
    { type: 'richText', label: 'Rich text', description: 'Heading and body copy block.' },
    { type: 'terms', label: 'Top terms bar', description: 'Short legal line below the hero.' },
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
    }
}

export function normalizeSection(raw: { id: string; type: SitePageSectionType; content?: unknown }): SitePageSection {
    const fresh = createSection(raw.type);
    if (raw.content === undefined || raw.content === null) {
        return { ...fresh, id: raw.id } as SitePageSection;
    }
    return {
        id: raw.id,
        type: raw.type,
        content: { ...fresh.content, ...(raw.content as object) }
    } as SitePageSection;
}
