import type React from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@lsm/ui/components/contact-form/contact-form';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Contact Us | Super Free Bets MI',
    description: 'Get in touch with the Super Free Bets team.'
};

export default function ContactPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface pb-12">
            <SfbetsNav />
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

            <SfbetsFooter legalText={legalText} state="mi" />
        </main>
    );
}
