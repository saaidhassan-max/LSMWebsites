'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, User } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { Checkbox } from '@lsm/ui/components/checkbox/checkbox';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfbetsNav } from '../../components/sfbets-nav';
import { legalText, signupInstructionText, signupLegalDisclaimer } from '../../data/site-content';

function validateName(value: string): string {
    if (!value.trim()) return 'First name is required';
    return '';
}

function validateEmail(value: string): string {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
}

export default function SignupPage(): React.ReactElement {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consentChecked, setConsentChecked] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [consentError, setConsentError] = useState(false);
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
        return (): void => observer.disconnect();
    }, []);

    function handleSubmit(): void {
        const nErr = validateName(name);
        const eErr = validateEmail(email);

        setNameError(nErr);
        setEmailError(eErr);
        if (!consentChecked) setConsentError(true);

        if (nErr === '' && eErr === '' && consentChecked) {
            router.push('/');
        }
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setName(e.target.value);
        if (nameError !== '') setNameError(validateName(e.target.value));
    }

    function handleNameClear(): void {
        setName('');
        if (nameError !== '') setNameError('First name is required');
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
        if (emailError !== '') setEmailError(validateEmail(e.target.value));
    }

    function handleEmailClear(): void {
        setEmail('');
        if (emailError !== '') setEmailError('Email is required');
    }

    function handleConsentChange(): void {
        const next = !consentChecked;
        setConsentChecked(next);
        if (next) setConsentError(false);
    }

    function handleStickyClick(): void {
        submitButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        handleSubmit();
    }

    return (
        <main className="flex flex-col w-full bg-surface min-h-screen gap-[10px] pb-[80px] md:pb-0">
            <div className="flex flex-col">
                <SfbetsNav />
                <USP text="JOIN 80,000+ SUBSCRIBERS" />
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
                    style={{ width: '100%', minWidth: '1440px' }}
                >
                    <Image
                        src="/sfbets/LandingPage/landingpage-background.png"
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
                            £50 Free Bets
                        </p>
                        <p className="text-[22px] md:text-[32px] font-medium md:font-bold leading-7 md:leading-10 text-on-surface-light text-center">
                            No Deposit & No Wagering
                        </p>
                    </div>

                    <div className="flex flex-col gap-[10px] px-4 pb-4 md:p-8">
                        <div className="bg-surface py-1 px-4 flex items-center justify-center">
                            <p className="text-base font-bold leading-6 tracking-[0.15px] text-on-surface-light text-center">
                                {signupInstructionText}
                            </p>
                        </div>
                        <TextField
                            icon={User}
                            label="First Name*"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            error={nameError}
                            onChange={handleNameChange}
                            onClear={handleNameClear}
                        />
                        <TextField
                            icon={Mail}
                            label="Email Address*"
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            error={emailError}
                            onChange={handleEmailChange}
                            onClear={handleEmailClear}
                        />

                        <div className="flex flex-col gap-2">
                            <p className="text-xs leading-4 tracking-[0.4px] text-on-surface-light">
                                * Required information
                            </p>
                            <p className="text-xs leading-4 tracking-[0.4px] text-on-surface-light">
                                By checking the box below, you confirm that you are of legal gambling age in your state and have not self-excluded from any gambling operator.
                            </p>
                            <div className="flex items-center">
                                <Checkbox
                                    checked={consentChecked}
                                    error={consentError}
                                    onChange={handleConsentChange}
                                />
                                <p className="text-xs leading-4 tracking-[0.4px] text-on-surface-light">
                                    I consent to receiving emails from Super Free Bets MI, its affiliates and other websites owned or operated by its parent company.
                                </p>
                            </div>
                            <p className="text-xs leading-4 tracking-[0.4px] text-on-surface-light">
                                Emails from Super Free Bets MI and its related entities will include gambling offers for casino and sports as well as promotional content related to eCommerce offerings. Email frequency may vary. To see our Privacy Policy,{' '}
                                <Link href="/privacy-policy" className="underline">click here</Link>
                                . For full terms and conditions,{' '}
                                <Link href="/terms" className="underline">click here</Link>
                                .
                            </p>
                        </div>

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
                        <Button variant="text" color="light" className="w-full text-primary" onClick={() => router.push('/')}>
                            Skip
                        </Button>
                    </div>
                </div>
            </div>

            <TopTCs text={signupLegalDisclaimer} />
            <SfbetsFooter legalText={legalText} state="mi" />

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
