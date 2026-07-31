'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { ConfettiBurst } from '@lsm/ui/components/confetti-burst/confetti-burst';
import { ConsentForm } from '@lsm/ui/components/consent-form/consent-form';
import type { ConsentFormData } from '@lsm/ui/components/consent-form/consent-form.types';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import type { CmsLandingPageContent, CmsSiteSettings } from '../data/cms-content.types';
import { SfbNav } from './sfb-nav';

interface SignupLandingPageV4BProps {
    content: CmsLandingPageContent;
    settings: CmsSiteSettings;
    offerImageSrc: string;
}

function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
}

function validatePhone(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return 'Phone number is required';
    if (!/^\+?[\d\s()-]+$/.test(trimmed)) return 'Please enter a valid phone number';
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return 'Please enter a valid phone number';
    return '';
}

export function SignupLandingPageV4B({
    content,
    settings,
    offerImageSrc
}: SignupLandingPageV4BProps): React.ReactElement {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consentData, setConsentData] = useState<ConsentFormData | null>(null);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [forceConsentErrors, setForceConsentErrors] = useState(false);
    const submitButtonRef = useRef<HTMLDivElement>(null);
    const emailFieldRef = useRef<HTMLDivElement>(null);
    const phoneFieldRef = useRef<HTMLDivElement>(null);
    const guidedToFormRef = useRef(false);
    const [showStickySubmit, setShowStickySubmit] = useState(false);

    useEffect(() => {
        const el = submitButtonRef.current;
        if (el === null) return;
        function onIntersect([entry]: IntersectionObserverEntry[]): void {
            if (entry.isIntersecting) {
                setShowStickySubmit(false);
            } else {
                setShowStickySubmit(entry.boundingClientRect.top > 0);
            }
        }
        const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        observer.observe(el);
        return (): void => observer.disconnect();
    }, []);

    function handleSubmit(): void {
        const eErr = validateEmail(email);
        const pErr = validatePhone(phone);
        const consentValid = consentData?.isValid ?? false;

        setEmailError(eErr);
        setPhoneError(pErr);
        if (consentValid === false) setForceConsentErrors(true);

        if (eErr === '' && pErr === '' && consentValid === true) {
            router.push('/');
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
        if (emailError !== '') setEmailError(validateEmail(e.target.value));
    }

    function handleEmailClear(): void {
        setEmail('');
        if (emailError !== '') setEmailError('Email is required');
    }

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setPhone(e.target.value);
        if (phoneError !== '') setPhoneError(validatePhone(e.target.value));
    }

    function handlePhoneClear(): void {
        setPhone('');
        if (phoneError !== '') setPhoneError('Phone number is required');
    }

    function handleConsentChange(data: ConsentFormData): void {
        setConsentData(data);
        if (forceConsentErrors === true && data.isValid === true) setForceConsentErrors(false);
    }

    function shouldGuideFirst(): boolean {
        const needsInput = email.trim() === '' || phone.trim() === '';
        return guidedToFormRef.current === false && needsInput === true;
    }

    function scrollFieldAboveKeyboard(target: HTMLDivElement | null): void {
        if (target === null) return;
        const field = target;

        function scrollToSafePosition(behavior: ScrollBehavior): void {
            const viewport = window.visualViewport;
            const viewportTop = viewport?.offsetTop ?? 0;
            const viewportHeight = viewport?.height ?? window.innerHeight;
            const safeTop = viewportTop + Math.min(112, Math.max(72, viewportHeight * 0.2));
            const rect = field.getBoundingClientRect();
            const nextTop = window.scrollY + rect.top - safeTop;
            window.scrollTo({ top: Math.max(0, nextTop), behavior });
        }

        scrollToSafePosition('smooth');
        window.setTimeout(() => scrollToSafePosition('smooth'), 300);
        window.setTimeout(() => scrollToSafePosition('auto'), 650);
    }

    function guideToFirstEmptyField(): void {
        guidedToFormRef.current = true;
        const target = email.trim() === '' ? emailFieldRef.current : phoneFieldRef.current;
        const input = target?.querySelector('input');
        input?.focus({ preventScroll: true });
        scrollFieldAboveKeyboard(target);
    }

    function handleSubmitClick(): void {
        if (shouldGuideFirst() === true) {
            guideToFirstEmptyField();
            return;
        }
        handleSubmit();
    }

    function handleStickyClick(): void {
        if (shouldGuideFirst() === true) {
            guideToFirstEmptyField();
            return;
        }
        submitButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        handleSubmit();
    }

    const primaryCta = content.primaryCtaText || 'Sign Up & Claim';
    const secondaryCta = content.secondaryCtaText || 'Skip to site';
    const offerAltText = [content.heroPrefix, content.heroHeadline, content.heroSubline]
        .filter((part) => part !== '')
        .join(' ');

    return (
        <>
            <ConfettiBurst anchorRef={phoneFieldRef} fadeBeforeRef={submitButtonRef} />
            <SfbNav items={settings.navItems} showMenu={false} />
            <main className="flex flex-col w-full bg-surface min-h-screen pb-[80px] md:pb-0">
                <USP text="JOIN OVER 100,000 SUBSCRIBERS" variant="bingo" />

                <div className="relative overflow-hidden bg-surface">
                    <div className="absolute inset-0 pointer-events-none select-none">
                        <Image
                            src={content.backgroundImage}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover"
                            placeholder="empty"
                            priority
                        />
                    </div>

                    <div className="relative z-10 flex flex-col gap-4 md:max-w-[564px] md:mx-auto md:w-full md:pt-0 md:pb-6 md:gap-8">
                        <div className="flex flex-col items-center">
                            <Image
                                src={offerImageSrc}
                                alt={offerAltText}
                                width={1200}
                                height={830}
                                className="w-full h-auto"
                                priority
                            />
                        </div>

                        <div className="flex flex-col gap-[10px] pt-1 px-4 pb-4 md:p-8">
                            <p className="text-sm font-normal leading-5 md:text-base md:font-bold text-on-surface-light text-center tracking-[0.15px]">
                                {content.instructionText}
                            </p>
                            <div ref={emailFieldRef}>
                                <TextField
                                    icon={Mail}
                                    label="Email Address (required)"
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    placeholder=""
                                    value={email}
                                    error={emailError}
                                    valid={validateEmail(email) === ''}
                                    onChange={handleEmailChange}
                                    onClear={handleEmailClear}
                                />
                            </div>
                            <div ref={phoneFieldRef}>
                                <TextField
                                    icon={Phone}
                                    label="Phone Number (required)"
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder=""
                                    value={phone}
                                    error={phoneError}
                                    valid={validatePhone(phone) === ''}
                                    onChange={handlePhoneChange}
                                    onClear={handlePhoneClear}
                                />
                            </div>
                            <div className="flex flex-col gap-[10px] bg-surface border border-outline-variant rounded-2xl p-4">
                                <ConsentForm
                                    defaultExpanded={false}
                                    forceShowErrors={forceConsentErrors}
                                    onChange={handleConsentChange}
                                    variant="compact"
                                    submitLabel="SIGN UP & CLAIM"
                                />
                                <p className="text-on-surface-light text-[10px] leading-[14px] font-normal tracking-[0.4px]">
                                    {'If you would like to learn more about what we do with your personal data or your privacy rights, please '}
                                    <Link href="/privacy-policy" className="underline">click here.</Link>
                                    {' For full terms and conditions, '}
                                    <Link href="/terms" className="underline">click here.</Link>
                                </p>
                                <div ref={submitButtonRef}>
                                    <Button
                                        variant="primary"
                                        trailingIcon={<ArrowRight size={24} />}
                                        className="w-full cta-shine"
                                        onClick={handleSubmitClick}
                                    >
                                        {primaryCta}
                                    </Button>
                                </div>
                                <Button variant="text" color="dark" className="w-full" onClick={() => router.push('/')}>
                                    {secondaryCta}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <TopTCs text={content.legalDisclaimer} variant="compact" />
                <SfbFooter legalText={settings.footerLegalText} />

                {showStickySubmit && (
                    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pt-3 pb-9 bg-surface border-t border-outline-variant md:hidden">
                        <Button
                            variant="primary"
                            trailingIcon={<ArrowRight size={24} />}
                            className="w-full cta-shine"
                            onClick={handleStickyClick}
                        >
                            {primaryCta}
                        </Button>
                    </div>
                )}
            </main>
        </>
    );
}
