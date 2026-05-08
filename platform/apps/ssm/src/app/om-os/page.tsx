import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Om Os | Superspillemaskiner',
    description: 'Læs mere om Super Spillemaskiner.'
};

const ABOUT_TEXT = `Super Spillemaskiner er et slotssammenligningsside, der samler de bedste tilbud fra de bedste slot og casino mærker på et fantastisk sted, så du kan stoppe med at søge rundt omkring og istedet begynde at spinne for din chance for at være heldig og vinde stort!
Med en lang række Casinoer og spilleautomater at vælge imellem forstår vi, at det kan være svært at vide, hvilke der er værd at besøge, så på Super Spillemaskineranmelder vi kun de mest sikre hjemmesider som alle har et godt omdømme, således at du kan være sikker på, at du kun spiller hos de bedste.
Vi er her for at sikre, at din spiloplevelse ikke indebærer noget hårdt arbejde, så vi finder alle de seneste gratis tilbud og tilbud uden krav om indbetaling, så du ikke behøver at bruge tid på dette. Vi giver også nemme trinvise vejledninger, der hjælper dig med at få dine gratis penge og bonuskontanter hurtigt og nemt. Giv os et prøve-spin i dag!


Anden nyttig information
Gratis spilleautomater uden indbetaling
Vi ved, at du sikkert er ivrig efter at begynde at spille med det samme, så du vil måske prøve spillene før du "køber". Hvis du er ny i verdene af online slots, spil uden indbetaling eller gratis spin-tilbud en fantastisk måde at komme i gang med spillene. Sider med spilleautomater uden krav om indskud udgør et ideelt udgangspunkt, da du får fordelene ved at spille gratis uden at skulle indbetale nogen penge. Der er endda hjemmesider der giver dig mulighed for at spille gratis og vinde rigtigt, hvilket betyder at du kan få udbetalt uden at skulle indbetale. Så hvorfor ikke komme i gang? Tjek vores gratis tilbud uden krav om indbetaling og begynd at nyde dine gratis spil allerede i dag!

Indbetalingsbonusser til spilleautomater

At indbetale penge på en slots site er en fantastisk måde at få mest muligt ud af dine penge, da en indbetaling normalt vil kvalificere dig til en større gratis slots bonus, der kan fordoble din kontante indbetaling. Du bliver ofte tilbudt en procentdel af, hvad du indskyder, så hvis du indbetaler 10kr. og modtager en 200% bonus, så får du ekstra 20kr. at spille for. Når du har lavet din første indbetaling, vil du opdage, at nogle hjemmesider sågar også giver efterfølgende indbetalingsbonusser på fremtidige indbetalinger.`;

export default function OmOsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            About Us 📑
                        </h1>
                    </div>
                    <p className="w-full whitespace-pre-line text-base leading-6 tracking-[0.5px] text-on-surface-light">
                        {ABOUT_TEXT}
                    </p>
                </div>
            </section>

            <SsmFooter legalText={legalText} />
        </main>
    );
}
