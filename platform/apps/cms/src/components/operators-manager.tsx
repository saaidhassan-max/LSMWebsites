'use client';

import type React from 'react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil, Search, Trash2 } from 'lucide-react';
import { deleteOperatorAction, setOperatorStatusAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import type { CmsOperator, CmsRecordStatus } from '@/lib/cms-content.types';

interface OperatorsManagerProps {
    operators: CmsOperator[];
    offerCounts: Record<string, number>;
    highlightedId?: string;
}

type StatusFilter = 'all' | CmsRecordStatus;

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function OperatorsManager({
    operators,
    offerCounts = {},
    highlightedId
}: OperatorsManagerProps): React.ReactElement {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [activeHighlightId, setActiveHighlightId] = useState(highlightedId);
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        setActiveHighlightId(highlightedId);
        if (highlightedId === undefined) return;
        const timeout = window.setTimeout(() => setActiveHighlightId(undefined), 3000);
        return () => window.clearTimeout(timeout);
    }, [highlightedId]);

    const filteredOperators = useMemo(
        () =>
            operators
                .filter((operator) => {
                const matchesStatus = status === 'all' || operator.status === status;
                const searchText = (operator.name + ' ' + operator.slug).toLowerCase();
                const matchesQuery = searchText.includes(query.trim().toLowerCase());
                return matchesStatus && matchesQuery;
            })
                .sort((a, b) => {
                    if (a.id === highlightedId) return -1;
                    if (b.id === highlightedId) return 1;
                    return 0;
                }),
        [highlightedId, operators, query, status]
    );

    function setStatusForOperator(id: string, nextStatus: CmsRecordStatus): void {
        startTransition(async () => {
            await setOperatorStatusAction(id, nextStatus);
            notifyCmsChanged();
            router.refresh();
        });
    }

    function removeOperator(id: string, name: string): void {
        const offerCount = offerCounts[id] ?? 0;
        const message =
            'Deleting "' +
            name +
            '" will permanently remove the operator and its ' +
            offerCount +
            ' offer' +
            (offerCount === 1 ? '' : 's') +
            ' (and remove those cards from the home page). This cannot be undone.\n\nType the operator name to confirm:';
        const typed = window.prompt(message);
        if (typed === null) return;
        if (typed.trim() !== name.trim()) {
            window.alert('Name did not match. Nothing was deleted.');
            return;
        }
        startTransition(async () => {
            await deleteOperatorAction(id);
            notifyCmsChanged();
            router.refresh();
        });
    }

    return (
        <div className="p-6 flex flex-col gap-4 max-w-[1040px]">
            <div className="flex flex-col gap-3 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-4">
                <div className="flex items-center gap-2 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 focus-within:border-m3-gold">
                    <Search size={15} className="text-m3-on-surface-variant shrink-0" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search operators"
                        className="w-full bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                    />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {(['all', 'active', 'hidden'] as StatusFilter[]).map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatus(filter)}
                                aria-pressed={status === filter}
                                className={
                                    'text-[12px] px-3 py-1.5 rounded-md border capitalize transition-colors ' +
                                    (status === filter
                                        ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                        : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                                }
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="text-[12px] text-m3-on-surface-variant">
                        {filteredOperators.length} of {operators.length} operators
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {filteredOperators.map((operator) => (
                    <div
                        key={operator.id}
                        className={
                            'grid grid-cols-[72px_minmax(0,1fr)_auto] gap-4 px-4 py-3 rounded-lg border bg-m3-surface-lowest transition-colors duration-500 ' +
                            (operator.id === activeHighlightId
                                ? 'border-m3-gold'
                                : 'border-m3-outline-variant')
                        }
                    >
                        <div className="h-14 rounded-md bg-m3-surface-low border border-m3-outline-variant overflow-hidden flex items-center justify-center">
                            <img src={operator.logoSrc} alt="" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="text-[13px] font-medium truncate">{operator.name}</div>
                                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-surface-highest text-m3-on-surface-variant capitalize">
                                    {operator.status}
                                </span>
                                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-m3-gold/20 text-m3-on-surface">
                                    {offerCounts[operator.id] ?? 0} offer
                                    {(offerCounts[operator.id] ?? 0) === 1 ? '' : 's'}
                                </span>
                            </div>
                            <div className="text-[12px] text-m3-on-surface-variant truncate">
                                /operator/{operator.slug}
                            </div>
                            <div className="text-[11px] text-m3-on-surface-variant">
                                Updated <span className="text-m3-on-surface">{formatDate(operator.updatedAt)}</span>
                            </div>
                            <div className="text-[12px] text-m3-on-surface-variant truncate">
                                {operator.reviewIntro || 'No review intro yet'}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => router.push('/operators/edit/' + operator.id)}
                                className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium bg-m3-gold text-m3-on-gold hover:brightness-95 transition-colors"
                            >
                                <Pencil size={15} />
                                Edit
                            </button>
                            <button
                                type="button"
                                disabled={pending}
                                onClick={() =>
                                    setStatusForOperator(
                                        operator.id,
                                        operator.status === 'active' ? 'hidden' : 'active'
                                    )
                                }
                                className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium border border-m3-outline-variant text-m3-on-surface hover:bg-m3-surface-high transition-colors disabled:opacity-40"
                            >
                                {operator.status === 'active' ? <EyeOff size={15} /> : <Eye size={15} />}
                                {operator.status === 'active' ? 'Hide' : 'Show'}
                            </button>
                            <button
                                type="button"
                                disabled={pending}
                                onClick={() => removeOperator(operator.id, operator.name)}
                                aria-label="Delete operator"
                                className="flex items-center justify-center h-8 w-8 rounded-md text-m3-error hover:bg-m3-error-container transition-colors disabled:opacity-40"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
