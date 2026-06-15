'use client';

import type React from 'react';
import { useState, useTransition } from 'react';
import { Save } from 'lucide-react';
import { saveSiteSettingsAction } from '@/app/actions';
import type { SiteSettings } from '@/lib/site-settings.types';

interface SiteSettingsEditorProps {
    settings: SiteSettings;
}

function toDirectoryText(settings: SiteSettings): string {
    return settings.directorySites
        .map((item) => (item.href === undefined ? item.name : item.name + '|' + item.href))
        .join('\n');
}

function toNavText(settings: SiteSettings): string {
    return settings.navItems.map((item) => item.emoji + '|' + item.label + '|' + item.href).join('\n');
}

function directoryFromText(value: string): SiteSettings['directorySites'] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [name, href] = line.split('|').map((part) => part.trim());
            return href === undefined || href === '' ? { name } : { name, href };
        });
}

function navFromText(value: string): SiteSettings['navItems'] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [emoji, label, href] = line.split('|').map((part) => part.trim());
            return { emoji: emoji ?? '', label: label ?? '', href: href ?? '/' };
        })
        .filter((item) => item.label !== '');
}

export function SiteSettingsEditor({ settings }: SiteSettingsEditorProps): React.ReactElement {
    const [local, setLocal] = useState<SiteSettings>(settings);
    const [directoryText, setDirectoryText] = useState(toDirectoryText(settings));
    const [navText, setNavText] = useState(toNavText(settings));
    const [dirty, setDirty] = useState(false);
    const [pending, startTransition] = useTransition();

    function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]): void {
        setLocal((current) => ({ ...current, [key]: value }));
        setDirty(true);
    }

    function updateDirectory(value: string): void {
        setDirectoryText(value);
        update('directorySites', directoryFromText(value));
    }

    function updateNav(value: string): void {
        setNavText(value);
        update('navItems', navFromText(value));
    }

    function save(): void {
        startTransition(async () => {
            await saveSiteSettingsAction(local);
            setDirty(false);
        });
    }

    const inputClass =
        'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
    const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';

    return (
        <div className="p-6 max-w-[960px] flex flex-col gap-6">
            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Global page shell</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        These fields feed the shared SFB header, USP strip, directory, and footer.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <label className={labelClass}>
                        Standard USP text
                        <input
                            value={local.uspText}
                            onChange={(e) => update('uspText', e.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <label className={labelClass}>
                        How-to/contact USP text
                        <input
                            value={local.howToClaimUspText}
                            onChange={(e) => update('howToClaimUspText', e.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>
                <label className={labelClass}>
                    Footer legal text
                    <textarea
                        value={local.footerLegalText}
                        onChange={(e) => update('footerLegalText', e.target.value)}
                        rows={7}
                        className={inputClass + ' resize-y leading-5'}
                    />
                </label>
            </section>

            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Navigation</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        One item per line: emoji | label | URL.
                    </p>
                </div>
                <textarea
                    value={navText}
                    onChange={(e) => updateNav(e.target.value)}
                    rows={9}
                    className={inputClass + ' resize-y leading-5 font-mono'}
                />
            </section>

            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-low p-4 flex flex-col gap-4">
                <div>
                    <h2 className="text-[16px] font-medium">Website directory</h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                        Use brand name only, or brand name | URL when a directory item should link out.
                    </p>
                </div>
                <label className={labelClass}>
                    Directory title
                    <input
                        value={local.directoryTitle}
                        onChange={(e) => update('directoryTitle', e.target.value)}
                        className={inputClass}
                    />
                </label>
                <textarea
                    value={directoryText}
                    onChange={(e) => updateDirectory(e.target.value)}
                    rows={12}
                    className={inputClass + ' resize-y leading-5 font-mono'}
                />
            </section>

            <div className="sticky bottom-0 py-4 bg-m3-surface">
                <button
                    type="button"
                    onClick={save}
                    disabled={pending || !dirty}
                    className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                >
                    <Save size={15} />
                    {pending ? 'Saving...' : 'Save settings'}
                </button>
            </div>
        </div>
    );
}
