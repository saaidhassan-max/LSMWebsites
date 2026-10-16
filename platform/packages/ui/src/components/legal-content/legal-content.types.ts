export interface LegalTextSegment {
    text: string;
    bold?: boolean;
    href?: string;
}

export interface LegalHeadingBlock {
    kind: 'heading';
    level: number;
    segments: LegalTextSegment[];
}

export interface LegalParagraphBlock {
    kind: 'paragraph';
    segments: LegalTextSegment[];
}

export interface LegalListBlock {
    kind: 'list';
    ordered: boolean;
    items: LegalTextSegment[][];
}

export interface LegalTableBlock {
    kind: 'table';
    rows: LegalBlock[][][];
}

export type LegalBlock = LegalHeadingBlock | LegalParagraphBlock | LegalListBlock | LegalTableBlock;

export interface LegalContentProps {
    blocks: LegalBlock[];
}
