import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavCapsule } from './nav-capsule';

describe('NavCapsule', () => {
    it('renders a navigation link', () => {
        render(<NavCapsule emoji="🏠" href="/" label="Hjem" />);

        expect(screen.getByRole('link', { name: '🏠 Hjem' })).toBeInTheDocument();
    });
});
