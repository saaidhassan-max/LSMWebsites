import type React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { OperatorReview } from '@lsm/ui/components/operator-review/operator-review';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { OntarioFooter } from '@lsm/ui/components/ontario-footer/ontario-footer';
import { Button } from '@lsm/ui/components/button/button';
import { OntarioNav } from '../../../components/ontario-nav';
import { getCasinoBySlug, casinos } from '../../../data/casinos';

interface ReviewPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
    return casinos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
    const { slug } = await params;
    const casino = getCasinoBySlug(slug);
    return {
        title: casino ? `${casino.name} Review | Good Choice Ontario` : 'Casino Review',
        description: casino?.reviewIntro ?? 'Casino review'
    };
}

const DIRECTORY_SITES = [
    { name: '888 Ladies', href: '#' },
    { name: 'Buzz Bingo', href: '#' },
    { name: 'Lottoland', href: '#' },
    { name: 'Pink Casino', href: '#' },
    { name: 'Dotty Bingo', href: '#' },
    { name: 'MrQ', href: '#' }
];

export default async function ReviewPage({ params }: ReviewPageProps): Promise<React.ReactElement> {
    const { slug } = await params;
    const casino = getCasinoBySlug(slug);

    if (casino === undefined) {
        notFound();
    }

    const visitCasinoButton = (
        <a href={casino.ctaHref} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">
            <Button variant="tertiary" className="w-full md:w-auto text-on-surface-dark">
                VISIT CASINO →
            </Button>
        </a>
    );

    return (
        <main className="flex flex-col w-full bg-surface">
            <OntarioNav />

            <OperatorReview
                operatorName={casino.name}
                trustBadges={casino.trustBadges}
                features={casino.features}
                ctaText="VISIT CASINO →"
                ctaHref={casino.ctaHref}
            />

            <div className="bg-surface">
                <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-12 flex flex-col gap-6 md:gap-16">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 md:gap-8">
                            <p className="text-sm md:text-base font-bold leading-6 tracking-[0.15px] text-on-surface-light">
                                {casino.reviewIntro}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {casino.reviewSections.map((section) => (
                                    <div key={section.heading} className="flex flex-col gap-2">
                                        <h2 className="text-base font-bold leading-6 text-tertiary">
                                            {section.heading}
                                        </h2>
                                        <p className="text-sm font-normal leading-5 tracking-[0.25px] text-on-surface-light">
                                            {section.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex">
                            {visitCasinoButton}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <WebsiteDirectory
                                title="Good.Choice Directory"
                                sites={DIRECTORY_SITES}
                                splitAtDot
                            />
                        </div>
                        <div className="flex-1">
                            <SignupForm
                                variant="ontario"
                                brandName="Good.Choice"
                                privacyPolicyUrl="/privacy-policy"
                                termsUrl="/terms"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <OntarioFooter />
        </main>
    );
}
