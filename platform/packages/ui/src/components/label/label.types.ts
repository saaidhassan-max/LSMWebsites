import type React from 'react';

export type LabelVariant = 'mobile' | 'desktop';
export type LabelColor = 'blue' | 'red' | 'orange';

export interface LabelProps {
    children: React.ReactNode;
    variant?: LabelVariant;
    color?: LabelColor;
    className?: string;
}
