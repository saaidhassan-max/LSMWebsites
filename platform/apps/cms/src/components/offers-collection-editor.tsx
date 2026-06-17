'use client';

import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    ArrowUpDown,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    ExternalLink,
    ImagePlus,
    Plus,
    Save,
    Search,
    Trash2,
    Upload
} from 'lucide-react';
import { createBannerItem } from '@/lib/site-page-content';
import { OfferCardFields } from '@/components/offer-card-fields';
import type { OffersItem } from '@/lib/site-pages.types';
import type { CmsLabelColor, CmsOffer, CmsOperator } from '@/lib/cms-content.types';

const labelColorClass: Record<CmsLabelColor, string> = {
    blue: 'bg-m3-primary',
    red: 'bg-red-500',
    orange: 'bg-orange-400'
};

interface OffersCollectionEditorProps {
    items: OffersItem[];
    offers: CmsOffer[];
    operators: CmsOperator[];
    onChange: (items: OffersItem[]) => void;
    onOfferChange: (offerId: string, patch: Partial<CmsOffer>) => void;
    onSaveOffer: (offerId: string) => Promise<void>;
    editOfferHref: (offerId: string) => string;
}

export function OffersCollectionEditor({
    items,
    offers,
    operators,
    onChange,
    onOfferChange,
    onSaveOffer,
    editOfferHref
}: OffersCollectionEditorProps): React.ReactElement {
    const [reorder, setReorder] = useState(false);
    const [query, setQuery] = useState('');
    const [uploading, setUploading] = useState(false);
    const [detailIndex, setDetailIndex] = useState<number | null>(null);
    const [savingOffer, startSaveOffer] = useTransition();
    const [offerSaved, setOfferSaved] = useState(false);
    const uploadTarget = useRef<{ index: number; field: 'mobileSrc' | 'desktopSrc' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const operatorsById = new Map(operators.map((operator) => [operator.id, operator]));

    function operatorName(offer: CmsOffer): string {
        return operatorsById.get(offer.operatorId)?.name ?? 'Missing operator';
    }

    function addOffer(offerId: string): void {
        onChange([...items, { kind: 'offer', offerId }]);
    }

    function addBanner(): void {
        onChange([...items, createBannerItem()]);
    }

    function removeAt(index: number): void {
        onChange(items.filter((_, i) => i !== index));
        if (detailIndex === index) setDetailIndex(null);
    }

    function move(index: number, delta: number): void {
        const target = index + delta;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    }

    function updateBanner(
        index: number,
        patch: Partial<{ mobileSrc: string; desktopSrc: string; href: string }>
    ): void {
        onChange(items.map((item, i) => (i === index && item.kind === 'banner' ? { ...item, ...patch } : item)));
    }

    function triggerBannerUpload(index: number, field: 'mobileSrc' | 'desktopSrc'): void {
        uploadTarget.current = { index, field };
        fileInputRef.current?.click();
    }

    async function onPickImage(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.target.files?.[0];
        const target = uploadTarget.current;
        if (file === undefined || target === null) return;
        setUploading(true);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = (await res.json()) as { path?: string };
            if (data.path !== undefined) updateBanner(target.index, { [target.field]: data.path });
        } finally {
            setUploading(false);
            uploadTarget.current = null;
            if (fileInputRef.current !== null) fileInputRef.current.value = '';
        }
    }

    function saveOffer(offerId: string): void {
        startSaveOffer(async () => {
            await onSaveOffer(offerId);
            setOfferSaved(true);
        });
    }

    const inputClass =
        'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';

    if (detailIndex !== null && items[detailIndex] !== undefined) {
        const item = items[detailIndex];
        const backButton = (
            <button
                type="button"
                onClick={() => setDetailIndex(null)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-m3-on-surface-variant hover:text-m3-on-surface"
            >
                <ArrowLeft size={14} />
                Back to collection
            </button>
        );

        if (item.kind === 'offer') {
            const offer = offers.find((o) => o.id === item.offerId);
            if (offer === undefined) {
                return (
                    <div className="flex flex-col gap-3">
                        {backButton}
                        <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                            This offer was removed from the collection.
                        </div>
                    </div>
                );
            }
            return (
                <div className="flex flex-col gap-4">
                    {backButton}
                    <div>
                        <div className="text-[18px] font-medium">Offer card</div>
                        <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                            {operatorName(offer)} · edits apply everywhere this offer appears.
                        </div>
                    </div>
                    <OfferCardFields
                        offer={offer}
                        onChange={(patch) => {
                            onOfferChange(offer.id, patch);
                            setOfferSaved(false);
                        }}
                    />
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={() => saveOffer(offer.id)}
                            disabled={savingOffer}
                            className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-3.5 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                        >
                            <Save size={15} />
                            {savingOffer ? 'Saving offer…' : offerSaved ? 'Offer saved' : 'Save offer'}
                        </button>
                        <Link
                            href={editOfferHref(offer.id)}
                            className="flex items-center justify-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high"
                        >
                            <ExternalLink size={14} />
                            Open full editor (logo, operator, how-to-claim page)
                        </Link>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-4">
                {backButton}
                <div>
                    <div className="text-[18px] font-medium">Operator banner</div>
                    <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                        Full-width image placed between offer cards.
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {(['mobileSrc', 'desktopSrc'] as const).map((field) => (
                        <div key={field} className="flex flex-col gap-1.5">
                            <span className="text-[12px] font-medium">
                                {field === 'mobileSrc' ? 'Mobile image' : 'Desktop image'}
                            </span>
                            <div className="h-16 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                <img src={item[field]} alt="" className="max-w-full max-h-full object-contain" />
                            </div>
                            <button
                                type="button"
                                onClick={() => triggerBannerUpload(detailIndex, field)}
                                disabled={uploading}
                                className="flex items-center justify-center gap-1.5 text-[12px] px-2 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                            >
                                <Upload size={13} />
                                {uploading ? 'Uploading…' : 'Upload'}
                            </button>
                        </div>
                    ))}
                </div>
                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                    Link (optional)
                    <input
                        value={item.href}
                        onChange={(e) => updateBanner(detailIndex, { href: e.target.value })}
                        placeholder="https://…"
                        className={inputClass}
                    />
                </label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onPickImage}
                    className="hidden"
                />
            </div>
        );
    }

    const lowerQuery = query.trim().toLowerCase();
    const filteredOffers =
        lowerQuery === ''
            ? offers
            : offers.filter(
                  (offer) =>
                      offer.headline.toLowerCase().includes(lowerQuery) ||
                      operatorName(offer).toLowerCase().includes(lowerQuery) ||
                      offer.label.toLowerCase().includes(lowerQuery)
              );

    return (
        <div className="flex flex-col gap-3">
            <div className="text-[12px] text-m3-on-surface-variant">
                Select a card to edit it, reorder the feed, or add offer cards and operator banners.
            </div>
            {items.length > 0 && (
                <div className="flex flex-col gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[12px] font-medium">Items in this collection</div>
                            <div className="text-[11px] text-m3-on-surface-variant">
                                {items.length} item{items.length === 1 ? '' : 's'} placed
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setReorder((value) => !value)}
                            disabled={items.length < 2}
                            className={
                                'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md border transition-colors disabled:opacity-40 ' +
                                (reorder
                                    ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                    : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                            }
                        >
                            <ArrowUpDown size={14} />
                            {reorder ? 'Done' : 'Reorder'}
                        </button>
                    </div>
                    {items.map((item, index) => {
                        const offer =
                            item.kind === 'offer' ? offers.find((o) => o.id === item.offerId) : undefined;
                        return (
                            <div
                                key={index}
                                onClick={() => !reorder && setDetailIndex(index)}
                                className={
                                    'flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest px-3 py-2 ' +
                                    (reorder ? '' : 'cursor-pointer hover:bg-m3-surface-high')
                                }
                            >
                                <span className="w-5 shrink-0 text-center text-[12px] text-m3-on-surface-variant">
                                    {index + 1}
                                </span>
                                {item.kind === 'banner' ? (
                                    <>
                                        <ImagePlus size={16} className="shrink-0 text-m3-on-surface-variant" />
                                        <span className="min-w-0 flex-1 text-[12px] font-medium truncate">
                                            Operator banner
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className={
                                                'shrink-0 w-2 h-8 rounded-sm ' +
                                                (offer === undefined
                                                    ? 'bg-m3-surface-highest'
                                                    : labelColorClass[offer.labelColor] ?? 'bg-m3-surface-highest')
                                            }
                                        />
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-[12px] font-medium truncate">
                                                {offer?.headline ?? 'Offer removed'}
                                            </span>
                                            <span className="block text-[11px] text-m3-on-surface-variant truncate">
                                                {offer === undefined ? '—' : operatorName(offer)}
                                            </span>
                                        </span>
                                    </>
                                )}
                                {reorder ? (
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            aria-label="Move item up"
                                            disabled={index === 0}
                                            onClick={() => move(index, -1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                        >
                                            <ChevronUp size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Move item down"
                                            disabled={index === items.length - 1}
                                            onClick={() => move(index, 1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                        >
                                            <ChevronDown size={15} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Remove item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeAt(index);
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-md text-m3-error hover:bg-m3-error-container"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                        <ChevronRight size={15} className="shrink-0 text-m3-on-surface-variant" />
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            <button
                type="button"
                onClick={addBanner}
                className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-m3-outline-variant text-[12px] font-medium text-m3-on-surface hover:bg-m3-surface-high"
            >
                <ImagePlus size={14} />
                Add operator banner
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-low px-3">
                <Search size={15} className="text-m3-on-surface-variant shrink-0" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search offers or operators"
                    className="h-10 min-w-0 flex-1 bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                />
            </div>
            <div className="flex flex-col gap-2">
                {filteredOffers.length === 0 && (
                    <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                        No matching offer assets.
                    </div>
                )}
                {filteredOffers.map((offer) => (
                    <div
                        key={offer.id}
                        className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 flex flex-col gap-2"
                    >
                        <div className="flex items-start gap-2">
                            <span
                                className={
                                    'shrink-0 w-2 h-8 rounded-sm mt-0.5 ' +
                                    (labelColorClass[offer.labelColor] ?? 'bg-m3-surface-highest')
                                }
                            />
                            <span className="min-w-0 flex-1">
                                <span className="block text-[13px] font-medium truncate">{offer.headline}</span>
                                <span className="block text-[11px] text-m3-on-surface-variant truncate">
                                    {operatorName(offer)} · {offer.label}
                                </span>
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-m3-outline-variant text-m3-on-surface-variant">
                                {offer.status}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => addOffer(offer.id)}
                            className="flex items-center justify-center gap-1.5 h-8 rounded-md text-[12px] font-medium bg-m3-gold text-m3-on-gold hover:brightness-95"
                        >
                            <Plus size={14} />
                            Add
                        </button>
                    </div>
                ))}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onPickImage}
                className="hidden"
            />
        </div>
    );
}
