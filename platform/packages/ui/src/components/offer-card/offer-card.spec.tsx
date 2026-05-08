import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OfferCard } from './offer-card';

describe('OfferCard', () => {
    it('renders offer content and calls to action', () => {
        render(
            <OfferCard
                ctaHref="#"
                offerMain="$100 Casino Bonus"
                secondaryCtaHref="#"
                secondaryCtaText="How To Claim"
            />
        );

        expect(screen.getAllByText('$100 Casino Bonus')[0]).toBeInTheDocument();
        expect(screen.getAllByRole('link', { name: /PLAY NOW/ })[0]).toBeInTheDocument();
    });
});
