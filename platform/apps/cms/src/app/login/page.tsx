import type React from 'react';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/login-form';
import { getCurrentUserEmail } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function LoginPage(): Promise<React.ReactElement> {
    const email = await getCurrentUserEmail();
    if (email !== null) redirect('/');

    return (
        <main className="min-h-screen flex items-center justify-center bg-m3-background px-6">
            <div className="w-full max-w-[880px] grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 items-center">
                <div className="hidden md:flex flex-col gap-3">
                    <div className="text-[13px] uppercase tracking-wide text-m3-on-surface-variant">
                        Little Star Media
                    </div>
                    <h2 className="text-[40px] leading-[48px] font-medium tracking-normal">
                        Guard-railed editing for the SFB rebuild.
                    </h2>
                    <p className="text-[15px] leading-6 text-m3-on-surface-variant max-w-[420px]">
                        Operators, offers, page content, landing pages, and shared site settings now live behind a protected CMS.
                    </p>
                </div>
                <div className="rounded-2xl border border-m3-outline-variant bg-m3-surface-low p-6 shadow-sm">
                    <LoginForm />
                </div>
            </div>
        </main>
    );
}
