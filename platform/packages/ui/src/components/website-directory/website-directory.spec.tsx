import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WebsiteDirectory } from './website-directory';

describe('WebsiteDirectory', () => {
    it('renders directory entries', () => {
        render(<WebsiteDirectory title="Directory" sites={[{ name: '888 Ladies' }]} />);

        expect(screen.getByRole('heading', { name: 'Directory' })).toBeInTheDocument();
        expect(screen.getByText('888 Ladies')).toBeInTheDocument();
    });
});
