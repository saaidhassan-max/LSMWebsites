'use client';

import type React from 'react';
import { useState } from 'react';
import { User, Mail, Info, CheckCircle } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { OntarioFooter } from '@lsm/ui/components/ontario-footer/ontario-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { OntarioNav } from '../../components/ontario-nav';
import { directorySites } from '../../data/site-content';

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
        <main className="flex flex-col w-full bg-surface min-h-screen">
            <OntarioNav />

            <div className="w-full max-w-[1440px] mx-auto p-4 flex flex-col gap-16 flex-1 md:flex-row md:p-16 md:gap-16">
                <div className="flex flex-col gap-4 md:flex-1">
                    <h1 className="text-[45px] font-bold leading-[52px] tracking-[0px] text-on-surface-light">
                        Contact Us
                    </h1>
                    <p className="text-base font-normal leading-6 tracking-[0.5px] text-on-surface-light">
                        Enter your query below and we'll get back to you.
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:flex-1">
                    <TextField
                        icon={User}
                        label="First Name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClear={() => setName('')}
                    />
                    <TextField
                        icon={Mail}
                        label="Email Address"
                        type="email"
                        placeholder="Enter a valid Email address"
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
                                placeholder="Start typing your message here"
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
                        variant="tertiary"
                        trailingIcon={submitted ? <CheckCircle size={24} /> : undefined}
                        className="w-full text-on-surface-dark"
                        onClick={handleSubmit}
                    >
                        {submitted ? 'Message sent!' : 'Submit'}
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 py-4 md:px-16">
                <WebsiteDirectory title="Good.Choice Directory" sites={directorySites} splitAtDot />
            </div>

            <OntarioFooter />
        </main>
    );
}
