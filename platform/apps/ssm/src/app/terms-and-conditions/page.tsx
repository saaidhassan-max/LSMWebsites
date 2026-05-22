import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Regler og Vilkår | Super Spillemaskiner',
    description: 'Regler og vilkår for brug af Super Spillemaskiner.'
};

const CONTENT = `Dette website drives af Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.

Alder og geografiske begrænsninger

Dette website er udelukkende beregnet til brugere, der er fyldt 18 år, og som er bosiddende i Danmark. Adgang for personer under 18 år eller personer bosiddende uden for Danmark er ikke tilladt.

Accept af vilkår

Ved at bruge dette website accepterer du at være bundet af disse regler og vilkår, vores ansvarsfraskrivelse, copyrightmeddelelse og privatlivspolitik. Benytter du ikke alle disse vilkår, bedes du undlade at bruge websitet.

Indhold og ansvar

Indholdet på dette website er alene til din generelle information og brug og kan ændres uden varsel. Hverken vi eller tredjeparter giver nogen garanti for nøjagtighed, aktualitet, fuldstændighed eller egnethed af de oplysninger, der fremgår af websitet. Du anerkender, at sådanne oplysninger og materialer kan indeholde unøjagtigheder eller fejl, og vi fraskriver os i videst muligt omfang det lovpligtige ansvar for sådanne unøjagtigheder eller fejl.

Intellektuel ejendomsret

Websitets design, layout, grafik og alt øvrigt materiale er beskyttet af ophavsret. Reproduktion af nogen del af websitet er ikke tilladt undtagen i overensstemmelse med copyrightmeddelelsen.

Links til tredjeparter

Dette website indeholder links til casinoer og spilleautomatssider drevet af tredjeparter. Vi påtager os intet ansvar for indholdet på disse sider og anbefaler dig at gennemgå de pågældendes egne regler og vilkår, inden du registrerer dig eller indbetaler.

Tilbud uden indbetaling

Gratis spin og tilbud uden indbetaling, der er omtalt på dette website, leveres af tredjepartsoperatører. Disse tilbud kan have begrænsninger på brug og udbetaling og kan være forbeholdt nye kunder. Vilkårene varierer fra operatør til operatør — læs altid de fulde vilkår, inden du accepterer et tilbud.

Lovvalg

Enhver brug af dette website og enhver tvist herom er underlagt engelsk og walisisk ret.

Databeskyttelse

Little Star Media Ltd overholder databeskyttelsesloven og alle gældende krav i den britiske udgave af GDPR. Se venligst vores privatlivspolitik for alle oplysninger om, hvordan vi indsamler og bruger dine data.`;

export default function TermsAndConditionsPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" variant="ssm" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Regler og Vilkår
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
