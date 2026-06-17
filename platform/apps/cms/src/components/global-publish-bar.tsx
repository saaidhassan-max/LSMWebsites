'use client';

import type React from 'react';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CloudUpload, Dot } from 'lucide-react';
import { getPublishStatusAction, publishSiteAction } from '@/app/actions';
import { CMS_CHANGED_EVENT } from '@/lib/cms-events';

function isHiddenPath(pathname: string): boolean {
    return pathname.startsWith('/login') || pathname.startsWith('/auth');
}

export function GlobalPublishBar(): React.ReactElement | null {
    const pathname = usePathname();
    const router = useRouter();
    const [hasChanges, setHasChanges] = useState(false);
    const [publishing, startPublish] = useTransition();
    const hidden = isHiddenPath(pathname ?? '');

    const refreshStatus = useCallback(async (): Promise<void> => {
        try {
            const status = await getPublishStatusAction();
            setHasChanges(status.hasUnpublishedChanges);
        } catch {
            setHasChanges(false);
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
        <div className="shrink-0 h-12 w-full border-b border-m3-outline-variant bg-m3-surface-lowest px-4 flex items-center justify-end gap-3">
            <span className="flex items-center gap-1 text-[12px] text-m3-on-surface-variant">
                {hasChanges ? (
                    <>
                        <Dot size={20} className="-mx-1.5 text-m3-gold" />
                        Unpublished changes
                    </>
                ) : (
                    'All changes published'
                )}
            </span>
            <button
                type="button"
                onClick={publish}
                disabled={!hasChanges || publishing}
                className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <CloudUpload size={15} />
                {publishing ? 'Publishing…' : 'Publish'}
            </button>
        </div>
    );
}
