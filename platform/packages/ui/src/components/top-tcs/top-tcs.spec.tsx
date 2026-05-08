import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TopTCs } from './top-tcs';

describe('TopTCs', () => {
    it('renders terms copy', () => {
        render(<TopTCs text="Terms apply" />);

        expect(screen.getByText('Terms apply')).toBeInTheDocument();
    });
});
