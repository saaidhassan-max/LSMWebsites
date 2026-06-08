import type React from 'react';
import type { Metadata } from 'next';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { OntarioFooter } from '@lsm/ui/components/ontario-footer/ontario-footer';
import { OntarioNav } from '../../components/ontario-nav';
import { privacyPolicyText } from '../../data/legal-content';
import { directorySites } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Privacy Policy | Good Choice Ontario',
    description: 'Privacy policy for Good Choice Ontario.'
};

export default function PrivacyPolicyPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <OntarioNav />

            <div className="w-full max-w-[1440px] mx-auto px-4 py-12 md:px-16 flex flex-col gap-8">
                <h1 className="text-[32px] md:text-[45px] font-bold leading-10 md:leading-[52px] text-tertiary">
                    Privacy Policy
                </h1>

                <div className="md:grid md:grid-cols-3 md:gap-[10px]">
                    <p className="md:col-span-2 text-base leading-6 tracking-[0.5px] text-on-surface-light whitespace-pre-line">
                        {privacyPolicyText}
                    </p>
                </div>

                <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6">
                    <WebsiteDirectory
                        title="Good.Choice Directory"
                        sites={directorySites}
                        splitAtDot
                    />
                    <SignupForm variant="ontario" brandName="Good.Choice" privacyPolicyUrl="/privacy-policy" termsUrl="/terms" />
                </div>
            </div>

            <OntarioFooter />
        </main>
    );
}
