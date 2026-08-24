import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OfferCardTerms } from './offer-card-terms';

describe('OfferCardTerms', () => {
    it('renders the terms text', () => {
        render(<OfferCardTerms text="18+. Full terms apply." />);

        expect(screen.getByText('18+. Full terms apply.')).toBeInTheDocument();
    });

    it('hides the toggle when the terms are not truncated', () => {
        render(<OfferCardTerms text="18+. Full terms apply." />);

        expect(screen.queryByRole('button', { name: 'See More' })).not.toBeInTheDocument();
    });
});
