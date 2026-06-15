'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { LandingPage, LandingPageStatus } from '@/lib/landing-pages.types';
import { LandingRowActions } from '@/components/landing-row-actions';

interface LandingPagesManagerProps {
    pages: LandingPage[];
}

interface StatusBadgeProps {
    page: LandingPage;
}

interface StatusFilterButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
}

type StatusFilter = 'all' | LandingPageStatus;

function formatDate(iso: string | null): string {
    if (iso === null) return 'Not published';
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function StatusBadge({ page }: StatusBadgeProps): React.ReactElement {
    if (page.status === 'published') {
        return (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-success-container text-m3-on-success whitespace-nowrap">
                Published
            </span>
        );
    }
    return (
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-surface-highest text-m3-on-surface-variant whitespace-nowrap">
            Draft
        </span>
    );
}

function StatusFilterButton({
    active,
    label,
    onClick
}: StatusFilterButtonProps): React.ReactElement {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={
                'text-[12px] px-3 py-1.5 rounded-md border transition-colors ' +
                (active
                    ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                    : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
            }
        >
            {label}
        </button>
    );
}

export function LandingPagesManager({ pages }: LandingPagesManagerProps): React.ReactElement {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');

    const filteredPages = useMemo(
        () =>
            pages.filter((page) => {
                const matchesStatus = status === 'all' || page.status === status;
                const searchText = (page.name + ' ' + page.slug).toLowerCase();
                const matchesQuery = searchText.includes(query.trim().toLowerCase());
                return matchesStatus && matchesQuery;
            }),
        [pages, query, status]
    );

    return (
        <div className="p-6 flex flex-col gap-4 max-w-[1040px]">
            <div className="flex flex-col gap-3 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-4">
                <div className="flex items-center gap-2 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 focus-within:border-m3-gold">
                    <Search size={15} className="text-m3-on-surface-variant shrink-0" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search landing pages"
                        className="w-full bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                    />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <StatusFilterButton
                            label="All"
                            active={status === 'all'}
                            onClick={() => setStatus('all')}
                        />
                        <StatusFilterButton
                            label="Draft"
                            active={status === 'draft'}
                            onClick={() => setStatus('draft')}
                        />
                        <StatusFilterButton
                            label="Published"
                            active={status === 'published'}
                            onClick={() => setStatus('published')}
                        />
                    </div>
                    <div className="text-[12px] text-m3-on-surface-variant">
                        {filteredPages.length} of {pages.length} pages
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {filteredPages.map((page) => (
                    <div
                        key={page.id}
                        className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest"
                    >
                        <div className="min-w-0 flex flex-col gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="text-[13px] font-medium truncate">{page.name}</div>
                                <StatusBadge page={page} />
                            </div>
                            <div className="text-[12px] text-m3-on-surface-variant truncate">
                                /preview/{page.slug}
                            </div>
                            <div className="grid grid-cols-2 gap-2 max-w-[420px] text-[11px] text-m3-on-surface-variant">
                                <div>
                                    Updated <span className="text-m3-on-surface">{formatDate(page.updatedAt)}</span>
                                </div>
                                <div>
                                    Published{' '}
                                    <span className="text-m3-on-surface">{formatDate(page.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                        <LandingRowActions
                            id={page.id}
                            slug={page.slug}
                            published={page.status === 'published'}
                        />
                    </div>
                ))}
                {filteredPages.length === 0 && (
                    <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-8 text-center">
                        <div className="text-[14px] font-medium">No landing pages found</div>
                        <div className="text-[12px] text-m3-on-surface-variant mt-1">
                            Try a different search or status filter.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
