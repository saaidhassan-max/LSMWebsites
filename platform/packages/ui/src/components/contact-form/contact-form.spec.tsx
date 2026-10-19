import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
    it('shows an error for every empty field and does not confirm', () => {
        const onSubmit = vi.fn();
        render(<ContactForm onSubmit={onSubmit} />);

        fireEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
        expect(screen.queryByText('Message sent!')).not.toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('rejects an invalid email', () => {
        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Email Address (required)'), {
            target: { value: 'not-an-email' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    it('confirms only when every field is valid', () => {
        const onSubmit = vi.fn();
        render(<ContactForm onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText('Name (required)'), { target: { value: 'Sam' } });
        fireEvent.change(screen.getByLabelText('Email Address (required)'), {
            target: { value: 'sam@example.com' }
        });
        fireEvent.change(screen.getByLabelText('Message (required)'), {
            target: { value: 'Hello' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(screen.getByText('Message sent!')).toBeInTheDocument();
        expect(onSubmit).toHaveBeenCalledWith({
            name: 'Sam',
            email: 'sam@example.com',
            message: 'Hello'
        });
    });
});
