import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GoodChoiceLabel } from './good-choice-label';

describe('GoodChoiceLabel', () => {
    it('renders the brand text', () => {
        render(<GoodChoiceLabel />);
        expect(screen.getByText('the Good.Choice')).toBeInTheDocument();
    });
});
