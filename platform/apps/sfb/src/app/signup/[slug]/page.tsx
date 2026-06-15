import type React from 'react';
import { notFound } from 'next/navigation';
import { SignupLandingPage } from '../../../components/signup-landing-page';
import { getCmsLandingPageContent, getCmsSiteSettings } from '../../../data/cms-content';

export const dynamic = 'force-dynamic';

export default async function CmsSignupPage({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const [content, settings] = await Promise.all([
        getCmsLandingPageContent(slug),
        getCmsSiteSettings()
    ]);
    if (content === null) notFound();
    return <SignupLandingPage content={content} settings={settings} />;
}
