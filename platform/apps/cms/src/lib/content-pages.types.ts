export type ContentPageKey = 'about' | 'privacy' | 'terms' | 'disclaimer';

export interface ContentPage {
    key: ContentPageKey;
    title: string;
    subtitle: string;
    bodyHtml: string;
    updatedAt: string;
}

export type ContentPagesDoc = Record<ContentPageKey, ContentPage>;

export interface ContentPagePatch {
    title: string;
    subtitle: string;
    bodyHtml: string;
}

export const CONTENT_PAGE_KEYS: ContentPageKey[] = ['about', 'privacy', 'terms', 'disclaimer'];
