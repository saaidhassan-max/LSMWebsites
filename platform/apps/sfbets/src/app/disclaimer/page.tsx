import type React from 'react';
import type { Metadata } from 'next';
import { LegalPageLayout } from '../../components/legal-page-layout';
import { disclaimerPage } from '../../data/legal-pages';

export const metadata: Metadata = {
    title: 'Disclaimer | Super Free Bets MI',
    description: 'Disclaimer for Super Free Bets.'
};

export default function DisclaimerPage(): React.ReactElement {
    return <LegalPageLayout page={disclaimerPage} />;
}
