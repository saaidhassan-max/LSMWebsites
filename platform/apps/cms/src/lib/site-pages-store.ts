import type { SitePage, SitePageDetails, SitePageSection } from './site-pages.types';
import { normalizeSection } from './site-page-content';
import { readDoc, writeDoc } from './cms-storage';

const SITE_PAGES_KEY = 'site-pages';

function normalizePage(page: SitePage): SitePage {
    return {
        ...page,
        sections: (page.sections ?? []).map((section) =>
            normalizeSection(section as { id: string; type: SitePageSection['type']; content?: unknown })
        )
    };
}

function now(): string {
    return new Date().toISOString();
}

function makeId(prefix: string): string {
    return prefix + '_' + Math.random().toString(36).slice(2, 10);
}

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function readAll(): Promise<SitePage[]> {
    return readDoc<SitePage[]>(SITE_PAGES_KEY, () => []);
}

async function writeAll(pages: SitePage[]): Promise<void> {
    await writeDoc(SITE_PAGES_KEY, pages);
}

export async function createSitePage(): Promise<string> {
    const pages = await readAll();
    const id = makeId('page');
    const page: SitePage = {
        id,
        name: 'Untitled page',
        slug: 'untitled-' + id.slice(-4),
        status: 'draft',
        publishedAt: null,
        updatedAt: now(),
        sections: []
    };
    await writeAll([page, ...pages]);
    return id;
}

export async function listSitePages(): Promise<SitePage[]> {
    const pages = await readAll();
    return [...pages].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getSitePage(id: string): Promise<SitePage | undefined> {
    const pages = await readAll();
    const page = pages.find((item) => item.id === id);
    return page === undefined ? undefined : normalizePage(page);
}

export async function updateSitePage(
    id: string,
    details: SitePageDetails,
    sections: SitePageSection[]
): Promise<void> {
    const pages = await readAll();
    const next = pages.map((page) =>
        page.id === id
            ? {
                  ...page,
                  name: details.name.trim() || page.name,
                  slug: toSlug(details.slug) || page.slug,
                  sections,
                  updatedAt: now()
              }
            : page
    );
    await writeAll(next);
}

export async function setSitePagePublished(id: string, published: boolean): Promise<void> {
    const pages = await readAll();
    const next = pages.map((page) =>
        page.id === id
            ? {
                  ...page,
                  status: published ? ('published' as const) : ('draft' as const),
                  publishedAt: published ? now() : null,
                  updatedAt: now()
              }
            : page
    );
    await writeAll(next);
}
