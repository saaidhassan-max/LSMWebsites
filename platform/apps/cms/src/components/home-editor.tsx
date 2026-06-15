'use client';

import type React from 'react';
import { useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowUpDown,
    Check,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Layers,
    Monitor,
    Plus,
    Search,
    Smartphone,
    Upload,
    X
} from 'lucide-react';
import { saveHomeConfigAction, saveOfferAction } from '@/app/actions';
import { CmsSidebar } from '@/components/cms-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { PreviewFrame } from '@/components/preview-frame';
import { HomePageView } from '@/components/home-page-view';
import type { HomeCard, HomeSectionId } from '@/components/home-page-view';
import type { CmsLabelColor, CmsOffer, CmsOfferDetails, CmsOperator } from '@/lib/cms-content.types';
import type { HomePageConfig, HomeWelcomeContent } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

type PreviewMode = 'mobile' | 'desktop';
type PanelMode = 'outline' | 'assets' | 'properties';

interface HomeEditorProps {
    config: HomePageConfig;
    offers: CmsOffer[];
    operators: CmsOperator[];
    settings: SiteSettings;
}

interface OfferAssetState {
    canAdd: boolean;
    label: string;
}

interface SectionAsset {
    id: HomeSectionId;
    label: string;
    description: string;
}

const SECTION_ASSETS: SectionAsset[] = [
    { id: 'header', label: 'Header / navigation', description: 'Logo bar and menu entry point.' },
    { id: 'usp', label: 'USP strip', description: 'Claimed offers trust line.' },
    { id: 'welcome', label: 'Hero / welcome banner', description: 'Top visual intro section.' },
    { id: 'terms', label: 'Top terms bar', description: 'Short legal disclosure line.' },
    { id: 'signup', label: 'Signup form', description: 'Email and phone capture form.' },
    { id: 'directory', label: 'Website directory', description: 'Directory links block.' },
    { id: 'footer', label: 'Footer', description: 'Legal links and responsible-gambling logos.' }
];

