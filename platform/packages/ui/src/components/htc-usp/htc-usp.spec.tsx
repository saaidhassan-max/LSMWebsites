import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HtcUsp } from './htc-usp';

describe('HtcUsp', () => {
    it('renders headline and all badges', () => {
        render(
            <HtcUsp
                logoSrc="/ssm/brands/888logo.png"
                logoAlt="888 Poker"
                headline="200 FREE SPINS"
                badges={['No Wagering', 'No Deposit']}
            />
        );

        expect(screen.getAllByText('200 FREE SPINS')[0]).toBeInTheDocument();
        expect(screen.getAllByText('No Wagering')[0]).toBeInTheDocument();
        expect(screen.getAllByText('No Deposit')[0]).toBeInTheDocument();
    });

    it('renders the logo with correct alt text', () => {
        render(
            <HtcUsp
                logoSrc="/ssm/brands/888logo.png"
                logoAlt="888 Poker"
                headline="200 FREE SPINS"
                badges={['No Wagering']}
            />
        );

        expect(screen.getAllByAltText('888 Poker')[0]).toBeInTheDocument();
    });
});
