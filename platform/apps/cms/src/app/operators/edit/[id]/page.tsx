import type React from 'react';
import { notFound } from 'next/navigation';
import { OperatorEditor } from '@/components/operator-editor';
import { getOperator, listOffers } from '@/lib/cms-content-store';

export const dynamic = 'force-dynamic';

export default async function EditOperatorScreen({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [operator, offers] = await Promise.all([getOperator(id), listOffers()]);
    if (operator === undefined) notFound();
    const operatorOffers = offers.filter((offer) => offer.operatorId === id);
    return <OperatorEditor operator={operator} offers={operatorOffers} />;
}
