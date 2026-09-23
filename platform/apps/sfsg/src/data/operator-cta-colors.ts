import type { CtaColor } from '@lsm/ui/lib/generic/cta-color';

const ctaColorByLogo: Record<string, CtaColor> = {
    '/sfsg/brands/32red.png': 'rose',
    '/sfsg/brands/888casino.png': 'chartreuse',
    '/sfsg/brands/888ladies.png': 'rose',
    '/sfsg/brands/bet365casino.png': 'emerald',
    '/sfsg/brands/betfaircasino.png': 'amber',
    '/sfsg/brands/betfred.png': 'rose',
    '/sfsg/brands/boylecasino.png': 'blue',
    '/sfsg/brands/bwin.png': 'amber',
    '/sfsg/brands/casumo.png': 'indigo',
    '/sfsg/brands/coral.png': 'blue',
    '/sfsg/brands/dottybingo.png': 'orange',
    '/sfsg/brands/foxybingo.png': 'orange',
    '/sfsg/brands/gala.png': 'amber',
    '/sfsg/brands/galaspins.png': 'blue',
    '/sfsg/brands/glossybingo.png': 'orange',
    '/sfsg/brands/heartbingo.png': 'rose',
    '/sfsg/brands/kittybingo.png': 'rose',
    '/sfsg/brands/kwiff.png': 'indigo',
    '/sfsg/brands/ladbrokes.png': 'rose',
    '/sfsg/brands/losvegas.png': 'orange',
    '/sfsg/brands/lottogo.png': 'amber',
    '/sfsg/brands/lottomartgames.png': 'violet',
    '/sfsg/brands/luckypantsbingo.png': 'magenta',
    '/sfsg/brands/mecca.png': 'magenta',
    '/sfsg/brands/megawayscasino.png': 'amber',
    '/sfsg/brands/midnite.png': 'violet',
    '/sfsg/brands/mrben.png': 'amber',
    '/sfsg/brands/mrq.png': 'blue',
    '/sfsg/brands/mrvegas.png': 'green',
    '/sfsg/brands/paddypowergames.png': 'green',
    '/sfsg/brands/skyvegas.png': 'rose',
    '/sfsg/brands/sunbingo.png': 'orange',
    '/sfsg/brands/sunvegas.png': 'orange',
    '/sfsg/brands/williamhill.png': 'blue'
};

export const ctaColorForLogo = (logoSrc: string | undefined): CtaColor | undefined =>
    logoSrc === undefined ? undefined : ctaColorByLogo[logoSrc];
