import type React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonColor = 'light' | 'dark';
export type ButtonSize = 'big' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    children: React.ReactNode;
}
