'use client';

import type React from 'react';
import { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, User } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { TextField } from '@lsm/ui/components/text-field/text-field';

export function ContactForm(): React.ReactElement {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
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
                trailingIcon={submitted ? <CheckCircle size={24} /> : <ArrowRight size={24} />}
                className="w-full"
                onClick={() => {
                    if (!submitted) setSubmitted(true);
                }}
            >
                {submitted ? 'Message sent!' : 'Send'}
            </Button>
        </div>
    );
}
