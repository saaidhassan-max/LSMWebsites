'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { ConsentForm } from '@lsm/ui/components/consent-form/consent-form';
import type { ConsentFormData } from '@lsm/ui/components/consent-form/consent-form.types';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { SsmNav } from '../../components/ssm-nav';
import { legalText, signupInstructionText, signupLegalDisclaimer } from '../../data/site-content';

function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
}

function validatePhone(value: string): string {
    if (!value.trim()) return 'Phone number is required';
    return '';
}

export default function SignupV2Page(): React.ReactElement {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consentData, setConsentData] = useState<ConsentFormData | null>(null);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [forceConsentErrors, setForceConsentErrors] = useState(false);
    const submitButtonRef = useRef<HTMLDivElement>(null);
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
        return () => observer.disconnect();
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

    function handleStickyClick(): void {
        submitButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        handleSubmit();
    }

    return (
        <main className="flex flex-col w-full bg-surface min-h-screen gap-[10px] pb-[80px] md:pb-0">
            <div className="flex flex-col">
                <SsmNav />
                <USP text="OVER 5,000,000 SUBSCRIBERS" />
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
                    style={{ width: '100%', minWidth: '1440px' }}
                >
                    <Image
                        src="/ssm/LandingPage/landingpage-background.png"
                        alt=""
                        width={1440}
                        height={768}
                        style={{ width: '100%', height: 'auto' }}
                        placeholder="empty"
                        priority
                    />
                </div>
                <div className="relative z-10 flex flex-col gap-4 md:max-w-[564px] md:mx-auto md:w-full md:py-6 md:gap-8">
                <div className="flex flex-col items-center gap-0 md:gap-2 px-4">
                    <p className="text-[22px] md:text-[32px] font-bold leading-[26.4px] md:leading-10 text-on-surface-light text-center">
                        Up to
                    </p>
                    <p className="text-[45px] md:text-[80px] font-bold md:font-semibold leading-[52px] md:leading-[96px] text-on-surface-light text-center tracking-[-0.019em]">
                        250 Free Spins
                    </p>
                    <p className="text-[22px] md:text-[32px] font-medium md:font-bold leading-7 md:leading-10 text-on-surface-light text-center">
                        No Deposit & No Wagering
                    </p>
                </div>

                <div className="flex flex-col gap-[10px] pt-1 px-4 pb-4 md:p-8">
                    <p className="text-sm font-normal leading-5 md:text-base md:font-bold text-on-surface-light text-center tracking-[0.15px]">
                        {signupInstructionText}
                    </p>
                    <TextField
                        icon={Mail}
                        label="Email"
                        type="email"
                        placeholder="Insert your email"
                        value={email}
                        error={emailError}
                        onChange={handleEmailChange}
                        onClear={handleEmailClear}
                    />
                    <TextField
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        error={phoneError}
                        onChange={handlePhoneChange}
                        onClear={handlePhoneClear}
                    />
                    <ConsentForm
                        defaultExpanded={false}
                        forceShowErrors={forceConsentErrors}
                        onChange={handleConsentChange}
                    />
                    <div ref={submitButtonRef}>
                        <Button
                            variant="primary"
                            trailingIcon={<ArrowRight size={24} />}
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            Sign Me Up
                        </Button>
                    </div>
                    <Button variant="text" color="dark" className="w-full" onClick={() => router.push('/')}>
                        Skip
                    </Button>
                </div>
                </div>
            </div>

            <TopTCs text={signupLegalDisclaimer} />
            <SsmFooter legalText={legalText} />
            {showStickySubmit && (
                <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-surface border-t border-outline-variant md:hidden">
                    <Button
                        variant="primary"
                        trailingIcon={<ArrowRight size={24} />}
                        className="w-full"
                        onClick={handleStickyClick}
                    >
                        Sign Me Up
                    </Button>
                </div>
            )}
        </main>
    );
}
