import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LegalText } from './legal-text';

describe('LegalText', () => {
    it('renders plain text and opens external links in a new tab', () => {
        render(
            <LegalText
                segments={[
                    { text: 'Visit GambleAware ' },
                    { text: 'here', href: 'https://www.gambleaware.org/' }
                ]}
            />
        );

        expect(screen.getByText('Visit GambleAware')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute('target', '_blank');
    });
});
