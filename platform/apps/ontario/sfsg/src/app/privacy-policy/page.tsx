import type React from 'react';
import type { Metadata } from 'next';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfsgNav } from '../../components/sfsg-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Privacy Policy | Super Free Slot Games',
    description: 'Privacy Policy for Super Free Slot Games — how we collect, use, and protect your personal data.'
};

const CONTENT = `Super Free Slot Games, operated by Little Star Media Limited, is committed to protecting your personal data. This policy explains how we handle your information when you visit our website, and outlines your privacy rights under the UK GDPR. We may update this policy periodically. Our service is intended only for UK residents aged 18 and above, and we do not knowingly collect data from children.

Data Controllers

Little Star Media Limited and It's a Good Choice Ltd act as joint data controllers. Both are UK-registered companies with offices at Suite 478-480, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA. Caroline Sugrue is our appointed Data Protection Officer and is contactable for any questions about this policy or requests to exercise your rights.

Your Rights

Under UK GDPR you have eight core rights: the right to be informed, to access your data, to correct inaccuracies, to request erasure, to opt out of processing, to restrict processing, to data portability, and to object to processing. You may exercise any of these rights by contacting our Data Protection Officer.

Data We Collect

We collect identity data (name, username, title, gender), contact information (email address, phone number), IP addresses, geographic location, and technical data (device type, browser information, language preference). This information supports user identification, service delivery, communication, fraud detection, and website optimisation through tools including Hotjar and Google Analytics.

How We Use Your Data

Personal data supports our marketing communications, typically up to five emails or SMS messages per week. We may share data with Facebook for the purposes of targeted content. The legal grounds for processing are your consent, our legal obligations, and our legitimate business interests in security and service improvement.

Third-Party Sharing

We share data with trusted service providers including Hotjar, Reportdash, Mozenda, Microsoft, Google Analytics, Acoustic L.P, Voodoo, and Zapier, as well as advertising networks, payment providers, and law enforcement agencies where required by law.

Data Retention

Data for active users is retained throughout engagement plus six additional months. Inactive users are suppressed for two years before deletion. Marketing opt-outs trigger hard suppression for five years. Retention may be extended where complaints or litigation appear likely.

Your Controls

You may withdraw marketing consent at any time using the unsubscribe link in any of our communications or by contacting us directly. You can also request processing restrictions, data portability, or erasure — we aim to respond to all requests within one month.

Security

We implement appropriate safeguards against unauthorised processing, loss, or damage. Access to your data is limited to personnel with a genuine business need. We maintain breach procedures and notify the relevant regulator as required by law.

International Transfers

Data transfers outside the UK or EEA occur only where adequate safeguards exist, such as standard contractual clauses or binding corporate agreements recognised under UK GDPR.`;

export default function PrivacyPolicyPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfsgNav />
            <USP text="OVER 5,000,000 SLOT PLAYERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Privacy Policy
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {CONTENT}
                    </p>
                </div>
            </section>

            <SfsgFooter legalText={legalText} />
        </main>
    );
}
