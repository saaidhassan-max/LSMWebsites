import type React from 'react';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsSiteSettings } from '../../data/cms-content';
import { ContactForm } from './contact-form';

export default async function ContactPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();

    return (
        <main className="flex flex-col w-full bg-surface pb-12">
            <SfbNav items={settings.navItems} />
            <USP text={settings.howToClaimUspText} />

            <div className="w-full max-w-[1440px] mx-auto px-4 py-8 flex flex-col gap-8 md:px-16 md:py-16 md:grid md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[32px] md:text-[45px] font-bold leading-tight text-on-surface-light">
                        Contact Us
                    </h1>
                    <p className="text-base text-on-surface-light">
                        Have a question or need help?
                        <br />
                        Fill in the form and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                <ContactForm />
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 py-4 md:px-16 md:py-8">
                <WebsiteDirectory
                    title={settings.directoryTitle}
                    sites={settings.directorySites}
                    splitAtDot
                />
            </div>

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
