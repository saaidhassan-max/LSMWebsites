import type { CtaColor } from '@lsm/ui/lib/generic/cta-color';

const ctaColorByLogo: Record<string, CtaColor> = {
    '/sfbets/brands/betmgm.png': 'amber'
};

export const ctaColorForLogo = (logoSrc: string | undefined): CtaColor | undefined =>
    logoSrc === undefined ? undefined : ctaColorByLogo[logoSrc];
