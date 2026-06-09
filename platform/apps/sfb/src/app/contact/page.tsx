'use client';

import type React from 'react';
import { useState } from 'react';
import { Mail, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TextField } from '@lsm/ui/components/text-field/text-field';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SfbNav } from '../../components/sfb-nav';
import { directorySites, legalText } from '../../data/site-content';

export default function ContactPage(): React.ReactElement {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="flex flex-col w-full bg-surface pb-12">
            <SfbNav />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

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
                    />

                    <div className="flex flex-col gap-1 bg-surface-container-low border border-outline-variant rounded p-4">
                        <span className="text-xs text-outline">Message</span>
                        <textarea
                            className="bg-transparent resize-none outline-none text-sm text-on-surface-dark placeholder:text-outline"
                            rows={5}
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <Button
                        variant="primary"
                        trailingIcon={
                            submitted ? <CheckCircle size={24} /> : <ArrowRight size={24} />
                        }
                        className="w-full"
                        onClick={() => {
                            if (!submitted) setSubmitted(true);
                        }}
                    >
                        {submitted ? 'Message sent!' : 'Send'}
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 py-4 md:px-16 md:py-8">
                <WebsiteDirectory title="Super Free Bingo Directory" sites={directorySites} splitAtDot />
            </div>

            <SfbFooter legalText={legalText} />
        </main>
    );
}
