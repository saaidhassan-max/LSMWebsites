export interface ReviewSection {
    heading: string;
    body: string;
}

export interface CasinoPageData {
    slug: string;
    logoSrc: string;
    logoAlt: string;
    offerHeadline: string;
    trustBadges: string[];
    howToSteps: string[];
    howToTermsText: string;
    howToImageSrc: string;
    howToImageAlt: string;
    ctaText: string;
    ctaHref: string;
    reviewBody: string;
    reviewIntro?: string;
    reviewSections?: ReviewSection[];
}

const CASINOS: Record<string, CasinoPageData> = {
    'royal-casino': {
        slug: 'royal-casino',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Royal Casino',
        offerHeadline: '225 SPINS Uden Indbetaling',
        trustBadges: ['Ingen Indbetaling', 'Ingen Satsningskrav'],
        howToSteps: [
            '1. Klik her for at gå til Royal Casino!',
            '2. Opret din konto – det tager under 2 minutter',
            '3. Verificer din identitet med MitID',
            '4. Få dine 225 gratis spins – ingen indbetaling krævet!'
        ],
        howToTermsText:
            'Royal Casino vilkår gælder. Klik for flere detaljer.\n\n10x Gennemspilskrav, fx. 2.250 kr. ved gennemspilning. Max 100 kr. pr. indsats. Gyldig 60 dage. Kun nye kunder. 18+. Spil ansvarligt. StopSpillet.dk.',
        howToImageSrc: '/ssm/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Royal Casino tilbud',
        ctaText: 'FÅ BONUS →',
        ctaHref: '#',
        reviewIntro:
            'Hvis du ønsker en royal behandling, så skal du vælge Royal Casino. Den velkendte kasinohjemmeside tilbyder et stort udvalg af lækkerier til sine spillere, uanset hvilket spil du foretrækker.',
        reviewBody:
            'Royal Casino giver masser af bonusser, så du kan spille og have det sjovt.\n\nKampagner og bonusser\n\nHjemmesiden byder på massevis af kampagner og bonusser, og det hele begynder med velkomstbonussen. Med den får du meget at spille for med det samme, og du behøver ikke engang foretage en indbetaling for at komme i gang.\n\nFantastisk udvalg af spil\n\nHjemmesiden byder på hundredvis af forskellige spil fra de bedste spiludviklere. Hvis du vil spille fantasy spil, spil uden indbetaling eller spilleautomater, finder du dem alle lige her.\n\nSikkerheden\n\nAlle transaktioner behandles sikkert med de nyeste krypteringsteknologier.',
        reviewSections: [
            {
                heading: 'Online Spilleautomater',
                body: 'Royal Casino byder på hundredvis af spilleautomater fra de bedste spiludviklere. Fra klassiske frugter til moderne videoslots med bonusrunder og free spins.'
            },
            {
                heading: 'Live Casino',
                body: 'Oplev den autentiske kasinoatmosfære hjemmefra med Royal Casinos live casino. Spil Live Blackjack, Live Roulette og Live Baccarat med rigtige dealere.'
            },
            {
                heading: 'Bonusser og Kampagner',
                body: 'Royal Casino tilbyder løbende kampagner til eksisterende spillere. Hold øje med reload-bonusser, cashback-tilbud og sæsonbestemte kampagner.'
            },
            {
                heading: 'Betalingsmetoder',
                body: 'Royal Casino accepterer MobilePay, Visa, Mastercard og bankoverførsel. Alle transaktioner er sikre og krypterede. Udbetalinger behandles hurtigt.'
            }
        ]
    },
    'mr-green': {
        slug: 'mr-green',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Mr Green',
        offerHeadline: '50 SPINS Uden Indbetaling',
        trustBadges: ['Ingen Indbetaling', 'Uden Satsningskrav'],
        howToSteps: [
            '1. Klik her for at gå til Mr Green!',
            '2. Opret din konto og verificer med MitID',
            '3. Dine 50 cash spins krediteres automatisk',
            '4. Spil på Legacy of Dead – ingen indbetaling krævet!'
        ],
        howToTermsText:
            'Mr Green vilkår gælder. Klik for flere detaljer.\n\n50 cash spins krediteres automatisk til Legacy of Dead og har en værdi á 1 kr. per spin. Tilgængelige i 60 dage. Kun nye kunder. 18+. Spil ansvarligt. StopSpillet.dk.',
        howToImageSrc: '/ssm/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Mr Green tilbud',
        ctaText: 'FÅ BONUS →',
        ctaHref: '#',
        reviewIntro:
            'Mr Green er et af de mest kendte kasinonavne i Danmark. Med et stort udvalg af spil, attraktive bonusser og et stærkt fokus på ansvarligt spil er Mr Green et oplagt valg.',
        reviewBody:
            'Mr Green tilbyder spillere en førsteklasses spiloplevelse med hundredvis af spilleautomater, live casino og sportsbetting.\n\nUden Satsningskrav\n\nMr Greens velkomsttilbud er særligt attraktivt fordi cash spins ikke har satsningskrav. Det betyder at gevinster udbetales direkte som rigtige penge.\n\nAnsvarligt Spil\n\nMr Green er en pioner inden for ansvarligt spil med deres grønne hjerteprogram, som hjælper spillere med at holde styr på deres spilvaner.',
        reviewSections: [
            {
                heading: 'Spilleautomater',
                body: 'Mr Green tilbyder et enormt udvalg af slots fra NetEnt, Microgaming, Play\'n GO og mange flere. Find populære titler som Starburst, Book of Dead og Legacy of Dead.'
            },
            {
                heading: 'Live Casino',
                body: 'Mr Greens live casino er drevet af Evolution Gaming og byder på alle klassiske bordspil samt unikke live show-spil som Crazy Time og Dream Catcher.'
            },
            {
                heading: 'Sportsbetting',
                body: 'Ud over kasino tilbyder Mr Green et komplet sportsbook med odds på fodbold, tennis, basketball og meget mere.'
            },
            {
                heading: 'Betalingsmetoder',
                body: 'MobilePay, Visa, Mastercard, Skrill og Neteller accepteres hos Mr Green. Hurtige udbetalinger og ingen skjulte gebyrer.'
            }
        ]
    },
    'kapow-casino': {
        slug: 'kapow-casino',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Kapow Casino',
        offerHeadline: '50 SPINS Til Big Bass Splash Uden Indbetaling',
        trustBadges: ['Ingen Indbetaling', '0,50 kr. per spin'],
        howToSteps: [
            '1. Klik her for at gå til Kapow Casino!',
            '2. Opret din konto og verificer med MitID',
            '3. Få dine 50 gratis spins på Big Bass Splash',
            '4. Ingen indbetaling krævet – kom i gang med det samme!'
        ],
        howToTermsText:
            'Kapow Casino vilkår gælder. Klik for flere detaljer.\n\n10x Gennemspilskrav, fx. 250 kr. ved gennemspilning. Max 100 kr. pr. indsats. Gyldig 60 dage. Kun nye kunder. 18+. Spil ansvarligt. StopSpillet.dk.',
        howToImageSrc: '/ssm/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Kapow Casino tilbud',
        ctaText: 'FÅ BONUS →',
        ctaHref: '#',
        reviewIntro:
            'Kapow Casino er et friskt og farverigt online kasino med et eksklusivt tilbud kun tilgængeligt via Super Spillemaskiner. Få 50 gratis spins på Big Bass Splash uden indbetaling.',
        reviewBody:
            'Kapow Casino skiller sig ud med sit eksklusive velkomsttilbud og et bredt udvalg af spilleautomater.\n\nEksklusivt Tilbud\n\nTilbuddet på 50 gratis spins til Big Bass Splash er kun tilgængeligt via vores side – du finder det ikke andre steder.\n\nSprudlende Spiloplevelse\n\nKapow Casino byder på hundredvis af slots fra topudviklere samt et levende live casino og regelmæssige kampagner til loyale spillere.',
        reviewSections: [
            {
                heading: 'Spilleautomater',
                body: 'Kapow Casino har et stort udvalg af populære slots inklusiv Big Bass-serien, Gates of Olympus og mange andre titler fra Pragmatic Play og andre topudviklere.'
            },
            {
                heading: 'Live Casino',
                body: 'Oplev live casino hos Kapow med klassiske spil som roulette, blackjack og baccarat, spillet med rigtige dealere i realtid.'
            },
            {
                heading: 'Kampagner',
                body: 'Kapow Casino tilbyder løbende kampagner og reload-bonusser til eksisterende spillere. Tjek siden regelmæssigt for de seneste tilbud.'
            },
            {
                heading: 'Betalingsmetoder',
                body: 'Kapow Casino accepterer MobilePay, Visa og Mastercard. Nem indbetaling og hurtig udbetaling af gevinster.'
            }
        ]
    },
    'pokerstars-casino': {
        slug: 'pokerstars-casino',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'PokerStars Casino',
        offerHeadline: '100% BONUS Op Til: 650 kr.',
        trustBadges: ['100% Match Bonus', 'Min. indbetaling 10 kr.'],
        howToSteps: [
            '1. Klik her for at gå til PokerStars Casino!',
            '2. Opret din konto og verificer med MitID',
            '3. Foretag din første indbetaling på minimum 10 kr.',
            '4. Modtag din 100% bonus op til 650 kr. automatisk!'
        ],
        howToTermsText:
            'PokerStars Casino vilkår gælder. Klik for flere detaljer.\n\nGennemspilles 10x (bonus+indbetaling) inden 60 dage. Min. indbetaling 10 kr. Kun nye kunder. 18+. Spil ansvarligt. StopSpillet.dk.',
        howToImageSrc: '/ssm/howtoclaim/landingpageimage.png',
        howToImageAlt: 'PokerStars Casino tilbud',
        ctaText: 'FÅ BONUS →',
        ctaHref: '#',
        reviewIntro:
            'PokerStars Casino er et af verdens mest kendte kasinonavne. Med en 100% velkomstbonus op til 650 kr. og et enormt udvalg af spil er det et naturligt valg for danske spillere.',
        reviewBody:
            'PokerStars Casino kombinerer et verdenskendt brand med en fremragende spiloplevelse for danske spillere.\n\nVelkomstbonus\n\nFå en 100% match på din første indbetaling op til 650 kr. Det giver dig dobbelt så meget at spille for fra start.\n\nKæmpe Spiludvalg\n\nFra klassiske spilleautomater til live casino og sportsbetting – PokerStars har det hele under ét tag.',
        reviewSections: [
            {
                heading: 'Spilleautomater',
                body: 'PokerStars Casino byder på hundredvis af spilleautomater fra verdens bedste spiludviklere inklusiv NetEnt, Microgaming og Red Tiger.'
            },
            {
                heading: 'Live Casino',
                body: 'PokerStars live casino tilbyder et bredt udvalg af live bordspil med professionelle dealere og spil som Live Roulette, Live Blackjack og Live Poker.'
            },
            {
                heading: 'Poker',
                body: 'Som det originale PokerStars brand tilbyder PokerStars Casino naturligvis et komplet poker-tilbud med cash games og turneringer.'
            },
            {
                heading: 'Betalingsmetoder',
                body: 'PokerStars accepterer MobilePay, Visa, Mastercard, Skrill og bankoverførsel. Alle transaktioner er sikre og hurtige.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
