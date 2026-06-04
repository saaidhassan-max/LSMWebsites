import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OntarioOfferCard } from './ontario-offer-card';

describe('OntarioOfferCard', () => {
    it('renders the offer headline', () => {
        render(
            <OntarioOfferCard
                offerHeadline="1 DAY PAYOUT"
                usps={['Fast Payouts', 'Video slots']}
            />
        );
        expect(screen.getByText('1 DAY PAYOUT')).toBeInTheDocument();
    });

    it('renders the good choice label', () => {
        render(
            <OntarioOfferCard
                offerHeadline="1 DAY PAYOUT"
                usps={['Fast Payouts']}
            />
        );
        expect(screen.getAllByText('the Good.Choice').length).toBeGreaterThan(0);
    });

    it('renders all usps', () => {
        render(
            <OntarioOfferCard
                offerHeadline="1 DAY PAYOUT"
                usps={['Fast Payouts', 'Live dealer games', 'Reward program', 'Table Games']}
            />
        );
        expect(screen.getAllByText('Fast Payouts').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Table Games').length).toBeGreaterThan(0);
    });

    it('renders disclaimer when provided', () => {
        render(
            <OntarioOfferCard
                offerHeadline="1 DAY PAYOUT"
                usps={['Fast Payouts']}
                disclaimerText="19+ only. T&Cs apply."
            />
        );
        expect(screen.getAllByText('19+ only. T&Cs apply.').length).toBeGreaterThan(0);
    });
});
