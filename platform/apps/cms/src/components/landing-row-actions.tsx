'use client';

import type React from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, ExternalLink, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { duplicateAction, deleteAction, publishAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';

interface LandingRowActionsProps {
    id: string;
    slug: string;
    published: boolean;
}

export function LandingRowActions({ id, slug, published }: LandingRowActionsProps): React.ReactElement {
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    function onPreview(): void {
        window.open('/preview/' + slug, '_blank');
    }

    function onDuplicate(): void {
        startTransition(() => duplicateAction(id));
    }

    function onTogglePublish(): void {
        startTransition(async () => {
            await publishAction(id, !published);
            notifyCmsChanged();
            router.refresh();
        });
    }

    function onEdit(): void {
        router.push('/edit/' + id);
    }

    function onDelete(): void {
        const ok = window.confirm('Delete this landing page? This cannot be undone.');
        if (ok) {
            startTransition(async () => {
                await deleteAction(id);
                notifyCmsChanged();
                router.refresh();
            });
        }
    }

    const primaryClass =
        'flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high transition-colors disabled:opacity-40';
    const iconClass =
        'flex items-center justify-center w-8 h-8 rounded-md text-m3-on-surface-variant hover:bg-m3-surface-high transition-colors disabled:opacity-40';
    const dangerClass =
        'flex items-center justify-center w-8 h-8 rounded-md text-m3-error hover:bg-m3-error-container transition-colors disabled:opacity-40';

    return (
        <div className="flex items-center gap-1.5" data-pending={pending}>
            <button type="button" onClick={onEdit} className={primaryClass} aria-label="Edit" disabled={pending}>
                <Pencil size={17} />
                Edit
            </button>
            <button type="button" onClick={onPreview} className={primaryClass} aria-label="Preview" disabled={pending}>
                <ExternalLink size={17} />
                Preview
            </button>
            <button type="button" onClick={onDuplicate} className={iconClass} aria-label="Duplicate" disabled={pending}>
                <Copy size={17} />
            </button>
            <button
                type="button"
                onClick={onTogglePublish}
                className={iconClass}
                aria-label={published ? 'Hide from site' : 'Show on site'}
                disabled={pending}
            >
                {published ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            <button type="button" onClick={onDelete} className={dangerClass} aria-label="Delete" disabled={pending}>
                <Trash2 size={17} />
            </button>
        </div>
    );
}
