import type { CtaColor } from '@lsm/ui/lib/generic/cta-color';

const ctaColorByBrand: Record<string, CtaColor> = {
    BetMGM: 'amber',
    'Fanatics Casino': 'rose',
    BetRivers: 'blue',
    'Hard Rock Bet': 'violet',
    'Golden Nugget': 'amber',
    'FanDuel Casino': 'azure'
};

export const ctaColorForBrand = (brand: string | undefined): CtaColor | undefined =>
    brand === undefined ? undefined : ctaColorByBrand[brand];
