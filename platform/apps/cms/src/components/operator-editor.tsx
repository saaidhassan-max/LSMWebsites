'use client';

import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import { ArrowLeft, Copy, Eye, EyeOff, Pencil, Plus, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    createOfferForOperatorAction,
    duplicateOfferAction,
    removeOfferPlacementsAction,
    saveOperatorAction,
} from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { CmsSidebar } from '@/components/cms-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import type { CmsOffer, CmsOperator, CmsOperatorDetails } from '@/lib/cms-content.types';

interface OperatorEditorProps {
    operator: CmsOperator;
    offers: CmsOffer[];
    offerUsage: Record<string, 'live' | 'draft' | 'notPlaced'>;
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function offerChip(offer: CmsOffer, usage: 'live' | 'draft' | 'notPlaced' | undefined): {
    label: string;
    className: string;
} {
    if (offer.status === 'hidden') {
        return {
            label: 'Not placed',
            className: 'bg-m3-surface-highest text-m3-on-surface-variant'
        };
    }
    if (usage === 'live') {
        return {
            label: 'Live',
            className: 'bg-m3-success-container text-m3-on-success'
        };
    }
    if (usage === 'draft') {
        return {
            label: 'Active',
            className: 'bg-m3-gold/20 text-m3-on-surface'
        };
    }
    return {
        label: 'Not placed',
        className: 'bg-m3-surface-highest text-m3-on-surface-variant'
    };
}

export function OperatorEditor({ operator, offers, offerUsage }: OperatorEditorProps): React.ReactElement {
    const router = useRouter();
    const [details, setDetails] = useState<CmsOperatorDetails>({
        name: operator.name,
        slug: operator.slug,
        logoSrc: operator.logoSrc,
        reviewIntro: operator.reviewIntro,
        reviewBody: operator.reviewBody
    });
    const [dirty, setDirty] = useState(false);
    const [saved, setSaved] = useState(false);
    const [pending, startTransition] = useTransition();
    const [adding, startAdd] = useTransition();
    const [duplicating, startDuplicate] = useTransition();
    const [changingOfferStatus, startOfferStatusChange] = useTransition();
    const [uploading, setUploading] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    async function onPickLogo(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.target.files?.[0];
        if (file === undefined) return;
        setUploading(true);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = (await res.json()) as { path?: string };
            if (data.path !== undefined) updateField('logoSrc', data.path);
        } finally {
            setUploading(false);
            if (logoInputRef.current !== null) logoInputRef.current.value = '';
        }
    }

    function updateField<K extends keyof CmsOperatorDetails>(key: K, value: CmsOperatorDetails[K]): void {
        setDetails((current) => ({ ...current, [key]: value }));
        setDirty(true);
        setSaved(false);
    }

    function save(): void {
        startTransition(async () => {
            await saveOperatorAction(operator.id, details);
            notifyCmsChanged();
            setDirty(false);
            setSaved(true);
        });
    }

    function addOffer(): void {
        startAdd(() => createOfferForOperatorAction(operator.id, '/operators/edit/' + operator.id));
    }

    function duplicateOffer(offerId: string): void {
        startDuplicate(async () => {
            await duplicateOfferAction(offerId, operator.id);
            notifyCmsChanged();
            router.refresh();
        });
    }

    function removeOfferPlacements(offerId: string): void {
        startOfferStatusChange(async () => {
            await removeOfferPlacementsAction(offerId, operator.id);
            notifyCmsChanged();
            router.refresh();
        });
    }

