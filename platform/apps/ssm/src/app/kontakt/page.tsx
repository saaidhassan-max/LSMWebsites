'use client';

import { useState } from 'react';
import { Mail, User, ArrowRight, CheckCircle } from 'lucide-react';
import { USP, SsmFooter, WebsiteDirectory, TextField, Button } from '@lsm/ui';
import { SsmNav } from '../../components/SsmNav';

const DIRECTORY_SITES = [
  { name: '888 Ladies' },
  { name: 'Buzz Bingo' },
  { name: 'Lucky Pants Bingo' },
  { name: 'Betfred' },
  { name: 'Fabulous Bingo' },
  { name: 'MrQ' },
  { name: 'Lottoland' },
  { name: 'Pink Casino' },
  { name: 'Dotty Bingo' },
];

const LEGAL_TEXT =
  'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

export default function KontaktPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <main data-theme="ssm" className="flex flex-col w-full bg-surface pb-12">
      <SsmNav />
      <USP text="OVER 5,000,000 SUBSCRIBERS" />

      {/* Body — stacked on mobile, 2-col grid on desktop */}
      <div className="w-full max-w-[1440px] mx-auto px-4 py-8 flex flex-col gap-8 md:px-16 md:py-16 md:grid md:grid-cols-2 md:gap-16">

        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[45px] font-bold leading-tight text-on-surface-light">
            Kontakt Os
          </h1>
          <p className="text-base text-on-surface-light">
            Har du spørgsmål eller brug for hjælp?<br />
            Udfyld formularen, og vi vender tilbage hurtigst muligt.
          </p>
        </div>

        {/* Right: form */}
        <div className="flex flex-col gap-4">
          <TextField
            icon={User}
            label="Navn"
            type="text"
            placeholder="Dit fulde navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClear={() => setName('')}
          />
          <TextField
            icon={Mail}
            label="E-mail"
            type="email"
            placeholder="Din e-mailadresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClear={() => setEmail('')}
          />

          {/* Message textarea — same visual style as TextField */}
          <div className="flex flex-col gap-1 bg-surface-container-low border border-outline-variant rounded p-4">
            <span className="text-xs text-outline">Besked</span>
            <textarea
              className="bg-transparent resize-none outline-none text-sm text-on-surface-dark placeholder:text-outline"
              rows={5}
              placeholder="Skriv din besked her..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            trailingIcon={submitted ? <CheckCircle size={24} /> : <ArrowRight size={24} />}
            className="w-full"
            onClick={() => { if (!submitted) setSubmitted(true); }}
          >
            {submitted ? 'Din besked er sendt!' : 'Send'}
          </Button>
        </div>
      </div>

      {/* Directory — constrained, full width within padding */}
      <div className="w-full max-w-[1440px] mx-auto px-4 py-4 md:px-16 md:py-8">
        <WebsiteDirectory
          title="SSM Casino Directory"
          sites={DIRECTORY_SITES}
        />
      </div>

      <SsmFooter legalText={LEGAL_TEXT} />
    </main>
  );
}
