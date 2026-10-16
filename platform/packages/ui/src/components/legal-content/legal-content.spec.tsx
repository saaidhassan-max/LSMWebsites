import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LegalContent } from './legal-content';

describe('LegalContent', () => {
    it('renders headings, paragraphs and links', () => {
        render(
            <LegalContent
                blocks={[
                    { kind: 'heading', level: 3, segments: [{ text: '1 Introduction' }] },
                    {
                        kind: 'paragraph',
                        segments: [
                            { text: 'Email ' },
                            { text: 'dpo@littlestarmedia.com', href: 'mailto:dpo@littlestarmedia.com' }
                        ]
                    }
                ]}
            />
        );

        expect(screen.getByRole('heading', { name: '1 Introduction' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'dpo@littlestarmedia.com' })).toHaveAttribute(
            'href',
            'mailto:dpo@littlestarmedia.com'
        );
    });

    it('renders list items and table cells', () => {
        render(
            <LegalContent
                blocks={[
                    { kind: 'list', ordered: false, items: [[{ text: 'First item' }]] },
                    {
                        kind: 'table',
                        rows: [[[{ kind: 'paragraph', segments: [{ text: 'Cell text' }] }]]]
                    }
                ]}
            />
        );

        expect(screen.getByRole('listitem')).toHaveTextContent('First item');
        expect(screen.getByRole('cell')).toHaveTextContent('Cell text');
    });
});
