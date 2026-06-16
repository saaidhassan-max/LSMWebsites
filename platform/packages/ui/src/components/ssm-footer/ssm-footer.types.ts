export interface FooterNavLink {
    label: string;
    href?: string;
}

export interface ResponsibleGamblingLogo {
    src: string;
    alt: string;
    description: string;
    href?: string;
}

export interface SsmFooterProps {
    navLinks?: FooterNavLink[];
    legalText?: string;
}
