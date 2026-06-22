'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import { saveHomeConfigAction, saveOfferAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { CmsSidebar } from '@/components/cms-sidebar';
import { PageAssetsPanel } from '@/components/page-assets-panel';
import { PreviewFrame } from '@/components/preview-frame';
import { SectionProperties } from '@/components/section-properties';
import { SitePageView } from '@/components/site-page-view';
import { ThemeToggle } from '@/components/theme-toggle';
import { SITE_PAGE_ASSETS, createSection, sectionTypeLabel } from '@/lib/site-page-content';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';
import type { HomePageConfig } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';
import type {
    DirectoryContent,
    DirectorySignupContent,
    ImageContent,
    OffersContent,
    OffersItem,
    RichTextContent,
    SignupContent,
    SitePageSection,
    SitePageSectionType,
    TermsContent,
    WelcomeContent
} from '@/lib/site-pages.types';

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

interface HomeEditorProps {
    config: HomePageConfig;
    offers: CmsOffer[];
    operators: CmsOperator[];
    settings: SiteSettings;
}

export function HomeEditor({
    config,
    offers,
    operators,
    settings
}: HomeEditorProps): React.ReactElement {
    const router = useRouter();
    const [sections, setSections] = useState<SitePageSection[]>(
        config.sections.filter((section) => section.type !== 'directorySignup')
    );
    const [offerList, setOfferList] = useState<CmsOffer[]>(offers);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [panelView, setPanelView] = useState<PanelView>('assets');
    const [sectionReorder, setSectionReorder] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [saving, startSave] = useTransition();

    const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? null;

    function selectSection(id: string): void {
        setSelectedSectionId(id);
        setPanelView('edit');
    }

    function addSection(type: SitePageSectionType): void {
        setSections((current) => [...current, createSection(type)]);
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
        notifyCmsChanged();
    }

    function save(): void {
        startSave(async () => {
            await saveHomeConfigAction({ sections, updatedAt: config.updatedAt });
            notifyCmsChanged();
            setDirty(false);
        });
    }

    const previewWidth = previewMode === 'mobile' ? '390px' : '1180px';
    const previewHeight = '760px';

    return (
        <div className="h-full flex flex-col">
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
                                    {sections.length} asset{sections.length === 1 ? '' : 's'}
                                    {dirty ? ' · unsaved changes' : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={process.env.NEXT_PUBLIC_SFB_SITE_URL ?? 'http://localhost:3002'}
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
                                    <PageAssetsPanel
                                        intro={
                                            <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-[12px] text-m3-on-surface-variant leading-5">
                                                Logo/navigation, USP strip, and footer are always included on
                                                the home page.
                                            </div>
                                        }
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
                                        emptyHint="Add assets below to build the home page body."
                                    />
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
                                            onOffersItemsChange={(items) =>
                                                updateOfferItems(selectedSection.id, items)
                                            }
                                            editOfferHref={(id) => '/offers/edit/' + id + '?returnTo=/home'}
                                        />
                                    </section>
                                )}
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
        </div>
    );
}
