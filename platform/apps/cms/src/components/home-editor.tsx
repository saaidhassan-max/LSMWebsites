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
    Smartphone,
    Upload,
    X
} from 'lucide-react';
import { saveHomeConfigAction } from '@/app/actions';
import { CmsSidebar } from '@/components/cms-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { PreviewFrame } from '@/components/preview-frame';
import { HomePageView } from '@/components/home-page-view';
import type { HomeEditableSectionId, HomeRenderItem } from '@/components/home-page-view';
import { OffersCollectionEditor } from '@/components/offers-collection-editor';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';
import type { HomePageConfig, HomeSectionId, HomeWelcomeContent } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

type PreviewMode = 'mobile' | 'desktop';
interface HomeEditorProps {
    config: HomePageConfig;
    offers: CmsOffer[];
    operators: CmsOperator[];
    settings: SiteSettings;
}

interface SectionAsset {
    id: HomeSectionId;
    label: string;
    description: string;
}

const SECTION_ASSETS: SectionAsset[] = [
    { id: 'welcome', label: 'Hero / welcome banner', description: 'Top visual intro section.' },
    { id: 'terms', label: 'Top terms bar', description: 'Short legal disclosure line.' },
    { id: 'offers', label: 'Offers collection', description: 'Multiple selected offer cards.' },
    { id: 'signup', label: 'Signup form', description: 'Email and phone capture form.' },
    { id: 'directory', label: 'Website directory', description: 'Directory links block.' }
];

