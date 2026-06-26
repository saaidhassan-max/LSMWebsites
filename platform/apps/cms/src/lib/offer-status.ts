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

export interface CampaignScheduleInput extends OfferScheduleInput {
    offerIds: string[];
}

const STATUS_RANK: Record<OfferScheduleStatus, number> = {
    live: 3,
    scheduled: 2,
    ended: 1,
    hidden: 0
};

export function getOfferEffectiveStatus(
    offerId: string,
    offer: OfferScheduleInput,
    campaigns: CampaignScheduleInput[],
    nowIso: string = new Date().toISOString()
): OfferScheduleStatus {
    if (offer.status === 'hidden') return 'hidden';
    const owning = campaigns.filter((campaign) => campaign.offerIds.includes(offerId));
    if (owning.length === 0) return getOfferScheduleStatus(offer, nowIso);
    return owning
        .map((campaign) => getOfferScheduleStatus(campaign, nowIso))
        .reduce<OfferScheduleStatus>(
            (best, current) => (STATUS_RANK[current] > STATUS_RANK[best] ? current : best),
            'hidden'
        );
}
