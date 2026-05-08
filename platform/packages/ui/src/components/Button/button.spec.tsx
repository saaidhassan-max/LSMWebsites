import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
    it('renders the button label', () => {
        render(<Button>PLAY NOW</Button>);

        expect(screen.getByRole('button', { name: 'PLAY NOW' })).toBeInTheDocument();
    });
});
