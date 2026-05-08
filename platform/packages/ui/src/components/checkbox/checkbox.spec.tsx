import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
    it('renders the accessible checkbox label', () => {
        render(<Checkbox checked={false} label="Casino" onChange={vi.fn()} />);

        expect(screen.getByRole('checkbox', { name: 'Casino' })).toBeInTheDocument();
    });
});
