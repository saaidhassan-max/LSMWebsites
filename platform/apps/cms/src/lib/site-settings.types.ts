export interface SiteSettingsNavItem {
    emoji: string;
    label: string;
    href: string;
    pageId?: string;
}

export interface SiteSettingsDirectoryItem {
    name: string;
    href?: string;
}

export interface SiteSettings {
    uspText: string;
    howToClaimUspText: string;
    directoryTitle: string;
    directorySites: SiteSettingsDirectoryItem[];
    footerLegalText: string;
    navItems: SiteSettingsNavItem[];
    updatedAt: string;
}