export function HomeEditor({ config, offers, operators, settings }: HomeEditorProps): React.ReactElement {
    const router = useRouter();
    const [offerItems, setOfferItems] = useState(config.offerItems);
    const [sectionIds, setSectionIds] = useState<HomeSectionId[]>(config.sectionIds);
    const [welcome, setWelcome] = useState<HomeWelcomeContent>(config.welcome);
    const [featureLines, setFeatureLines] = useState(config.welcome.features.join('\n'));
    const [selectedSection, setSelectedSection] = useState<HomeEditableSectionId | null>(null);
    const [sectionReorder, setSectionReorder] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [uploadingImage, setUploadingImage] = useState<'left' | 'right' | null>(null);
    const [saving, startSave] = useTransition();
    const leftImageInputRef = useRef<HTMLInputElement>(null);
    const rightImageInputRef = useRef<HTMLInputElement>(null);

    const offersById = useMemo(() => {
        const map: Record<string, CmsOffer> = {};
        offers.forEach((offer) => {
            map[offer.id] = offer;
        });
        return map;
    }, [offers]);

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

    const renderItems: HomeRenderItem[] = offerItems
        .map((item): HomeRenderItem | null => {
            if (item.kind === 'banner') return item;
            const offer = offersById[item.offerId];
            if (offer === undefined) return null;
            const operator = operatorFor(offer);
            if (offer.status !== 'active' || operator?.status !== 'active') return null;
            return { kind: 'offer', offerId: offer.id, props: toCardProps(offer) };
        })
        .filter((item): item is HomeRenderItem => item !== null);

    const activePlacedCount = renderItems.length;
    const hiddenPlacedCount = offerItems.length - activePlacedCount;

    function selectSection(sectionId: HomeEditableSectionId): void {
        setSelectedSection(sectionId);
    }

    function updateOfferItems(items: typeof offerItems): void {
        setOfferItems(items);
        setSelectedSection('offers');
        setDirty(true);
    }

    function addSection(sectionId: HomeSectionId): void {
        if (sectionIds.includes(sectionId)) {
            selectSection(sectionId);
            return;
        }
        setSectionIds((ids) => [...ids, sectionId]);
        selectSection(sectionId);
        setDirty(true);
    }

    function removeSection(sectionId: HomeSectionId): void {
        setSectionIds((ids) => ids.filter((id) => id !== sectionId));
        if (selectedSection === sectionId) setSelectedSection(null);
        setDirty(true);
    }

    function moveSection(index: number, delta: number): void {
        setSectionIds((ids) => {
            const next = [...ids];
            const target = index + delta;
            if (target < 0 || target >= next.length) return ids;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setDirty(true);
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

    function save(): void {
        startSave(async () => {
            await saveHomeConfigAction({
                offerItems,
                sectionIds,
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
                                    {' · ' + sectionIds.length + ' section' + (sectionIds.length === 1 ? '' : 's')}
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
                        </div>
                    </header>

                    <div className="flex-1 min-h-0 flex">
                        <aside className="w-[360px] shrink-0 border-r border-m3-outline-variant bg-m3-surface-lowest flex flex-col min-h-0">
                            <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-5">
                                <section className="flex flex-col gap-3">
                                    <div>
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Page content
                                        </div>
                                        <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                                            Logo/navigation, USP strip, and footer are always included on the home page.
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                Body assets
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSectionReorder((value) => !value)}
                                                className={
                                                    'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md border transition-colors ' +
                                                    (sectionReorder
                                                        ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                                        : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                                                }
                                            >
                                                <ArrowUpDown size={14} />
                                                {sectionReorder ? 'Done' : 'Reorder'}
                                            </button>
                                        </div>
                                        {sectionIds.length === 0 && (
                                            <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                                No optional page sections placed yet. Open Assets and add one.
                                            </div>
                                        )}
                                        {sectionIds.map((sectionId, index) => {
                                            const asset = SECTION_ASSETS.find((item) => item.id === sectionId);
                                            if (asset === undefined) return null;
                                            return (
                                                <div
                                                    key={sectionId}
                                                    onClick={() => !sectionReorder && selectSection(sectionId)}
                                                    className={
                                                        'flex items-center gap-2 rounded-lg border p-2 ' +
                                                        (selectedSection === sectionId && !sectionReorder
                                                            ? 'border-m3-gold ring-1 ring-m3-gold'
                                                            : 'border-m3-outline-variant') +
                                                        (sectionReorder ? '' : ' cursor-pointer hover:bg-m3-surface-high')
                                                    }
                                                >
                                                    <Layers size={15} className="shrink-0 text-m3-on-surface-variant" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="text-[13px] font-medium truncate">
                                                            {asset.label}
                                                        </div>
                                                        <div className="text-[11px] text-m3-on-surface-variant truncate">
                                                            {sectionId === 'offers'
                                                                ? offerItems.length +
                                                                  ' collection item' +
                                                                  (offerItems.length === 1 ? '' : 's')
                                                                : asset.description}
                                                        </div>
                                                    </div>
                                                    {sectionReorder ? (
                                                        <div className="flex items-center gap-1 shrink-0">
                                                            <button
                                                                type="button"
                                                                aria-label="Move section up"
                                                                disabled={index === 0}
                                                                onClick={() => moveSection(index, -1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                            >
                                                                <ChevronUp size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                aria-label="Move section down"
                                                                disabled={index === sectionIds.length - 1}
                                                                onClick={() => moveSection(index, 1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                            >
                                                                <ChevronDown size={15} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            aria-label={'Remove ' + asset.label}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeSection(sectionId);
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

                                    <p className="text-[11px] text-m3-on-surface-variant leading-relaxed">
                                        <Check size={12} className="inline mr-1 -mt-0.5" />
                                        {sectionReorder
                                            ? 'Use the arrows to reorder, then press Done.'
                                            : 'Select an asset to edit its content.'}
                                    </p>
                                </section>

                            {selectedSection !== null && (
                                <section className="flex flex-col gap-4">
                                    {selectedSection === 'offers' && (
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                    Offers collection content
                                                </div>
                                            </div>
                                            <OffersCollectionEditor
                                                items={offerItems}
                                                offers={offers}
                                                operators={operators}
                                                onChange={updateOfferItems}
                                            />
                                        </div>
                                    )}

                                    {selectedSection !== null && selectedSection !== 'welcome' && selectedSection !== 'offers' && (
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
                                                This section is controlled by the shared site settings for now.
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
                                                    {uploadingImage === 'left'
                                                        ? 'Uploading...'
                                                        : 'Upload left image'}
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
                                </section>
                            )}

                                <section className="flex flex-col gap-4">
                                    <div>
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Asset library
                                        </div>
                                        <div className="text-[12px] text-m3-on-surface-variant mt-0.5">
                                            Add reusable assets to this page.
                                        </div>
                                    </div>

                                    <section className="flex flex-col gap-2">
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Page assets
                                        </div>
                                        {SECTION_ASSETS.map((asset) => (
                                            <div
                                                key={asset.id}
                                                className={
                                                    'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-[12px] ' +
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
                                                <button
                                                    type="button"
                                                    onClick={() => addSection(asset.id)}
                                                    disabled={sectionIds.includes(asset.id)}
                                                    className="shrink-0 flex items-center justify-center gap-1 h-8 px-2.5 rounded-md bg-m3-gold text-m3-on-gold text-[12px] font-medium hover:brightness-95 disabled:opacity-40"
                                                >
                                                    <Plus size={14} />
                                                    {sectionIds.includes(asset.id) ? 'Placed' : 'Add'}
                                                </button>
                                            </div>
                                        ))}
                                        {selectedSection !== null && (
                                            <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-[12px] text-m3-on-surface-variant leading-5">
                                                Select an asset above to change its allowed properties.
                                            </div>
                                        )}
                                    </section>
                                </section>
                            </div>

                            <div className="shrink-0 border-t border-m3-outline-variant bg-m3-surface-lowest/95 backdrop-blur p-4">
                                <button
                                    type="button"
                                    onClick={save}
                                    disabled={saving || !dirty}
                                    className="w-full flex items-center justify-center gap-1.5 text-[13px] font-medium px-3.5 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                                >
                                    {saving ? 'Saving...' : dirty ? 'Save changes' : 'Saved'}
                                </button>
                            </div>

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
                                                items={renderItems}
                                                sectionIds={sectionIds}
                                                welcome={welcome}
                                                settings={settings}
                                                editable
                                                selectedSectionId={selectedSection}
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
