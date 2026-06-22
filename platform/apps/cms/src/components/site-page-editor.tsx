'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, Monitor, Smartphone } from 'lucide-react';
import { publishSitePageAction, saveOfferAction, saveSitePageAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { CmsSidebar } from '@/components/cms-sidebar';
import { PageAssetsPanel } from '@/components/page-assets-panel';
import { PreviewFrame } from '@/components/preview-frame';
import { SectionProperties } from '@/components/section-properties';
import { SitePageView } from '@/components/site-page-view';
import { ThemeToggle } from '@/components/theme-toggle';
import { SITE_PAGE_ASSETS, createSection, sectionTypeLabel } from '@/lib/site-page-content';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';
import type {
    DirectoryContent,
    DirectorySignupContent,
    ImageContent,
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
    WelcomeContent &
        TermsContent &
        RichTextContent &
        SignupContent &
        DirectoryContent &
        DirectorySignupContent &
        OffersContent &
        ImageContent
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
    const [sections, setSections] = useState<SitePageSection[]>(
        page.sections.filter((section) => section.type !== 'directorySignup')
    );
    const [offerList, setOfferList] = useState<CmsOffer[]>(offers);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [panelView, setPanelView] = useState<PanelView>('assets');
    const [published, setPublished] = useState(page.status === 'published');
    const [dirty, setDirty] = useState(false);
    const [sectionReorder, setSectionReorder] = useState(false);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [pending, startTransition] = useTransition();

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
            ctaHref: offer.ctaHref,
            startDate: offer.startDate,
            endDate: offer.endDate,
            banner: offer.banner
        });
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

                                    <PageAssetsPanel
                                        items={sections.map((section) => ({
                                            key: section.id,
                                            label: sectionTypeLabel(section.type)
                                        }))}
                                        assets={SITE_PAGE_ASSETS.map((asset) => ({
                                            type: asset.type,
                                            label: asset.label,
                                            description: asset.description
                                        }))}
                                        selectedKey={selectedSectionId}
                                        reorder={sectionReorder}
                                        onToggleReorder={() => setSectionReorder((value) => !value)}
                                        onSelect={selectSection}
                                        onRemove={removeSection}
                                        onMove={moveSection}
                                        onAdd={(type) => addSection(type as SitePageSectionType)}
                                        emptyHint="Add assets below to build the body of this page."
                                    />
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
                                    <SectionProperties
                                        section={selectedSection}
                                        onChange={(patch) => updateSectionContent(selectedSection.id, patch)}
                                        offers={offerList}
                                        operators={operators}
                                        onOfferChange={updateOffer}
                                        onSaveOffer={saveOffer}
                                        onOffersItemsChange={(items) => updateOfferItems(selectedSection.id, items)}
                                        editOfferHref={(id) =>
                                            '/offers/edit/' + id + '?returnTo=' + encodeURIComponent('/pages/edit/' + page.id)
                                        }
                                    />
                                </section>
                            )}
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
