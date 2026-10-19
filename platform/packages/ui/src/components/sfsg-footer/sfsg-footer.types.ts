export interface FooterNavLink {
    label: string;
    href?: string;
}

export interface ResponsibleGamblingLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
    href?: string;
    description: string;
}

export interface SfsgFooterProps {
    navLinks?: FooterNavLink[];
    legalText?: string;
}
