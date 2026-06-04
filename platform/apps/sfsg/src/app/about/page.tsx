import type React from 'react';
import type { Metadata } from 'next';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfsgNav } from '../../components/sfsg-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'About Us | Super Free Slot Games',
    description: 'Learn more about Super Free Slot Games — the UK\'s independent slots comparison platform.'
};

const CONTENT = `Super Free Slot Games is an independent slots comparison platform that has been helping UK players find the best free spin bonuses since 2006. The site is managed by Little Star Media, which also operates Super Free Bingo as a sister venture.

We work exclusively with UK-licensed casino and slots brands to ensure every offer featured on our site meets the highest standards of safety and fairness. Our platform has received multiple nominations for the EGR Casino Affiliate of the Year award — a recognition of the trust and quality we've built over nearly two decades.

What We Do

Our core mission is simple: make it easy for UK players to find the best free spin and slots bonus deals in one place. We continuously update our listings with offers from both established operators and exciting new sites, and many of the deals featured here are enhanced exclusives — giving you more than the standard welcome offer you'd find going direct.

To help you make an informed choice, we provide detailed casino site reviews and step-by-step how-to-claim guides so you can get your bonus quickly and without hassle.

Stay Up to Date

Subscribe to receive the latest exclusive slots and casino offers delivered directly to your inbox. Our subscribers are always first to hear about new no-deposit deals, free spin drops, and limited-time promotions.

Why Choose Super Free Slot Games

Licensed Brands — we only list operators holding a full UK Gambling Commission licence.

Vendor Approved — our listings are verified directly with the operators we work with.

Exclusive Offers — many deals on our site are only available through Super Free Slot Games.

Mobile Friendly — all featured sites are fully optimised for mobile and tablet play.

Industry Experts — our team has over 15 years of experience in the UK slots and casino sector.`;

export default function AboutPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfsgNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            About Super Free Slot Games
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
