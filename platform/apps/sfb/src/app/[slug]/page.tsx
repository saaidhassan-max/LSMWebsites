import type React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsOfferCardMap, getCmsSitePage, getCmsSiteSettings } from '../../data/cms-content';
import type {
    CmsOffersItem,
    CmsSitePageSection,
    CmsSitePageSectionContent,
    CmsSiteSettings
} from '../../data/cms-content.types';
import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCmsSitePage(slug);
    return { title: page === null ? 'Super Free Bingo' : page.name + ' — Super Free Bingo' };
}

function offersItemsOf(content: CmsSitePageSectionContent): CmsOffersItem[] {
    if (Array.isArray(content.items)) return content.items;
    if (Array.isArray(content.offerIds)) {
        return content.offerIds.map((offerId) => ({ kind: 'offer', offerId }));
    }
    return [];
}

function renderDirectorySignupTemplate(settings: CmsSiteSettings): React.ReactElement {
    return (
        <div className="w-full">
            <div className="md:hidden flex flex-col">
                <WebsiteDirectory title={settings.directoryTitle} sites={settings.directorySites} splitAtDot />
                <div className="w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4">
                    <SignupForm
                        variant="sfb-sfsg"
                        brandName="Super Free Bingo"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                    />
                </div>
            </div>
            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title={settings.directoryTitle} sites={settings.directorySites} splitAtDot />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <SignupForm
                        variant="sfb-sfsg"
                        brandName="Super Free Bingo"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                    />
                </div>
            </div>
        </div>
    );
}

