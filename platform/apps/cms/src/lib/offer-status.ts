import type { CmsOffer } from './cms-content.types';

export type OfferScheduleStatus = 'live' | 'scheduled' | 'ended' | 'hidden';

export interface OfferScheduleInput {
    status: CmsOffer['status'];
    startDate: string | null;
    endDate: string | null;
}

export const OFFER_STATUS_LABEL: Record<OfferScheduleStatus, string> = {
    live: 'Live',
    scheduled: 'Scheduled',
    ended: 'Ended',
    hidden: 'Hidden'
};

export function getOfferScheduleStatus(
    offer: OfferScheduleInput,
    nowIso: string = new Date().toISOString()
): OfferScheduleStatus {
    if (offer.status === 'hidden') return 'hidden';
    const today = nowIso.slice(0, 10);
    if (offer.startDate !== null && offer.startDate > today) return 'scheduled';
    if (offer.endDate !== null && offer.endDate < today) return 'ended';
    return 'live';
}