    return (
        <div className="h-full flex">
            <CmsSidebar active="operators" />
            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            type="button"
                            onClick={() => router.push('/operators')}
                            className="h-8 w-8 rounded-md border border-m3-outline-variant flex items-center justify-center text-m3-on-surface hover:bg-m3-surface-high transition-colors"
                            aria-label="Back to operators"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div className="min-w-0">
                            <div className="text-[15px] font-medium truncate">{details.name || 'Operator'}</div>
                            <div className="text-[11px] text-m3-on-surface-variant">
                                Updated {formatDate(operator.updatedAt)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            disabled={pending || !dirty}
                            onClick={save}
                            className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 transition disabled:opacity-40"
                        >
                            <Save size={15} />
                            {pending ? 'Saving' : saved ? 'Saved' : 'Save'}
                        </button>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-[minmax(0,560px)_minmax(280px,360px)] gap-6 items-start">
                    <section className="rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                        <div>
                            <h1 className="text-[18px] font-medium">Operator details</h1>
                            <p className="text-[12px] text-m3-on-surface-variant mt-1">
                                Main brand fields used by reviews and future offer cards.
                            </p>
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Name
                            <input
                                value={details.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            URL slug
                            <input
                                value={details.slug}
                                onChange={(e) => updateField('slug', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                            />
                        </label>
                        <div className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Logo
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-24 shrink-0 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                    <img
                                        src={details.logoSrc}
                                        alt=""
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => logoInputRef.current?.click()}
                                    disabled={uploading}
                                    className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                                >
                                    <Upload size={14} />
                                    {uploading ? 'Uploading…' : 'Upload logo'}
                                </button>
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={onPickLogo}
                                    className="hidden"
                                />
                            </div>
                            <input
                                value={details.logoSrc}
                                onChange={(e) => updateField('logoSrc', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] font-normal focus:outline-none focus:border-m3-gold"
                            />
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Review intro
                            <textarea
                                value={details.reviewIntro}
                                onChange={(e) => updateField('reviewIntro', e.target.value)}
                                rows={4}
                                className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Review body
                            <textarea
                                value={details.reviewBody}
                                onChange={(e) => updateField('reviewBody', e.target.value)}
                                rows={8}
                                className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                            />
                        </label>
                    </section>

                    <aside className="rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                        <div className="h-28 rounded-md bg-m3-surface-low border border-m3-outline-variant overflow-hidden flex items-center justify-center">
                            <img src={details.logoSrc} alt="" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex flex-col gap-2 text-[12px]">
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">Status</span>
                                <span className="capitalize">{operator.status}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">Review URL</span>
                                <span className="truncate">/operator/{details.slug}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">Save state</span>
                                <span>{dirty ? 'Unsaved changes' : 'Up to date'}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-m3-outline-variant pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[12px] font-medium">Offers ({offers.length})</span>
                                <button
                                    type="button"
                                    onClick={addOffer}
                                    disabled={adding}
                                    className="flex items-center gap-1 text-[12px] font-medium px-2.5 py-1.5 rounded-md bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                                >
                                    <Plus size={13} />
                                    {adding ? 'Adding…' : 'Add offer'}
                                </button>
                            </div>
                            {offers.length === 0 && (
                                <p className="text-[11px] text-m3-on-surface-variant">
                                    No offers under this operator yet.
                                </p>
                            )}
                            {offers.map((item) => {
                                const chip = offerChip(item, offerUsage[item.id]);
                                const canHideFromSite = chip.label === 'Live' || chip.label === 'Active';
                                return (
                                    <div
                                        key={item.id}
                                        className={
                                            'flex items-center justify-between gap-2 rounded-md border p-2 ' +
                                            (canHideFromSite
                                                ? 'border-m3-gold'
                                                : 'border-m3-outline-variant')
                                        }
                                    >
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <div className="text-[12px] font-medium truncate">{item.headline}</div>
                                                <span
                                                    className={
                                                        'shrink-0 text-[10px] px-1.5 py-0.5 rounded-full ' +
                                                        chip.className
                                                    }
                                                >
                                                    {chip.label}
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-m3-on-surface-variant">
                                                {item.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => removeOfferPlacements(item.id)}
                                                disabled={changingOfferStatus || !canHideFromSite}
                                                aria-label={
                                                    canHideFromSite
                                                        ? 'Hide ' + item.headline + ' from site'
                                                        : item.headline + ' is not placed on any page'
                                                }
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high hover:text-m3-on-surface disabled:opacity-40"
                                            >
                                                {canHideFromSite ? <EyeOff size={13} /> : <Eye size={13} />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.push(
                                                        '/offers/edit/' +
                                                            item.id +
                                                            '?returnTo=' +
                                                            encodeURIComponent('/operators/edit/' + operator.id)
                                                    )
                                                }
                                                aria-label={'Edit ' + item.headline}
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high hover:text-m3-on-surface"
                                            >
                                                <Pencil size={13} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => duplicateOffer(item.id)}
                                                disabled={duplicating}
                                                aria-label={'Duplicate ' + item.headline}
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high hover:text-m3-on-surface disabled:opacity-40"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
