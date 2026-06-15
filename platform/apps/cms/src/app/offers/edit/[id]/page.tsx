import type React from 'react';
import { notFound } from 'next/navigation';
import { OfferEditor } from '@/components/offer-editor';
import { getOffer, listOperators } from '@/lib/cms-content-store';

export const dynamic = 'force-dynamic';

export default async function EditOfferScreen({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
    const { id } = await params;
    const [offer, operators] = await Promise.all([getOffer(id), listOperators()]);
    if (offer === undefined) notFound();
    return <OfferEditor offer={offer} operators={operators} />;
}
