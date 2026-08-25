export type CtaColor =
    | 'rose'
    | 'orange'
    | 'amber'
    | 'azure'
    | 'emerald'
    | 'cyan'
    | 'chartreuse'
    | 'magenta'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'green';

export const ctaColors: CtaColor[] = [
    'rose',
    'orange',
    'amber',
    'azure',
    'emerald',
    'cyan',
    'chartreuse',
    'magenta',
    'violet',
    'indigo',
    'blue',
    'green'
];

const ctaSurfaceClasses: Record<CtaColor, string> = {
    rose: 'bg-cta-rose',
    orange: 'bg-cta-orange',
    amber: 'bg-cta-amber',
    azure: 'bg-cta-azure',
    emerald: 'bg-cta-emerald',
    cyan: 'bg-cta-cyan',
    chartreuse: 'bg-cta-chartreuse',
    magenta: 'bg-cta-magenta',
    violet: 'bg-cta-violet',
    indigo: 'bg-cta-indigo',
    blue: 'bg-cta-blue',
    green: 'bg-cta-green'
};

const ctaDarkTextColors: CtaColor[] = ['amber', 'emerald', 'cyan', 'chartreuse'];

export const ctaTextClass = (color: CtaColor): string =>
    ctaDarkTextColors.includes(color) ? 'text-on-surface-dark' : 'text-on-surface-light';

export const ctaSurfaceClass = (color: CtaColor): string => ctaSurfaceClasses[color];