export function HomeEditor({ config, offers, operators, settings }: HomeEditorProps): React.ReactElement {
    const router = useRouter();
    const [localOffers, setLocalOffers] = useState<CmsOffer[]>(offers);
    const [placedIds, setPlacedIds] = useState<string[]>(config.offerIds);
    const [welcome, setWelcome] = useState<HomeWelcomeContent>(config.welcome);
    const [featureLines, setFeatureLines] = useState(config.welcome.features.join('\n'));
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedSection, setSelectedSection] = useState<HomeSectionId | null>(null);
    const [panelMode, setPanelMode] = useState<PanelMode>('outline');
    const [reorder, setReorder] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [assetQuery, setAssetQuery] = useState('');
    const [uploadingImage, setUploadingImage] = useState<'left' | 'right' | null>(null);
    const [dirtyOfferIds, setDirtyOfferIds] = useState<Set<string>>(new Set());
    const [saving, startSave] = useTransition();
    const [savingOffer, startOfferSave] = useTransition();
    const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const leftImageInputRef = useRef<HTMLInputElement>(null);
    const rightImageInputRef = useRef<HTMLInputElement>(null);

    const offersById = useMemo(() => {
        const map: Record<string, CmsOffer> = {};
        localOffers.forEach((offer) => {
            map[offer.id] = offer;
        });
        return map;
    }, [localOffers]);

    const operatorsById = useMemo(() => {
        const map: Record<string, CmsOperator> = {};
        operators.forEach((operator) => {
            map[operator.id] = operator;
        });
        return map;
    }, [operators]);

    function operatorFor(offer: CmsOffer): CmsOperator | undefined {
        return operatorsById[offer.operatorId];
    }

    function operatorName(offer: CmsOffer): string {
        return operatorFor(offer)?.name ?? 'Missing operator';
    }

    function toCardProps(offer: CmsOffer): OfferCardProps {
        const operator = operatorFor(offer);
        return {
            label: offer.label,
            labelColor: offer.labelColor,
            logoSrc: operator?.logoSrc ?? '/sfb/brands/placeholder.png',
            logoAlt: operator?.name ?? '',
            offerMain: offer.headline,
            details: offer.details,
            ctaText: 'CLICK TO CLAIM',
            ctaHref: offer.ctaHref || '#',
            secondaryCtaText: 'How To Claim',
            secondaryCtaHref: '/how-to-claim/' + offer.id,
            termsText: offer.termsText
        };
    }

    const placedOffers = placedIds
        .map((id) => offersById[id])
        .filter((offer): offer is CmsOffer => offer !== undefined);

    const livePlacedOffers = placedOffers.filter((offer) => {
        const operator = operatorFor(offer);
        return offer.status === 'active' && operator?.status === 'active';
    });

    const cards: HomeCard[] = livePlacedOffers.map((offer) => ({
        offerId: offer.id,
        props: toCardProps(offer)
    }));

    const activePlacedCount = livePlacedOffers.length;

    const hiddenPlacedCount = placedOffers.length - activePlacedCount;

    const filteredOffers = localOffers.filter((offer) => {
        const query = assetQuery.trim().toLowerCase();
        if (query === '') return true;
        return (
            offer.headline.toLowerCase().includes(query) ||
            operatorName(offer).toLowerCase().includes(query) ||
            offer.label.toLowerCase().includes(query)
        );
    });

    function assetState(offer: CmsOffer): OfferAssetState {
        const operator = operatorFor(offer);
        if (placedIds.includes(offer.id)) return { canAdd: false, label: 'Placed' };
        if (offer.status === 'hidden') return { canAdd: false, label: 'Hidden offer' };
        if (operator === undefined) return { canAdd: false, label: 'Missing operator' };
        if (operator.status === 'hidden') return { canAdd: false, label: 'Hidden operator' };
        return { canAdd: true, label: 'Add' };
    }

    function selectOffer(offerId: string): void {
        setPanelMode('properties');
        setSelected(offerId);
        setSelectedSection(null);
        const el = rowRefs.current[offerId];
        if (el !== null && el !== undefined) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.remove('cms-field-flash');
            void el.offsetWidth;
            el.classList.add('cms-field-flash');
        }
    }

    function selectSection(sectionId: HomeSectionId): void {
        setSelected(null);
        setSelectedSection(sectionId);
        setPanelMode('properties');
    }

    function updateWelcome<K extends keyof HomeWelcomeContent>(
        key: K,
        value: HomeWelcomeContent[K]
    ): void {
        setWelcome((current) => ({ ...current, [key]: value }));
        setDirty(true);
    }

    function updateWelcomeFeatures(value: string): void {
        setFeatureLines(value);
        updateWelcome(
            'features',
            value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
        );
    }

    function updateSelectedOffer<K extends keyof CmsOfferDetails>(
        key: K,
        value: CmsOfferDetails[K]
    ): void {
        if (selected === null) return;
        setLocalOffers((current) =>
            current.map((offer) => (offer.id === selected ? { ...offer, [key]: value } : offer))
        );
        setDirtyOfferIds((current) => {
            const next = new Set(current);
            next.add(selected);
            return next;
        });
    }

    function updateSelectedOfferLines(key: 'details' | 'howToClaimSteps', value: string): void {
        updateSelectedOffer(
            key,
            value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
        );
    }

    function toOfferDetails(offer: CmsOffer): CmsOfferDetails {
        return {
            operatorId: offer.operatorId,
            headline: offer.headline,
            label: offer.label,
            labelColor: offer.labelColor,
            details: offer.details,
            howToClaimSteps: offer.howToClaimSteps,
            termsText: offer.termsText,
            ctaHref: offer.ctaHref
        };
    }

    function saveSelectedOffer(): void {
        if (selected === null) return;
        const offer = offersById[selected];
        if (offer === undefined) return;
        startOfferSave(async () => {
            await saveOfferAction(offer.id, toOfferDetails(offer));
            setDirtyOfferIds((current) => {
                const next = new Set(current);
                next.delete(offer.id);
                return next;
            });
        });
    }

    async function uploadWelcomeImage(
        e: React.ChangeEvent<HTMLInputElement>,
        target: 'left' | 'right'
    ): Promise<void> {
        const file = e.target.files?.[0];
        if (file === undefined) return;
        setUploadingImage(target);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = (await res.json()) as { path?: string };
            if (data.path !== undefined) {
                updateWelcome(target === 'left' ? 'imageLeftSrc' : 'imageRightSrc', data.path);
            }
        } finally {
            setUploadingImage(null);
            if (target === 'left' && leftImageInputRef.current !== null) {
                leftImageInputRef.current.value = '';
            }
            if (target === 'right' && rightImageInputRef.current !== null) {
                rightImageInputRef.current.value = '';
            }
        }
    }

    function addOffer(offerId: string): void {
        if (placedIds.includes(offerId)) return;
        setPlacedIds((ids) => [...ids, offerId]);
        setSelected(offerId);
        setPanelMode('properties');
        setDirty(true);
    }

    function removeOffer(offerId: string): void {
        setPlacedIds((ids) => ids.filter((id) => id !== offerId));
        if (selected === offerId) setSelected(null);
        setDirty(true);
    }

    function move(index: number, delta: number): void {
        setPlacedIds((ids) => {
            const next = [...ids];
            const target = index + delta;
            if (target < 0 || target >= next.length) return ids;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setDirty(true);
    }

    function save(): void {
        startSave(async () => {
            await saveHomeConfigAction({
                offerIds: placedIds,
                welcome,
                updatedAt: config.updatedAt
            });
            setDirty(false);
        });
    }

    const previewWidth = previewMode === 'mobile' ? '390px' : '1180px';
    const previewHeight = '760px';
    const inputClass =
        'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
    const labelColorClass: Record<string, string> = {
        orange: 'bg-[#ff9000]',
        red: 'bg-[#ff0000]',
        blue: 'bg-[#3971db]'
    };
    const selectedOffer = selected === null ? undefined : offersById[selected];
    const selectedOfferOperator =
        selectedOffer === undefined ? undefined : operatorFor(selectedOffer);
    const selectedOfferDirty = selectedOffer !== undefined && dirtyOfferIds.has(selectedOffer.id);

    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 min-h-0">
                <CmsSidebar active="home" />

                <div className="flex-1 min-w-0 flex flex-col">
                    <header className="flex items-center justify-between px-4 h-14 border-b border-m3-outline-variant shrink-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                aria-label="Back"
                                className="flex items-center justify-center w-9 h-9 rounded-lg border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high"
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <div className="min-w-0">
                                <div className="text-[14px] font-medium truncate">Home page builder</div>
                                <div className="text-[11px] text-m3-on-surface-variant">
                                    {activePlacedCount} live asset{activePlacedCount === 1 ? '' : 's'}
                                    {hiddenPlacedCount > 0 ? ' · ' + hiddenPlacedCount + ' hidden' : ''}
                                    {dirty ? ' · unsaved changes' : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href="http://localhost:3002"
                                target="_blank"
                                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high"
                            >
                                <ExternalLink size={15} />
                                Live SFB
                            </Link>
                            <ThemeToggle />
                            <button
                                type="button"
                                onClick={save}
                                disabled={saving || !dirty}
                                className="text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                            >
                                {saving ? 'Saving…' : 'Save'}
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 min-h-0 flex">
                        <aside className="w-[360px] shrink-0 border-r border-m3-outline-variant overflow-y-auto bg-m3-surface-lowest flex flex-col">
                            <div className="p-4 border-b border-m3-outline-variant flex flex-col gap-3">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="rounded-lg bg-m3-surface-low border border-m3-outline-variant p-2">
                                        <div className="text-[11px] text-m3-on-surface-variant">Placed</div>
                                        <div className="text-[18px] font-medium">{placedIds.length}</div>
                                    </div>
                                    <div className="rounded-lg bg-m3-surface-low border border-m3-outline-variant p-2">
                                        <div className="text-[11px] text-m3-on-surface-variant">Live</div>
                                        <div className="text-[18px] font-medium">{activePlacedCount}</div>
                                    </div>
                                    <div className="rounded-lg bg-m3-surface-low border border-m3-outline-variant p-2">
                                        <div className="text-[11px] text-m3-on-surface-variant">Assets</div>
                                        <div className="text-[18px] font-medium">{localOffers.length}</div>
                                    </div>
                                </div>
                                <div className="flex rounded-lg border border-m3-outline-variant bg-m3-surface-low p-1">
                                    <button
                                        type="button"
                                        onClick={() => setPanelMode('outline')}
                                        className={
                                            'flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-[12px] ' +
                                            (panelMode === 'outline'
                                                ? 'bg-m3-gold text-m3-on-gold'
                                                : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
                                        }
                                    >
                                        <Layers size={14} />
                                        Page
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPanelMode('assets')}
                                        className={
                                            'flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-[12px] ' +
                                            (panelMode === 'assets'
                                                ? 'bg-m3-gold text-m3-on-gold'
                                                : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
                                        }
                                    >
                                        <Plus size={14} />
                                        Assets
                                    </button>
                                    {(selected !== null || selectedSection !== null) && (
                                        <button
                                            type="button"
                                            onClick={() => setPanelMode('properties')}
                                            className={
                                                'flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-[12px] ' +
                                                (panelMode === 'properties'
                                                    ? 'bg-m3-gold text-m3-on-gold'
                                                    : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
                                            }
                                        >
                                            <Layers size={14} />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            {panelMode === 'outline' && (
                                <div className="p-4 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                Page outline
                                            </div>
                                            <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                                                Offer card stack on the SFB home page.
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setReorder((r) => !r)}
                                            className={
                                                'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md border transition-colors ' +
                                                (reorder
                                                    ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                                    : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                                            }
                                        >
                                            <ArrowUpDown size={14} />
                                            {reorder ? 'Done' : 'Reorder'}
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {placedIds.length === 0 && (
                                            <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                                No offer cards placed yet. Open Assets and add one.
                                            </div>
                                        )}
                                        {placedIds.map((id, index) => {
                                            const offer = offersById[id];
                                            if (offer === undefined) return null;
                                            const operator = operatorFor(offer);
                                            const isLive = offer.status === 'active' && operator?.status === 'active';
                                            return (
                                                <div
                                                    key={id}
                                                    ref={(el) => {
                                                        rowRefs.current[id] = el;
                                                    }}
                                                    onClick={() => !reorder && selectOffer(id)}
                                                    className={
                                                        'flex items-center gap-2 rounded-lg border p-2 ' +
                                                        (selected === id && !reorder
                                                            ? 'border-m3-gold ring-1 ring-m3-gold '
                                                            : 'border-m3-outline-variant ') +
                                                        (reorder ? '' : 'cursor-pointer hover:bg-m3-surface-high')
                                                    }
                                                >
                                                    <span className="w-6 text-center text-[12px] text-m3-on-surface-variant">
                                                        {index + 1}
                                                    </span>
                                                    <span
                                                        className={
                                                            'shrink-0 w-2 h-8 rounded-sm ' +
                                                            (labelColorClass[offer.labelColor] ?? 'bg-m3-surface-highest')
                                                        }
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="text-[13px] font-medium truncate">
                                                            {offer.headline}
                                                        </div>
                                                        <div className="text-[11px] text-m3-on-surface-variant truncate">
                                                            {operatorName(offer)}
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={
                                                            'text-[10px] px-1.5 py-0.5 rounded-full border ' +
                                                            (isLive
                                                                ? 'border-green-500/30 text-green-700 bg-green-500/10'
                                                                : 'border-m3-outline-variant text-m3-on-surface-variant bg-m3-surface-low')
                                                        }
                                                    >
                                                        {isLive ? 'Live' : 'Hidden'}
                                                    </span>
                                                    {reorder ? (
                                                        <div className="flex items-center gap-1 shrink-0">
                                                            <button
                                                                type="button"
                                                                aria-label="Move up"
                                                                disabled={index === 0}
                                                                onClick={() => move(index, -1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                            >
                                                                <ChevronUp size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                aria-label="Move down"
                                                                disabled={index === placedIds.length - 1}
                                                                onClick={() => move(index, 1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                            >
                                                                <ChevronDown size={15} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            aria-label="Remove"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeOffer(id);
                                                            }}
                                                            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-m3-on-surface-variant hover:bg-m3-surface-high"
                                                        >
                                                            <X size={15} />
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setPanelMode('assets')}
                                        className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high"
                                    >
                                        <Plus size={15} />
                                        Add asset
                                    </button>

                                    <p className="text-[11px] text-m3-on-surface-variant leading-relaxed">
                                        <Check size={12} className="inline mr-1 -mt-0.5" />
                                        {reorder
                                            ? 'Use the arrows to reorder, then press Done.'
                                            : 'Click a card in the preview to edit its offer copy.'}
                                    </p>
                                </div>
                            )}

                            {panelMode === 'assets' && (
                                <div className="p-4 flex flex-col gap-4">
                                    <div>
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Asset library
                                        </div>
                                        <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                                            Offer cards are live page assets. More section assets come next.
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-low px-3">
                                        <Search size={15} className="text-m3-on-surface-variant shrink-0" />
                                        <input
                                            value={assetQuery}
                                            onChange={(e) => setAssetQuery(e.target.value)}
                                            placeholder="Search offers or operators"
                                            className="h-10 min-w-0 flex-1 bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                                        />
                                    </div>

                                    <section className="flex flex-col gap-2">
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Offer card assets
                                        </div>
                                        {filteredOffers.length === 0 && (
                                            <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                                No matching offer assets.
                                            </div>
                                        )}
                                        {filteredOffers.map((offer) => {
                                            const state = assetState(offer);
                                            return (
                                                <div
                                                    key={offer.id}
                                                    className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 flex flex-col gap-2"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <span
                                                            className={
                                                                'shrink-0 w-2 h-8 rounded-sm mt-0.5 ' +
                                                                (labelColorClass[offer.labelColor] ??
                                                                    'bg-m3-surface-highest')
                                                            }
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-[13px] font-medium truncate">
                                                                {offer.headline}
                                                            </div>
                                                            <div className="text-[11px] text-m3-on-surface-variant truncate">
                                                                {operatorName(offer)} · {offer.label}
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-m3-outline-variant text-m3-on-surface-variant">
                                                            {offer.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => addOffer(offer.id)}
                                                            disabled={!state.canAdd}
                                                            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md bg-m3-gold text-m3-on-gold text-[12px] font-medium hover:brightness-95 disabled:opacity-40"
                                                        >
                                                            <Plus size={14} />
                                                            {state.label}
                                                        </button>
                                                        <Link
                                                            href={'/offers/edit/' + offer.id}
                                                            className="px-2.5 h-8 flex items-center justify-center rounded-md border border-m3-outline-variant text-[12px] text-m3-on-surface-variant hover:bg-m3-surface-high"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </section>

                                    <section className="flex flex-col gap-2 pt-2 border-t border-m3-outline-variant">
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Page section assets
                                        </div>
                                        {SECTION_ASSETS.map((asset) => (
                                            <button
                                                key={asset.id}
                                                type="button"
                                                onClick={() => selectSection(asset.id)}
                                                className={
                                                    'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-[12px] hover:bg-m3-surface-high ' +
                                                    (selectedSection === asset.id
                                                        ? 'border-m3-gold ring-1 ring-m3-gold'
                                                        : 'border-m3-outline-variant')
                                                }
                                            >
                                                <Layers size={14} className="shrink-0 text-m3-on-surface-variant" />
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-m3-on-surface">{asset.label}</span>
                                                    <span className="block text-[11px] text-m3-on-surface-variant truncate">
                                                        {asset.description}
                                                    </span>
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-m3-surface-low text-m3-on-surface-variant">
                                                    Select
                                                </span>
                                            </button>
                                        ))}
                                        {selectedSection !== null && (
                                            <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-[12px] text-m3-on-surface-variant leading-5">
                                                Section selected in the preview. Open Edit to change allowed
                                                properties for this section.
                                            </div>
                                        )}
                                    </section>
                                </div>
                            )}

                            {panelMode === 'properties' && (
                                <div className="p-4 flex flex-col gap-4">
                                    {selected === null && selectedSection === null && (
                                        <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                            Select a section in the preview or asset library to edit its properties.
                                        </div>
                                    )}

                                    {selectedOffer !== undefined && (
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                    Offer card properties
                                                </div>
                                                <div className="text-[18px] font-medium mt-1">
                                                    {selectedOfferOperator?.name ?? 'Missing operator'}
                                                </div>
                                                <div className="text-[12px] text-m3-on-surface-variant mt-1">
                                                    Changes update the home preview immediately. Save the offer to publish
                                                    the new card copy everywhere this offer appears.
                                                </div>
                                            </div>

                                            <div className="rounded-lg overflow-hidden border border-m3-outline-variant bg-m3-surface-low">
                                                <div
                                                    className={
                                                        'px-3 py-1.5 text-[11px] font-bold text-white ' +
                                                        (labelColorClass[selectedOffer.labelColor] ??
                                                            'bg-m3-surface-highest')
                                                    }
                                                >
                                                    {selectedOffer.label}
                                                </div>
                                                <div className="p-3 flex flex-col gap-2">
                                                    <div className="text-[14px] font-medium">
                                                        {selectedOffer.headline}
                                                    </div>
                                                    <div className="text-[11px] text-m3-on-surface-variant">
                                                        {selectedOfferDirty ? 'Unsaved offer changes' : 'Offer saved'}
                                                    </div>
                                                </div>
                                            </div>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Headline
                                                <input
                                                    value={selectedOffer.headline}
                                                    onChange={(e) => updateSelectedOffer('headline', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>

                                            <div className="grid grid-cols-2 gap-3">
                                                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                    Label
                                                    <input
                                                        value={selectedOffer.label}
                                                        onChange={(e) => updateSelectedOffer('label', e.target.value)}
                                                        className={inputClass}
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                    Label colour
                                                    <select
                                                        value={selectedOffer.labelColor}
                                                        onChange={(e) =>
                                                            updateSelectedOffer(
                                                                'labelColor',
                                                                e.target.value as CmsLabelColor
                                                            )
                                                        }
                                                        className={inputClass}
                                                    >
                                                        <option value="blue">Blue</option>
                                                        <option value="red">Red</option>
                                                        <option value="orange">Orange</option>
                                                    </select>
                                                </label>
                                            </div>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Detail bullets
                                                <span className="text-[11px] font-normal text-m3-on-surface-variant">
                                                    One bullet per line.
                                                </span>
                                                <textarea
                                                    value={selectedOffer.details.join('\n')}
                                                    onChange={(e) =>
                                                        updateSelectedOfferLines('details', e.target.value)
                                                    }
                                                    rows={4}
                                                    className={inputClass + ' resize-y leading-5'}
                                                />
                                            </label>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                CTA href
                                                <input
                                                    value={selectedOffer.ctaHref}
                                                    onChange={(e) => updateSelectedOffer('ctaHref', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Terms
                                                <textarea
                                                    value={selectedOffer.termsText}
                                                    onChange={(e) => updateSelectedOffer('termsText', e.target.value)}
                                                    rows={5}
                                                    className={inputClass + ' resize-y leading-5'}
                                                />
                                            </label>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                How-to-claim steps
                                                <span className="text-[11px] font-normal text-m3-on-surface-variant">
                                                    These are easier to finish in the full offer editor.
                                                </span>
                                                <textarea
                                                    value={selectedOffer.howToClaimSteps.join('\n')}
                                                    onChange={(e) =>
                                                        updateSelectedOfferLines('howToClaimSteps', e.target.value)
                                                    }
                                                    rows={3}
                                                    className={inputClass + ' resize-y leading-5'}
                                                />
                                            </label>

                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={saveSelectedOffer}
                                                    disabled={savingOffer || !selectedOfferDirty}
                                                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                                                >
                                                    {savingOffer ? 'Saving...' : 'Save offer'}
                                                </button>
                                                <Link
                                                    href={'/offers/edit/' + selectedOffer.id}
                                                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high"
                                                >
                                                    <ExternalLink size={14} />
                                                    Full editor
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {selectedSection !== null && selectedSection !== 'welcome' && (
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                    Section properties
                                                </div>
                                                <div className="text-[18px] font-medium mt-1">
                                                    {SECTION_ASSETS.find((asset) => asset.id === selectedSection)?.label}
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-[12px] text-m3-on-surface-variant leading-5">
                                                This section is selectable now. Its editable fields will be added next.
                                            </div>
                                        </div>
                                    )}

                                    {selectedSection === 'welcome' && (
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                    Section properties
                                                </div>
                                                <div className="text-[18px] font-medium mt-1">
                                                    Hero / welcome banner
                                                </div>
                                                <div className="text-[12px] text-m3-on-surface-variant mt-1">
                                                    These fields update the preview immediately and save to the
                                                    live SFB home when you press Save.
                                                </div>
                                            </div>

                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Highlight text
                                                <input
                                                    value={welcome.textHighlight}
                                                    onChange={(e) => updateWelcome('textHighlight', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Main title
                                                <input
                                                    value={welcome.text}
                                                    onChange={(e) => updateWelcome('text', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Suffix text
                                                <input
                                                    value={welcome.textSuffix}
                                                    onChange={(e) => updateWelcome('textSuffix', e.target.value)}
                                                    className={inputClass}
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                Feature bullets
                                                <span className="text-[11px] font-normal text-m3-on-surface-variant">
                                                    One feature per line.
                                                </span>
                                                <textarea
                                                    value={featureLines}
                                                    onChange={(e) => updateWelcomeFeatures(e.target.value)}
                                                    rows={4}
                                                    className={inputClass + ' resize-y leading-5'}
                                                />
                                            </label>

                                            <div className="grid grid-cols-2 gap-3">
                                                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                    Mobile left width
                                                    <input
                                                        type="number"
                                                        value={welcome.imageLeftWidthMobile}
                                                        onChange={(e) =>
                                                            updateWelcome(
                                                                'imageLeftWidthMobile',
                                                                Number(e.target.value) || 83
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />
                                                </label>
                                                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                                                    Desktop left width
                                                    <input
                                                        type="number"
                                                        value={welcome.imageLeftWidthDesktop}
                                                        onChange={(e) =>
                                                            updateWelcome(
                                                                'imageLeftWidthDesktop',
                                                                Number(e.target.value) || 204
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />
                                                </label>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <div className="text-[12px] font-medium">Left image</div>
                                                <div className="h-20 rounded-lg border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                                    <img
                                                        src={welcome.imageLeftSrc}
                                                        alt=""
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                </div>
                                                <input
                                                    value={welcome.imageLeftSrc}
                                                    onChange={(e) => updateWelcome('imageLeftSrc', e.target.value)}
                                                    className={inputClass}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => leftImageInputRef.current?.click()}
                                                    disabled={uploadingImage !== null}
                                                    className="flex items-center justify-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                                                >
                                                    <Upload size={14} />
                                                    {uploadingImage === 'left' ? 'Uploading...' : 'Upload left image'}
                                                </button>
                                                <input
                                                    ref={leftImageInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => uploadWelcomeImage(e, 'left')}
                                                    className="hidden"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <div className="text-[12px] font-medium">Right image</div>
                                                <div className="h-20 rounded-lg border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                                    <img
                                                        src={welcome.imageRightSrc}
                                                        alt=""
                                                        className="max-h-full max-w-full object-contain"
                                                    />
                                                </div>
                                                <input
                                                    value={welcome.imageRightSrc}
                                                    onChange={(e) => updateWelcome('imageRightSrc', e.target.value)}
                                                    className={inputClass}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => rightImageInputRef.current?.click()}
                                                    disabled={uploadingImage !== null}
                                                    className="flex items-center justify-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                                                >
                                                    <Upload size={14} />
                                                    {uploadingImage === 'right'
                                                        ? 'Uploading...'
                                                        : 'Upload right image'}
                                                </button>
                                                <input
                                                    ref={rightImageInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => uploadWelcomeImage(e, 'right')}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </aside>

                        <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-m3-surface-low">
                            <div className="h-12 shrink-0 border-b border-m3-outline-variant px-4 flex items-center justify-between gap-3">
                                <div className="text-[12px] text-m3-on-surface-variant">
                                    {previewMode === 'mobile' ? 'Mobile preview' : 'Desktop preview'}
                                </div>
                                <div className="flex items-center rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-1">
                                    <button
                                        type="button"
                                        onClick={() => setPreviewMode('mobile')}
                                        aria-label="Show mobile preview"
                                        aria-pressed={previewMode === 'mobile'}
                                        className={
                                            'flex items-center justify-center w-9 h-8 rounded-md text-m3-on-surface-variant hover:bg-m3-surface-high ' +
                                            (previewMode === 'mobile'
                                                ? 'bg-m3-gold text-m3-on-gold hover:bg-m3-gold'
                                                : '')
                                        }
                                    >
                                        <Smartphone size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPreviewMode('desktop')}
                                        aria-label="Show desktop preview"
                                        aria-pressed={previewMode === 'desktop'}
                                        className={
                                            'flex items-center justify-center w-9 h-8 rounded-md text-m3-on-surface-variant hover:bg-m3-surface-high ' +
                                            (previewMode === 'desktop'
                                                ? 'bg-m3-gold text-m3-on-gold hover:bg-m3-gold'
                                                : '')
                                        }
                                    >
                                        <Monitor size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0 overflow-auto">
                                <div className="min-w-max p-4 flex flex-col items-center">
                                    <div
                                        className="rounded-lg overflow-hidden border border-m3-outline-variant shadow-sm bg-surface"
                                        style={{ width: previewWidth }}
                                    >
                                        <PreviewFrame width={previewWidth} height={previewHeight}>
                                            <HomePageView
                                                cards={cards}
                                                welcome={welcome}
                                                settings={settings}
                                                editable
                                                selectedOfferId={selected}
                                                selectedSectionId={selectedSection}
                                                onSelectOffer={selectOffer}
                                                onSelectSection={selectSection}
                                            />
                                        </PreviewFrame>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
