import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { CategoryPage } from './category-pages.types';

export const categoryPages: CategoryPage[] = [
    {
        slug: 'exclusive-offers',
        title: 'Exclusive Offers',
        navEmoji: '🔥',
        headlineHighlight: 'EXCLUSIVE',
        headlineRest: ' OFFERS',
        offers: [
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/skyvegas.png',
                logoAlt: 'Sky Vegas',
                offerMain: '70 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Opt-in required. 7-day free spin expiry. All free spins will be loaded on the first eligible game selected. Game and eligibility restrictions apply. Further T&Cs apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/gala.png',
                logoAlt: 'Gala Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Deposit & spend £5 to get 100 Free Spins (£0.10 value each, selected games, valid for 7 days). Certain deposit methods excluded. Players restrictions and T&Cs apply. Daily Free Spin T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/rosybingo.png',
                logoAlt: 'Rosy Bingo',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. Each free spin value 10p. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/placeholder.png',
                logoAlt: 'Mecca Bingo',
                offerMain: '£20 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. Paypal & Paysafe) & spend £5 on select bingo rooms for bonus. 5x wagering. PromoT&Cs apply. GambleAware.org.'
            },
            {
                label: 'DOUBLE BONUS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/sunbingo.png',
                logoAlt: 'Sun Bingo',
                offerMain: '10 Free Spins No Deposit',
                details: [
                    { emoji: '✅', text: '+ Spend £10' },
                    { emoji: '✅', text: 'Get 200 Free Spins' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register today to receive 10 Free Spins (accept within 48 hours & wager winnings 10x within 3 days), deposit & spend £10+ on Casino to receive 200 Free Spins on selected games (accept within 48 hours & wager winnings 10x within 3 days). Debit cards only. Offer Ends 31.07.26. T&Cs Apply. GamCare.org.uk. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/mrq.png',
                logoAlt: 'MrQ',
                offerMain: '10 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: SPINS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/betfred.png',
                logoAlt: 'Betfred Games',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register and enter promo code SPINS prior to deposit. Deposit, using a Debit Card, and stake £10+ within 14 days on Slots at Betfred Games and/or Vegas to get 200 Free Spins on selected titles. £0.10 per spin. Credited within 48 hours and valid for 7 days. Full T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/888casino.png',
                logoAlt: '888 Casino',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. Ends 31/12/2026. New UK/IE customers. Must click this ad’s CTA, access the Promotion landing page and register through that landing page. Claim 50 Free Spins (£/€0.10 per spin) within 48 hours via pop-up/My Account and use on selected games within 3 days of credit. Free Spins winnings convert to Bonus, which must be wagered 10 times within 7 days on selected games. Winnings capped at £/€50. 1 per customer. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/foxybingo.png',
                logoAlt: 'Foxy Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. Deposit & Spend £10 on any Casino or Slot games for 100 Free Spins (selected games, value £0.10 each, claim within 7 days, valid 7 days). T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: FS50',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/888ladies.png',
                logoAlt: '888 Ladies',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min dep £10. Each free spin value 25p. Wins cap £25 & paid to games bonus. 10x games bonus wagering required. 5-day expiry. GambleAware. T&Cs apply.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/bingodiamond.png',
                logoAlt: 'Bingo Diamond',
                offerMain: '100% Bonus',
                details: [
                    { emoji: '✅', text: 'Up to £100' },
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min dep £10. Bonus can be played on Bingo only. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/costabingo.png',
                logoAlt: 'Costa Bingo',
                offerMain: '£40 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' },
                    { emoji: '✅', text: 'Use Code: BINGO40' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. 400% bingo bonus (max £100). 2x bingo, 10x games bonus wagering required. 5-day expiry. GambleAware. T&Cs apply.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/casumo.png',
                logoAlt: 'Casumo',
                offerMain: '50% Bonus',
                details: [
                    { emoji: '✅', text: 'Up to £100' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Opt-in required. 50% Deposit Bonus up to £100 on first deposit. Min deposit £20. 10x wagering on bonus amount. Max £5 per bet. Bonus valid for 7 days. Game, play and payment method restrictions apply. Play responsibly. GambleAware.org'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/glossybingo.png',
                logoAlt: 'Glossy Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min Dep £10. Each free spin value 5p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/dottybingo.png',
                logoAlt: 'Dotty Bingo',
                offerMain: '£60 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min Dep £10. 600% bingo bonus (max £100). Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/luckypantsbingo.png',
                logoAlt: 'Lucky Pants Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&C\'s apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/butlersbingo.png',
                logoAlt: 'Butlers Bingo',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. Each free spin value 10p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/kittybingo.png',
                logoAlt: 'Kitty Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&Cs Apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/coral.png',
                logoAlt: 'Coral',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Casino players only. 50 Free Spins (£0.10 each, valid on selected games, valid 7 days) will be awarded upon registration. For the additional 150 Free Spins the customer must deposit (certain deposit types excluded) and Bet £10+ on Any Slot games (within 7 days of registration) for 150 free Spins (£0.10 each, valid on selected games, valid 7 days). Restrictions and T&Cs apply. GambleAware.org.'
            }
        ]
    },
    {
        slug: 'no-deposit-offers',
        title: 'No Deposit Offers',
        navEmoji: '🎁',
        headlineHighlight: 'NO',
        headlineRest: ' DEPOSIT OFFERS',
        offers: [
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/mrq.png',
                logoAlt: 'MrQ',
                offerMain: '10 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/paddypowergames.png',
                logoAlt: 'Paddy Power Games',
                offerMain: '60 Free Spins No Deposit',
                details: [
                    { emoji: '✅', text: '+ Spend £10' },
                    { emoji: '✅', text: 'Get 200 Free Spins' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Enjoy 50 Free Spins on any of the eligible slot games + 10 Free Spins on Paddy’s Mansion Heist. Claim your 50 Free spins from your promotional hub. Next, enjoy your 10 Free spins on Paddy’s Mansion Heist (Awarded in the form of a £1 bonus). Finally, opt in, deposit and wager £10 to receive 200 more Free Spins on slots. Free Spins expire after 7 days. Deposits must be made using Pay by Bank, Apple Pay or Debit card. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'DOUBLE BONUS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/sunbingo.png',
                logoAlt: 'Sun Bingo',
                offerMain: '10 Free Spins No Deposit',
                details: [
                    { emoji: '✅', text: '+ Spend £10' },
                    { emoji: '✅', text: 'Get 200 Free Spins' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register today to receive 10 Free Spins (accept within 48 hours & wager winnings 10x within 3 days), deposit & spend £10+ on Casino to receive 200 Free Spins on selected games (accept within 48 hours & wager winnings 10x within 3 days). Debit cards only. Offer Ends 31.07.26. T&Cs Apply. GamCare.org.uk. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/betfred.png',
                logoAlt: 'Betfred Games',
                offerMain: 'Up to 50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. 00:00 – 23:59 daily. Available once per customer, per day. Free Spins rewards vary. Max 50. £0.10 per spin on selected games. Claim by 23:59. Same day expiry. Max winnings £10. Game restrictions & T&Cs Apply. Eligibility & payment exclusions apply. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/skyvegas.png',
                logoAlt: 'Sky Vegas',
                offerMain: '70 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Opt-in required. 7-day free spin expiry. All free spins will be loaded on the first eligible game selected. Game and eligibility restrictions apply. Further T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/888casino.png',
                logoAlt: '888 Casino',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. Ends 31/12/2026. New UK/IE customers. Must click this ad’s CTA, access the Promotion landing page and register through that landing page. Claim 50 Free Spins (£/€0.10 per spin) within 48 hours via pop-up/My Account and use on selected games within 3 days of credit. Free Spins winnings convert to Bonus, which must be wagered 10 times within 7 days on selected games. Winnings capped at £/€50. 1 per customer. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/coral.png',
                logoAlt: 'Coral',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Casino players only. 50 Free Spins (£0.10 each, valid on selected games, valid 7 days) will be awarded upon registration. For the additional 150 Free Spins the customer must deposit (certain deposit types excluded) and Bet £10+ on Any Slot games (within 7 days of registration) for 150 free Spins (£0.10 each, valid on selected games, valid 7 days). Restrictions and T&Cs apply. GambleAware.org.'
            }
        ]
    },
    {
        slug: 'deposit-offers',
        title: 'Deposit Offers',
        navEmoji: '🚀',
        headlineHighlight: 'DEPOSIT',
        headlineRest: ' OFFERS',
        offers: [
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/glossybingo.png',
                logoAlt: 'Glossy Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min Dep £10. Each free spin value 5p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: FS50',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/888ladies.png',
                logoAlt: '888 Ladies',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min dep £10. Each free spin value 25p. Wins cap £25 & paid to games bonus. 10x games bonus wagering required. 5-day expiry. GambleAware. T&Cs apply.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/dottybingo.png',
                logoAlt: 'Dotty Bingo',
                offerMain: '£60 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min Dep £10. 600% bingo bonus (max £100). Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/foxybingo.png',
                logoAlt: 'Foxy Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. Deposit & Spend £10 on any Casino or Slot games for 100 Free Spins (selected games, value £0.10 each, claim within 7 days, valid 7 days). T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/rosybingo.png',
                logoAlt: 'Rosy Bingo',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. Each free spin value 10p. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: SPINS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/betfred.png',
                logoAlt: 'Betfred Games',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register and enter promo code SPINS prior to deposit. Deposit, using a Debit Card, and stake £10+ within 14 days on Slots at Betfred Games and/or Vegas to get 200 Free Spins on selected titles. £0.10 per spin. Credited within 48 hours and valid for 7 days. Full T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/kittybingo.png',
                logoAlt: 'Kitty Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&Cs Apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/luckypantsbingo.png',
                logoAlt: 'Lucky Pants Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&C\'s apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/gala.png',
                logoAlt: 'Gala Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Deposit & spend £5 to get 100 Free Spins (£0.10 value each, selected games, valid for 7 days). Certain deposit methods excluded. Players restrictions and T&Cs apply. Daily Free Spin T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/mirrorbingo.png',
                logoAlt: 'Mirror Bingo',
                offerMain: 'Up to 500 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only, £10+ fund, 10x bonus wagering requirements, max bonus conversion to real funds equal to lifetime deposits (up to £250), GambleAware.org. Full T&Cs apply.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/butlersbingo.png',
                logoAlt: 'Butlers Bingo',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. Each free spin value 10p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/befaircasino.png',
                logoAlt: 'Betfair Casino',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Min 1st Deposit £10. Deposit & Spend £10 on Slots to get 100 Free Spins (£0.10 each, valid for 7 days, selected games). Claim within 7 days from reg. Player restrictions and T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/betfred.png',
                logoAlt: 'Betfred',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: '+ £10 Bonus' },
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register with promo code BINGO100. Minimum deposit and stake £10 on Bingo Tickets within 14 days to qualify. £10 Bingo Bonus must be wagered through once. 14-day expiry. Bonus Balance is used prior to Cash Balance. 100 Free Spins on selected Slots credited within 48 hours of qualification. Free Spins expire after 7 days. E-Wallet & Prepaid Card restrictions apply. SMS validation may be required. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/casumo.png',
                logoAlt: 'Casumo',
                offerMain: '50% Bonus',
                details: [
                    { emoji: '✅', text: 'Up to £100' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Opt-in required. 50% Deposit Bonus up to £100 on first deposit. Min deposit £20. 10x wagering on bonus amount. Max £5 per bet. Bonus valid for 7 days. Game, play and payment method restrictions apply. Play responsibly. GambleAware.org'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/bet365bingo.png',
                logoAlt: 'Bet365 Bingo',
                offerMain: '365 Free Tickets',
                details: [
                    { emoji: '✅', text: 'Spend: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Bingo customers only. Opt in required. Min. staking requirements apply to receive 365 Free Tickets. Time limits, exclusions and T&Cs apply. GambleAware.org.'
            },
            {
                showLabel: false,
                logoSrc: '/sfb/brands/bingodiamond.png',
                logoAlt: 'Bingo Diamond',
                offerMain: '100% Bonus',
                details: [
                    { emoji: '✅', text: 'Up to £100' },
                    { emoji: '✅', text: 'Deposit: £10' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min dep £10. Bonus can be played on Bingo only. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/costabingo.png',
                logoAlt: 'Costa Bingo',
                offerMain: '£40 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Deposit: £10' },
                    { emoji: '✅', text: 'Use Code: BINGO40' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players only. Min deposit £10. 400% bingo bonus (max £100). 2x bingo, 10x games bonus wagering required. 5-day expiry. GambleAware. T&Cs apply.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/placeholder.png',
                logoAlt: 'Mecca Bingo',
                offerMain: '£20 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. Paypal & Paysafe) & spend £5 on select bingo rooms for bonus. 5x wagering. PromoT&Cs apply. GambleAware.org.'
            }
        ]
    },
    {
        slug: 'for-a-fiver',
        title: 'For A Fiver',
        navEmoji: '🖐️',
        headlineHighlight: 'FOR',
        headlineRest: ' A FIVER',
        offers: [
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/ladbrokes.png',
                logoAlt: 'Ladbrokes',
                offerMain: '£25 Bonus',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Bingo players only. From 02.06.25. Available for 30 days from registration. Deposit required (certain deposit types excluded). Spend £5+ on Bingo Tickets for a £25 Bingo Bonus (2x wagering req, accept within 14 days, use within 30 days). Restrictions and T&Cs apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/gala.png',
                logoAlt: 'Gala Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Deposit & spend £5 to get 100 Free Spins (£0.10 value each, selected games, valid for 7 days). Certain deposit methods excluded. Players restrictions and T&Cs apply. Daily Free Spin T&Cs apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/placeholder.png',
                logoAlt: 'Mecca Bingo',
                offerMain: '£20 Bingo Bonus',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New players. Dep (exc. Paypal & Paysafe) & spend £5 on select bingo rooms for bonus. 5x wagering. PromoT&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/heartbingo.png',
                logoAlt: 'Heart Bingo',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Deposit: £5' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers. Opt in. Deposit & play £5 on Slots within 7 days. Get 50 Free Spins on Make Me a Millionaire. Rewards expire after 7 days. T&Cs apply. GambleAware.org. Please gamble responsibly.'
            }
        ]
    },
    {
        slug: 'keep-what-you-win',
        title: 'Keep What You Win',
        navEmoji: '✅',
        headlineHighlight: 'KEEP',
        headlineRest: ' WHAT YOU WIN',
        offers: [
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/mrq.png',
                logoAlt: 'MrQ',
                offerMain: '10 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'FOR A FIVER',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/gala.png',
                logoAlt: 'Gala Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £5' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Deposit & spend £5 to get 100 Free Spins (£0.10 value each, selected games, valid for 7 days). Certain deposit methods excluded. Players restrictions and T&Cs apply. Daily Free Spin T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: CASAFS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/befaircasino.png',
                logoAlt: 'Betfair Casino',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. Offer is available to new customers who register via the promo code CASAFS. Winnings are paid in cash. Free spins valued at 10p. Get an additional 100 free spins when you deposit and spend £10 on eligible games. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'EXCLUSIVE',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/skyvegas.png',
                logoAlt: 'Sky Vegas',
                offerMain: '70 Free Spins',
                details: [
                    { emoji: '✅', text: 'No Deposit' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Opt-in required. 7-day free spin expiry. All free spins will be loaded on the first eligible game selected. Game and eligibility restrictions apply. Further T&Cs apply. GambleAware.org.'
            },
            {
                label: 'USE CODE: SPINS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/betfred.png',
                logoAlt: 'Betfred Games',
                offerMain: '50 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register and enter promo code SPINS prior to deposit. Deposit, using a Debit Card, and stake £10+ within 14 days on Slots at Betfred Games and/or Vegas to get 200 Free Spins on selected titles. £0.10 per spin. Credited within 48 hours and valid for 7 days. Full T&Cs apply. GambleAware.org.'
            },
            {
                label: 'DOUBLE BONUS',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/sunbingo.png',
                logoAlt: 'Sun Bingo',
                offerMain: '10 Free Spins No Deposit',
                details: [
                    { emoji: '✅', text: '+ Spend £10' },
                    { emoji: '✅', text: 'Get 200 Free Spins' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Register today to receive 10 Free Spins (accept within 48 hours & wager winnings 10x within 3 days), deposit & spend £10+ on Casino to receive 200 Free Spins on selected games (accept within 48 hours & wager winnings 10x within 3 days). Debit cards only. Offer Ends 31.07.26. T&Cs Apply. GamCare.org.uk. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/foxybingo.png',
                logoAlt: 'Foxy Bingo',
                offerMain: '100 Free Spins',
                details: [
                    { emoji: '✅', text: 'Spend: £10' },
                    { emoji: '✅', text: 'No Wagering' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New Customers Only. Deposit & Spend £10 on any Casino or Slot games for 100 Free Spins (selected games, value £0.10 each, claim within 7 days, valid 7 days). T&Cs apply. GambleAware.org.'
            },
            {
                label: 'KEEP WHAT YOU WIN',
                labelColor: 'blue',
                logoSrc: '/sfb/brands/paddypowergames.png',
                logoAlt: 'Paddy Power Games',
                offerMain: '60 Free Spins No Deposit',
                details: [
                    { emoji: '✅', text: '+ Spend £10' },
                    { emoji: '✅', text: 'Get 200 Free Spins' }
                ],
                ctaText: 'CLICK TO CLAIM',
                ctaHref: '#',
                termsText:
                    '18+. New customers only. Enjoy 50 Free Spins on any of the eligible slot games + 10 Free Spins on Paddy’s Mansion Heist. Claim your 50 Free spins from your promotional hub. Next, enjoy your 10 Free spins on Paddy’s Mansion Heist (Awarded in the form of a £1 bonus). Finally, opt in, deposit and wager £10 to receive 200 more Free Spins on slots. Free Spins expire after 7 days. Deposits must be made using Pay by Bank, Apple Pay or Debit card. T&Cs apply. GambleAware.org.'
            }
        ]
    }
];

export const categoryOffersBySlug = (slug: string): OfferCardProps[] =>
    categoryPages.find((page) => page.slug === slug)?.offers ?? [];
