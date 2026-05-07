'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import {
  USP,
  TopTCs,
  SsmFooter,
  TextField,
  Button,
  ConsentForm,
} from '@lsm/ui';
import type { ConsentFormData } from '@lsm/ui';
import { SsmNav } from '../../components/SsmNav';

const LEGAL_DISCLAIMER =
  'New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. 18+ Full T&Cs apply. GambleAware.org.';

const FOOTER_LEGAL =
  'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consentData, setConsentData] = useState<ConsentFormData | null>(null);

  function handleSubmit() {
    router.push('/');
  }

  return (
    <main data-theme="ssm" className="flex flex-col w-full bg-surface pt-12 pb-12 gap-[10px]">

      {/* 1 — Nav */}
      <SsmNav />

      {/* 2 — USP banner */}
      <USP text="OVER 5,000,000 SUBSCRIBERS" />

      {/* 3 — Hero image placeholder */}
      <div className="w-full h-48 bg-[#5d5d5d]" />

      {/* 4 — Sign-up instruction */}
      <TopTCs text="Sign up below to get the latest deals delivered straight to your inbox!" />

      {/* 5 — Form section */}
      <div className="flex flex-col gap-[10px] px-4 pt-1 pb-4">
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
        <ConsentForm defaultExpanded={false} onChange={setConsentData} />
        <Button
          variant="primary"
          trailingIcon={<ArrowRight size={24} />}
          className="w-full"
          onClick={handleSubmit}
        >
          Sign Me Up
        </Button>
        <Button
          variant="text"
          className="w-full"
          onClick={() => router.push('/')}
        >
          Skip For Now
        </Button>
      </div>

      {/* 6 — Legal disclaimer */}
      <TopTCs text={LEGAL_DISCLAIMER} />

      {/* 7 — Footer */}
      <SsmFooter legalText={FOOTER_LEGAL} />

    </main>
  );
}
