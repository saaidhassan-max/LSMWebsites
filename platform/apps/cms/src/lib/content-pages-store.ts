import { readDoc, writeDoc } from './cms-storage';
import { seedContentPages } from './content-pages-seed';
import { CONTENT_PAGE_KEYS } from './content-pages.types';
import type {
    ContentPage,
    ContentPageKey,
    ContentPagePatch,
    ContentPagesDoc
} from './content-pages.types';

const CONTENT_PAGES_KEY = 'content-pages';

function now(): string {
    return new Date().toISOString();
}

function normalizePage(
    key: ContentPageKey,
    value: Partial<ContentPage> | undefined,
    seed: ContentPage
): ContentPage {
    return {
        key,
        title: typeof value?.title === 'string' && value.title.trim() !== '' ? value.title : seed.title,
        subtitle: typeof value?.subtitle === 'string' ? value.subtitle : seed.subtitle,
        bodyHtml: typeof value?.bodyHtml === 'string' ? value.bodyHtml : seed.bodyHtml,
        updatedAt: typeof value?.updatedAt === 'string' ? value.updatedAt : seed.updatedAt
    };
}

function normalizeDoc(value: Partial<ContentPagesDoc> | undefined): ContentPagesDoc {
    const seed = seedContentPages();
    const result = {} as ContentPagesDoc;
    for (const key of CONTENT_PAGE_KEYS) {
        result[key] = normalizePage(key, value?.[key], seed[key]);
    }
    return result;
}

export async function getContentPages(): Promise<ContentPagesDoc> {
    const raw = await readDoc<Partial<ContentPagesDoc>>(CONTENT_PAGES_KEY, seedContentPages);
    return normalizeDoc(raw);
}

export async function getContentPage(key: ContentPageKey): Promise<ContentPage> {
    const pages = await getContentPages();
    return pages[key];
}

export async function setContentPage(key: ContentPageKey, patch: ContentPagePatch): Promise<void> {
    const pages = await getContentPages();
    pages[key] = {
        key,
        title: patch.title,
        subtitle: patch.subtitle,
        bodyHtml: patch.bodyHtml,
        updatedAt: now()
    };
    await writeDoc(CONTENT_PAGES_KEY, pages);
}
