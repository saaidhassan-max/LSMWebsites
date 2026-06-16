'use client';

import type React from 'react';
import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, CloudUpload, ExternalLink, EyeOff, Monitor, Smartphone, Upload } from 'lucide-react';
import { saveContentAction, saveDetailsAction, publishAction } from '@/app/actions';
import type { LandingPage, LandingPageContent, LandingPageDetails } from '@/lib/landing-pages.types';
import type { SiteSettings } from '@/lib/site-settings.types';
import { ThemeToggle } from '@/components/theme-toggle';
import { LandingPageView } from '@/components/landing-page-view';
import { PreviewFrame } from '@/components/preview-frame';

type FieldKey = keyof LandingPageContent;
type PreviewMode = 'mobile' | 'desktop';

interface FieldDef {
    key: FieldKey;
    label: string;
    type: 'text' | 'textarea' | 'image';
}

interface FieldSection {
    title: string;
    fields: FieldDef[];
}

const FIELD_SECTIONS: FieldSection[] = [
    {
        title: 'Hero section',
        fields: [
            { key: 'heroPrefix', label: 'Top line', type: 'text' },
            { key: 'heroHeadline', label: 'Offer headline', type: 'text' },
            { key: 'heroSubline', label: 'Sub line', type: 'text' }
        ]
    },
    {
        title: 'Background image',
        fields: [{ key: 'backgroundImage', label: 'Image', type: 'image' }]
    },
    {
        title: 'Form section',
        fields: [{ key: 'instructionText', label: 'Instruction text', type: 'textarea' }]
    },
    {
        title: 'Buttons',
        fields: [
            { key: 'primaryCtaText', label: 'Primary button (sign up)', type: 'text' },
            { key: 'secondaryCtaText', label: 'Secondary button (skip)', type: 'text' }
        ]
    },
    {
        title: 'Legal / T&Cs',
        fields: [{ key: 'legalDisclaimer', label: 'Terms & conditions', type: 'textarea' }]
    }
];

interface LandingEditorProps {
    page: LandingPage;
    settings: SiteSettings;
}

