import type React from 'react';
import type { CtaColor } from '../../lib/generic/cta-color';

export type LabelVariant = 'mobile' | 'desktop';
export type LabelColor = 'blue' | 'red' | 'orange';

export interface LabelProps {
    children: React.ReactNode;
    variant?: LabelVariant;
    color?: LabelColor;
    ctaColor?: CtaColor;
    className?: string;
}
