import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
    it('renders the title prefix and suffix', () => {
        render(<PageHeader titlePrefix="GOOD." titleSuffix="DEPOSITS 🏦" />);
        expect(screen.getByText('GOOD.')).toBeInTheDocument();
        expect(screen.getByText('DEPOSITS 🏦')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
        render(
            <PageHeader
                titlePrefix="GOOD."
                titleSuffix="DEPOSITS 🏦"
                subtitle="Ontario's most trusted online casino"
            />
        );
        expect(screen.getByText("Ontario's most trusted online casino")).toBeInTheDocument();
    });

    it('renders badges when provided', () => {
        render(
            <PageHeader
                titlePrefix="GOOD."
                titleSuffix="DEPOSITS 🏦"
                badges={[{ text: '🔒 Secure & Trusted' }, { text: '🏅 Ontario Licensed' }]}
            />
        );
        expect(screen.getByText('🔒 Secure & Trusted')).toBeInTheDocument();
        expect(screen.getByText('🏅 Ontario Licensed')).toBeInTheDocument();
    });

    it('renders without optional props', () => {
        render(<PageHeader titlePrefix="GOOD." titleSuffix="CHOICE" />);
        expect(screen.getByText('GOOD.')).toBeInTheDocument();
    });
});
