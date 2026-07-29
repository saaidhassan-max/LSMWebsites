import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ConfettiBurst } from './confetti-burst';

describe('ConfettiBurst', () => {
    it('renders confetti pieces after mount', () => {
        const { container } = render(<ConfettiBurst pieceCount={12} />);

        expect(container.querySelectorAll('span')).toHaveLength(12);
    });
});
