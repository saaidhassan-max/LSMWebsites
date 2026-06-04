import type React from 'react';
import type { Metadata } from 'next';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'About Us | Super Free Bets',
    description: 'Learn more about Super Free Bets — the UK\'s independent betting comparison platform.'
};

const INTRO = `At Super Free Bets, our goal is to provide New Jersey players with a superior online casino gaming experience.

Created and operated by the experienced team of professionals at Little Star Media – the experts behind Super Free Slot Games and Super Free Bingo, two trusted and well-established UK online game offer portals – our user-friendly site brings together all of the best online casino promotions. We make it easy to take advantage of lucrative signup offers and bonuses for loyal players, and many of the deals we feature are exclusive.`;

const SAFE = {
    heading: 'Secure, Safe New Jersey Online Casino Gaming',
    body: `You will always be in safe hands when you play with our partners. All the casinos we work with are legal and licensed to operate online in New Jersey. We only connect you with the licensed casino brands that we know and love, to eliminate any risk for you. These are just a few of the advantages of choosing us for your New Jersey online casino experiences:`
};

const SAFE_BULLETS = [
    'All games are fair and fun!',
    'You can choose from multiple payment methods!',
    'You get the fastest winning payouts around!',
    'Your personal and financial information is kept safe and secure!'
];

const SAFE_FOOTER = `Stick with the casinos listed with us and you'll never have to worry about safety or security while you're having fun.`;

const ACCURATE = {
    heading: 'Accurate, Up-to-Date Information for Online Casinos in New Jersey',
    body: `For everyone who wants to learn more about internet gambling in the Garden State, the various types of bonus offers available or other details about online casino gaming, we have accurate, up-to-date information right here on our site.\n\nWe have step-by-step bonus claim guides, unbiased New Jersey casino reviews, the latest internet gambling industry news and descriptions of the hottest games – all that, plus the best free cash and deposit match offers currently available.`
};

const CLOSING = {
    heading: 'We Are Always Here for You!',
    body: `Super Free Bets is here to meet your needs, and we hope to become your one and only source for everything related to New Jersey online casino gaming. Feeling lucky? Check out our bonus offers and get started playing today!`
};

export default function AboutPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SfbetsNav />
            <USP text="OVER 1,000,000 BETS PLACED" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8 md:max-w-[948px] text-on-surface-light">
                    <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                        About Super Free Bets
                    </h1>
                    <p className="text-base leading-6 tracking-[0.5px] whitespace-pre-line">{INTRO}</p>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">{SAFE.heading}</h2>
                        <p className="text-base leading-6 tracking-[0.5px]">{SAFE.body}</p>
                        <ul className="list-disc list-inside flex flex-col gap-1 pl-4 text-base leading-6">
                            {SAFE_BULLETS.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className="text-base leading-6 tracking-[0.5px]">{SAFE_FOOTER}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">{ACCURATE.heading}</h2>
                        <p className="text-base leading-6 tracking-[0.5px] whitespace-pre-line">{ACCURATE.body}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">{CLOSING.heading}</h2>
                        <p className="text-base leading-6 tracking-[0.5px]">{CLOSING.body}</p>
                    </div>
                </div>
            </section>

            <SfbetsFooter legalText={legalText} />
        </main>
    );
}
