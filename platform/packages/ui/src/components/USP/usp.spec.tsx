import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { USP } from './usp';

describe('USP', () => {
    it('renders the proposition text', () => {
        render(<USP text="OVER 5,000,000 SUBSCRIBERS" />);

        expect(screen.getByText('OVER 5,000,000 SUBSCRIBERS')).toBeInTheDocument();
    });
});
