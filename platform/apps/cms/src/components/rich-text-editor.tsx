'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { Bold, Heading2, Italic, Link as LinkIcon, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    resyncKey?: string;
}

interface ToolbarButton {
    label: string;
    icon: React.ReactNode;
    run: () => void;
}

function exec(command: string, value?: string): void {
    document.execCommand(command, false, value);
}

export function RichTextEditor({ value, onChange, resyncKey }: RichTextEditorProps): React.ReactElement {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current !== null && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [resyncKey]);

    function emit(): void {
        if (editorRef.current !== null) onChange(editorRef.current.innerHTML);
    }

    function runCommand(command: string, commandValue?: string): void {
        editorRef.current?.focus();
        exec(command, commandValue);
        emit();
    }

    function addLink(): void {
        const url = window.prompt('Link URL');
        if (url === null || url.trim() === '') return;
        runCommand('createLink', url.trim());
    }

    function onPaste(e: React.ClipboardEvent<HTMLDivElement>): void {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        exec('insertText', text);
        emit();
    }

    const buttons: ToolbarButton[] = [
        { label: 'Subheading', icon: <Heading2 size={15} />, run: () => runCommand('formatBlock', 'H2') },
        { label: 'Bold', icon: <Bold size={15} />, run: () => runCommand('bold') },
        { label: 'Italic', icon: <Italic size={15} />, run: () => runCommand('italic') },
        { label: 'Bullet list', icon: <List size={15} />, run: () => runCommand('insertUnorderedList') },
        {
            label: 'Numbered list',
            icon: <ListOrdered size={15} />,
            run: () => runCommand('insertOrderedList')
        },
        { label: 'Link', icon: <LinkIcon size={15} />, run: addLink }
    ];

    return (
        <div className="rounded-md border border-m3-outline-variant bg-m3-surface-low focus-within:border-m3-gold">
            <div className="flex flex-wrap items-center gap-1 border-b border-m3-outline-variant p-1.5">
                {buttons.map((button) => (
                    <button
                        key={button.label}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={button.run}
                        aria-label={button.label}
                        title={button.label}
                        className="h-8 w-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high hover:text-m3-on-surface"
                    >
                        {button.icon}
                    </button>
                ))}
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={emit}
                onBlur={emit}
                onPaste={onPaste}
                className="min-h-[320px] max-h-[60vh] overflow-y-auto px-3 py-3 text-[13px] leading-6 text-m3-on-surface focus:outline-none [&_h2]:text-[15px] [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_a]:underline [&_table]:w-full [&_table]:my-3 [&_td]:border [&_td]:border-m3-outline-variant [&_td]:p-2 [&_td]:align-top [&_th]:border [&_th]:border-m3-outline-variant [&_th]:p-2 [&_th]:text-left"
            />
        </div>
    );
}
