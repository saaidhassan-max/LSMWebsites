import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavDrawer } from './nav-drawer';

describe('NavDrawer', () => {
    it('renders drawer navigation items', () => {
        render(
            <NavDrawer
                isOpen
                items={[{ emoji: '🏠', href: '/', label: 'Hjem' }]}
                onClose={vi.fn()}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '🏠 Hjem' })).toBeInTheDocument();
    });
});
