import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LogoSection } from './logo-section';

describe('LogoSection', () => {
    it('renders the logo and menu button', () => {
        render(<LogoSection onMenuClick={vi.fn()} />);

        expect(screen.getByAltText('Super Spillemaskiner')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Åbn menu' })).toBeInTheDocument();
    });
});
