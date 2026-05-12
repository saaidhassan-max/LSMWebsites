'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, ArrowRight } from 'lucide-react';
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

export default function SignupPage(): React.ReactElement {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consentData, setConsentData] = useState<ConsentFormData | null>(null);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [forceConsentErrors, setForceConsentErrors] = useState(false);

    function handleSubmit(): void {
        const eErr = validateEmail(email);
        const pErr = validatePhone(phone);
        const consentValid = consentData?.isValid ?? false;

        setEmailError(eErr);
        setPhoneError(pErr);
        if (!consentValid) setForceConsentErrors(true);

        if (!eErr && !pErr && consentValid) {
            router.push('/');
        }
    }

    return (
        <main data-theme="ssm" className="flex flex-col w-full bg-surface pb-12 gap-[10px]">
            <div className="flex flex-col">
                <SsmNav />
                <USP text="OVER 5,000,000 SUBSCRIBERS" />
            </div>
            <div className="relative w-full h-48 overflow-hidden md:hidden">
                <Image
                    src="/ssm/LandingPage/mobile.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="md:hidden">
                <TopTCs text={signupInstructionText} />
            </div>
            <div className="w-full md:max-w-[1440px] md:mx-auto md:px-16 md:grid md:grid-cols-[1fr_427px] md:gap-8">
                <div className="relative hidden md:block h-[800px] overflow-hidden">
                    <Image
                        src="/ssm/LandingPage/desktop.png"
                        alt=""
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-[10px] px-4 pb-4 md:p-8">
                    <div className="hidden md:block">
                        <TopTCs text={signupInstructionText} />
                    </div>

                    <TextField
                        icon={Mail}
                        label="Email"
                        type="email"
                        placeholder="Insert your email"
                        value={email}
                        error={emailError}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(validateEmail(e.target.value));
                        }}
                        onClear={() => {
                            setEmail('');
                            if (emailError) setEmailError('Email is required');
                        }}
                    />
                    <TextField
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        error={phoneError}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError(validatePhone(e.target.value));
                        }}
                        onClear={() => {
                            setPhone('');
                            if (phoneError) setPhoneError('Phone number is required');
                        }}
                    />
                    <ConsentForm
                        defaultExpanded={false}
                        forceShowErrors={forceConsentErrors}
                        onChange={(data) => {
                            setConsentData(data);
                            if (forceConsentErrors && data.isValid) setForceConsentErrors(false);
                        }}
                    />
                    <Button
                        variant="primary"
                        trailingIcon={<ArrowRight size={24} />}
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Sign Me Up
                    </Button>
                    <Button variant="text" color="dark" className="w-full" onClick={() => router.push('/')}>
                        Skip For Now
                    </Button>
                </div>
            </div>
            <TopTCs text={signupLegalDisclaimer} />
            <SsmFooter legalText={legalText} />
        </main>
    );
}
