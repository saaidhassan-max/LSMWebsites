import type React from 'react';
import type { Metadata } from 'next';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Privatlivspolitik | Super Spillemaskiner',
    description: 'Privatlivspolitik for Super Spillemaskiner — hvordan vi indsamler, anvender og beskytter dine personoplysninger.'
};

const CONTENT = `Super Spillemaskiner er et produkt fra Little Star Media Limited, som er forpligtet til at beskytte dine personoplysninger. Denne politik forklarer, hvordan vi behandler dine oplysninger, når du besøger vores website, og beskriver dine rettigheder i henhold til GDPR (forordning 2016/679).

Vores website er ikke beregnet til personer under 18 år eller til personer, der ikke er bosiddende i Danmark.

Dataansvarlig

Little Star Media Limited er dataansvarlig og er registreret i Det Forenede Kongerige med CVR-nummer 5957310. Virksomhedens adresse er Suite 478-480, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA.

Caroline Sugrue er udpeget som databeskyttelsesrådgiver (DPO) og er ansvarlig for at sikre overholdelsen af denne politik og GDPR. Du er velkommen til at kontakte DPO'en, hvis du har spørgsmål til politikken eller ønsker at udøve dine rettigheder.

Dine rettigheder

I henhold til GDPR har du følgende rettigheder: retten til at blive informeret, retten til indsigt i dine oplysninger, retten til berigtigelse af unøjagtige oplysninger, retten til sletning (retten til at blive glemt), retten til begrænsning af behandling, retten til dataportabilitet og retten til at gøre indsigelse mod behandling. Du kan udøve disse rettigheder ved at kontakte vores databeskyttelsesrådgiver.

Hvilke oplysninger vi indsamler

Vi indsamler identitetsoplysninger (navn, brugernavn, titel, køn), kontaktoplysninger (e-mailadresse, telefonnummer), IP-adresser, geografisk placering samt tekniske oplysninger (enhedstype, browseroplysninger, sprogpræference). Disse oplysninger bruges til brugeridentifikation, levering af ydelser, direkte markedsføring (med samtykke), forebyggelse af svindel og optimering af vores website via værktøjer som Hotjar og Google Analytics.

Hvordan vi bruger dine oplysninger

Dine personoplysninger bruges til at sende dig markedsføringskommunikation, typisk op til fem e-mails eller SMS-beskeder pr. uge. Vi kan dele oplysninger med Facebook til brug for målrettet indhold. Grundlaget for behandlingen er dit samtykke, vores juridiske forpligtelser og vores berettigede interesser i sikkerhed og serviceforbedring.

Deling med tredjeparter

Vi deler oplysninger med betroede serviceudbydere, herunder Hotjar, Google Analytics, Microsoft og Zapier, samt med reklamenetværk, betalingsudbydere og offentlige myndigheder, når det kræves af loven.

Opbevaring af oplysninger

Oplysninger om aktive brugere opbevares i hele den aktive periode plus tre måneder. Herefter slettes oplysningerne. Opbevaringsperioden kan forlænges, hvis der er klager eller retssager under behandling.

Dine valgmuligheder

Du kan til enhver tid trække dit markedsføringssamtykke tilbage ved at benytte afmeldingslinket i vores kommunikation eller ved at kontakte os direkte. Du kan også anmode om begrænsning af behandling, dataportabilitet eller sletning — vi bestræber os på at besvare alle henvendelser inden for én måned.

Sikkerhed

Vi implementerer passende sikkerhedsforanstaltninger mod uautoriseret behandling, tab eller beskadigelse af dine oplysninger. Adgang til dine data er begrænset til medarbejdere med et reelt forretningsbehov.

Internationale overførsler

Overførsler af oplysninger uden for EU/EØS sker kun, hvor der er truffet passende sikkerhedsforanstaltninger, f.eks. standardkontraktbestemmelser godkendt af EU-Kommissionen.`;

export default function PrivacyPolicyPage(): React.ReactElement {
    return (
        <main className="flex w-full flex-col bg-surface">
            <SsmNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" variant="ssm" />

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8">
                    <div className="px-4 py-3">
                        <h1 className="text-[32px] font-bold leading-tight text-tertiary md:text-[45px] md:leading-[52px]">
                            Privatlivspolitik
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
