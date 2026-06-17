'use client';

import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import { ArrowLeft, ExternalLink, Minus, Plus, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveOfferAction, saveOperatorLogoAction, setOfferPlacementAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { CmsSidebar } from '@/components/cms-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import type { CmsLabelColor, CmsOffer, CmsOfferDetails, CmsOperator } from '@/lib/cms-content.types';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

interface OfferEditorProps {
    offer: CmsOffer;
    operators: CmsOperator[];
    placements: OfferPlacement[];
    returnTo?: string;
}

export interface OfferPlacement {
    id: string;
    type: 'home' | 'sitePage';
    label: string;
    slug: string;
    placed: boolean;
    status: 'published' | 'draft';
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

function safeReturnTo(value: string | undefined): string {
    if (value === '/home') return value;
    if (value?.startsWith('/pages/edit/') === true) return value;
    if (value?.startsWith('/operators/edit/') === true) return value;
    return '/offers';
}

export function OfferEditor({ offer, operators, placements, returnTo }: OfferEditorProps): React.ReactElement {
    const router = useRouter();
    const backHref = safeReturnTo(returnTo);
    const [details, setDetails] = useState<CmsOfferDetails>({
        operatorId: offer.operatorId,
        headline: offer.headline,
        label: offer.label,
        labelColor: offer.labelColor,
        details: offer.details,
        howToClaimSteps: offer.howToClaimSteps,
        termsText: offer.termsText,
        ctaHref: offer.ctaHref
    });
    const [detailLines, setDetailLines] = useState(offer.details.join('\n'));
    const [stepLines, setStepLines] = useState(offer.howToClaimSteps.join('\n'));
    const [dirty, setDirty] = useState(false);
    const [saved, setSaved] = useState(false);
    const [pending, startTransition] = useTransition();
    const [placementPending, startPlacementTransition] = useTransition();
    const [activePlacementId, setActivePlacementId] = useState<string | null>(null);
    const [logoOverrides, setLogoOverrides] = useState<Record<string, string>>({});
    const [pendingLogo, setPendingLogo] = useState<{ operatorId: string; logoSrc: string } | null>(null);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const selectedOperator = operators.find((operator) => operator.id === details.operatorId);
    const currentLogo =
        logoOverrides[details.operatorId] ??
        selectedOperator?.logoSrc ??
        '/sfb/brands/placeholder.png';
    const previewCardProps: OfferCardProps = {
        label: details.label,
        labelColor: details.labelColor,
        logoSrc: currentLogo,
        logoAlt: selectedOperator?.name ?? 'Operator logo',
        offerMain: details.headline,
        details: details.details,
        ctaText: 'CLICK TO CLAIM',
        ctaHref: details.ctaHref || '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/' + offer.id,
        termsText: details.termsText
    };

    async function onPickLogo(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.target.files?.[0];
        if (file === undefined) return;
        setUploadingLogo(true);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = (await res.json()) as { path?: string };
            if (data.path !== undefined) {
                const path = data.path;
                setLogoOverrides((current) => ({ ...current, [details.operatorId]: path }));
                setPendingLogo({ operatorId: details.operatorId, logoSrc: path });
                setSaved(false);
            }
        } finally {
            setUploadingLogo(false);
            if (logoInputRef.current !== null) logoInputRef.current.value = '';
        }
    }

    function updateField<K extends keyof CmsOfferDetails>(key: K, value: CmsOfferDetails[K]): void {
        setDetails((current) => ({ ...current, [key]: value }));
        setDirty(true);
        setSaved(false);
    }

    function updateDetails(value: string): void {
        setDetailLines(value);
        updateField(
            'details',
            value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
        );
    }

    function updateSteps(value: string): void {
        setStepLines(value);
        updateField(
            'howToClaimSteps',
            value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
        );
    }

    function save(): void {
        startTransition(async () => {
            await saveOfferAction(offer.id, details);
            if (pendingLogo !== null) {
                await saveOperatorLogoAction(pendingLogo.operatorId, pendingLogo.logoSrc);
            }
            notifyCmsChanged();
            setDirty(false);
            setPendingLogo(null);
            setSaved(true);
        });
    }

    function togglePlacement(placement: OfferPlacement): void {
        setActivePlacementId(placement.id);
        startPlacementTransition(async () => {
            try {
                await setOfferPlacementAction(
                    offer.id,
                    placement.type === 'home' ? { type: 'home' } : { type: 'sitePage', pageId: placement.id },
                    !placement.placed
                );
                notifyCmsChanged();
                router.refresh();
            } finally {
                setActivePlacementId(null);
            }
        });
    }

    const hasUnsavedChanges = dirty || pendingLogo !== null;

    return (
        <div className="h-full flex">
            <CmsSidebar active="offers" />
            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            type="button"
                            onClick={() => router.push(backHref)}
                            className="h-8 w-8 rounded-md border border-m3-outline-variant flex items-center justify-center text-m3-on-surface hover:bg-m3-surface-high transition-colors"
                            aria-label="Back"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div className="min-w-0">
                            <div className="text-[15px] font-medium truncate">{details.headline || 'Offer'}</div>
                            <div className="text-[11px] text-m3-on-surface-variant">
                                Updated {formatDate(offer.updatedAt)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => router.push('/offers/' + offer.id + '/how-to-claim')}
                            className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high transition"
                        >
                            <ExternalLink size={15} />
                            How-to-claim page
                        </button>
                        <button
                            type="button"
                            disabled={pending || !hasUnsavedChanges}
                            onClick={save}
                            className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 transition disabled:opacity-40"
                        >
                            <Save size={15} />
                            {pending ? 'Saving' : saved ? 'Saved' : 'Save'}
                        </button>
                    </div>
                </header>

                <div className="p-6 grid grid-cols-[minmax(0,560px)_minmax(280px,380px)] gap-6 items-start">
                    <section className="rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                        <div>
                            <h1 className="text-[18px] font-medium">Offer details</h1>
                            <p className="text-[12px] text-m3-on-surface-variant mt-1">
                                Offer copy, operator relation, CTA, terms, and label styling.
                            </p>
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Operator
                            <select
                                value={details.operatorId}
                                onChange={(e) => updateField('operatorId', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                            >
                                {operators.map((operator) => (
                                    <option key={operator.id} value={operator.id}>
                                        {operator.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Operator logo
                            <span className="text-[11px] font-normal text-m3-on-surface-variant">
                                Shared across all of {selectedOperator?.name ?? 'this operator'}&apos;s offers and
                                pages. Saves when you press Save.
                            </span>
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-24 shrink-0 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                    <img
                                        src={currentLogo}
                                        alt=""
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => logoInputRef.current?.click()}
                                    disabled={uploadingLogo || pending}
                                    className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                                >
                                    <Upload size={14} />
                                    {uploadingLogo ? 'Uploading…' : 'Upload logo'}
                                </button>
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={onPickLogo}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Headline
                            <input
                                value={details.headline}
                                onChange={(e) => updateField('headline', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                            />
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                Label
                                <input
                                    value={details.label}
                                    onChange={(e) => updateField('label', e.target.value)}
                                    className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                                />
                            </label>
                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                Label colour
                                <select
                                    value={details.labelColor}
                                    onChange={(e) => updateField('labelColor', e.target.value as CmsLabelColor)}
                                    className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                                >
                                    <option value="blue">Blue</option>
                                    <option value="red">Red</option>
                                    <option value="orange">Orange</option>
                                </select>
                            </label>
                        </div>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Detail bullets
                            <textarea
                                value={detailLines}
                                onChange={(e) => updateDetails(e.target.value)}
                                rows={4}
                                className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            How to claim steps
                            <span className="text-[11px] font-normal text-m3-on-surface-variant">
                                One step per line. Shown on this offer&apos;s how-to-claim page.
                            </span>
                            <textarea
                                value={stepLines}
                                onChange={(e) => updateSteps(e.target.value)}
                                rows={4}
                                className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            CTA href
                            <input
                                value={details.ctaHref}
                                onChange={(e) => updateField('ctaHref', e.target.value)}
                                className="h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                            Terms
                            <textarea
                                value={details.termsText}
                                onChange={(e) => updateField('termsText', e.target.value)}
                                rows={6}
                                className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                            />
                        </label>
                    </section>

                    <aside className="rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                        <div>
                            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                Mobile card preview
                            </div>
                            <div className="text-[12px] text-m3-on-surface-variant mt-1">
                                This is the real offer card component shown at mobile width.
                            </div>
                        </div>
                        <div data-theme="bingo" className="cms-mobile-offer-preview rounded-lg border border-m3-outline-variant bg-surface p-2">
                            <OfferCard {...previewCardProps} />
                        </div>
                        <div className="flex flex-col gap-2 text-[12px]">
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">Status</span>
                                <span className="capitalize">{offer.status}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">CTA</span>
                                <span className="truncate">{details.ctaHref}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-m3-on-surface-variant">Save state</span>
                                <span>{hasUnsavedChanges ? 'Unsaved changes' : 'Up to date'}</span>
                            </div>
                        </div>
                        <div className="border-t border-m3-outline-variant pt-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-[12px] font-medium">Placement</div>
                                    <div className="text-[11px] text-m3-on-surface-variant mt-1">
                                        Add or remove this offer from CMS pages. Publish when ready to update the
                                        live site.
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-col gap-2">
                                {placements.map((placement) => {
                                    const busy = placementPending && activePlacementId === placement.id;
                                    return (
                                        <div
                                            key={placement.type + placement.id}
                                            className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 flex items-center justify-between gap-3"
                                        >
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="text-[12px] font-medium truncate">
                                                        {placement.label}
                                                    </span>
                                                    <span
                                                        className={
                                                            'shrink-0 rounded-full px-2 py-0.5 text-[10px] ' +
                                                            (placement.placed
                                                                ? 'bg-m3-gold/20 text-m3-on-surface'
                                                                : 'bg-m3-surface-highest text-m3-on-surface-variant')
                                                        }
                                                    >
                                                        {placement.placed ? 'Placed' : 'Not placed'}
                                                    </span>
                                                </div>
                                                <div className="mt-0.5 text-[11px] text-m3-on-surface-variant truncate">
                                                    {placement.slug}
                                                    {placement.status === 'draft' ? ' · Draft page' : ''}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => togglePlacement(placement)}
                                                disabled={placementPending}
                                                className={
                                                    'h-8 w-8 shrink-0 rounded-md border border-m3-outline-variant flex items-center justify-center transition disabled:opacity-40 ' +
                                                    (placement.placed
                                                        ? 'text-m3-on-surface hover:bg-m3-surface-high'
                                                        : 'bg-m3-gold text-m3-on-gold hover:brightness-95')
                                                }
                                                aria-label={
                                                    placement.placed
                                                        ? 'Remove from ' + placement.label
                                                        : 'Add to ' + placement.label
                                                }
                                            >
                                                {busy ? (
                                                    <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                                ) : placement.placed ? (
                                                    <Minus size={15} />
                                                ) : (
                                                    <Plus size={15} />
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