export function LandingEditor({ page, settings }: LandingEditorProps): React.ReactElement {
    const router = useRouter();
    const [details, setDetails] = useState<LandingPageDetails>({
        name: page.name,
        slug: page.slug
    });
    const [content, setContent] = useState<LandingPageContent>(page.content);
    const [selected, setSelected] = useState<FieldKey | null>(null);
    const [dirty, setDirty] = useState(false);
    const [published, setPublished] = useState(page.status === 'published');
    const [updatedAt, setUpdatedAt] = useState(page.updatedAt);
    const [publishedAt, setPublishedAt] = useState(page.publishedAt);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
    const [saving, startSave] = useTransition();
    const [uploading, setUploading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    function update(key: FieldKey, value: string): void {
        setContent((c) => ({ ...c, [key]: value }));
        setDirty(true);
    }

    function updateDetails(key: keyof LandingPageDetails, value: string): void {
        setDetails((d) => ({ ...d, [key]: key === 'slug' ? toSlug(value) : value }));
        setDirty(true);
    }

    function toSlug(value: string): string {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function formatDateTime(value: string | null): string {
        if (value === null) return 'Not published';
        return new Date(value).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function selectField(key: FieldKey): void {
        setSelected(key);
        const el = fieldRefs.current[key];
        if (el !== null && el !== undefined) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.remove('cms-field-flash');
            void el.offsetWidth;
            el.classList.add('cms-field-flash');
        }
    }

    function save(): void {
        startSave(async () => {
            await saveDetailsAction(page.id, details);
            await saveContentAction(page.id, content);
            setUpdatedAt(new Date().toISOString());
            setDirty(false);
        });
    }

    function togglePublish(): void {
        startSave(async () => {
            await saveDetailsAction(page.id, details);
            await saveContentAction(page.id, content);
            await publishAction(page.id, !published);
            const nextPublished = !published;
            setPublished(nextPublished);
            setPublishedAt(nextPublished ? new Date().toISOString() : null);
            setUpdatedAt(new Date().toISOString());
            setDirty(false);
        });
    }

    function openPreview(): void {
        window.open('/preview/' + details.slug, '_blank');
    }

    function requestImageUpload(): void {
        selectField('backgroundImage');
        fileInputRef.current?.click();
    }

    async function onPickImage(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.target.files?.[0];
        if (file === undefined) return;
        setUploading(true);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const data = (await res.json()) as { path?: string };
            if (data.path !== undefined) update('backgroundImage', data.path);
        } finally {
            setUploading(false);
            if (fileInputRef.current !== null) fileInputRef.current.value = '';
        }
    }

    const inputClass =
        'w-full text-[13px] rounded-md border border-m3-outline-variant bg-m3-surface-lowest px-3 py-2 text-m3-on-surface focus:outline-none focus:border-m3-gold';
    const previewWidth = previewMode === 'mobile' ? '390px' : '1180px';
    const previewHeight = previewMode === 'mobile' ? '760px' : '760px';
    const previewLabel = previewMode === 'mobile' ? 'Mobile preview' : 'Desktop preview';
    const canSave = details.name.trim() !== '' && details.slug.trim() !== '';
    const previewUrl = '/preview/' + details.slug;

    return (
        <div className="h-screen flex flex-col">
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
                        <div className="text-[14px] font-medium truncate">{details.name}</div>
                        <div className="text-[11px] text-m3-on-surface-variant">
                            {published ? 'Published' : 'Draft'}
                            {dirty ? ' · unsaved changes' : ''}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={save}
                        disabled={saving || !dirty || !canSave}
                        className="text-[13px] font-medium px-3.5 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high disabled:opacity-40"
                    >
                        {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={togglePublish}
                        disabled={saving || !canSave}
                        className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                    >
                        {published ? <EyeOff size={15} /> : <CloudUpload size={15} />}
                        {published ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            </header>

            <div className="flex-1 min-h-0 flex">
                <aside className="w-[320px] shrink-0 border-r border-m3-outline-variant overflow-y-auto p-4 flex flex-col gap-4">
                    <section className="flex flex-col gap-3">
                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                            Page settings
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] text-m3-on-surface-variant">Page name</label>
                            <input
                                className={inputClass}
                                value={details.name}
                                onChange={(e) => updateDetails('name', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] text-m3-on-surface-variant">URL slug</label>
                            <div className="flex items-center rounded-md border border-m3-outline-variant bg-m3-surface-lowest focus-within:border-m3-gold">
                                <span className="pl-3 text-[12px] text-m3-on-surface-variant">/signup/</span>
                                <input
                                    className="w-full text-[13px] bg-transparent px-1 py-2 text-m3-on-surface focus:outline-none"
                                    value={details.slug}
                                    onChange={(e) => updateDetails('slug', e.target.value)}
                                />
                            </div>
                            {details.slug.trim() === '' && (
                                <p className="text-[11px] text-m3-error">Slug is required.</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-m3-on-surface-variant">
                            <div className="rounded-md bg-m3-surface-low p-2">
                                <div>Status</div>
                                <div className="text-m3-on-surface font-medium">
                                    {published ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            <div className="rounded-md bg-m3-surface-low p-2">
                                <div>Updated</div>
                                <div className="text-m3-on-surface font-medium">{formatDateTime(updatedAt)}</div>
                            </div>
                        </div>
                        <div className="rounded-md bg-m3-surface-low p-2 text-[11px] text-m3-on-surface-variant">
                            <div>Published</div>
                            <div className="text-m3-on-surface font-medium">{formatDateTime(publishedAt)}</div>
                        </div>
                        <button
                            type="button"
                            onClick={openPreview}
                            disabled={details.slug.trim() === ''}
                            className="flex items-center justify-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                        >
                            <ExternalLink size={14} />
                            Open {previewUrl}
                        </button>
                    </section>
                    {FIELD_SECTIONS.map((section) => (
                        <section key={section.title} className="flex flex-col gap-3 pt-2">
                            <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                                {section.title}
                            </div>
                            {section.fields.map((field) => (
                                <div
                                    key={field.key}
                                    ref={(el) => {
                                        fieldRefs.current[field.key] = el;
                                    }}
                                    className={
                                        'flex flex-col gap-1.5 rounded-md p-2 -m-2 ' +
                                        (selected === field.key ? 'ring-2 ring-m3-gold' : '')
                                    }
                                >
                                    <label className="text-[12px] text-m3-on-surface-variant">{field.label}</label>
                                    {field.type === 'text' && (
                                        <input
                                            className={inputClass}
                                            value={content[field.key]}
                                            onFocus={() => setSelected(field.key)}
                                            onChange={(e) => update(field.key, e.target.value)}
                                        />
                                    )}
                                    {field.type === 'textarea' && (
                                        <textarea
                                            className={inputClass + ' min-h-[88px] resize-y'}
                                            value={content[field.key]}
                                            onFocus={() => setSelected(field.key)}
                                            onChange={(e) => update(field.key, e.target.value)}
                                        />
                                    )}
                                    {field.type === 'image' && (
                                        <div className="flex flex-col gap-2">
                                            <div className="h-20 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={content.backgroundImage}
                                                    alt="Background preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={requestImageUpload}
                                                disabled={uploading}
                                                className="flex items-center justify-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high disabled:opacity-40"
                                            >
                                                <Upload size={14} />
                                                {uploading ? 'Uploading…' : 'Upload new image'}
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={onPickImage}
                                                className="hidden"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    ))}
                    <p className="text-[11px] text-m3-on-surface-variant leading-relaxed pt-2">
                        <Check size={12} className="inline mr-1 -mt-0.5" />
                        Click any text or the image in the preview to jump to its field.
                    </p>
                </aside>

                <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-m3-surface-low">
                    <div className="h-12 shrink-0 border-b border-m3-outline-variant px-4 flex items-center justify-between gap-3">
                        <div className="text-[12px] text-m3-on-surface-variant">{previewLabel}</div>
                        <div className="flex items-center rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-1">
                            <button
                                type="button"
                                onClick={() => setPreviewMode('mobile')}
                                aria-label="Show mobile preview"
                                aria-pressed={previewMode === 'mobile'}
                                title="Mobile preview"
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
                                title="Desktop preview"
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
                                    <LandingPageView
                                        content={content}
                                        settings={settings}
                                        editable
                                        selectedField={selected}
                                        onSelectField={selectField}
                                        onRequestImageUpload={requestImageUpload}
                                    />
                                </PreviewFrame>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
