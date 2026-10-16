import type React from 'react';
import type { Metadata } from 'next';
import { LegalPageLayout } from '../../components/legal-page-layout';
import { aboutPage } from '../../data/legal-pages';

export const metadata: Metadata = {
    title: 'About Us | Super Free Slot Games',
    description: 'Learn more about Super Free Slot Games — the UK\'s independent slots comparison platform.'
};

export default function AboutPage(): React.ReactElement {
    return <LegalPageLayout page={aboutPage} />;
}
