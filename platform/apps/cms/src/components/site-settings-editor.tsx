'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, Save } from 'lucide-react';
import { saveSiteSettingsAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import type { SiteSettings } from '@/lib/site-settings.types';
import type { SitePage } from '@/lib/site-pages.types';

interface SiteSettingsEditorProps {
    settings: SiteSettings;
    pages: SitePage[];
}

interface NavigationOption {
    emoji: string;
    label: string;
    href: string;
    pageId?: string;
    status?: SitePage['status'];
}

function toDirectoryText(settings: SiteSettings): string {
    return settings.directorySites
        .map((item) => (item.href === undefined ? item.name : item.name + '|' + item.href))
        .join('\n');
}

function directoryFromText(value: string): SiteSettings['directorySites'] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [name, href] = line.split('|').map((part) => part.trim());
            return href === undefined || href === '' ? { name } : { name, href };
        });
}

function fixedNavigationOptions(): NavigationOption[] {
    return [
        { emoji: '🏠', label: 'Home', href: '/' },
        { emoji: '👋', label: 'About Us', href: '/about' },
        { emoji: '✉️', label: 'Contact Us', href: '/contact' },
        { emoji: '🛡️', label: 'Safer Gambling', href: '/safer-gambling' },
        { emoji: '📋', label: 'Landing page demo', href: '/signup' }
    ];
}

function pageNavigationOptions(pages: SitePage[], settings: SiteSettings): NavigationOption[] {
    return pages.map((page) => {
        const href = '/' + page.slug;
        const existing = settings.navItems.find(
            (item) => item.pageId === page.id || item.href === href
        );
        return {
            emoji: existing?.emoji ?? '📄',
            label: page.name,
            href,
            pageId: page.id,
            status: page.status
        };
    });
}

function sameNavigationItem(a: NavigationOption, b: NavigationOption): boolean {
    if (a.pageId !== undefined && b.pageId !== undefined) return a.pageId === b.pageId;
    return a.href === b.href;
}

function buildNavigationOptions(settings: SiteSettings, pages: SitePage[]): NavigationOption[] {
    const available = [...fixedNavigationOptions(), ...pageNavigationOptions(pages, settings)];
    const ordered: NavigationOption[] = [];

    settings.navItems.forEach((item) => {
        const match = available.find(
            (option) =>
                (item.pageId !== undefined && option.pageId === item.pageId) ||
                option.href === item.href
        );
        if (match !== undefined && !ordered.some((option) => sameNavigationItem(option, match))) {
            ordered.push(match);
        }
    });

    available.forEach((item) => {
        if (!ordered.some((option) => sameNavigationItem(option, item))) ordered.push(item);
    });

    return ordered;
}

function toSettingsNavItems(items: NavigationOption[]): SiteSettings['navItems'] {
    return items.map((item) => ({
        emoji: item.emoji,
        label: item.label,
        href: item.href,
        ...(item.pageId === undefined ? {} : { pageId: item.pageId })
    }));
}

export function SiteSettingsEditor({ settings, pages }: SiteSettingsEditorProps): React.ReactElement {
    const [local, setLocal] = useState<SiteSettings>(settings);
    const [directoryText, setDirectoryText] = useState(toDirectoryText(settings));
    const [navigationItems, setNavigationItems] = useState<NavigationOption[]>(
        buildNavigationOptions(settings, pages)
    );
    const [dirty, setDirty] = useState(false);
    const [pending, startTransition] = useTransition();

    function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]): void {
        setLocal((current) => ({ ...current, [key]: value }));
        setDirty(true);
    }

    function updateDirectory(value: string): void {
        setDirectoryText(value);
        update('directorySites', directoryFromText(value));
    }

    function moveNavigationItem(index: number, direction: -1 | 1): void {
        const target = index + direction;
        if (target < 0 || target >= navigationItems.length) return;

        const next = [...navigationItems];
        const current = next[index];
        const replacement = next[target];
        if (current === undefined || replacement === undefined) return;

        next[index] = replacement;
        next[target] = current;
        setNavigationItems(next);
        update('navItems', toSettingsNavItems(next));
    }

    function save(): void {
        startTransition(async () => {
            await saveSiteSettingsAction(local);
            notifyCmsChanged();
            setDirty(false);
        });
    }

    const inputClass =
        'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
    const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';

    return (
        <div className="p-6 max-w-[960px] flex flex-col gap-6">
            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Global page shell</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        These fields feed the shared SFB header, USP strip, directory, and footer.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <label className={labelClass}>
                        Standard USP text
                        <input
                            value={local.uspText}
                            onChange={(e) => update('uspText', e.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        How-to/contact USP text
                        <input
                            value={local.howToClaimUspText}
                            onChange={(e) => update('howToClaimUspText', e.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>
                <label className={labelClass}>
                    Footer legal text
                    <textarea
                        value={local.footerLegalText}
                        onChange={(e) => update('footerLegalText', e.target.value)}
                        rows={7}
                        className={inputClass + ' resize-y leading-5'}
                    />
                </label>
            </section>

            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Navigation</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        Reorder the site navigation here. Page names and URLs are edited on each page.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    {navigationItems.map((item, index) => (
                        <div
                            key={item.pageId ?? item.href}
                            className="flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface px-3 py-2"
                        >
                            <span className="w-7 text-center text-[16px]">{item.emoji}</span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="truncate text-[13px] font-medium text-m3-on-surface">
                                        {item.label}
                                    </span>
                                    {item.status === 'draft' && (
                                        <span className="rounded-full bg-m3-surface-highest px-1.5 py-0.5 text-[10px] text-m3-on-surface-variant">
                                            Draft
                                        </span>
                                    )}
                                    {item.href === '/signup' && (
                                        <span className="rounded-full bg-m3-surface-highest px-1.5 py-0.5 text-[10px] text-m3-on-surface-variant">
                                            Demo
                                        </span>
                                    )}
                                </div>
                                <div className="truncate text-[11px] text-m3-on-surface-variant">
                                    {item.href}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => moveNavigationItem(index, -1)}
                                disabled={index === 0}
                                aria-label={'Move ' + item.label + ' up'}
                                className="h-8 w-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                            >
                                <ArrowUp size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveNavigationItem(index, 1)}
                                disabled={index === navigationItems.length - 1}
                                aria-label={'Move ' + item.label + ' down'}
                                className="h-8 w-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                            >
                                <ArrowDown size={15} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Website directory</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        Use brand name only, or brand name | URL when a directory item should link out.
                    </p>
                </div>
                <label className={labelClass}>
                    Directory title
                    <input
                        value={local.directoryTitle}
                        onChange={(e) => update('directoryTitle', e.target.value)}
                        className={inputClass}
                    />
                </label>
                <textarea
                    value={directoryText}
                    onChange={(e) => updateDirectory(e.target.value)}
                    rows={12}
                    className={inputClass + ' resize-y leading-5 font-mono'}
                />
            </section>

            <div className="sticky bottom-0 py-4 bg-m3-surface">
                <button
                    type="button"
                    onClick={save}
                    disabled={pending || !dirty}
                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                >
                    <Save size={15} />
                    {pending ? 'Saving...' : 'Save settings'}
                </button>
            </div>
        </div>
    );
}