function renderSection(
    section: CmsSitePageSection,
    settings: CmsSiteSettings,
    cardMap: Record<string, OfferCardProps>
): React.ReactElement {
    const content = section.content;

    if (section.type === 'welcome') {
        const suffix = content.textSuffix ?? '';
        return (
            <WelcomeBanner
                key={section.id}
                textHighlight={content.textHighlight ?? 'TOP'}
                text={content.text ?? ' BINGO DEALS 2026'}
                textSuffix={suffix === '' ? undefined : suffix}
                features={content.features ?? ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc={content.imageLeftSrc ?? '/sfb/welcome-images/image-left.png'}
                imageRightSrc={content.imageRightSrc ?? '/sfb/welcome-images/image-right.png'}
                imageLeftWidthMobile={content.imageLeftWidthMobile ?? 83}
                imageLeftWidthDesktop={content.imageLeftWidthDesktop ?? 204}
            />
        );
    }
    if (section.type === 'terms') {
        return (
            <TopTCs
                key={section.id}
                text={
                    content.text ??
                    'Special terms apply – including age verification. Click "How To Claim" for full details.'
                }
            />
        );
    }
    if (section.type === 'richText') {
        return (
            <div key={section.id} className="w-full max-w-[960px] mx-auto px-4 py-6 flex flex-col gap-3">
                <h2 className="text-[24px] md:text-[32px] font-bold text-on-surface-light">
                    {content.heading ?? ''}
                </h2>
                <p className="text-[14px] md:text-base text-on-surface-light whitespace-pre-wrap leading-6">
                    {content.body ?? ''}
                </p>
            </div>
        );
    }
    if (section.type === 'signup') {
        return (
            <div key={section.id} className="w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4">
                {content.heading !== undefined && content.heading !== '' && (
                    <h2 className="text-[22px] md:text-[28px] font-bold text-on-surface-light text-center">
                        {content.heading}
                    </h2>
                )}
                <SignupForm
                    variant="sfb-sfsg"
                    brandName="Super Free Bingo"
                    privacyPolicyUrl="/privacy-policy"
                    termsUrl="/terms"
                />
            </div>
        );
    }
    if (section.type === 'directorySignup') {
        return (
            <div key={section.id} className="w-full">
                <div className="md:hidden flex flex-col">
                    <WebsiteDirectory
                        title={content.directoryTitle ?? settings.directoryTitle}
                        sites={settings.directorySites}
                        splitAtDot
                    />
                    <div className="w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4">
                        {content.signupHeading !== undefined && content.signupHeading !== '' && (
                            <h2 className="text-[22px] font-bold text-on-surface-light text-center">
                                {content.signupHeading}
                            </h2>
                        )}
                        <SignupForm
                            variant="sfb-sfsg"
                            brandName="Super Free Bingo"
                            privacyPolicyUrl="/privacy-policy"
                            termsUrl="/terms"
                        />
                    </div>
                </div>
                <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                    <div className="flex-1">
                        <WebsiteDirectory
                            title={content.directoryTitle ?? settings.directoryTitle}
                            sites={settings.directorySites}
                            splitAtDot
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        {content.signupHeading !== undefined && content.signupHeading !== '' && (
                            <h2 className="text-[28px] font-bold text-on-surface-light text-center">
                                {content.signupHeading}
                            </h2>
                        )}
                        <SignupForm
                            variant="sfb-sfsg"
                            brandName="Super Free Bingo"
                            privacyPolicyUrl="/privacy-policy"
                            termsUrl="/terms"
                        />
                    </div>
                </div>
            </div>
        );
    }
    if (section.type === 'image') {
        const src = content.src ?? '';
        if (src === '') return <div key={section.id} />;
        const alt = content.alt ?? '';
        const href = content.href ?? '';
        const mobileWidth = content.mobileWidth ?? 320;
        const mobileHeight = content.mobileHeight ?? 160;
        const desktopWidth = content.desktopWidth ?? 600;
        const desktopHeight = content.desktopHeight ?? 200;
        const picture = (
            <>
                <Image
                    src={src}
                    alt={alt}
                    width={mobileWidth}
                    height={mobileHeight}
                    className="md:hidden object-contain"
                    style={{ width: mobileWidth, height: mobileHeight, maxWidth: '100%' }}
                />
                <Image
                    src={src}
                    alt={alt}
                    width={desktopWidth}
                    height={desktopHeight}
                    className="hidden md:block object-contain"
                    style={{ width: desktopWidth, height: desktopHeight, maxWidth: '100%' }}
                />
            </>
        );
        return (
            <div key={section.id} className="w-full flex justify-center px-4 py-4">
                {href === '' ? (
                    picture
                ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer sponsored">
                        {picture}
                    </a>
                )}
            </div>
        );
    }
    if (section.type === 'offers') {
        const items = offersItemsOf(content);
        return (
            <div
                key={section.id}
                className="w-full max-w-[1440px] mx-auto p-4 md:px-16 md:py-4 flex flex-col gap-2"
            >
                {items.map((item, index) => {
                    if (item.kind === 'banner') {
                        if (item.tie === 'offer') return null;
                        return (
                            <OperatorBanner
                                key={index}
                                mobileSrc={item.mobileSrc}
                                desktopSrc={item.desktopSrc}
                                alt="Promotional banner"
                                href={item.href === '' ? undefined : item.href}
                            />
                        );
                    }
                    const card = cardMap[item.offerId];
                    if (card === undefined) return null;
                    return <OfferCard key={index} {...card} />;
                })}
            </div>
        );
    }
    return (
        <WebsiteDirectory
            key={section.id}
            title={content.title ?? settings.directoryTitle}
            sites={settings.directorySites}
            splitAtDot
        />
    );
}

export default async function CmsSitePageRoute({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const [page, settings] = await Promise.all([getCmsSitePage(slug), getCmsSiteSettings()]);
    if (page === null) notFound();

    const offerIds = page.sections
        .filter((section) => section.type === 'offers')
        .flatMap((section) => offersItemsOf(section.content))
        .filter((item): item is { kind: 'offer'; offerId: string } => item.kind === 'offer')
        .map((item) => item.offerId);
    const cardMap = await getCmsOfferCardMap(offerIds);

    return (
        <main className="flex flex-col w-full bg-surface min-h-screen">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} />
            {page.sections.map((section) => renderSection(section, settings, cardMap))}
            {renderDirectorySignupTemplate(settings)}
            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
