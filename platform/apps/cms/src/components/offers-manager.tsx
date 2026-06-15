'use client';

import type React from 'react';
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil, Search, Trash2 } from 'lucide-react';
import { deleteOfferAction, setOfferStatusAction } from '@/app/actions';
import type { CmsOffer, CmsOperator, CmsRecordStatus } from '@/lib/cms-content.types';

interface OffersManagerProps {
    offers: CmsOffer[];
    operators: CmsOperator[];
}

type StatusFilter = 'all' | CmsRecordStatus;

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function OffersManager({ offers, operators }: OffersManagerProps): React.ReactElement {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [pending, startTransition] = useTransition();

    const operatorById = useMemo(
        () => new Map(operators.map((operator) => [operator.id, operator])),
        [operators]
    );

    const filteredOffers = useMemo(
        () =>
            offers.filter((offer) => {
                const operator = operatorById.get(offer.operatorId);
                const matchesStatus = status === 'all' || offer.status === status;
                const searchText = (
                    offer.headline +
                    ' ' +
                    offer.label +
                    ' ' +
                    offer.details.join(' ') +
                    ' ' +
                    (operator?.name ?? '')
                ).toLowerCase();
                const matchesQuery = searchText.includes(query.trim().toLowerCase());
                return matchesStatus && matchesQuery;
            }),
        [offers, operatorById, query, status]
    );

    function setStatusForOffer(id: string, nextStatus: CmsRecordStatus): void {
        startTransition(() => setOfferStatusAction(id, nextStatus));
    }

    function removeOffer(id: string, headline: string): void {
        if (!window.confirm('Delete the offer "' + headline + '"? This cannot be undone.')) return;
        startTransition(() => deleteOfferAction(id));
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-[1120px]">
            <div className="flex flex-col gap-3 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-4">
                <div className="flex items-center gap-2 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 focus-within:border-m3-gold">
                    <Search size={15} className="text-m3-on-surface-variant shrink-0" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search offers"
                        className="w-full bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                    />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {(['all', 'active', 'hidden'] as StatusFilter[]).map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatus(filter)}
                                aria-pressed={status === filter}
                                className={
                                    'text-[12px] px-3 py-1.5 rounded-md border capitalize transition-colors ' +
                                    (status === filter
                                        ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                        : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                                }
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="text-[12px] text-m3-on-surface-variant">
                        {filteredOffers.length} of {offers.length} offers
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {filteredOffers.map((offer) => {
                    const operator = operatorById.get(offer.operatorId);
                    return (
                        <div
                            key={offer.id}
                            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-4 py-3 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest"
                        >
                            <div className="min-w-0 flex flex-col gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="text-[13px] font-medium truncate">{offer.headline}</div>
                                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-surface-highest text-m3-on-surface-variant capitalize">
                                        {offer.status}
                                    </span>
                                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-gold/20 text-m3-on-surface">
                                        {offer.label}
                                    </span>
                                </div>
                                <div className="text-[12px] text-m3-on-surface-variant">
                                    Operator <span className="text-m3-on-surface">{operator?.name ?? 'Missing'}</span>
                                </div>
                                <div className="text-[12px] text-m3-on-surface-variant">
                                    Details <span className="text-m3-on-surface">{offer.details.join(' / ')}</span>
                                </div>
                                <div className="text-[11px] text-m3-on-surface-variant">
                                    Updated <span className="text-m3-on-surface">{formatDate(offer.updatedAt)}</span>
                                </div>
                                <div className="text-[12px] text-m3-on-surface-variant line-clamp-2">
                                    {offer.termsText}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => router.push('/offers/edit/' + offer.id)}
                                    className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium bg-m3-gold text-m3-on-gold hover:brightness-95 transition-colors"
                                >
                                    <Pencil size={15} />
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    disabled={pending}
                                    onClick={() =>
                                        setStatusForOffer(
                                            offer.id,
                                            offer.status === 'active' ? 'hidden' : 'active'
                                        )
                                    }
                                    className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high transition-colors disabled:opacity-40"
                                >
                                    {offer.status === 'active' ? <EyeOff size={15} /> : <Eye size={15} />}
                                    {offer.status === 'active' ? 'Hide' : 'Show'}
                                </button>
                                <button
                                    type="button"
                                    disabled={pending}
                                    onClick={() => removeOffer(offer.id, offer.headline)}
                                    aria-label="Delete offer"
                                    className="flex items-center justify-center h-8 w-8 rounded-md text-m3-error hover:bg-m3-error-container transition-colors disabled:opacity-40"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
