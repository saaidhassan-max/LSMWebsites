import type React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonColor = 'light' | 'dark';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    children: React.ReactNode;
}
