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
});
