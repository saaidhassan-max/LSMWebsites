export interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    error?: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    id?: string;
    className?: string;
}
