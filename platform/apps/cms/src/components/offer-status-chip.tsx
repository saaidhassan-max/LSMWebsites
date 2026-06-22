import type React from 'react';
import type { OfferScheduleStatus } from '@/lib/offer-status';
import { OFFER_STATUS_LABEL } from '@/lib/offer-status';

interface OfferStatusChipProps {
    status: OfferScheduleStatus;
}

const STATUS_STYLE: Record<OfferScheduleStatus, string> = {
    live: 'bg-m3-success-container text-m3-on-success',
    scheduled: 'bg-m3-gold/25 text-m3-on-gold',
    ended: 'bg-m3-surface-highest text-m3-on-surface-variant',
    hidden: 'bg-m3-surface-highest text-m3-on-surface-variant'
};

export function OfferStatusChip({ status }: OfferStatusChipProps): React.ReactElement {
    return (
        <span
            className={
                'text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap ' + STATUS_STYLE[status]
            }
        >
            {OFFER_STATUS_LABEL[status]}
        </span>
    );
}
