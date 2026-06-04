import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OntarioFooter } from './ontario-footer';

describe('OntarioFooter', () => {
    it('renders default nav links', () => {
        render(<OntarioFooter />);
        expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Disclaimer')).toBeInTheDocument();
        expect(screen.getByText('Affiliates')).toBeInTheDocument();
    });

    it('renders all four responsible gambling sections', () => {
        render(<OntarioFooter />);
        expect(screen.getByAltText('19+')).toBeInTheDocument();
        expect(screen.getByAltText('iGaming Ontario')).toBeInTheDocument();
        expect(screen.getByAltText('ConnexOntario')).toBeInTheDocument();
        expect(screen.getByAltText('Safer Gambling')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        render(<OntarioFooter />);
        expect(screen.getByText(/Good\.Choice All rights reserved/)).toBeInTheDocument();
    });

    it('accepts custom nav links', () => {
        render(
            <OntarioFooter
                navLinks={[{ label: 'Custom Link', href: '/custom' }]}
            />
        );
        expect(screen.getByText('Custom Link')).toBeInTheDocument();
    });
});
