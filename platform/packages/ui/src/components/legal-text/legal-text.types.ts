import type { LegalTextSegment } from '../legal-content/legal-content.types';

export interface LegalTextProps {
    segments: LegalTextSegment[];
    className?: string;
    inline?: boolean;
}
