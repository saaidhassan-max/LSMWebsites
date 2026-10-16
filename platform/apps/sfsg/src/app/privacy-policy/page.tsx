import type React from 'react';
import type { Metadata } from 'next';
import { LegalPageLayout } from '../../components/legal-page-layout';
import { privacyPolicyPage } from '../../data/legal-pages';

export const metadata: Metadata = {
    title: 'Privacy Policy | Super Free Slot Games',
    description: 'Privacy Policy for Super Free Slot Games — how we collect, use, and protect your personal data.'
};

export default function PrivacyPolicyPage(): React.ReactElement {
    return <LegalPageLayout page={privacyPolicyPage} />;
}
