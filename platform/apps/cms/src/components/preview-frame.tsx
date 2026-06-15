'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PreviewFrameProps {
    width: string;
    height: string;
    children: React.ReactNode;
}

export function PreviewFrame({ width, height, children }: PreviewFrameProps): React.ReactElement {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe === null) return;
        let raf = 0;

        function init(): void {
            const frame = iframeRef.current;
            const doc = frame?.contentDocument ?? null;
            if (doc === null || doc.body === null) {
                raf = requestAnimationFrame(init);
                return;
            }
            let root = doc.getElementById('cms-preview-root');
            if (root === null) {
                doc.open();
                doc.write(
                    '<!DOCTYPE html><html data-theme="bingo"><head><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body><div id="cms-preview-root"></div></body></html>'
                );
                doc.close();
                document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
                    doc.head.appendChild(node.cloneNode(true));
                });
                doc.body.style.margin = '0';
                doc.documentElement.style.background = 'var(--color-surface)';
                root = doc.getElementById('cms-preview-root');
            }
            setMountNode(root);
        }

        init();
        return () => {
            if (raf !== 0) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <iframe
                ref={iframeRef}
                title="Preview"
                className="block border-0 bg-surface"
                style={{ width, height }}
            />
            {mountNode !== null && createPortal(children, mountNode)}
        </>
    );
}
