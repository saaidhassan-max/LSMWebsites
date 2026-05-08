import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WelcomeBanner } from './welcome-banner';

describe('WelcomeBanner', () => {
    it('renders welcome text', () => {
        render(<WelcomeBanner text="Velkommen" />);

        expect(screen.getAllByText('Velkommen')[0]).toBeInTheDocument();
    });
});
