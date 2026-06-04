import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GoodChoiceLogoSection } from './good-choice-logo-section';

describe('GoodChoiceLogoSection', () => {
    it('renders the wordmark', () => {
        render(<GoodChoiceLogoSection />);
        expect(screen.getAllByText('Good.').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Choice').length).toBeGreaterThan(0);
    });

    it('renders a link when logoHref is provided', () => {
        render(<GoodChoiceLogoSection logoHref="/" />);
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    it('renders the menu button', () => {
        render(<GoodChoiceLogoSection />);
        expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    });
});
