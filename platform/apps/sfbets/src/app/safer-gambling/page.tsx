import type React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Safer Gambling | Super Free Bets',
    description: 'Safer gambling tips, tools, and support resources from Super Free Bets.'
};

const INTRO_TEXT = `At Super Free Bets, we believe strongly that gambling should only ever be a form of entertainment, and to keep it that way, you need to be able to stay in control. That's why we're committed to responsible gambling, and why we will always take action when you need support, even if that means unsubscribing you from our emails or helping you to hide our adverts.
Have a look at the advice and guidance below for details of how to stay in control of your play, and if you are in need of further support, please use the contact details provided.

Keep it fun. Play it safe.`;

interface Tip {
    heading: string;
    body: string;
}

const TIPS: Tip[] = [
    {
        heading: 'View gambling as a bit of fun - not a way to make money.',
        body: 'Gambling is first and foremost a form of entertainment, and this should be your reason for playing. Never play with an expectation to get money back.'
    },
    {
        heading: 'Set a money limit before you play.',
        body: "Calculate exactly what you can afford to lose, and don't go over this amount. Most sites now offer deposit limit tools to help you control what you're spending."
    },
    {
        heading: "Don't attempt to win back your losses.",
        body: "Chasing your losses is a bad idea, as it's likely to just lead to even bigger losses. Stick to your money limit and accept that once it's gone, it's gone."
    },
    {
        heading: 'Balance gambling with other activities.',
        body: "Although gambling is a form of entertainment, it shouldn't be your only form of entertainment. Remember to make time to enjoy other hobbies too."
    },
    {
        heading: "Don't drink alcohol when gambling.",
        body: "Drinking alcohol can cloud your judgment and make you take risks you wouldn't when sober, so avoid combining alcohol with gambling if you want to stay in control."
    },
    {
        heading: 'Only bet with money you can afford to lose.',
        body: "Don't be tempted to gamble with money you may need for bills or living costs. The money you choose to spend on gambling should come from your entertainment budget."
    },
    {
        heading: 'Decide on a time limit or set an alarm.',
        body: "It's easy to lose track of time when you're gambling, so set an alarm or use the site's 'Reality Check' tools to set a length of time you'd like to play for. When the time's up, it's up."
    },
    {
        heading: "Make sure you're in the right frame of mind.",
        body: "It's hard to make rational decisions if you're feeling depressed, anxious, or even elated, so only gamble when you've got a clear head."
    },
    {
        heading: 'Take a step back with frequent breaks.',
        body: "Don't lose track of time and perspective. As well as setting an overall time limit, take regular breaks to step out for some air or grab a bite to eat."
    },
    {
        heading: 'Speak up if you need help.',
        body: "If you think your gambling might be becoming a problem, speak up. From support groups to confidential advice, there's lots of help available. (For more information, see 'External Support' below.)"
    }
];

const SELF_ASSESSMENT_TEXT = `How safe is your gambling? The Responsible Gambling Council (RGC) have a free and anonymous assessment you can take in order to review your gambling behaviour and check that it's under control. There are 9 short questions that will assess the time you spend gambling, and how it affects your finances, relationships and health. Tap the following link to go to the test and check you're still playing it safe:`;

const UNSUBSCRIBE_TEXT = `If you have subscribed to emails from Super Free Bets and would like to stop receiving these, you can unsubscribe at any time by scrolling to the bottom of the email and clicking 'Unsubscribe from future emails'.
To unsubscribe from receiving SMS messages please click on the opt-out link provided to you in the SMS you have received, enter the telephone number you wish to opt out in the onscreen box, and click "I'm sure I want to leave".
If you need further assistance unsubscribing from our email and/or SMS updates, you can also contact us at support@superfreebets.co.uk.
Please note that as Super Free Bets is purely a comparison site, we do not have access to any accounts you may have set up when clicking through to individual sportsbooks. In order to make changes to these accounts, please contact the customer service team for the site you signed up to.`;

const SOCIAL_MEDIA_TEXT = `Although we advertise our product on social media, we understand that you may not wish to see gambling-based advertising from us.

In order to find out how to hide our adverts, please click this link: https://www.facebook.com/help/146952742043748?helpref=related`;

const BLOCK_ACCESS_TEXT = `There are a number of different websites that can block access to online gambling through sophisticated blocking software. This software can be downloaded directly to your device(s) and can be used for self-exclusion or parental control. Although some of this software is free, some may include a charge, so you are encouraged to compare and decide on the best product for you. Examples include:`;

const BLOCK_TRANSACTIONS_TEXT = `Most banks can activate a block on payments to gambling retailers, to help you manage what you are spending on gambling. You might be able to find these in your online / mobile banking settings under 'card control' or 'merchant control' settings, but if unsure it's best to contact your individual bank.`;

interface BlockLink {
    label: string;
    href: string;
}

const BLOCK_ACCESS_LINKS: BlockLink[] = [
    { label: 'GAMBAN.COM', href: 'https://gamban.com' },
    { label: 'GAMBLOCK.COM', href: 'https://gamblock.com' },
    { label: 'FREEDOM.TO', href: 'https://freedom.to' },
    { label: 'BETBLOCKER.ORG', href: 'https://betblocker.org' },
    { label: 'NETNANNY.COM', href: 'https://netnanny.com' },
    { label: 'MYPLAY.BREAK', href: 'https://myplay.break' }
];

interface SupportOrg {
    title: string;
    url: string;
    href: string;
    body: string;
}

