export interface FooterNavLink {
    label: string;
    href?: string;
}

export interface SfbetsFooterProps {
    navLinks?: FooterNavLink[];
    legalText?: string;
}
