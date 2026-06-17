'use client';

import type React from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

export interface PageAssetItem {
    key: string;
    label: string;
}

export interface PageAssetDef {
    type: string;
    label: string;
    description: string;
    disabled?: boolean;
}

interface PageAssetsPanelProps {
    items: PageAssetItem[];
    assets: PageAssetDef[];
    selectedKey: string | null;
    reorder: boolean;
    onToggleReorder: () => void;
    onSelect: (key: string) => void;
    onRemove: (key: string) => void;
    onMove: (index: number, delta: number) => void;
    onAdd: (type: string) => void;
    emptyHint: string;
    intro?: React.ReactNode;
}

export function PageAssetsPanel({
    items,
    assets,
    selectedKey,
    reorder,
    onToggleReorder,
    onSelect,
    onRemove,
    onMove,
    onAdd,
    emptyHint,
    intro
}: PageAssetsPanelProps): React.ReactElement {
    return (
        <>
            {intro}
            <section className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-wide text-m3-on-surface-variant">
                        Page content
                    </div>
                    <button
                        type="button"
                        onClick={onToggleReorder}
                        className={
                            'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md border transition-colors ' +
                            (reorder
                                ? 'bg-m3-gold text-m3-on-gold border-m3-gold'
                                : 'border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high')
                        }
                    >
                        <ArrowUpDown size={14} />
                        {reorder ? 'Done' : 'Reorder'}
                    </button>
                </div>
                {items.length === 0 && (
                    <div className="rounded-lg border border-dashed border-m3-outline-variant p-4 text-[12px] text-m3-on-surface-variant">
                        {emptyHint}
                    </div>
                )}
                {items.map((item, index) => (
                    <div
                        key={item.key}
                        onClick={() => !reorder && onSelect(item.key)}
                        className={
                            'flex items-center gap-2 rounded-lg border p-2 ' +
                            (selectedKey === item.key && !reorder
                                ? 'border-m3-gold ring-1 ring-m3-gold'
                                : 'border-m3-outline-variant') +
                            (reorder ? '' : ' cursor-pointer hover:bg-m3-surface-high')
                        }
                    >
                        <span className="w-6 text-center text-[12px] text-m3-on-surface-variant">
                            {index + 1}
                        </span>
                        <div className="min-w-0 flex-1 text-[13px] font-medium">{item.label}</div>
                        {reorder ? (
                            <>
                                <button
                                    type="button"
                                    aria-label="Move up"
                                    disabled={index === 0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMove(index, -1);
                                    }}
                                    className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                >
                                    <ChevronUp size={15} />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Move down"
                                    disabled={index === items.length - 1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMove(index, 1);
                                    }}
                                    className="w-7 h-7 flex items-center justify-center rounded-md border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                                >
                                    <ChevronDown size={15} />
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                aria-label="Remove asset"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(item.key);
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
                {assets.map((asset) => (
                    <button
                        key={asset.type}
                        type="button"
                        disabled={asset.disabled === true}
                        onClick={() => onAdd(asset.type)}
                        className="flex items-center gap-2 rounded-lg border border-m3-outline-variant bg-m3-surface-low p-3 text-left hover:bg-m3-surface-high disabled:opacity-40 disabled:cursor-default disabled:hover:bg-m3-surface-low"
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
                    Add assets here, then select one to edit its content.
                </p>
            </section>
        </>
    );
}
