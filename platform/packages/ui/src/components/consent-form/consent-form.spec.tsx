import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ConsentForm } from './consent-form';

describe('ConsentForm', () => {
    it('renders the consent control', () => {
        render(<ConsentForm />);

        expect(screen.getByRole('checkbox', { name: 'Keep me informed' })).toBeInTheDocument();
    });
});
