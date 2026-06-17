'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import { Save } from 'lucide-react';
import { saveContentPageAction } from '@/app/actions';
import { notifyCmsChanged } from '@/lib/cms-events';
import { RichTextEditor } from '@/components/rich-text-editor';
import type { ContentPage } from '@/lib/content-pages.types';

interface ContentPageEditorProps {
    page: ContentPage;
}

const inputClass =
    'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';

export function ContentPageEditor({ page }: ContentPageEditorProps): React.ReactElement {
    const [title, setTitle] = useState(page.title);
    const [subtitle, setSubtitle] = useState(page.subtitle);
    const [bodyHtml, setBodyHtml] = useState(page.bodyHtml);
    const [dirty, setDirty] = useState(false);
    const [pending, startTransition] = useTransition();

    function save(): void {
        startTransition(async () => {
            await saveContentPageAction(page.key, { title, subtitle, bodyHtml });
            notifyCmsChanged();
            setDirty(false);
        });
    }

    return (
        <div className="p-6 max-w-[960px] flex flex-col gap-6">
            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <label className={labelClass}>
                        Page title
                        <input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setDirty(true);
                            }}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        Subtitle (optional)
                        <input
                            value={subtitle}
                            onChange={(e) => {
                                setSubtitle(e.target.value);
                                setDirty(true);
                            }}
                            className={inputClass}
                        />
                    </label>
                </div>
                <div className={labelClass}>
                    Body copy
                    <RichTextEditor
                        value={bodyHtml}
                        resyncKey={page.key}
                        onChange={(html) => {
                            setBodyHtml(html);
                            setDirty(true);
                        }}
                    />
                </div>
            </section>

            <div className="sticky bottom-0 py-4 bg-m3-surface">
                <button
                    type="button"
                    onClick={save}
                    disabled={pending || !dirty}
                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                >
                    <Save size={15} />
                    {pending ? 'Saving...' : 'Save page'}
                </button>
            </div>
        </div>
    );
}
