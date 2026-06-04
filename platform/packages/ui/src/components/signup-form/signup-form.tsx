'use client';

import type React from 'react';
import { useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { SignupFormProps } from './signup-form.types';

function validateEmail(value: string): string {
    if (value.trim() === '') return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
}

function validatePhone(value: string): string {
    if (value.trim() === '') return 'Phone number is required';
    return '';
}

export function SignupForm({
    brandName = 'Good.Choice.',
    privacyPolicyUrl = '#',
    termsUrl = '#',
    onSubmit,
    requiredFieldLabel = '**Indicates required field',
    ageConfirmText = 'By checking the box below, you confirm that you are of legal gambling age in your province and have not self-excluded from any gambling operator.',
    consentLabel,
    consentBodyText = 'These emails will include information, news, and updates about online casinos and sportsbooks, as well as promotional content related to eCommerce offerings. Email frequency may vary. You can unsubscribe at any time by clicking the link in our emails.'
}: SignupFormProps): React.ReactElement {
    const resolvedConsentLabel = consentLabel ?? `I consent to receive emails from ${brandName}`;
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [consentError, setConsentError] = useState('');

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        const eErr = validateEmail(email);
        const pErr = validatePhone(phone);
        const cErr = consent === false ? 'Please accept our terms to continue' : '';

        setEmailError(eErr);
        setPhoneError(pErr);
        setConsentError(cErr);

        if (eErr === '' && pErr === '' && cErr === '') {
            onSubmit?.({ email, phone, consent });
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

    function handleConsentChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const checked = e.target.checked;
        setConsent(checked);
        if (consentError !== '') setConsentError(checked === true ? '' : 'Please accept our terms to continue');
    }

    return (
        <div className="w-full rounded-lg overflow-hidden">
            <div className="bg-on-surface-dark px-4 py-1 flex items-center justify-center">
                <span className="text-on-surface-light text-sm font-bold leading-5 tracking-[0.1px]">
                    💌 Subscribe
                </span>
            </div>

            <div className="bg-tertiary px-8 py-2 flex items-center justify-center">
                <p className="text-on-surface-dark text-base font-bold leading-6 tracking-[0.15px] text-center">
                    Receive free casino offers straight to your inbox
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-outline p-3 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
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
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {requiredFieldLabel}
                    </p>

                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {ageConfirmText}
                    </p>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="signup-consent"
                                checked={consent}
                                onChange={handleConsentChange}
                                className="mt-0.5 w-5 h-5 shrink-0 cursor-pointer accent-primary"
                            />
                            <label
                                htmlFor="signup-consent"
                                className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] cursor-pointer"
                            >
                                {resolvedConsentLabel}
                            </label>
                        </div>
                        {consentError !== '' && (
                            <div className="bg-error rounded-lg px-4 py-2">
                                <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                                    {consentError}
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {consentBodyText}{' '}
                        <a href={privacyPolicyUrl} className="underline">
                            To see our Privacy Policy, click here.
                        </a>{' '}
                        <a href={termsUrl} className="underline">
                            For full terms and conditions, click here.
                        </a>
                    </p>
                </div>

                <Button
                    variant="secondary"
                    trailingIcon={<ArrowRight size={24} />}
                    type="submit"
                    className="w-full"
                >
                    SIGN ME UP
                </Button>
            </form>
        </div>
    );
}
