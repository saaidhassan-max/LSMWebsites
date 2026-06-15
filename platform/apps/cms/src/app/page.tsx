import type React from 'react';
import { Plus } from 'lucide-react';
import { listLandingPages } from '@/lib/landing-store';
import { ThemeToggle } from '@/components/theme-toggle';
import { LandingPagesManager } from '@/components/landing-pages-manager';
import { createAction } from '@/app/actions';
import { CmsSidebar } from '@/components/cms-sidebar';

export const dynamic = 'force-dynamic';

export default async function LandingPagesScreen(): Promise<React.ReactElement> {
    const pages = await listLandingPages();

    return (
        <div className="min-h-screen flex">
            <CmsSidebar active="landing-pages" />

            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <span className="text-[15px] font-medium">Landing pages</span>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <form action={createAction}>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 transition"
                            >
                                <Plus size={15} />
                                New landing page
                            </button>
                        </form>
                    </div>
                </header>

                <LandingPagesManager pages={pages} />
            </main>
        </div>
    );
}
