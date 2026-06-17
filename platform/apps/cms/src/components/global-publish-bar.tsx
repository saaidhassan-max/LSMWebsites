'use client';

import type React from 'react';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, CloudUpload, Dot } from 'lucide-react';
import { getPublishStatusAction, publishSiteAction } from '@/app/actions';
import { CMS_CHANGED_EVENT } from '@/lib/cms-events';

interface PublishBarStatus {
    hasUnpublishedChanges: boolean;
    changes: string[];
}

function isHiddenPath(pathname: string): boolean {
    return pathname.startsWith('/login') || pathname.startsWith('/auth');
}

export function GlobalPublishBar(): React.ReactElement | null {
    const pathname = usePathname();
    const router = useRouter();
    const [status, setStatus] = useState<PublishBarStatus>({ hasUnpublishedChanges: false, changes: [] });
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [publishing, startPublish] = useTransition();
    const hidden = isHiddenPath(pathname ?? '');
    const visibleChanges = status.changes.slice(0, 8);
    const extraChanges = Math.max(0, status.changes.length - visibleChanges.length);

    const refreshStatus = useCallback(async (): Promise<void> => {
        try {
            const nextStatus = await getPublishStatusAction();
            setStatus({
                hasUnpublishedChanges: nextStatus.hasUnpublishedChanges,
                changes: nextStatus.changes
            });
            if (!nextStatus.hasUnpublishedChanges) setDetailsOpen(false);
        } catch {
            setStatus({ hasUnpublishedChanges: false, changes: [] });
            setDetailsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (hidden) return;
        void refreshStatus();
        window.addEventListener(CMS_CHANGED_EVENT, refreshStatus);
        return () => window.removeEventListener(CMS_CHANGED_EVENT, refreshStatus);
    }, [hidden, refreshStatus]);

    if (hidden) return null;

    function publish(): void {
        startPublish(async () => {
            await publishSiteAction();
            await refreshStatus();
            router.refresh();
        });
    }

    return (
        <div className="shrink-0 w-full border-b border-m3-outline-variant bg-m3-surface-lowest">
            <div className="h-12 px-4 flex items-center justify-end gap-3">
                <span className="flex items-center gap-1 text-[12px] text-m3-on-surface-variant">
                    {status.hasUnpublishedChanges ? (
                        <>
                            <Dot size={20} className="-mx-1.5 text-m3-gold" />
                            Unpublished changes
                        </>
                    ) : (
                        'All changes published'
                    )}
                </span>
                {status.hasUnpublishedChanges && (
                    <button
                        type="button"
                        onClick={() => setDetailsOpen((current) => !current)}
                        className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-lg border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high transition"
                    >
                        Changes
                        <ChevronDown
                            size={14}
                            className={'transition-transform ' + (detailsOpen ? 'rotate-180' : '')}
                        />
                    </button>
                )}
                <button
                    type="button"
                    onClick={publish}
                    disabled={!status.hasUnpublishedChanges || publishing}
                    className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <CloudUpload size={15} />
                    {publishing ? 'Publishing…' : 'Publish'}
                </button>
            </div>
            {detailsOpen && status.hasUnpublishedChanges && (
                <div className="border-t border-m3-outline-variant px-4 py-2 bg-m3-surface-low">
                    <div className="w-full">
                        <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant mb-2">
                            Waiting to publish
                        </div>
                        <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-5 gap-y-1.5 max-h-32 overflow-y-auto pr-2 text-[12px] leading-4 text-m3-on-surface">
                            {visibleChanges.map((change, index) => (
                                <li key={change + '-' + index} className="flex min-w-0 items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-m3-gold shrink-0" />
                                    <span className="min-w-0">{change}</span>
                                </li>
                            ))}
                            {extraChanges > 0 && (
                                <li className="text-m3-on-surface-variant">+ {extraChanges} more changes</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
