'use client';

import type React from 'react';
import { useId, useState } from 'react';
import { ArrowRight, CheckCircle, Info, Mail, User } from 'lucide-react';
import { cn } from '../../lib/generic/cn';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { ContactFormErrors, ContactFormProps } from './contact-form.types';

const NO_ERRORS: ContactFormErrors = { name: '', email: '', message: '' };

const validateName = (value: string): string => (value.trim() === '' ? 'Name is required' : '');

function validateEmail(value: string): string {
    if (value.trim() === '') return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email';
    return '';
}

const validateMessage = (value: string): string =>
    value.trim() === '' ? 'Message is required' : '';

export function ContactForm({ onSubmit }: ContactFormProps): React.ReactElement {
    const messageId = useId();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageFocused, setMessageFocused] = useState(false);
    const [errors, setErrors] = useState<ContactFormErrors>(NO_ERRORS);
    const [submitted, setSubmitted] = useState(false);

    const messageFloated = messageFocused || message !== '';

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        const next: ContactFormErrors = {
            name: validateName(name),
            email: validateEmail(email),
            message: validateMessage(message)
        };
        setErrors(next);
        if (next.name !== '' || next.email !== '' || next.message !== '') return;
        setSubmitted(true);
        onSubmit?.({ name: name.trim(), email: email.trim(), message: message.trim() });
    }

    function update(
        field: keyof ContactFormErrors,
        value: string,
        validate: (v: string) => string
    ): void {
        setSubmitted(false);
        if (errors[field] !== '') setErrors({ ...errors, [field]: validate(value) });
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <TextField
                icon={User}
                label="Name (required)"
                floatingLabel
                type="text"
                autoComplete="name"
                value={name}
                error={errors.name}
                valid={validateName(name) === ''}
                onChange={(e) => {
                    setName(e.target.value);
                    update('name', e.target.value, validateName);
                }}
                onClear={() => {
                    setName('');
                    update('name', '', validateName);
                }}
            />
            <TextField
                icon={Mail}
                label="Email Address (required)"
                floatingLabel
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={email}
                error={errors.email}
                valid={validateEmail(email) === ''}
                onChange={(e) => {
                    setEmail(e.target.value);
                    update('email', e.target.value, validateEmail);
                }}
                onClear={() => {
                    setEmail('');
                    update('email', '', validateEmail);
                }}
            />

            <div className="w-full">
                <div
                    className={cn(
                        'relative z-10 rounded-lg border px-4 pt-6 pb-3 transition-colors duration-150',
                        'bg-surface-container-lowest hover:bg-surface-container',
                        errors.message !== ''
                            ? 'border-error'
                            : 'border-outline-variant focus-within:border-primary'
                    )}
                >
                    <label
                        htmlFor={messageId}
                        className={cn(
                            'absolute left-4 pointer-events-none transition-all duration-200 ease-out',
                            messageFloated
                                ? 'top-[7px] text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark'
                                : 'top-4 text-base leading-6 tracking-[0.5px] text-on-surface-dark/40'
                        )}
                    >
                        Message (required)
                    </label>
                    <textarea
                        id={messageId}
                        rows={5}
                        value={message}
                        onFocus={() => setMessageFocused(true)}
                        onBlur={() => setMessageFocused(false)}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            update('message', e.target.value, validateMessage);
                        }}
                        className="w-full resize-none bg-transparent pr-8 text-base leading-6 tracking-[0.5px] text-on-surface-dark outline-none"
                    />
                    {errors.message !== '' && (
                        <Info size={24} className="absolute right-4 top-4 text-error" />
                    )}
                </div>
                {errors.message !== '' && (
                    <div className="bg-error rounded-b-lg px-4 pt-3 pb-0.5 -mt-[10px]">
                        <p className="text-on-surface-light text-[11px] font-normal leading-[13px] tracking-[0.4px]">
                            {errors.message}
                        </p>
                    </div>
                )}
            </div>

            <Button
                type="submit"
                variant="primary"
                trailingIcon={submitted ? <CheckCircle size={24} /> : <ArrowRight size={24} />}
                className="w-full"
            >
                {submitted ? 'Message sent!' : 'Send'}
            </Button>
        </form>
    );
}
