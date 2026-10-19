import type React from 'react';
import { ContactForm } from '@lsm/ui/components/contact-form/contact-form';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SfsgNav } from '../../components/sfsg-nav';
import { directorySites, legalText } from '../../data/site-content';

export default function ContactPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface pb-12">
            <SfsgNav />
            <USP text="OVER 150,000 OFFERS CLAIMED" variant="slots" />

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
                <WebsiteDirectory title="Super Free Slot Games Directory" sites={directorySites} />
            </div>

            <SfsgFooter legalText={legalText} />
        </main>
    );
}
