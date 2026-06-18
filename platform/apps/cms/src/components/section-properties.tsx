'use client';

import type React from 'react';
import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { AssetPickerModal } from '@/components/asset-picker-modal';
import { LinesTextarea } from '@/components/lines-textarea';
import { OffersCollectionEditor } from '@/components/offers-collection-editor';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';
import type {
    DirectoryContent,
    DirectorySignupContent,
    ImageContent,
    OffersContent,
    OffersItem,
    RichTextContent,
    SignupContent,
    SitePageSection,
    TermsContent,
    WelcomeContent
} from '@/lib/site-pages.types';

type ContentPatch = Partial<
    WelcomeContent &
        TermsContent &
        RichTextContent &
        SignupContent &
        DirectoryContent &
        DirectorySignupContent &
        OffersContent &
        ImageContent
>;

type UploadKey = 'imageLeftSrc' | 'imageRightSrc' | 'src';

interface SectionPropertiesProps {
    section: SitePageSection;
    onChange: (patch: ContentPatch) => void;
    offers: CmsOffer[];
    operators: CmsOperator[];
    onOfferChange: (offerId: string, patch: Partial<CmsOffer>) => void;
    onSaveOffer: (offerId: string) => Promise<void>;
    onOffersItemsChange: (items: OffersItem[]) => void;
    editOfferHref: (id: string) => string;
}

const inputClass =
    'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';

export function SectionProperties({
    section,
    onChange,
    offers,
    operators,
    onOfferChange,
    onSaveOffer,
    onOffersItemsChange,
    editOfferHref
}: SectionPropertiesProps): React.ReactElement {
    const [pickerTarget, setPickerTarget] = useState<UploadKey | null>(null);

    function renderImageField(key: UploadKey, label: string, src: string): React.ReactElement {
        return (
            <div className={labelClass}>
                {label}
                <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                        <img src={src} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                    <button
                        type="button"
                        onClick={() => setPickerTarget(key)}
                        className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high"
                    >
                        <ImagePlus size={14} />
                        Choose or upload
                    </button>
                </div>
            </div>
        );
    }

    function body(): React.ReactElement {
        if (section.type === 'welcome') {
            const content = section.content;
            return (
                <div className="flex flex-col gap-3">
                    <label className={labelClass}>
                        Highlight word
                        <input
                            value={content.textHighlight}
                            onChange={(e) => onChange({ textHighlight: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Main text
                        <input
                            value={content.text}
                            onChange={(e) => onChange({ text: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Suffix (optional)
                        <input
                            value={content.textSuffix}
                            onChange={(e) => onChange({ textSuffix: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Feature lines (one per line)
                        <LinesTextarea
                            lines={content.features}
                            onChange={(features) => onChange({ features })}
                            resyncKey={section.id}
                            rows={3}
                            className={inputClass + ' resize-y'}
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={labelClass}>
                            Mobile left width
                            <input
                                type="number"
                                value={content.imageLeftWidthMobile}
                                onChange={(e) =>
                                    onChange({ imageLeftWidthMobile: Number(e.target.value) || 83 })
                                }
                                className={inputClass}
                            />
                        </label>
                        <label className={labelClass}>
                            Desktop left width
                            <input
                                type="number"
                                value={content.imageLeftWidthDesktop}
                                onChange={(e) =>
                                    onChange({ imageLeftWidthDesktop: Number(e.target.value) || 204 })
                                }
                                className={inputClass}
                            />
                        </label>
                    </div>
                    {renderImageField('imageLeftSrc', 'Left image', content.imageLeftSrc)}
                    {renderImageField('imageRightSrc', 'Right image', content.imageRightSrc)}
                </div>
            );
        }
        if (section.type === 'terms') {
            return (
                <label className={labelClass}>
                    Terms text
                    <textarea
                        value={section.content.text}
                        onChange={(e) => onChange({ text: e.target.value })}
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
                            onChange={(e) => onChange({ heading: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Body
                        <textarea
                            value={section.content.body}
                            onChange={(e) => onChange({ body: e.target.value })}
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
                        onChange={(e) => onChange({ heading: e.target.value })}
                        className={inputClass}
                    />
                </label>
            );
        }
        if (section.type === 'directory') {
            return (
                <label className={labelClass}>
                    Directory title
                    <input
                        value={section.content.title}
                        onChange={(e) => onChange({ title: e.target.value })}
                        className={inputClass}
                    />
                </label>
            );
        }
        if (section.type === 'directorySignup') {
            return (
                <div className="flex flex-col gap-3">
                    <label className={labelClass}>
                        Directory title
                        <input
                            value={section.content.directoryTitle}
                            onChange={(e) => onChange({ directoryTitle: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Signup heading
                        <input
                            value={section.content.signupHeading}
                            onChange={(e) => onChange({ signupHeading: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                </div>
            );
        }
        if (section.type === 'image') {
            const content = section.content;
            return (
                <div className="flex flex-col gap-3">
                    {renderImageField('src', 'Image', content.src)}
                    <label className={labelClass}>
                        Alt text (for accessibility)
                        <input
                            value={content.alt}
                            onChange={(e) => onChange({ alt: e.target.value })}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Link URL (optional)
                        <input
                            value={content.href}
                            onChange={(e) => onChange({ href: e.target.value })}
                            placeholder="https://"
                            className={inputClass}
                        />
                    </label>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-m3-on-surface-variant pt-1">
                        Desktop size
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={labelClass}>
                            Width (px)
                            <input
                                type="number"
                                min={1}
                                value={content.desktopWidth}
                                onChange={(e) =>
                                    onChange({ desktopWidth: Math.max(1, Number(e.target.value) || 0) })
                                }
                                className={inputClass}
                            />
                        </label>
                        <label className={labelClass}>
                            Height (px)
                            <input
                                type="number"
                                min={1}
                                value={content.desktopHeight}
                                onChange={(e) =>
                                    onChange({ desktopHeight: Math.max(1, Number(e.target.value) || 0) })
                                }
                                className={inputClass}
                            />
                        </label>
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-m3-on-surface-variant pt-1">
                        Mobile size
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={labelClass}>
                            Width (px)
                            <input
                                type="number"
                                min={1}
                                value={content.mobileWidth}
                                onChange={(e) =>
                                    onChange({ mobileWidth: Math.max(1, Number(e.target.value) || 0) })
                                }
                                className={inputClass}
                            />
                        </label>
                        <label className={labelClass}>
                            Height (px)
                            <input
                                type="number"
                                min={1}
                                value={content.mobileHeight}
                                onChange={(e) =>
                                    onChange({ mobileHeight: Math.max(1, Number(e.target.value) || 0) })
                                }
                                className={inputClass}
                            />
                        </label>
                    </div>
                </div>
            );
        }
        return (
            <OffersCollectionEditor
                items={section.content.items}
                offers={offers}
                operators={operators}
                onChange={onOffersItemsChange}
                onOfferChange={onOfferChange}
                onSaveOffer={onSaveOffer}
                editOfferHref={editOfferHref}
            />
        );
    }

    return (
        <>
            {body()}
            <AssetPickerModal
                open={pickerTarget !== null}
                onClose={() => setPickerTarget(null)}
                onSelect={(path) => {
                    if (pickerTarget !== null) onChange({ [pickerTarget]: path } as ContentPatch);
                }}
            />
        </>
    );
}
