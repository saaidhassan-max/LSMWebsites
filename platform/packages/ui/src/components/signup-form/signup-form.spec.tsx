import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SignupForm } from './signup-form';

describe('SignupForm', () => {
    it('renders signup fields', () => {
        render(<SignupForm />);

        expect(screen.getByLabelText('Email Address*')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number*')).toBeInTheDocument();
    });

    it('requires a name on the Bingo/Slots form', () => {
        render(<SignupForm variant="sfb-sfsg" />);

        expect(screen.getByLabelText('Name (required)')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /sign me up/i }));

        expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
});
