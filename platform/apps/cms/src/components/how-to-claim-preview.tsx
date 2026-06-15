'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react';
import { CmsSidebar } from '@/components/cms-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { PreviewFrame } from '@/components/preview-frame';
import { HowToClaimView } from '@/components/how-to-claim-view';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';

type PreviewMode = 'mobile' | 'desktop';

interface HowToClaimPreviewProps {
    offer: CmsOffer;
    operator: CmsOperator;
}

export function HowToClaimPreview({ offer, operator }: HowToClaimPreviewProps): React.ReactElement {
    const router = useRouter();
    const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');

    const previewWidth = previewMode === 'mobile' ? '390px' : '1180px';
    const previewHeight = '760px';

    return (
        <div className="h-screen flex">
            <CmsSidebar active="offers" />
            <div className="flex-1 min-w-0 flex flex-col">
                <header className="flex items-center justify-between px-4 h-14 border-b border-m3-outline-variant shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            type="button"
                            onClick={() => router.push('/offers/edit/' + offer.id)}
                            aria-label="Back to offer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="min-w-0">
                            <div className="text-[14px] font-medium truncate">
                                How-to-claim page · {offer.headline}
                            </div>
                            <div className="text-[11px] text-m3-on-surface-variant truncate">
                                {operator.name} · /how-to-claim/{operator.slug}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
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
                </header>

                <div className="flex-1 min-h-0 overflow-auto bg-m3-surface-low">
                    <div className="min-w-max p-4 flex flex-col items-center">
                        <div
                            className="rounded-lg overflow-hidden border border-m3-outline-variant shadow-sm bg-surface"
                            style={{ width: previewWidth }}
                        >
                            <PreviewFrame width={previewWidth} height={previewHeight}>
                                <HowToClaimView offer={offer} operator={operator} />
                            </PreviewFrame>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
