'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle(): React.ReactElement {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(document.documentElement.classList.contains('dark'));
    }, []);

    function toggle(): void {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        try {
            localStorage.setItem('cms-theme', next ? 'dark' : 'light');
        } catch {
            void 0;
        }
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high transition-colors"
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
