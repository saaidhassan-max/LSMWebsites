'use client';

import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowUpDown,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
    Monitor,
    Plus,
    Smartphone,
    Trash2,
    Upload
} from 'lucide-react';
import { publishSitePageAction, saveOfferAction, saveSitePageAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { LinesTextarea } from '@/components/lines-textarea';
import { CmsSidebar } from '@/components/cms-sidebar';
import { OffersCollectionEditor } from '@/components/offers-collection-editor';
import { PreviewFrame } from '@/components/preview-frame';
import { SitePageView } from '@/components/site-page-view';
import { ThemeToggle } from '@/components/theme-toggle';
import { SITE_PAGE_ASSETS, createSection, sectionTypeLabel } from '@/lib/site-page-content';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';
import type {
    DirectoryContent,
    OffersContent,
    OffersItem,
    RichTextContent,
    SignupContent,
    SitePage,
    SitePageDetails,
    SitePageSection,
    SitePageSectionType,
    TermsContent,
    WelcomeContent
} from '@/lib/site-pages.types';
import type { SiteSettings } from '@/lib/site-settings.types';

type PreviewMode = 'mobile' | 'desktop';
type PanelView = 'assets' | 'edit';
type SectionContentPatch = Partial<
    WelcomeContent & TermsContent & RichTextContent & SignupContent & DirectoryContent & OffersContent
>;

interface SitePageEditorProps {
    page: SitePage;
    settings: SiteSettings;
    offers: CmsOffer[];
    operators: CmsOperator[];
}

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function SitePageEditor({
    page,
    settings,
    offers,
    operators
}: SitePageEditorProps): React.ReactElement {
    const router = useRouter();
    const [details, setDetails] = useState<SitePageDetails>({ name: page.name, slug: page.slug });
    const [sections, setSections] = useState<SitePageSection[]>(page.sections);
    const [offerList, setOfferList] = useState<CmsOffer[]>(offers);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [panelView, setPanelView] = useState<PanelView>('assets');
    const [published, setPublished] = useState(page.status === 'published');
    const [dirty, setDirty] = useState(false);
    const [sectionReorder, setSectionReorder] = useState(false);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [pending, startTransition] = useTransition();
    const [uploading, setUploading] = useState(false);
    const uploadTarget = useRef<{ sectionId: string; key: 'imageLeftSrc' | 'imageRightSrc' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;

    function selectSection(id: string): void {
        setSelectedSectionId(id);
        setPanelView('edit');
    }

    function updateDetails(key: keyof SitePageDetails, value: string): void {
        setDetails((current) => ({ ...current, [key]: key === 'slug' ? toSlug(value) : value }));
        setDirty(true);
    }

    function addSection(type: SitePageSectionType): void {
        const section = createSection(type);
        setSections((current) => [...current, section]);
        selectSection(section.id);
        setDirty(true);
    }

    function removeSection(id: string): void {
        setSections((current) => current.filter((section) => section.id !== id));
        if (selectedSectionId === id) setSelectedSectionId(null);
        setDirty(true);
    }

    function moveSection(index: number, delta: number): void {
        setSections((current) => {
            const target = index + delta;
            if (target < 0 || target >= current.length) return current;
            const next = [...current];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setDirty(true);
    }

    function updateSectionContent(id: string, patch: SectionContentPatch): void {
        setSections((current) =>
            current.map((section) =>
                section.id === id
                    ? ({ ...section, content: { ...section.content, ...patch } } as SitePageSection)
                    : section
            )
        );
        setDirty(true);
    }

    function updateOfferItems(id: string, items: OffersItem[]): void {
        updateSectionContent(id, { items });
    }

    function updateOffer(offerId: string, patch: Partial<CmsOffer>): void {
        setOfferList((current) =>
            current.map((offer) => (offer.id === offerId ? { ...offer, ...patch } : offer))
        );
    }

    async function saveOffer(offerId: string): Promise<void> {
        const offer = offerList.find((item) => item.id === offerId);
        if (offer === undefined) return;
        await saveOfferAction(offerId, {
            operatorId: offer.operatorId,
            headline: offer.headline,
            label: offer.label,
            labelColor: offer.labelColor,
            details: offer.details,
            howToClaimSteps: offer.howToClaimSteps,
            termsText: offer.termsText,
            ctaHref: offer.ctaHref
        });
    }

    function triggerUpload(sectionId: string, key: 'imageLeftSrc' | 'imageRightSrc'): void {
        uploadTarget.current = { sectionId, key };
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
            if (data.path !== undefined) {
                updateSectionContent(target.sectionId, { [target.key]: data.path });
            }
        } finally {
            setUploading(false);
            uploadTarget.current = null;
            if (fileInputRef.current !== null) fileInputRef.current.value = '';
        }
    }

    function save(): void {
        startTransition(async () => {
            await saveSitePageAction(page.id, details, sections);
            notifyCmsChanged();
            setDirty(false);
        });
    }

    function toggleShowOnSite(): void {
        startTransition(async () => {
            await publishSitePageAction(page.id, !published);
            setPublished((current) => !current);
            notifyCmsChanged();
        });
    }

    const inputClass =
        'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
    const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';
    const previewWidth = previewMode === 'mobile' ? '390px' : '1180px';
    const previewHeight = '760px';

    function renderImageField(
        section: { id: string },
        key: 'imageLeftSrc' | 'imageRightSrc',
        label: string,
        src: string
    ): React.ReactElement {
        return (
            <div className={labelClass}>
                {label}
                <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                        <img src={src} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                    <button
                        type="button"
                        onClick={() => triggerUpload(section.id, key)}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                    >
                        <Upload size={14} />
                        {uploading ? 'Uploading…' : 'Upload'}
                    </button>
                </div>
            </div>
        );
    }

    function renderProperties(section: SitePageSection): React.ReactElement {
        if (section.type === 'welcome') {
            return (
                <div className="flex flex-col gap-3">
                    <label className={labelClass}>
                        Highlight word
                        <input
                            value={section.content.textHighlight}
                            onChange={(e) => updateSectionContent(section.id, { textHighlight: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Main text
                        <input
                            value={section.content.text}
                            onChange={(e) => updateSectionContent(section.id, { text: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Suffix (optional)
                        <input
                            value={section.content.textSuffix}
                            onChange={(e) => updateSectionContent(section.id, { textSuffix: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Feature lines (one per line)
                        <LinesTextarea
                            lines={section.content.features}
                            onChange={(features) => updateSectionContent(section.id, { features })}
                            resyncKey={section.id}
                            rows={3}
                            className={inputClass + ' resize-y'}
                        />
                    </label>
                    {renderImageField(section, 'imageLeftSrc', 'Left image', section.content.imageLeftSrc)}
                    {renderImageField(section, 'imageRightSrc', 'Right image', section.content.imageRightSrc)}
                </div>
            );
        }
        if (section.type === 'terms') {
            return (
                <label className={labelClass}>
                    Terms text
                    <textarea
                        value={section.content.text}
                        onChange={(e) => updateSectionContent(section.id, { text: e.target.value })}
                        rows={3}
                        className={inputClass + ' resize-y'}
                    />
                </label>
            );
        }
        if (section.type === 'richText') {
            return (
                <div className="flex flex-col gap-3">
                    <label className={labelClass}>
                        Heading
                        <input
                            value={section.content.heading}
                            onChange={(e) => updateSectionContent(section.id, { heading: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Body
                        <textarea
                            value={section.content.body}
                            onChange={(e) => updateSectionContent(section.id, { body: e.target.value })}
                            rows={6}
                            className={inputClass + ' resize-y'}
                        />
                    </label>
                </div>
            );
        }
        if (section.type === 'signup') {
            return (
                <label className={labelClass}>
                    Heading above form
                    <input
                        value={section.content.heading}
                        onChange={(e) => updateSectionContent(section.id, { heading: e.target.value })}
                        className={inputClass}
                    />
                </label>
            );
        }
        if (section.type === 'offers') {
            return (
                <OffersCollectionEditor
                    items={section.content.items}
                    offers={offerList}
                    operators={operators}
                    onChange={(items) => updateOfferItems(section.id, items)}
                    onOfferChange={updateOffer}
                    onSaveOffer={saveOffer}
                    editOfferHref={(id) =>
                        '/offers/edit/' + id + '?returnTo=' + encodeURIComponent('/pages/edit/' + page.id)
                    }
                />
            );
        }
        return (
            <label className={labelClass}>
                Directory title
                <input
                    value={section.content.title}
                    onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                    className={inputClass}
                />
            </label>
        );
    }

    return (
        <div className="h-full flex">
            <CmsSidebar active="site-page" activePageId={page.id} />
            <div className="flex-1 min-w-0 flex flex-col">
                <header className="flex items-center justify-between px-4 h-14 border-b border-m3-outline-variant shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            type="button"
                            onClick={() => router.push('/home')}
                            aria-label="Back"
                            className="flex items-center justify-center w-9 h-9 rounded-lg border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="min-w-0">
                            <div className="text-[14px] font-medium truncate">{details.name}</div>
                            <div className="text-[11px] text-m3-on-surface-variant">
                                {published ? 'Shown on site' : 'Hidden from site'}
                                {dirty ? ' · unsaved changes' : ''}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleShowOnSite}
                            disabled={pending || details.slug.trim() === ''}
                            role="switch"
                            aria-checked={published}
                            className={
                                'flex items-center gap-2 text-[13px] font-medium px-3 py-2 rounded-lg border transition-colors disabled:opacity-40 ' +
                                (published
                                    ? 'border-m3-gold text-m3-on-surface'
                                    : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                            }
                        >
                            {published ? <Eye size={15} className="text-m3-gold" /> : <EyeOff size={15} />}
                            Show on site
                            <span
                                className={
                                    'ml-1 inline-flex items-center w-8 h-4 rounded-full transition-colors ' +
                                    (published ? 'bg-m3-gold' : 'bg-m3-surface-highest')
                                }
                            >
                                <span
                                    className={
                                        'inline-block w-3 h-3 rounded-full bg-white transition-transform ' +
                                        (published ? 'translate-x-4' : 'translate-x-1')
                                    }
                                />
                            </span>
                        </button>
                        <ThemeToggle />
                    </div>
                </header>

                <div className="flex-1 min-h-0 flex">
                    <aside className="w-[360px] shrink-0 border-r border-m3-outline-variant bg-m3-surface-lowest flex flex-col min-h-0">
                        <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-5">
                            <div className="flex items-center rounded-lg border border-m3-outline-variant bg-m3-surface-low p-1">
                                <button
                                    type="button"
                                    onClick={() => setPanelView('assets')}
                                    className={
                                        'flex-1 h-8 rounded-md text-[12px] font-medium transition-colors ' +
                                        (panelView === 'assets'
                                            ? 'bg-m3-gold text-m3-on-gold'
                                            : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
                                    }
                                >
                                    Assets
                                </button>
                                <button
                                    type="button"
                                    onClick={() => selectedSection !== null && setPanelView('edit')}
                                    disabled={selectedSection === null}
                                    className={
                                        'flex-1 h-8 rounded-md text-[12px] font-medium transition-colors disabled:opacity-40 ' +
                                        (panelView === 'edit'
                                            ? 'bg-m3-gold text-m3-on-gold'
                                            : 'text-m3-on-surface-variant hover:bg-m3-surface-high')
                                    }
                                >
                                    Edit
                                </button>
                            </div>

                            {panelView === 'assets' && (
                                <>
                                    <section className="flex flex-col gap-3">
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Page setup
                                        </div>
                                        <label className={labelClass}>
                                            Page name
                                            <input
                                                value={details.name}
                                                onChange={(e) => updateDetails('name', e.target.value)}
                                                className={inputClass}
                                            />
                                        </label>
                                        <label className={labelClass}>
                                            URL slug
                                            <div className="flex items-center rounded-md border border-m3-outline-variant bg-m3-surface-low focus-within:border-m3-gold">
                                                <span className="pl-3 text-[12px] text-m3-on-surface-variant">/</span>
                                                <input
                                                    value={details.slug}
                                                    onChange={(e) => updateDetails('slug', e.target.value)}
                                                    className="w-full bg-transparent px-1 py-2 text-[13px] text-m3-on-surface focus:outline-none"
                                                />
                                            </div>
                                        </label>
                                        <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-[12px] text-m3-on-surface-variant leading-5">
                                            Logo/navigation, USP strip, and footer are always included on new pages.
                                        </div>
                                    </section>

                                    <section className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                                Page content
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
                                        {sections.length === 0 && (
                                            <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                                Add assets below to build the body of this page.
                                            </div>
                                        )}
                                        {sections.map((section, index) => (
                                            <div
                                                key={section.id}
                                                onClick={() => !sectionReorder && selectSection(section.id)}
                                                className={
                                                    'flex items-center gap-2 rounded-lg border p-2 ' +
                                                    (selectedSectionId === section.id && !sectionReorder
                                                        ? 'border-m3-gold ring-1 ring-m3-gold'
                                                        : 'border-m3-outline-variant') +
                                                    (sectionReorder ? '' : ' cursor-pointer hover:bg-m3-surface-high')
                                                }
                                            >
                                                <span className="w-6 text-center text-[12px] text-m3-on-surface-variant">
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 flex-1 text-[13px] font-medium">
                                                    {sectionTypeLabel(section.type)}
                                                </div>
                                                {sectionReorder ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            aria-label="Move up"
                                                            disabled={index === 0}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                moveSection(index, -1);
                                                            }}
                                                            className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                        >
                                                            <ChevronUp size={15} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            aria-label="Move down"
                                                            disabled={index === sections.length - 1}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                moveSection(index, 1);
                                                            }}
                                                            className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                                        >
                                                            <ChevronDown size={15} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        aria-label="Remove section"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeSection(section.id);
                                                        }}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md text-m3-error hover:bg-m3-error-container"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </section>

                                    <section className="flex flex-col gap-2">
                                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                            Add assets
                                        </div>
                                        {SITE_PAGE_ASSETS.map((asset) => (
                                            <button
                                                key={asset.type}
                                                type="button"
                                                onClick={() => addSection(asset.type)}
                                                className="flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-left hover:bg-m3-surface-high"
                                            >
                                                <Plus size={15} className="shrink-0 text-m3-on-surface-variant" />
                                                <span className="min-w-0">
                                                    <span className="block text-[13px] font-medium">{asset.label}</span>
                                                    <span className="block text-[11px] text-m3-on-surface-variant">
                                                        {asset.description}
                                                    </span>
                                                </span>
                                            </button>
                                        ))}
                                        <p className="text-[11px] text-m3-on-surface-variant leading-relaxed">
                                            Adding an asset opens it in the Edit tab.
                                        </p>
                                    </section>
                                </>
                            )}

                            {panelView === 'edit' && selectedSection === null && (
                                <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                                    Select an asset from the Assets tab to edit it here.
                                </div>
                            )}

                            {panelView === 'edit' && selectedSection !== null && (
                                <section className="flex flex-col gap-3">
                                    <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                        {sectionTypeLabel(selectedSection.type)} content
                                    </div>
                                    {renderProperties(selectedSection)}
                                </section>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={onPickImage}
                                className="hidden"
                            />
                        </div>

                        <div className="shrink-0 border-t border-m3-outline-variant bg-m3-surface-lowest/95 backdrop-blur p-4">
                            <button
                                type="button"
                                onClick={save}
                                disabled={pending || !dirty}
                                className="w-full flex items-center justify-center gap-1.5 text-[13px] font-medium px-3.5 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                            >
                                {pending ? 'Saving...' : dirty ? 'Save changes' : 'Saved'}
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
                                        (previewMode === 'mobile' ? 'bg-m3-gold text-m3-on-gold hover:bg-m3-gold' : '')
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
                                        (previewMode === 'desktop' ? 'bg-m3-gold text-m3-on-gold hover:bg-m3-gold' : '')
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
                                        <SitePageView
                                            sections={sections}
                                            settings={settings}
                                            offers={offerList}
                                            operators={operators}
                                            editable
                                            selectedSectionId={selectedSectionId}
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
    );
}
