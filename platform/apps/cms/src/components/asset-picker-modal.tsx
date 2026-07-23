'use client';

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    Check,
    Pencil,
    Search,
    Trash2,
    Upload,
    X
} from 'lucide-react';
import type {
    AssetDeleteResponse,
    AssetListResponse,
    AssetRecord,
    AssetUploadResponse
} from '@/lib/assets.types';

const UPLOAD_TIMEOUT_MS = 60000;

interface AssetPickerModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (path: string) => void;
}

type Tab = 'choose' | 'upload';
type SortOrder = 'newest' | 'oldest';

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function AssetPickerModal({
    open,
    onClose,
    onSelect
}: AssetPickerModalProps): React.ReactElement | null {
    const [tab, setTab] = useState<Tab>('choose');
    const [assets, setAssets] = useState<AssetRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [uploading, setUploading] = useState(false);
    const [renamingPath, setRenamingPath] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const [notice, setNotice] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const refresh = useCallback(async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch('/api/assets');
            const data = (await res.json()) as AssetListResponse;
            setAssets(data.assets);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!open) return;
        setTab('choose');
        setQuery('');
        setNotice('');
        setRenamingPath(null);
        void refresh();
    }, [open, refresh]);

    if (!open) return null;

    function choose(path: string): void {
        onSelect(path);
        onClose();
    }

    async function onPickFile(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.target.files?.[0];
        if (file === undefined) return;
        setUploading(true);
        setNotice('');
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
        try {
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body,
                signal: controller.signal
            });
            const data = (await res.json().catch(() => ({}))) as AssetUploadResponse;
            if (!res.ok || data.path === undefined) {
                setNotice(data.error ?? 'Upload failed (' + res.status + '). Please try again.');
                return;
            }
            choose(data.path);
        } catch (error) {
            setNotice(
                error instanceof DOMException && error.name === 'AbortError'
                    ? 'Upload timed out after 60s. Check that the CMS server is still running, then try again.'
                    : 'Upload failed — could not reach the server. Check that the CMS server is still running, then try again.'
            );
        } finally {
            clearTimeout(timeout);
            setUploading(false);
            if (fileInputRef.current !== null) fileInputRef.current.value = '';
        }
    }

    async function saveRename(path: string): Promise<void> {
        const name = renameValue.trim();
        if (name === '') {
            setRenamingPath(null);
            return;
        }
        await fetch('/api/assets/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path, name })
        });
        setRenamingPath(null);
        await refresh();
    }

    async function remove(path: string): Promise<void> {
        setNotice('');
        const res = await fetch('/api/assets/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path })
        });
        const data = (await res.json()) as AssetDeleteResponse;
        if (!data.ok) {
            setNotice('Cannot delete — this image is still used in: ' + data.usedIn.join(', ') + '.');
            return;
        }
        await refresh();
    }

    const filtered = assets
        .filter((asset) => asset.name.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) =>
            sortOrder === 'newest'
                ? b.uploadedAt.localeCompare(a.uploadedAt)
                : a.uploadedAt.localeCompare(b.uploadedAt)
        );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="flex max-h-[85vh] w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-m3-outline-variant bg-m3-surface shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-m3-outline-variant px-5 py-3.5">
                    <div className="text-[15px] font-medium text-m3-on-surface">Asset manager</div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-m3-on-surface-variant hover:bg-m3-surface-high"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex gap-1 border-b border-m3-outline-variant px-5">
                    <TabButton label="Choose" active={tab === 'choose'} onClick={() => setTab('choose')} />
                    <TabButton label="Upload" active={tab === 'upload'} onClick={() => setTab('upload')} />
                </div>

                {notice !== '' && (
                    <div
                        role="alert"
                        className="mx-5 mt-3 rounded-md bg-m3-error-container px-3 py-2 text-[12px] text-m3-error"
                    >
                        {notice}
                    </div>
                )}

                {tab === 'choose' ? (
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="flex items-center gap-3 px-5 py-3">
                            <div className="flex flex-1 items-center gap-2 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 focus-within:border-m3-gold">
                                <Search size={15} className="shrink-0 text-m3-on-surface-variant" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by name"
                                    className="w-full bg-transparent text-[13px] text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSortOrder((order) => (order === 'newest' ? 'oldest' : 'newest'))
                                }
                                aria-label={
                                    sortOrder === 'newest'
                                        ? 'Sorted by newest first — click to show oldest first'
                                        : 'Sorted by oldest first — click to show newest first'
                                }
                                className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-m3-outline-variant px-3 py-2 text-[12px] text-m3-on-surface-variant hover:bg-m3-surface-high"
                            >
                                {sortOrder === 'newest' ? (
                                    <ArrowDownWideNarrow size={14} />
                                ) : (
                                    <ArrowUpNarrowWide size={14} />
                                )}
                                {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
                            {loading ? (
                                <div className="py-12 text-center text-[13px] text-m3-on-surface-variant">
                                    Loading…
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="py-12 text-center text-[13px] text-m3-on-surface-variant">
                                    {assets.length === 0
                                        ? 'No images uploaded yet. Switch to the Upload tab to add one.'
                                        : 'No images match your search.'}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {filtered.map((asset) => (
                                        <div
                                            key={asset.path}
                                            className="group flex flex-col overflow-hidden rounded-lg border border-m3-outline-variant bg-m3-surface-lowest"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => choose(asset.path)}
                                                className="flex h-28 items-center justify-center bg-m3-surface-low p-2 hover:bg-m3-surface-high"
                                            >
                                                <img
                                                    src={asset.path}
                                                    alt={asset.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </button>
                                            <div className="flex flex-col gap-1 px-2.5 py-2">
                                                {renamingPath === asset.path ? (
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            autoFocus
                                                            value={renameValue}
                                                            onChange={(e) => setRenameValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') void saveRename(asset.path);
                                                                if (e.key === 'Escape') setRenamingPath(null);
                                                            }}
                                                            className="w-full rounded border border-m3-outline-variant bg-m3-surface-low px-1.5 py-1 text-[12px] text-m3-on-surface focus:border-m3-gold focus:outline-none"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => void saveRename(asset.path)}
                                                            aria-label="Save name"
                                                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-m3-on-surface-variant hover:bg-m3-surface-high"
                                                        >
                                                            <Check size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="truncate text-[12px] font-medium text-m3-on-surface"
                                                        title={asset.name}
                                                    >
                                                        {asset.name}
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="truncate text-[10px] text-m3-on-surface-variant">
                                                        {formatDate(asset.uploadedAt)}
                                                    </span>
                                                    <div className="flex shrink-0 items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setRenamingPath(asset.path);
                                                                setRenameValue(asset.name);
                                                            }}
                                                            aria-label="Rename image"
                                                            className="flex h-6 w-6 items-center justify-center rounded text-m3-on-surface-variant hover:bg-m3-surface-high"
                                                        >
                                                            <Pencil size={12} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => void remove(asset.path)}
                                                            aria-label="Delete image"
                                                            className="flex h-6 w-6 items-center justify-center rounded text-m3-error hover:bg-m3-error-container"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-12">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => void onPickFile(e)}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-m3-outline-variant px-12 py-10 text-m3-on-surface-variant hover:border-m3-gold hover:bg-m3-surface-low disabled:opacity-40"
                        >
                            <Upload size={28} />
                            <span className="text-[13px] font-medium text-m3-on-surface">
                                {uploading ? 'Uploading…' : 'Choose a file to upload'}
                            </span>
                            <span className="text-[12px]">PNG, JPG, GIF, WebP, SVG or AVIF</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

interface TabButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps): React.ReactElement {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={
                'border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors ' +
                (active
                    ? 'border-m3-gold text-m3-on-surface'
                    : 'border-transparent text-m3-on-surface-variant hover:text-m3-on-surface')
            }
        >
            {label}
        </button>
    );
}
