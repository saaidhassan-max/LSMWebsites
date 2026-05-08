'use client';

import React, { useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { SignupFormProps } from './signup-form.types';

export function SignupForm({
    brandName = 'Good.Choice.',
    privacyPolicyUrl = '#',
    termsUrl = '#',
    onSubmit
}: SignupFormProps): React.ReactElement {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        onSubmit?.({ email, phone, consent });
    }

    return (
        <div className="w-full rounded-lg overflow-hidden">
            <div className="bg-surface px-4 py-1 flex items-center justify-center">
                <span className="text-on-surface-light text-sm font-bold leading-5 tracking-[0.1px]">
                    💌 Subscribe
                </span>
            </div>

            <div className="bg-tertiary px-8 py-2 flex items-center justify-center">
                <p className="text-on-surface-light text-base font-bold leading-6 tracking-[0.15px] text-center">
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
                        onChange={(e) => setEmail(e.target.value)}
                        onClear={() => setEmail('')}
                    />
                    <TextField
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onClear={() => setPhone('')}
                    />
                </div>

                <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] py-1">
                    **Indicates required field
                </p>

                <div className="flex flex-col">
                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        By checking the box below, you confirm that you are of legal gambling age in
                        your province and have not self-excluded from any gambling operator.
                    </p>

                    <div className="flex items-center gap-1">
                        <div className="flex items-center justify-center w-[41px] h-[41px] shrink-0">
                            <input
                                type="checkbox"
                                id="signup-consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="w-5 h-5 rounded-sm cursor-pointer accent-primary"
                            />
                        </div>
                        <label
                            htmlFor="signup-consent"
                            className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] cursor-pointer"
                        >
                            I consent to receive emails from {brandName}
                        </label>
                    </div>

                    <p className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px]">
                        These emails will include information, news, and updates about online
                        casinos and sportsbooks, as well as promotional content related to eCommerce
                        offerings. Email frequency may vary. You can unsubscribe at any time by
                        clicking the link in our emails.{' '}
                        <a href={privacyPolicyUrl} className="underline">
                            To view our Privacy Policy, click here.
                        </a>{' '}
                        For full terms and conditions, click here.
                    </p>

                    <a
                        href={termsUrl}
                        className="text-on-surface-light text-[11px] leading-[13px] tracking-[0.4px] underline"
                    >
                        Full terms &amp; conditions
                    </a>
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
