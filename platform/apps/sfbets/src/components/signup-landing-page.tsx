'use client';

import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Mail, User } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { Checkbox } from '@lsm/ui/components/checkbox/checkbox';
import { ConfettiBurst } from '@lsm/ui/components/confetti-burst/confetti-burst';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from './sfbets-nav';
import type { GuideStep, SignupLandingPageProps } from './signup-landing-page.types';
import { legalText } from '../data/site-content';

const BRAND_NAME = 'Super Free Bets MI';
const CONSENT_ERROR = 'Please accept our terms to continue';

function validateName(value: string): string {
    if (!value.trim()) return 'Name is required';
    return '';
}

function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
}

export function SignupLandingPage({
    content,
    offerImageSrc,
    consentStyle = 'standard'
}: SignupLandingPageProps): React.ReactElement {
    const isHighlighted = consentStyle === 'highlighted';
    const router = useRouter();
    const consentId = useId();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [consentError, setConsentError] = useState('');
    const submitButtonRef = useRef<HTMLDivElement>(null);
    const nameFieldRef = useRef<HTMLDivElement>(null);
    const emailFieldRef = useRef<HTMLDivElement>(null);
    const guidedToFormRef = useRef(false);
    const consentCardRef = useRef<HTMLDivElement>(null);
    const guidedStepsRef = useRef<Set<GuideStep>>(new Set());
    const [consentHighlighted, setConsentHighlighted] = useState(false);
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
        const nErr = validateName(name);
        const eErr = validateEmail(email);
        const cErr = consent ? '' : CONSENT_ERROR;

        setNameError(nErr);
        setEmailError(eErr);
        setConsentError(cErr);

        if (nErr === '' && eErr === '' && cErr === '') {
            router.push('/');
        }
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setName(e.target.value);
        if (nameError !== '') setNameError(validateName(e.target.value));
    }

    function handleNameClear(): void {
        setName('');
        if (nameError !== '') setNameError('Name is required');
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
        if (emailError !== '') setEmailError(validateEmail(e.target.value));
    }

    function handleEmailClear(): void {
        setEmail('');
        if (emailError !== '') setEmailError('Email is required');
    }

    function handleConsentChange(checked: boolean): void {
        setConsent(checked);
        if (checked) setConsentHighlighted(false);
        if (consentError !== '') setConsentError(checked ? '' : CONSENT_ERROR);
    }

    function shouldGuideFirst(): boolean {
        const needsInput = name.trim() === '' || email.trim() === '';
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
        const target = name.trim() === '' ? nameFieldRef.current : emailFieldRef.current;
        const input = target?.querySelector('input');
        input?.focus({ preventScroll: true });
        scrollFieldAboveKeyboard(target);
    }

    function firstMissingStep(): GuideStep | null {
        if (validateName(name) !== '') return 'name';
        if (validateEmail(email) !== '') return 'email';
        if (consent === false) return 'consent';
        return null;
    }

    function focusField(target: HTMLDivElement | null): void {
        const input = target?.querySelector('input');
        input?.focus({ preventScroll: true });
        scrollFieldAboveKeyboard(target);
    }

    function guideTo(step: GuideStep): void {
        guidedStepsRef.current.add(step);
        if (step === 'name') focusField(nameFieldRef.current);
        if (step === 'email') focusField(emailFieldRef.current);
        if (step === 'consent') {
            consentCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setConsentHighlighted(true);
        }
    }

    function guideStepForClick(): GuideStep | null {
        const missing = firstMissingStep();
        if (missing === null || guidedStepsRef.current.has(missing)) return null;
        return missing;
    }

    function handleSubmitClick(): void {
        if (isHighlighted) {
            const step = guideStepForClick();
            if (step !== null) {
                guideTo(step);
                return;
            }
            handleSubmit();
            return;
        }
        if (shouldGuideFirst() === true) {
            guideToFirstEmptyField();
            return;
        }
        handleSubmit();
    }

    function handleStickyClick(): void {
        if (isHighlighted) {
            const step = guideStepForClick();
            if (step !== null) {
                guideTo(step);
                return;
            }
        } else if (shouldGuideFirst() === true) {
            guideToFirstEmptyField();
            return;
        }
        submitButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        handleSubmit();
    }

    const primaryCta = 'Sign Up & Claim';
    const secondaryCta = 'Skip to site';
    const offerAltText = [content.heroPrefix, content.heroHeadline, content.heroSubline]
        .filter((part) => part !== '')
        .join(' ');
    const consentTextClass = 'text-on-surface-light text-[10px] leading-[14px] font-normal tracking-[0.4px]';
    const quietTextClass = 'text-on-surface-light/70 text-[10px] leading-[14px] font-normal tracking-[0.4px]';
    const ageConfirmText =
        'By checking the box below, you confirm that you are of legal gambling age in your state and have not self-excluded from any gambling operator.';
    const ageConfirmAboveText =
        'By checking the box above, you confirm that you are of legal gambling age in your state and have not self-excluded from any gambling operator.';
    const consentLabelText = `I consent to receiving emails from ${BRAND_NAME}, its affiliates and other websites owned or operated by its parent company.`;

    function renderEmailDisclosure(className: string): React.ReactElement {
        return (
            <p className={className}>
                {`Emails from ${BRAND_NAME} and its related entities will include gambling offers for casino and sports as well as promotional content related to eCommerce offerings. Email frequency may vary. To see our Privacy Policy, `}
                <Link href="/privacy-policy" className="underline">click here</Link>
                {'. For full terms and conditions, '}
                <Link href="/terms-and-conditions" className="underline">click here</Link>
                {'.'}
            </p>
        );
    }

    function renderConsentError(): React.ReactElement | null {
        if (consentError === '') return null;
        return (
            <div className="bg-error rounded-lg px-4 py-2">
                <p className={consentTextClass}>{consentError}</p>
            </div>
        );
    }

    function renderStandardConsent(): React.ReactElement {
        return (
            <>
                <p className={consentTextClass}>{ageConfirmText}</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-1">
                        <Checkbox
                            id={consentId}
                            checked={consent}
                            error={consentError !== ''}
                            onChange={handleConsentChange}
                        />
                        <label
                            htmlFor={consentId}
                            className={`${consentTextClass} cursor-pointer self-center`}
                        >
                            {consentLabelText}
                        </label>
                    </div>
                    {renderConsentError()}
                </div>
                {renderEmailDisclosure(consentTextClass)}
            </>
        );
    }

    function stopCardToggle(e: React.MouseEvent): void {
        e.stopPropagation();
    }

    function renderHighlightedConsent(): React.ReactElement {
        const cardStateClass = consentError !== ''
            ? 'border-error'
            : consent || consentHighlighted
              ? 'border-tertiary'
              : 'border-on-surface-light/40';
        return (
            <>
                <div className="flex flex-col gap-1">
                    <div
                        ref={consentCardRef}
                        onClick={() => handleConsentChange(!consent)}
                        className={`flex items-start gap-1 rounded-xl border py-2 pr-3 cursor-pointer transition-colors duration-200 ${cardStateClass}`}
                    >
                        <span onClick={stopCardToggle} className="-mt-2.5">
                            <Checkbox
                                id={consentId}
                                checked={consent}
                                error={consentError !== ''}
                                onChange={handleConsentChange}
                            />
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-on-surface-light text-sm font-bold leading-5">
                                Yes, send me the best Michigan casino offers
                            </span>
                            <span className={consentTextClass}>{consentLabelText}</span>
                            <span className="text-on-surface-light/70 text-[10px] leading-[14px] font-bold tracking-[0.4px]">
                                Unsubscribe anytime · No spam
                            </span>
                        </div>
                    </div>
                    {renderConsentError()}
                </div>
                <p className={quietTextClass}>{ageConfirmAboveText}</p>
                {renderEmailDisclosure(quietTextClass)}
            </>
        );
    }

    return (
        <>
            <ConfettiBurst anchorRef={emailFieldRef} fadeBeforeRef={submitButtonRef} />
            <SfbetsNav showMenu={false} />
            <main className="flex flex-col w-full bg-surface min-h-screen pb-[80px] md:pb-0">
                <USP text="JOIN OVER 80,000 SUBSCRIBERS" variant="slots" />

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
                                height={753}
                                className="w-full h-auto"
                                priority
                            />
                        </div>

                        <div className="flex flex-col gap-[10px] pt-1 px-4 pb-4 md:p-8">
                            <p className="text-sm font-normal leading-5 md:text-base md:font-bold text-on-surface-light text-center tracking-[0.15px]">
                                {content.instructionText}
                            </p>
                            <div ref={nameFieldRef}>
                                <TextField
                                    icon={User}
                                    label="First Name (required)"
                                    floatingLabel
                                    type="text"
                                    autoComplete="given-name"
                                    value={name}
                                    error={nameError}
                                    valid={validateName(name) === ''}
                                    onChange={handleNameChange}
                                    onClear={handleNameClear}
                                />
                            </div>
                            <div ref={emailFieldRef}>
                                <TextField
                                    icon={Mail}
                                    label="Email Address (required)"
                                    floatingLabel
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck={false}
                                    value={email}
                                    error={emailError}
                                    valid={validateEmail(email) === ''}
                                    onChange={handleEmailChange}
                                    onClear={handleEmailClear}
                                />
                            </div>
                            <div className="flex flex-col gap-[10px] bg-surface border border-outline-variant rounded-2xl p-4">
                                {isHighlighted ? renderHighlightedConsent() : renderStandardConsent()}
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
                <SfbetsFooter legalText={legalText} state="mi" />

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
