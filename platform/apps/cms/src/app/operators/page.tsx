import type React from 'react';
import { Plus } from 'lucide-react';
import { createOperatorAction } from '@/app/actions';
import { CmsSidebar } from '@/components/cms-sidebar';
import { OperatorsManager } from '@/components/operators-manager';
import { ThemeToggle } from '@/components/theme-toggle';
import { countOffersByOperator, listOperators } from '@/lib/cms-content-store';

export const dynamic = 'force-dynamic';

export default async function OperatorsScreen({
    searchParams
}: {
    searchParams: Promise<{ created?: string }>;
}): Promise<React.ReactElement> {
    const { created } = await searchParams;
    const [operators, offerCounts] = await Promise.all([listOperators(), countOffersByOperator()]);

    return (
        <div className="h-full flex">
            <CmsSidebar active="operators" />
            <main className="flex-1 min-w-0">
                <header className="flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
                    <span className="text-[15px] font-medium">Operators</span>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <form action={createOperatorAction}>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 transition"
                            >
                                <Plus size={15} />
                                New operator
                            </button>
                        </form>
                    </div>
                </header>
                <OperatorsManager operators={operators} offerCounts={offerCounts} highlightedId={created} />
            </main>
        </div>
    );
}
