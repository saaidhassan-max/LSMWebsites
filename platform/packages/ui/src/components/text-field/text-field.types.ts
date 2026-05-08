import type React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
    label: string;
    icon: LucideIcon;
    error?: string;
    onClear?: () => void;
}
