import type { SiteSettings, SiteSettingsDirectoryItem, SiteSettingsNavItem } from './site-settings.types';
import { readDoc, writeDoc } from './cms-storage';

const SETTINGS_KEY = 'site-settings';

const DEFAULT_NAV_ITEMS: SiteSettingsNavItem[] = [
    { emoji: '🏠', label: 'Home', href: '/' },
    { emoji: '👋', label: 'About Us', href: '/about' },
    { emoji: '✉️', label: 'Contact Us', href: '/contact' },
    { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
    { emoji: '📋', label: 'Sign Up', href: '/signup' }
];

const DEFAULT_DIRECTORY_SITES: SiteSettingsDirectoryItem[] = [
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

function now(): string {
    return new Date().toISOString();
}

function normalizeNavItems(items: SiteSettingsNavItem[] | undefined): SiteSettingsNavItem[] {
    if (!Array.isArray(items)) return DEFAULT_NAV_ITEMS;
    const next = items.filter((item) => item.label.trim() !== '' && item.href.trim() !== '');
    return next.length > 0 ? next : DEFAULT_NAV_ITEMS;
}

function normalizeDirectorySites(
    items: SiteSettingsDirectoryItem[] | undefined
): SiteSettingsDirectoryItem[] {
    if (!Array.isArray(items)) return DEFAULT_DIRECTORY_SITES;
    const next = items.filter((item) => item.name.trim() !== '');
    return next.length > 0 ? next : DEFAULT_DIRECTORY_SITES;
}

function normalizeSettings(value: Partial<SiteSettings>): SiteSettings {
    return {
        uspText:
            typeof value.uspText === 'string' && value.uspText.trim() !== ''
                ? value.uspText
                : 'OVER 150,000 OFFERS CLAIMED',
        howToClaimUspText:
            typeof value.howToClaimUspText === 'string' && value.howToClaimUspText.trim() !== ''
                ? value.howToClaimUspText
                : 'OVER 5,000,000 SUBSCRIBERS',
        directoryTitle:
            typeof value.directoryTitle === 'string' && value.directoryTitle.trim() !== ''
                ? value.directoryTitle
                : 'Super Free Bingo Directory',
        directorySites: normalizeDirectorySites(value.directorySites),
        footerLegalText:
            typeof value.footerLegalText === 'string' && value.footerLegalText.trim() !== ''
                ? value.footerLegalText
                : DEFAULT_FOOTER_LEGAL_TEXT,
        navItems: normalizeNavItems(value.navItems),
        updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : now()
    };
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const raw = await readDoc<Partial<SiteSettings>>(SETTINGS_KEY, () => normalizeSettings({}));
    return normalizeSettings(raw);
}

export async function setSiteSettings(settings: SiteSettings): Promise<void> {
    await writeDoc(SETTINGS_KEY, { ...normalizeSettings(settings), updatedAt: now() });
}
