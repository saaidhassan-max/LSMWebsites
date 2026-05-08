export interface NavItem {
    emoji: string;
    label: string;
    href: string;
    isActive?: boolean;
}

export interface NavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: NavItem[];
}
