import type React from 'react';
import type { Metadata } from 'next';
import { LegalPageLayout } from '../../components/legal-page-layout';
import { termsPage } from '../../data/legal-pages';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Bets NJ',
    description: 'Terms and Conditions for using the Super Free Bets website.'
};

export default function TermsPage(): React.ReactElement {
    return <LegalPageLayout page={termsPage} />;
}
