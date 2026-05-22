import { render } from '@testing-library/react';
import { OperatorBanner } from './operator-banner';

describe('OperatorBanner', () => {
    it('renders an image', () => {
        const { getByRole } = render(
            <OperatorBanner src="/test.jpg" alt="Test banner" />
        );
        expect(getByRole('img')).toBeInTheDocument();
    });

    it('wraps in a link when href is provided', () => {
        const { getByRole } = render(
            <OperatorBanner src="/test.jpg" alt="Test banner" href="https://example.com" />
        );
        expect(getByRole('link')).toBeInTheDocument();
    });
});
