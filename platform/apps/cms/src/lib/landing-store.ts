import type { LandingPage, LandingPageContent, LandingPageDetails } from './landing-pages.types';
import { readDoc, writeDoc } from './cms-storage';

const LANDING_KEY = 'landing-pages';

const DEFAULT_CONTENT: LandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '500 Free Tickets',
    heroSubline: 'No Deposit & No Wagering',
    instructionText: 'Sign up to claim this offer and get the latest deals straight to your inbox.',
    backgroundImage: '/sfb/LandingPage/landingpage-background.png',
    legalDisclaimer:
        '18+. New customers only. T&Cs apply. Please gamble responsibly. BeGambleAware.org.'
};

function now(): string {
    return new Date().toISOString();
}

function makeId(): string {
    return 'lp_' + Math.random().toString(36).slice(2, 10);
}

function seed(): LandingPage[] {
    return [
        {
            id: makeId(),
            name: '500 Free Tickets — June',
            slug: '500-free-tickets-june',
            status: 'published',
            publishedAt: '2026-06-08T09:00:00.000Z',
            updatedAt: '2026-06-08T09:00:00.000Z',
            content: { ...DEFAULT_CONTENT }
        },
        {
            id: makeId(),
            name: 'Welcome Bonus — Spring',
            slug: 'welcome-bonus-spring',
            status: 'published',
            publishedAt: '2026-05-02T09:00:00.000Z',
            updatedAt: '2026-05-02T09:00:00.000Z',
            content: {
                ...DEFAULT_CONTENT,
                heroHeadline: '£20 Welcome Bonus',
                heroSubline: 'On Your First Deposit'
            }
        }
    ];
}

async function readAll(): Promise<LandingPage[]> {
    return readDoc<LandingPage[]>(LANDING_KEY, seed);
}

async function writeAll(pages: LandingPage[]): Promise<void> {
    await writeDoc(LANDING_KEY, pages);
}

export async function listLandingPages(): Promise<LandingPage[]> {
    const pages = await readAll();
    return [...pages].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getLandingPage(id: string): Promise<LandingPage | undefined> {
    const pages = await readAll();
    return pages.find((p) => p.id === id);
}

export async function getPublishedBySlug(slug: string): Promise<LandingPage | undefined> {
    const pages = await readAll();
    return pages.find((p) => p.slug === slug && p.status === 'published');
}

export async function updateLandingContent(id: string, content: LandingPageContent): Promise<void> {
    const pages = await readAll();
    const next = pages.map((p) =>
        p.id === id ? { ...p, content, updatedAt: now() } : p
    );
    await writeAll(next);
}

export async function updateLandingDetails(id: string, details: LandingPageDetails): Promise<void> {
    const pages = await readAll();
    const next = pages.map((p) =>
        p.id === id ? { ...p, ...details, updatedAt: now() } : p
    );
    await writeAll(next);
}

export async function duplicateLandingPage(id: string): Promise<string> {
    const pages = await readAll();
    const source = pages.find((p) => p.id === id);
    if (source === undefined) return id;
    const copy: LandingPage = {
        ...source,
        id: makeId(),
        name: 'Copy of ' + source.name,
        slug: source.slug + '-copy-' + Math.random().toString(36).slice(2, 6),
        status: 'draft',
        publishedAt: null,
        updatedAt: now(),
        content: { ...source.content }
    };
    await writeAll([copy, ...pages]);
    return copy.id;
}

export async function createLandingPage(): Promise<string> {
    const pages = await readAll();
    const stamp = Math.random().toString(36).slice(2, 6);
    const page: LandingPage = {
        id: makeId(),
        name: 'Untitled landing page',
        slug: 'untitled-' + stamp,
        status: 'draft',
        publishedAt: null,
        updatedAt: now(),
        content: { ...DEFAULT_CONTENT }
    };
    await writeAll([page, ...pages]);
    return page.id;
}

export async function setPublished(id: string, published: boolean): Promise<void> {
    const pages = await readAll();
    const next = pages.map((p) =>
        p.id === id
            ? {
                  ...p,
                  status: published ? ('published' as const) : ('draft' as const),
                  publishedAt: published ? now() : null,
                  updatedAt: now()
              }
            : p
    );
    await writeAll(next);
}

export async function deleteLandingPage(id: string): Promise<void> {
    const pages = await readAll();
    await writeAll(pages.filter((p) => p.id !== id));
}
