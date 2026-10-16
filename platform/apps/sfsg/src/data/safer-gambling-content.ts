import type { SaferGamblingContent } from './safer-gambling-content.types';

export const saferGamblingContent: SaferGamblingContent = {
    title: 'Safer Gambling 📑',
    introParagraphs: [
        [
            {
                text: 'At Super Free Slot Games, we believe strongly that gambling should only ever be a form of entertainment, and to keep it that way, you need to be able to stay in control. That’s why we’re committed to responsible gambling, and why we will always take action when you need support, even if that means unsubscribing you from our emails or helping you to hide our adverts.'
            }
        ],
        [
            {
                text: 'Have a look at the advice and guidance below for details of how to stay in control of your play, and if you are in need of further support, please use the contact details provided.'
            }
        ],
        [{ text: 'Keep it fun. Play it safe.' }]
    ],
    keyMessages: ['Take a break', 'Set your limits', 'Keep bet regret in check'],
    tipsTitle: 'Our 10 Top Tips for Safer Gambling:',
    tips: [
        {
            heading: 'View gambling as a bit of fun - not a way to make money.',
            body: 'Gambling is first and foremost a form of entertainment, and this should be your reason for playing. Never play with an expectation to get money back.'
        },
        {
            heading: 'Only bet with money you can afford to lose.',
            body: 'Don’t be tempted to gamble with money you may need for bills or living costs. The money you choose to spend on gambling should come from your entertainment budget.'
        },
        {
            heading: 'Set a money limit before you play.',
            body: 'Calculate exactly what you can afford to lose, and don’t go over this amount. Most sites now offer deposit limit tools to help you control what you’re spending.'
        },
        {
            heading: 'Decide on a time limit or set an alarm.',
            body: 'It’s easy to lose track of time when you’re gambling, so set an alarm or use the site’s ‘Reality Check’ tools to set a length of time you’d like to play for. When the time’s up, it’s up.'
        },
        {
            heading: 'Don’t attempt to win back your losses.',
            body: 'Chasing your losses is a bad idea, as it’s likely to just lead to even bigger losses. Stick to your money limit and accept that once it’s gone, it’s gone.'
        },
        {
            heading: 'Make sure you’re in the right frame of mind.',
            body: 'It’s hard to make rational decisions if you’re feeling depressed, anxious, or even elated, so only gamble when you’ve got a clear head.'
        },
        {
            heading: 'Balance gambling with other activities.',
            body: 'Although gambling is a form of entertainment, it shouldn’t be your only form of entertainment. Remember to make time to enjoy other hobbies too.'
        },
        {
            heading: 'Take a step back with frequent breaks.',
            body: 'Don’t lose track of time and perspective. As well as setting an overall time limit, take regular breaks to step out for some air or grab a bite to eat.'
        },
        {
            heading: 'Don’t drink alcohol when gambling.',
            body: 'Drinking alcohol can cloud your judgment and make you take risks you wouldn’t when sober, so avoid combining alcohol with gambling if you want to stay in control.'
        },
        {
            heading: 'Speak up if you need help.',
            body: 'If you think your gambling might be becoming a problem, speak up. From support groups to confidential advice, there’s lots of help available. (For more information, see ‘External Support’ below.)'
        }
    ],
    selfAssessment: [
        {
            text: 'How safe is your gambling? GamCare have a free and anonymous assessment you can take in order to review your gambling behaviour and check that it’s under control. There are 16 short questions that will assess the time you spend gambling, and how it affects your finances, relationships and health. Tap the following link to go to the test and check you’re still playing it safe:'
        }
    ],
    selfAssessmentHref: 'https://www.gamcare.org.uk/understanding-your-gambling/self-assessment-tool/',
    unsubscribeParagraphs: [
        [
            {
                text: 'If you have subscribed to emails from Super Free Slot Games and would like to stop receiving these, you can unsubscribe at any time by scrolling to the bottom of the email and clicking ‘Unsubscribe from future emails’.'
            }
        ],
        [
            {
                text: 'To unsubscribe from receiving SMS messages please click on the opt-out link provided to you in the SMS you have received, enter the telephone number you wish to opt out in the onscreen box, and click “I‘m sure I want to leave”.'
            }
        ],
        [
            {
                text: 'If you need further assistance unsubscribing from our email and/or SMS updates, you can also contact us at '
            },
            {
                text: 'support@superfreeslotgames.com',
                href: 'mailto:support@superfreeslotgames.com'
            },
            { text: '.' }
        ],
        [
            {
                text: 'Please note that as Super Free Slot Games is purely a deal comparison site, we do not have access to any accounts you may have set up when claiming a deal. In order to make changes to these accounts, please contact the customer service team for the site you signed up to.'
            }
        ]
    ],
    socialMediaParagraphs: [
        [
            {
                text: 'Although we advertise our product on social media, we understand that you may not wish to see gambling-based advertising from us. In order to find out how to hide our adverts, please click this '
            },
            {
                text: 'link',
                href: 'https://www.facebook.com/help/146952742043748?helpref=related'
            },
            { text: '.' }
        ],
        [
            {
                text: 'For further information on limiting exposure to gambling advertising you can also visit GambleAware '
            },
            { text: 'here', href: 'https://www.gambleaware.org/' },
            { text: '.' }
        ]
    ],
    blockAccess: [
        {
            text: 'There are a number of different websites that can block access to online gambling through sophisticated blocking software. This software can be downloaded directly to your device(s) and can be used for self-exclusion or parental control. Although some of this software is free, some may include a charge, so you are encouraged to compare and decide on the best product for you. Examples include:'
        }
    ],
    blockAccessLinks: [
        { label: 'gamban.com', href: 'https://gamban.com/' },
        { label: 'gamblock.com', href: 'https://www.gamblock.com/' },
        { label: 'freedom.to', href: 'https://freedom.to/' },
        { label: 'betblocker.org', href: 'https://www.betblocker.org/' },
        { label: 'netnanny.com', href: 'https://www.netnanny.com/' },
        { label: 'gamstop.co.uk', href: 'https://www.gamstop.co.uk/' }
    ],
    blockTransactions: [
        {
            text: 'There are a number of banks that can activate a block on payments to gambling retailers, to help you manage what you are spending on gambling. For a list of financial services organisations in the UK that currently offer gambling blocks on debit cards see: '
        },
        {
            text: 'www.gamcare.org.uk/block-gambling-transactions',
            href: 'https://www.gamcare.org.uk/self-help/managing-your-money/#banks'
        },
        { text: '.' }
    ],
    externalSupport: [
        {
            title: 'National Gambling Helpline',
            links: [
                {
                    text: 'www.gamcare.org.uk/talk-to-us-now',
                    href: 'https://www.gamcare.org.uk/get-support/talk-to-us-now/'
                }
            ],
            body: 'GamCare operate the National Gambling Helpline and offer confidential information, advice and support for anyone harmed by gambling in Great Britain. The Helpline is open 24 hours every day on Freephone 0808 8020 133 or via Live Chat. Advisers will listen to you, they won’t judge and your conversation is confidential.'
        },
        {
            title: 'GamCare Forums and Chatrooms',
            links: [
                {
                    text: 'www.gamcare.org.uk/gamcare-forum',
                    href: 'https://community.gamcare.org.uk/forum/'
                },
                { text: ' and ' },
                {
                    text: 'www.gamcare.org.uk/group-chatroom',
                    href: 'https://community.gamcare.org.uk/chatrooms/'
                }
            ],
            body: 'GamCare offers a moderated online forum and daily online group chatrooms to enable those affected by gambling harms to connect with others in similar situations, share their experience and support one another.'
        },
        {
            title: 'GambleAware',
            links: [{ text: 'www.gambleaware.org', href: 'https://www.gambleaware.org/' }],
            body: 'GambleAware provides information, advice and directs people to support to help keep people safe from gambling harms.'
        },
        {
            title: 'National Gambling Support Network',
            links: [{ text: 'www.gambleaware.org/ngsn', href: 'https://www.gambleaware.org/ngsn' }],
            body: 'The National Gambling Support Network is a network of organisations working together to provide confidential treatment and support for anyone experiencing gambling-related harms, free to access across England, Scotland and Wales.'
        },
        {
            title: 'Gambling Therapy',
            links: [{ text: 'www.gamblingtherapy.org', href: 'https://www.gamblingtherapy.org/' }],
            body: 'Gambling Therapy are a global online support service, offering advice in multiple languages for people who have been adversely affected by gambling.'
        }
    ]
};
