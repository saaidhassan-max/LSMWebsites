import type React from 'react';
import { Plus } from 'lucide-react';
import { createOfferAction } from '@/app/actions';
import { CmsSidebar } from '@/components/cms-sidebar';
import { OffersManager } from '@/components/offers-manager';
import { ThemeToggle } from '@/components/theme-toggle';
import { listOffers, listOperators } from '@/lib/cms-content-store';

export const dynamic = 'force-dynamic';

export default async function OffersScreen(): Promise<React.ReactElement> {
    const [offers, operators] = await Promise.all([listOffers(), listOperators()]);

    return (
        <div className="min-h-screen flex">
            <CmsSidebar active="offers" />
            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <span className="text-[15px] font-medium">Offers</span>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <form action={createOfferAction}>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 transition"
                            >
                                <Plus size={15} />
                                New offer
                            </button>
                        </form>
                    </div>
                </header>
                <OffersManager offers={offers} operators={operators} />
            </main>
        </div>
    );
}
