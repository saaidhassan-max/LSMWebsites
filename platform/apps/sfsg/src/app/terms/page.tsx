import type React from 'react';
import type { Metadata } from 'next';
import { LegalPageLayout } from '../../components/legal-page-layout';
import { termsPage } from '../../data/legal-pages';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Super Free Slot Games',
    description: 'Terms and Conditions for Super Free Slot Games.'
};

export default function TermsPage(): React.ReactElement {
    return <LegalPageLayout page={termsPage} />;
}
