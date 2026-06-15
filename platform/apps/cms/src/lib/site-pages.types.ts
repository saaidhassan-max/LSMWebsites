export type SitePageStatus = 'draft' | 'published';
export type SitePageSectionType = 'welcome' | 'terms' | 'richText' | 'signup' | 'directory';

export interface WelcomeContent {
    textHighlight: string;
    text: string;
    textSuffix: string;
    features: string[];
    imageLeftSrc: string;
    imageRightSrc: string;
}

export interface TermsContent {
    text: string;
}

export interface RichTextContent {
    heading: string;
    body: string;
}

export interface SignupContent {
    heading: string;
}

export interface DirectoryContent {
    title: string;
}

export interface WelcomeSection {
    id: string;
    type: 'welcome';
    content: WelcomeContent;
}

export interface TermsSection {
    id: string;
    type: 'terms';
    content: TermsContent;
}

export interface RichTextSection {
    id: string;
    type: 'richText';
    content: RichTextContent;
}

export interface SignupSection {
    id: string;
    type: 'signup';
    content: SignupContent;
}

export interface DirectorySection {
    id: string;
    type: 'directory';
    content: DirectoryContent;
}

export type SitePageSection =
    | WelcomeSection
    | TermsSection
    | RichTextSection
    | SignupSection
    | DirectorySection;

export interface SitePageDetails {
    name: string;
    slug: string;
}

export interface SitePage {
    id: string;
    name: string;
    slug: string;
    status: SitePageStatus;
    publishedAt: string | null;
    updatedAt: string;
    sections: SitePageSection[];
}
