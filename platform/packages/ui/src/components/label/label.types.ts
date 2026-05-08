import type React from 'react';

export type LabelVariant = 'mobile' | 'desktop';

export interface LabelProps {
    children: React.ReactNode;
    variant?: LabelVariant;
    className?: string;
}
