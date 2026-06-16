'use client';

import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Globe, Home, Info, LayoutGrid, LogOut, Mail, Megaphone, Plus, Settings, Tags } from 'lucide-react';
import { createSupabaseBrowserClient, isBrowserSupabaseConfigured } from '@/lib/supabase-browser';
import type { SitePage } from '@/lib/site-pages.types';

interface CmsSidebarProps {
    active: 'home' | 'landing-pages' | 'operators' | 'offers' | 'site-page' | 'settings';
    activePageId?: string;
}

interface NavItemProps {
    href?: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    meta?: string;
}

interface SitePagesResponse {
    pages: SitePage[];
}

interface CreateSitePageResponse {
    id: string;
}

function NavItem({ href, icon, label, active = false, meta }: NavItemProps): React.ReactElement {
    const className =
        'flex items-center gap-2.5 text-[13px] px-2 py-1.5 rounded-lg ' +
        (active
            ? 'bg-m3-gold/20 text-m3-on-surface font-medium'
            : 'text-m3-on-surface-variant hover:bg-m3-surface-high');

    const content = (
        <>
            <span className="text-current shrink-0">{icon}</span>
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {meta !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-m3-surface-highest text-m3-on-surface-variant">
                    {meta}
                </span>
            )}
        </>
    );

    if (href === undefined) {
        return <div className={className}>{content}</div>;
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}

export function CmsSidebar({ active, activePageId }: CmsSidebarProps): React.ReactElement {
    const router = useRouter();
    const [pages, setPages] = useState<SitePage[]>([]);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function loadPages(): Promise<void> {
            const res = await fetch('/api/site-pages', { cache: 'no-store' });
            const data = (await res.json()) as SitePagesResponse;
            if (mounted) setPages(data.pages);
        }
        void loadPages();
        return () => {
            mounted = false;
        };
    }, []);

    async function createPage(): Promise<void> {
        setCreating(true);
        try {
            const res = await fetch('/api/site-pages', { method: 'POST' });
            const data = (await res.json()) as CreateSitePageResponse;
            router.push('/pages/edit/' + data.id);
        } finally {
            setCreating(false);
        }
    }

    async function signOut(): Promise<void> {
        if (isBrowserSupabaseConfigured()) {
            const supabase = createSupabaseBrowserClient();
            await supabase.auth.signOut();
        }
        router.push('/login');
        router.refresh();
    }

    return (
        <aside className="w-[180px] shrink-0 border-r border-m3-outline-variant bg-m3-surface-low p-3 flex flex-col">
            <div className="min-h-0 flex-1">
                <div className="flex items-center gap-2 text-[13px] font-medium px-1.5 pb-3">
                    <Globe size={16} />
                    Super Free Bingo
                </div>
                <div className="flex items-center justify-between px-1.5 pb-1.5">
                    <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                        Pages
                    </div>
                    <button
                        type="button"
                        onClick={createPage}
                        disabled={creating}
                        aria-label="Create page"
                        className="w-6 h-6 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high hover:text-m3-on-surface disabled:opacity-40"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                <NavItem
                    href="/home"
                    icon={<Home size={15} />}
                    label="Home"
                    active={active === 'home'}
                />
                <NavItem icon={<Info size={15} />} label="About us" />
                <NavItem icon={<Mail size={15} />} label="Contact us" />
                {pages.length > 0 && (
                    <div className="flex flex-col gap-0.5 pt-1">
                        {pages.map((page) => (
                            <NavItem
                                key={page.id}
                                href={'/pages/edit/' + page.id}
                                icon={<LayoutGrid size={15} />}
                                label={page.name}
                                active={active === 'site-page' && activePageId === page.id}
                                meta={page.status === 'draft' ? 'Draft' : undefined}
                            />
                        ))}
                    </div>
                )}
                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant px-1.5 pt-4 pb-1.5">
                    Landing pages
                </div>
                <NavItem
                    href="/"
                    icon={<Megaphone size={15} />}
                    label="All landing pages"
                    active={active === 'landing-pages'}
                />
                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant px-1.5 pt-4 pb-1.5">
                    Collections
                </div>
                <NavItem
                    href="/operators"
                    icon={<Gift size={15} />}
                    label="Operators"
                    active={active === 'operators'}
                />
                <NavItem
                    href="/offers"
                    icon={<Tags size={15} />}
                    label="Offers"
                    active={active === 'offers'}
                />
                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant px-1.5 pt-4 pb-1.5">
                    Settings
                </div>
                <NavItem
                    href="/settings"
                    icon={<Settings size={15} />}
                    label="Site settings"
                    active={active === 'settings'}
                />
            </div>
            <button
                type="button"
                onClick={signOut}
                className="mt-3 flex items-center gap-2.5 text-[13px] px-2 py-1.5 rounded-lg text-m3-on-surface-variant hover:bg-m3-surface-high"
            >
                <LogOut size={15} />
                Sign out
            </button>
        </aside>
    );
}
