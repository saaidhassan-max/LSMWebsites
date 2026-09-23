import type { CtaColor } from '@lsm/ui/lib/generic/cta-color';

const ctaColorByLogo: Record<string, CtaColor> = {
    '/sfb/brands/888casino.png': 'chartreuse',
    '/sfb/brands/888ladies.png': 'rose',
    '/sfb/brands/befaircasino.png': 'amber',
    '/sfb/brands/bet365bingo.png': 'emerald',
    '/sfb/brands/betfairbingo.png': 'amber',
    '/sfb/brands/betfred.png': 'rose',
    '/sfb/brands/betmgm.png': 'amber',
    '/sfb/brands/bingodiamond.png': 'magenta',
    '/sfb/brands/butlersbingo.png': 'amber',
    '/sfb/brands/buzzbingo.png': 'rose',
    '/sfb/brands/casumo.png': 'indigo',
    '/sfb/brands/coral.png': 'blue',
    '/sfb/brands/costabingo.png': 'azure',
    '/sfb/brands/dailyrecordbingo.png': 'orange',
    '/sfb/brands/dottybingo.png': 'orange',
    '/sfb/brands/foxybingo.png': 'orange',
    '/sfb/brands/freespinsbingo.png': 'amber',
    '/sfb/brands/gala.png': 'amber',
    '/sfb/brands/glossybingo.png': 'orange',
    '/sfb/brands/heartbingo.png': 'rose',
    '/sfb/brands/kittybingo.png': 'rose',
    '/sfb/brands/ladbrokes.png': 'rose',
    '/sfb/brands/leovegas.png': 'orange',
    '/sfb/brands/luckypantsbingo.png': 'magenta',
    '/sfb/brands/mirrorbingo.png': 'orange',
    '/sfb/brands/mrq.png': 'blue',
    '/sfb/brands/okbingo.png': 'orange',
    '/sfb/brands/paddypowergames.png': 'green',
    '/sfb/brands/paddypowersbingo.png': 'green',
    '/sfb/brands/placeholder.png': 'azure',
    '/sfb/brands/rosybingo.png': 'orange',
    '/sfb/brands/skybingo.png': 'violet',
    '/sfb/brands/skyvegas.png': 'rose',
    '/sfb/brands/sunbingo.png': 'orange',
    '/sfb/brands/sunvegas.png': 'orange',
    '/sfb/brands/williamhill.png': 'blue',
    '/sfb/brands/winkbingo.png': 'rose'
};

export const ctaColorForLogo = (logoSrc: string | undefined): CtaColor | undefined =>
    logoSrc === undefined ? undefined : ctaColorByLogo[logoSrc];
