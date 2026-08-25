import type React from 'react';
import type { CtaColor } from '../../lib/generic/cta-color';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonColor = 'light' | 'dark';
export type ButtonSize = 'big' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    ctaColor?: CtaColor;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    children: React.ReactNode;
}
