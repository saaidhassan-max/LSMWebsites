import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OperatorReview } from './operator-review';

const defaultProps = {
    operatorName: 'Caesars Palace Online Casino',
    trustBadges: ['🔒 Secure & Trusted', '🏅 Ontario Licensed'],
    features: ['Fast Payouts', 'Video slots, live dealer games & tournaments'],
    ctaText: 'VISIT CASINO ➜',
    ctaHref: 'https://example.com',
};

describe('OperatorReview', () => {
    it('renders the operator name', () => {
        render(<OperatorReview {...defaultProps} />);
        expect(screen.getByText('Caesars Palace Online Casino')).toBeDefined();
    });

    it('renders all trust badges', () => {
        render(<OperatorReview {...defaultProps} />);
        expect(screen.getByText('🔒 Secure & Trusted')).toBeDefined();
        expect(screen.getByText('🏅 Ontario Licensed')).toBeDefined();
    });

    it('renders all features', () => {
        render(<OperatorReview {...defaultProps} />);
        expect(screen.getByText('Fast Payouts')).toBeDefined();
    });

    it('renders the CTA link with correct href', () => {
        render(<OperatorReview {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe('https://example.com');
    });
});
