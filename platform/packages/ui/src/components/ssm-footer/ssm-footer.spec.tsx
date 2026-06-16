import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SsmFooter } from './ssm-footer';

describe('SsmFooter', () => {
    it('renders footer navigation', () => {
        render(<SsmFooter />);

        expect(screen.getByText('Privatlivspolitik')).toBeInTheDocument();
        expect(screen.getByAltText('ROFUS')).toBeInTheDocument();
    });

    it('links responsible gambling logos that have Figma click actions', () => {
        render(<SsmFooter />);

        expect(screen.getByRole('link', { name: 'ROFUS' })).toHaveAttribute(
            'href',
            'https://www.rofus.nu/'
        );
        expect(screen.getByRole('link', { name: 'Ludomani' })).toHaveAttribute(
            'href',
            'https://ludomani.dk/'
        );
        expect(screen.getByRole('link', { name: 'StopSpillet' })).toHaveAttribute(
            'href',
            'https://www.stopspillet.dk/'
        );
    });
});
