'use client';

import type React from 'react';
import { useState } from 'react';
import { Mail, User, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SfbetsNav } from '../../components/sfbets-nav';
import { directorySites, legalText } from '../../data/site-content';

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactPage(): React.ReactElement {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [attempted, setAttempted] = useState(false);

    const emailError: string | undefined = attempted
        ? email === ''
            ? 'Please enter your email address'
            : !isValidEmail(email)
            ? 'Please enter a valid email address'
            : undefined
        : undefined;

    const messageError: string | undefined =
        attempted && message === '' ? 'Please enter your message' : undefined;

    function handleSubmit(): void {
        setAttempted(true);
        if (email === '' || !isValidEmail(email) || message === '') return;
        setSubmitted(true);
    }

    return (
        <main className="flex flex-col w-full bg-surface pb-12">
            <SfbetsNav />
            <USP text="OVER 1,000,000 BETS PLACED" />

            <div className="w-full max-w-[1440px] mx-auto px-4 py-8 flex flex-col gap-8 md:px-16 md:py-16 md:grid md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[32px] md:text-[45px] font-bold leading-tight text-on-surface-light">
                        Contact Us
                    </h1>
                    <p className="text-base text-on-surface-light">
                        Have a question or need help?
                        <br />
                        Fill in the form and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <TextField
                        icon={User}
                        label="Name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClear={() => setName('')}
                    />
                    <TextField
                        icon={Mail}
                        label="Email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onClear={() => setEmail('')}
                        error={emailError}
                    />

                    <div className="w-full">
                        <div
                            className={`relative z-10 flex flex-col bg-surface-container-low border rounded-lg p-4 h-40 ${messageError !== undefined ? 'border-error' : 'border-outline-variant'}`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[12px] leading-[14px] text-outline">Message</span>
                                {messageError !== undefined && (
                                    <Info size={24} className="text-error shrink-0" />
                                )}
                            </div>
                            <textarea
                                className="flex-1 bg-transparent resize-none outline-none text-[14px] leading-5 text-on-surface-dark placeholder:text-outline"
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        {messageError !== undefined && (
                            <div className="bg-error rounded-b-lg px-4 pt-3 pb-0.5 -mt-[10px]">
                                <p className="text-on-surface-light text-[11px] font-normal leading-[13px] tracking-[0.4px]">
                                    {messageError}
                                </p>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="primary"
                        trailingIcon={
                            submitted ? <CheckCircle size={24} /> : <ArrowRight size={24} />
                        }
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        {submitted ? 'Message sent!' : 'Send'}
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 py-4 md:px-16 md:py-8">
                <WebsiteDirectory title="Super Free Bets Directory" sites={directorySites} />
            </div>

            <SfbetsFooter legalText={legalText} />
        </main>
    );
}