const EXTERNAL_SUPPORT: SupportOrg[] = [
    {
        title: 'GamCare',
        url: 'www.gamcare.org.uk/talk-to-us-now/',
        href: 'https://www.gamcare.org.uk/talk-to-us-now/',
        body: 'GamCare is the leading national provider of information, advice, support and free treatment for anyone affected by problem gambling. You can contact them confidentially via Netline or on Freephone: 0808 8020 133.'
    },
    {
        title: 'BeGambleAware',
        url: 'www.begambleaware.org',
        href: 'https://www.begambleaware.org',
        body: 'BeGambleAware provides free information, advice, and support for anyone worried about their gambling, or the gambling of someone close to them.'
    },
    {
        title: 'GamStop',
        url: 'www.gamstop.co.uk',
        href: 'https://www.gamstop.co.uk',
        body: 'GamStop is a free service that lets you put controls in place to help restrict your online gambling activities across websites and apps licensed in Great Britain.'
    },
    {
        title: 'Gambling Therapy',
        url: 'www.gamblingtherapy.org',
        href: 'https://www.gamblingtherapy.org',
        body: 'Gambling Therapy are a global online support service, offering advice in multiple languages for people who have been adversely affected by gambling.'
    },
    {
        title: 'National Gambling Helpline',
        url: '0808 8020 133',
        href: 'tel:08088020133',
        body: 'The National Gambling Helpline provides free, confidential support and advice 24 hours a day, 7 days a week. Call 0808 8020 133 or visit the website for live chat support.'
    }
];

interface RgLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const RESPONSIBLE_GAMBLING_LOGOS: RgLogo[] = [
    { src: '/sfbets/footer/keepitfun.svg', alt: 'Keep It Fun', width: 176, height: 39 },
    { src: '/sfbets/footer/18plus.svg', alt: '18+', width: 52, height: 52 },
    { src: '/sfbets/footer/gamcare.svg', alt: 'GamCare', width: 176, height: 50 },
    { src: '/sfbets/footer/gamstop.svg', alt: 'GAMSTOP', width: 70, height: 52 },
    { src: '/sfbets/footer/gambleaware.svg', alt: 'GambleAware', width: 176, height: 23 },
    { src: '/sfbets/footer/gamblingtherapy.svg', alt: 'Gambling Therapy', width: 137, height: 52 }
];

export default function SaferGamblingPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbetsNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <div className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12 flex flex-col gap-8">
                <div className="py-3">
                    <h1 className="text-[32px] font-bold leading-[40px] text-tertiary md:text-[45px] md:leading-[52px]">
                        Safer Gambling 📑
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row md:gap-8">
                    <p className="flex-1 min-w-0 text-[14px] md:text-base leading-5 md:leading-6 tracking-[0.25px] text-on-surface-light whitespace-pre-line">
                        {INTRO_TEXT}
                    </p>
                    <div className="flex flex-col gap-4 md:gap-6 p-[10px] shrink-0 mt-4 md:mt-0 md:w-[303px]">
                        <p className="font-bold md:font-medium text-on-surface-light">1- Take a break</p>
                        <p className="font-bold md:font-medium text-on-surface-light">2- Set your limits</p>
                        <p className="font-bold md:font-medium text-on-surface-light">3- Keep bet regret in check</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {RESPONSIBLE_GAMBLING_LOGOS.map((logo) => (
                        <div key={logo.alt} className="flex items-center justify-center h-16 px-8 py-1.5">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="object-contain max-h-full w-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-14 pb-12 flex flex-col gap-8">
                <div className="flex flex-col gap-8 py-6">
                    <h2 className="text-[22px] font-medium leading-7 md:text-[32px] md:font-bold md:leading-10 text-on-surface-light">
                        Our 10 Top Tips for Safer Gambling
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TIPS.map((tip, i) => (
                            <div key={i} className="flex flex-col gap-2 p-4 bg-on-surface-light rounded-2xl">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-on-surface-dark shrink-0">
                                    <span className="text-[28px] font-normal leading-none text-tertiary">
                                        {i + 1}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-base font-bold text-on-surface-dark">
                                        {tip.heading}
                                    </p>
                                    <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark">
                                        {tip.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:max-w-[648px]">
                    <h2 className="text-[22px] font-medium leading-7 text-tertiary">
                        Self-Assessment:
                    </h2>
                    <p className="text-[14px] md:text-base leading-5 md:leading-6 tracking-[0.25px] text-on-surface-light">
                        {SELF_ASSESSMENT_TEXT}
                    </p>
                    <a href="https://responsiblegambling.org" target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="tertiary" className="w-full">
                            TAKE TEST ➜
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Block Gambling Transactions:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                            {BLOCK_TRANSACTIONS_TEXT}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Limit Our Social Media Ads:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light whitespace-pre-line">
                            {SOCIAL_MEDIA_TEXT}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Unsubscribe From Our Emails / SMS Updates:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light whitespace-pre-line">
                            {UNSUBSCRIBE_TEXT}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Block Access to Online Gambling:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                            {BLOCK_ACCESS_TEXT}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {BLOCK_ACCESS_LINKS.map((link) => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="primary" className="w-full">
                                        {link.label}
                                    </Button>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-outline rounded-lg p-4">
                    <div className="flex items-center gap-4">
                        <ExternalLink className="w-6 h-6 text-on-surface-light shrink-0" />
                        <h2 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            External Support
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {EXTERNAL_SUPPORT.map((org, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 pb-6 border-b border-on-surface-light last:border-b-0 last:pb-0"
                            >
                                <p className="text-base font-bold text-on-surface-light">
                                    {org.title}
                                </p>
                                <a
                                    href={org.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base font-medium text-on-surface-light hover:underline"
                                >
                                    {org.url}
                                </a>
                                <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                                    {org.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SfbetsFooter legalText={legalText} state="mi" />
        </main>
    );
}
