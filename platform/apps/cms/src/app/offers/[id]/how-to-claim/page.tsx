import type React from 'react';
import { notFound } from 'next/navigation';
import { getOffer, getOperator } from '@/lib/cms-content-store';
import { HowToClaimPreview } from '@/components/how-to-claim-preview';

export const dynamic = 'force-dynamic';

export default async function OfferHowToClaimScreen({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const offer = await getOffer(id);
    if (offer === undefined) notFound();
    const operator = await getOperator(offer.operatorId);
    if (operator === undefined) notFound();
    return <HowToClaimPreview offer={offer} operator={operator} />;
}
