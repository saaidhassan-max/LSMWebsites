import type React from 'react';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { OntarioFooter } from '@lsm/ui/components/ontario-footer/ontario-footer';
import { OntarioNav } from '../../components/ontario-nav';

export const metadata: Metadata = {
    title: 'Safer Gambling | Good Choice Ontario',
    description: 'Safer gambling tips, tools, and support resources from Good Choice Ontario.'
};

const INTRO_TEXT = `At Good.Choice, we believe strongly that gambling should only ever be a form of entertainment, and to keep it that way, you need to be able to stay in control. That's why we're committed to responsible gambling, and why we will always take action when you need support, even if that means unsubscribing you from our emails or helping you to hide our adverts.

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

const BLOCK_TRANSACTIONS_TEXT = `Most banks can activate a block on payments to gambling retailers, to help you manage what you are spending on gambling. You might be able to find these in your online / mobile banking settings under 'card control' or 'merchant control' settings, but if unsure it's best to contact your individual bank.`;

const UNSUBSCRIBE_TEXT = `If you have subscribed to emails from Good.Choice and would like to stop receiving these, you can unsubscribe at any time by scrolling to the bottom of the email and clicking 'Unsubscribe from future emails'.
To unsubscribe from receiving SMS messages please click on the opt-out link provided to you in the SMS you have received, enter the telephone number you wish to opt out in the onscreen box, and click "I'm sure I want to leave".
If you need further assistance unsubscribing from our email and/or SMS updates, you can also contact us at support@itsagoodchoice.ca.
Please note that as Good.Choice is purely a comparison site, we do not have access to any accounts you may have set up when clicking through to individual casinos. In order to make changes to these accounts, please contact the customer service team for the site you signed up to.`;

const BLOCK_ACCESS_TEXT = `There are a number of different websites that can block access to online gambling through sophisticated blocking software. This software can be downloaded directly to your device(s) and can be used for self-exclusion or parental control. Although some of this software is free, some may include a charge, so you are encouraged to compare and decide on the best product for you. Examples include:`;

interface BlockLink {
    label: string;
    href: string;
}

const BLOCK_ACCESS_LINKS: BlockLink[] = [
    { label: 'GAMBAN.COM', href: 'https://gamban.com' },
    { label: 'GAMBLOCK.COM', href: 'https://gamblock.com' },
    { label: 'FREEDOM.TO', href: 'https://freedom.to' },
    { label: 'BETBLOCKER.ORG', href: 'https://betblocker.org' },
    { label: 'NETNANNY.COM', href: 'https://netnanny.com' }
];

interface SupportOrg {
    title: string;
    url: string;
    href: string;
    body: string;
}

const EXTERNAL_SUPPORT: SupportOrg[] = [
    {
        title: 'iGaming Ontario',
        url: 'www.igamingontario.ca',
        href: 'https://igamingontario.ca',
        body: 'iGaming Ontario (iGO) work with the AGCO and the Government of Ontario to establish an online gaming market that helps protect consumers gambling through private gaming companies.'
    },
    {
        title: 'Canadian Centre on Substance Use and Addiction',
        url: 'https://gamblingguidelines.ca',
        href: 'https://gamblingguidelines.ca',
        body: 'The National Gambling Support Network is a network of organisations working together to provide confidential treatment and support for anyone experiencing gambling-related harms, free to access across England, Scotland and Wales.'
    },
    {
        title: 'RGC',
        url: 'https://responsiblegambling.org',
        href: 'https://responsiblegambling.org',
        body: 'The Responsible Gambling Council (RGC) is a non-profit organization dedicated to problem gambling prevention. RGC works to reduce gambling risks through innovation, awareness and improved safeguards. They are not a treatment provider, but they can help connect you with the appropriate resources and support within your jurisdiction.'
    },
    {
        title: 'ConnexOntario',
        url: 'https://connexontario.ca',
        href: 'https://connexontario.ca',
        body: 'ConnexOntario offer free, confidential information on health services for those facing issues with alcohol, drugs, mental illness, or gambling. You can access their support 24/7 via text, live chat, email or toll-free helpline: 1-866-531-2600.'
    }
];

export default function SaferGamblingPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <OntarioNav />

            <div className="w-full bg-surface-inverse-new px-4 py-8 md:px-16 md:py-12">
                <div className="w-full max-w-[1440px] mx-auto flex flex-col md:grid md:grid-cols-2 md:gap-16">
                    <h1 className="text-[32px] md:text-[57px] font-bold leading-10 md:leading-[64px] tracking-[-0.25px] text-on-surface-dark">
                        Safer gambling 🦺
                    </h1>
                    <div className="mt-4 md:mt-0 flex flex-col gap-1 text-[22px] leading-7 text-on-surface-dark justify-center">
                        <p>Take a break</p>
                        <p>Set your limits</p>
                        <p>Keep bet regret in check</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-14 md:py-12 flex flex-col gap-8">

                <div className="flex flex-col md:flex-row md:gap-16">
                    <p className="flex-1 min-w-0 text-base leading-6 tracking-[0.5px] text-on-surface-light whitespace-pre-line">
                        {INTRO_TEXT}
                    </p>
                    <div className="flex flex-col gap-4 p-2 shrink-0 mt-4 md:mt-0 md:w-[437px] justify-center items-start">
                        <p className="font-medium text-on-surface-light">1- Take a break</p>
                        <p className="font-medium text-on-surface-light">2- Set your limits</p>
                        <p className="font-medium text-on-surface-light">3- Keep bet regret in check</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8 py-6">
                    <h2 className="text-[22px] md:text-[32px] font-bold leading-7 md:leading-10 text-on-surface-light">
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

                <div className="flex flex-col gap-4 bg-tertiary rounded-lg p-4">
                    <h3 className="text-[22px] font-medium leading-7 text-on-surface-dark">
                        🚫 Block Gambling Transactions:
                    </h3>
                    <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark">
                        {BLOCK_TRANSACTIONS_TEXT}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-tertiary rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-dark">
                            🚫 Unsubscribe From Our Emails / SMS Updates:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark whitespace-pre-line">
                            {UNSUBSCRIBE_TEXT}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-tertiary rounded-lg p-4">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-dark">
                            🚫 Block Access to Online Gambling:
                        </h3>
                        <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark">
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

                <div className="flex flex-col gap-4 bg-tertiary rounded-lg p-4">
                    <div className="flex items-center gap-4">
                        <ExternalLink className="w-6 h-6 text-on-surface-dark shrink-0" />
                        <h2 className="text-[22px] font-medium leading-7 text-on-surface-dark">
                            External Support
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {EXTERNAL_SUPPORT.map((org, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 pb-6 border-b border-on-surface-dark last:border-b-0 last:pb-0"
                            >
                                <p className="text-base font-bold text-on-surface-dark">
                                    {org.title}
                                </p>
                                <a
                                    href={org.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base font-medium text-on-surface-dark hover:underline"
                                >
                                    {org.url}
                                </a>
                                <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark">
                                    {org.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <OntarioFooter />
        </main>
    );
}
