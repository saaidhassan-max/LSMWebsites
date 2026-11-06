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

        expect(screen.getByLabelText('Name (Required)')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /sign me up/i }));

        expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('asks for first name and email only on the Bets form', () => {
        render(<SignupForm variant="sfbets" />);

        expect(screen.getByLabelText('First Name (Required)')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address (Required)')).toBeInTheDocument();
        expect(screen.queryByLabelText(/Phone Number/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Required Information/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /sign me up/i }));

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText(/box above, you confirm that you are of legal gambling age in your state/)).toBeInTheDocument();
    });
});
