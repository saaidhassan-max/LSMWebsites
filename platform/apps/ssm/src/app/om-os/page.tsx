import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Om Os | Super Spillemaskiner',
    description: 'Læs mere om Super Spillemaskiner — Danmarks uafhængige sammenligningssite for casino og spilleautomater.'
};

const CONTENT = `Super Spillemaskiner er et uafhængigt sammenligningssite for online casino og spilleautomater, der samler de bedste tilbud fra Danmarks mest betroede casinoer på ét sted. Siden drives af Little Star Media, som også driver Super Free Bingo som søstersite.

Vi arbejder udelukkende med casinoer og spilleautomatssider, der er licenseret af Spillemyndigheden, så du kan være sikker på, at alle tilbud på vores side lever op til de højeste krav til sikkerhed og fair play.

Hvad vi gør

Vores mission er enkel: at gøre det nemt for danske spillere at finde de bedste casinobonusser og gratis spins på ét sted. Vi opdaterer løbende vores oversigt med tilbud fra både etablerede operatører og nye spændende casinoer — og mange af de deals, du finder her, er eksklusive forbedrede tilbud, der giver dig mere, end du ville få ved at gå direkte til casinoet.

For at hjælpe dig med at træffe det rigtige valg tilbyder vi detaljerede anmeldelser af casinoer og trin-for-trin vejledninger, så du kan hente din bonus hurtigt og uden besvær.

Hold dig opdateret

Tilmeld dig vores nyhedsbrev og modtag de nyeste eksklusive casino- og spilleautomattilbud direkte i din indbakke. Vores abonnenter er altid de første til at høre om nye tilbud uden indbetaling, gratis spins og tidsbegrænsede kampagner.

Hvorfor vælge Super Spillemaskiner

Licenserede casinoer — vi viser kun operatører med fuld licens fra Spillemyndigheden.

Eksklusiv bonus — mange af vores tilbud er kun tilgængelige via Super Spillemaskiner.

Klare betingelser — vi gennemgår alle vilkår, så du ved præcist, hvad du takker ja til.

Mobilvenlig — alle fremhævede sider er fuldt optimerede til mobil og tablet.

Ansvarligt spil — vi støtter ansvarligt spil og linker til Ludomani og StopSpillet.dk på alle sider.

Ansvarligt spil

Spil ansvarligt. Hvis du eller nogen, du kender, er berørt af ludomani, kan du kontakte det danske Center for Ludomani for fortrolig telefonisk støtte og rådgivning. Telefon: +45 70 11 18 10 — hjemmeside: ludomani.dk`;

export default function OmOsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" variant="ssm" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Om Os
                        </h1>
                    </div>
                    <p className="w-full md:max-w-[948px] whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {CONTENT}
                    </p>
                </div>
            </section>

            <SsmFooter legalText={legalText} />
        </main>
    );
}
