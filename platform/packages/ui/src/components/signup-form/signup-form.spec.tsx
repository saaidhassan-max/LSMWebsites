import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SignupForm } from './signup-form';

describe('SignupForm', () => {
    it('renders signup fields', () => {
        render(<SignupForm />);

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    });
});
