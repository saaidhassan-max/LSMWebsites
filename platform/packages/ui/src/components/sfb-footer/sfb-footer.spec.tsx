import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SfbFooter } from './sfb-footer';

describe('SfbFooter', () => {
    it('renders footer navigation', () => {
        render(<SfbFooter />);

        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByAltText('GamCare')).toBeInTheDocument();
    });
});
