'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

interface LinesTextareaProps {
    lines: string[];
    onChange: (lines: string[]) => void;
    rows?: number;
    className?: string;
    resyncKey?: string;
}

function toLines(value: string): string[] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

export function LinesTextarea({
    lines,
    onChange,
    rows = 4,
    className,
    resyncKey
}: LinesTextareaProps): React.ReactElement {
    const [text, setText] = useState(lines.join('\n'));

    useEffect(() => {
        setText(lines.join('\n'));
    }, [resyncKey]);

    return (
        <textarea
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                onChange(toLines(e.target.value));
            }}
            rows={rows}
            className={className}
        />
    );
}
