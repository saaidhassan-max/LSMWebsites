export interface PageHeaderBadge {
    text: string;
}

export interface PageHeaderProps {
    titlePrefix: string;
    titleSuffix: string;
    subtitle?: string;
    badges?: PageHeaderBadge[];
    className?: string;
}
