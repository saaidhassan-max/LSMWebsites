import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HowToClaimSteps } from './how-to-claim-steps';

describe('HowToClaimSteps', () => {
    it('renders the heading, steps, image, terms, and CTA', () => {
        render(
            <HowToClaimSteps
                steps={['1. Click here', '2. Sign up']}
                termsText="Terms apply"
                imageSrc="/ssm/howtoclaim/landingpageimage.png"
                imageAlt="Casino offer"
                ctaText="VISIT CASINO →"
                ctaHref="#"
            />
        );

        expect(screen.getByRole('heading', { name: 'How to claim' })).toBeInTheDocument();
        expect(screen.getByText('1. Click here')).toBeInTheDocument();
        expect(screen.getByAltText('Casino offer')).toBeInTheDocument();
        expect(screen.getByText('Terms apply')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'VISIT CASINO →' })).toBeInTheDocument();
    });
});
