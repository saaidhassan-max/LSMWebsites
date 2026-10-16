import type React from 'react';
import type { LegalTextSegment } from '../legal-content/legal-content.types';
import type { LegalTextProps } from './legal-text.types';

const withLineBreaks = (text: string): React.ReactNode[] =>
    text.split('\n').flatMap((line, index) => (index === 0 ? [line] : [<br key={index} />, line]));

function renderSegment(segment: LegalTextSegment, index: number): React.ReactElement {
    const content =
        segment.bold === true ? (
            <strong>{withLineBreaks(segment.text)}</strong>
        ) : (
            withLineBreaks(segment.text)
        );
    if (segment.href === undefined) return <span key={index}>{content}</span>;
    const external = /^https?:/.test(segment.href);
    return (
        <a
            key={index}
            href={segment.href}
            className="underline"
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
        >
            {content}
        </a>
    );
}

export const LegalText = ({ segments, className, inline = false }: LegalTextProps): React.ReactElement =>
    inline ? (
        <span className={className}>{segments.map(renderSegment)}</span>
    ) : (
        <p className={className}>{segments.map(renderSegment)}</p>
    );
