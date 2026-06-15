'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { createSupabaseBrowserClient, isBrowserSupabaseConfigured } from '@/lib/supabase-browser';

export function LoginForm(): React.ReactElement {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const next = searchParams.get('next') ?? '/';

    async function signIn(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setError('');
        if (!isBrowserSupabaseConfigured()) {
            setError('Supabase Auth is not configured for this environment.');
            return;
        }

        setLoading(true);
        const supabase = createSupabaseBrowserClient();
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (authError !== null) {
            setError(authError.message);
            return;
        }

        router.push(next.startsWith('/') ? next : '/');
        router.refresh();
    }

    const inputClass =
        'w-full h-11 rounded-lg border border-m3-outline-variant bg-m3-surface-low px-3 pl-10 text-[14px] text-m3-on-surface focus:outline-none focus:border-m3-gold';

    return (
        <form onSubmit={signIn} className="w-full max-w-[380px] flex flex-col gap-4">
            <div>
                <h1 className="text-[28px] font-medium tracking-normal">CMS login</h1>
                <p className="text-[13px] text-m3-on-surface-variant mt-1">
                    Sign in to edit Super Free Bingo content.
                </p>
            </div>

            <label className="relative flex flex-col gap-1.5 text-[12px] font-medium">
                Email
                <Mail size={17} className="absolute left-3 bottom-[13px] text-m3-on-surface-variant" />
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className={inputClass}
                />
            </label>

            <label className="relative flex flex-col gap-1.5 text-[12px] font-medium">
                Password
                <Lock size={17} className="absolute left-3 bottom-[13px] text-m3-on-surface-variant" />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    className={inputClass}
                />
            </label>

            {error !== '' && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-700">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-lg bg-m3-gold text-m3-on-gold text-[14px] font-medium flex items-center justify-center gap-2 hover:brightness-95 disabled:opacity-50"
            >
                {loading ? 'Signing in...' : 'Sign in'}
                <ArrowRight size={17} />
            </button>
        </form>
    );
}
