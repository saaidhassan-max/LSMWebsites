'use client';

import type React from 'react';
import { useState, useId } from 'react';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { TextField } from '../text-field/text-field';
import { ConsentForm } from '../consent-form/consent-form';
import type { ConsentFormData } from '../consent-form/consent-form.types';
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

function validateName(value: string): string {
    if (value.trim() === '') return 'First name is required';
    return '';
}

export function SignupForm({
    variant,
    brandName = 'Good.Choice',
    headlineText,
    privacyPolicyUrl = '#',
    termsUrl = '#',
    onSubmit,
    requiredFieldLabel,
    ageConfirmText = 'By checking the box below, you confirm that you are of legal gambling age in your province and have not self-excluded from any gambling operator.',
    consentLabel,
    consentBodyText,
    nameEmailMode = false
}: SignupFormProps): React.ReactElement {
    const useNameEmail = variant != null || nameEmailMode;

    const consentId = useId();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [consent, setConsent] = useState(false);
    const [consentError, setConsentError] = useState('');
    const [consentFormData, setConsentFormData] = useState<ConsentFormData | null>(null);
    const [forceConsentErrors, setForceConsentErrors] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');

    const resolvedHeadline = headlineText ?? (variant != null
        ? 'Receive free Good.Choice updates straight to your inbox!'
        : 'Receive free casino offers straight to your inbox');

    const resolvedRequiredNote = requiredFieldLabel ?? (variant === 'ontario'
        ? '**Indicates required field'
        : '** Required Information');

    const resolvedConsentLabel = consentLabel ?? `I consent to receive emails from ${brandName}`;

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        const eErr = validateEmail(email);
        const nErr = useNameEmail ? validateName(name) : '';
        const pErr = !useNameEmail ? validatePhone(phone) : '';

        setEmailError(eErr);
        setNameError(nErr);
        setPhoneError(pErr);

        if (variant === 'sfb-sfsg') {
            if (consentFormData === null || !consentFormData.isValid) {
                setForceConsentErrors(true);
                return;
            }
            if (eErr === '' && nErr === '') {
                onSubmit?.({ email, phone, name, consent: true });
            }
            return;
        }

        const cErr = !consent ? 'Please accept our terms to continue' : '';
        setConsentError(cErr);

        if (eErr === '' && pErr === '' && nErr === '' && cErr === '') {
            onSubmit?.({ email, phone, name, consent });
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

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setName(e.target.value);
        if (nameError !== '') setNameError(validateName(e.target.value));
    }

    function handleNameClear(): void {
        setName('');
        if (nameError !== '') setNameError('First name is required');
    }

    function handleConsentChange(checked: boolean): void {
        setConsent(checked);
        if (consentError !== '') setConsentError(checked ? '' : 'Please accept our terms to continue');
    }

    function renderConsentSection(): React.ReactElement {
        if (variant === 'ontario') {
            return (
                <div className="flex flex-col gap-2">
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {resolvedRequiredNote}
                    </p>
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {ageConfirmText}
                    </p>
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
                                className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] cursor-pointer self-center"
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
                        {consentBodyText ?? 'These emails will include information, news, and updates about online casinos and sportsbooks, as well as promotional content related to eCommerce offerings. Email frequency may vary. You can unsubscribe at any time by clicking the link in our emails.'}{' '}
                        <a href={privacyPolicyUrl} className="underline">To view our Privacy Policy, click here.</a>{' '}
                        <a href={termsUrl} className="underline">For full terms and conditions, click here.</a>
                    </p>
                </div>
            );
        }

        if (variant === 'sfb-sfsg') {
            return (
                <div className="flex flex-col gap-3">
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {resolvedRequiredNote}
                    </p>
                    <ConsentForm
                        defaultExpanded={false}
                        forceShowErrors={forceConsentErrors}
                        onChange={setConsentFormData}
                    />
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {'If you would like to learn more about what we do with your personal data or your privacy rights, please '}
                        <a href={privacyPolicyUrl} className="underline">click here.</a>
                        {' For full terms and conditions, '}
                        <a href={termsUrl} className="underline">click here.</a>
                    </p>
                </div>
            );
        }

        if (variant === 'sfbets') {
            return (
                <div className="flex flex-col gap-2">
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {resolvedRequiredNote}
                    </p>
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        {'If you would like to learn more about what we do with your personal data or your privacy rights, please '}
                        <a href={privacyPolicyUrl} className="underline">click here.</a>
                        {' For full terms and conditions, '}
                        <a href={termsUrl} className="underline">click here.</a>
                    </p>
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
                                className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] cursor-pointer self-center"
                            >
                                {consentLabel ?? `I consent to receiving emails from ${brandName}, its affiliates and other websites owned or operated by its parent company.`}
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
                        {consentBodyText ?? `Emails from ${brandName} and its related entities will include gambling offers for casino and sports as well as promotional content related to eCommerce offerings. Email frequency may vary.`}{' '}
                        <a href={privacyPolicyUrl} className="underline">To see our Privacy Policy, click here.</a>{' '}
                        <a href={termsUrl} className="underline">For full terms and conditions, click here.</a>
                    </p>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-2">
                <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                    {resolvedRequiredNote}
                </p>
                <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                    {ageConfirmText}
                </p>
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
                            className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] cursor-pointer self-center"
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
                    {consentBodyText ?? 'These emails will include information, news, and updates about online casinos and sportsbooks, as well as promotional content related to eCommerce offerings. Email frequency may vary.'}{' '}
                    <a href={privacyPolicyUrl} className="underline">To see our Privacy Policy, click here.</a>{' '}
                    <a href={termsUrl} className="underline">For full terms and conditions, click here.</a>
                </p>
            </div>
        );
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
                    {resolvedHeadline}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-outline p-3 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    {useNameEmail ? (
                        <>
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    {renderConsentSection()}
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
