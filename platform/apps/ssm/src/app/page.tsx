import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SsmNav } from '../components/ssm-nav';
import { directorySites, legalText, offers } from '../data/site-content';

export default function Home(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <div className="w-full max-w-[1440px] mx-auto">
                <SsmNav />
            </div>

            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <WelcomeBanner
                text="🎰 Velkommen til Super Spillemaskiner!"
                features={[
                    '✅ Danske licenserede casinoer',
                    '✅ Klare betingelser',
                    '✅ Sikker og Pålidelig'
                ]}
            />

            <TopTCs text='Særlige vilkår er gældende – herunder identificering med MitID. Klikke på "Læs mere" for detaljer.' />

            <div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    <OfferCard {...offers[0]} />
                    <OfferCard {...offers[1]} />
                    <div className="md:hidden">
                        <SignupForm brandName="Super Spillemaskiner" />
                    </div>
                    <OfferCard {...offers[2]} />
                    <OfferCard {...offers[3]} />
                </div>
            </div>

            <div className="md:hidden w-full">
                <WebsiteDirectory title="SSM Casino Directory" sites={directorySites} />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title="SSM Casino Directory" sites={directorySites} />
                </div>
                <div className="flex-1">
                    <SignupForm brandName="Super Spillemaskiner" />
                </div>
            </div>

            <SsmFooter legalText={legalText} />
        </main>
    );
}
