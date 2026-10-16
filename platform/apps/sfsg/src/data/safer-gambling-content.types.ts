import type { LegalTextSegment } from '@lsm/ui/components/legal-content/legal-content.types';

export interface SaferGamblingTip {
    heading: string;
    body: string;
}

export interface SaferGamblingLink {
    label: string;
    href: string;
}

export interface SaferGamblingSupportOrg {
    title: string;
    links: LegalTextSegment[];
    body: string;
}

export interface SaferGamblingContent {
    title: string;
    introParagraphs: LegalTextSegment[][];
    keyMessages: string[];
    tipsTitle: string;
    tips: SaferGamblingTip[];
    selfAssessment: LegalTextSegment[];
    selfAssessmentHref: string;
    unsubscribeParagraphs: LegalTextSegment[][];
    socialMediaParagraphs: LegalTextSegment[][];
    blockAccess: LegalTextSegment[];
    blockAccessLinks: SaferGamblingLink[];
    blockTransactions: LegalTextSegment[];
    externalSupport: SaferGamblingSupportOrg[];
}
