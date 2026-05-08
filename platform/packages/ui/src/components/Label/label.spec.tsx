import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('Label', () => {
    it('renders label content', () => {
        render(<Label>HOT DEAL</Label>);

        expect(screen.getByText('HOT DEAL')).toBeInTheDocument();
    });
});
