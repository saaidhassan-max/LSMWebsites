import React from 'react';
import { render, screen } from '@testing-library/react';
import { Mail } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { TextField } from './text-field';

describe('TextField', () => {
    it('renders an input with its label', () => {
        render(<TextField icon={Mail} label="Email" />);

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
});
