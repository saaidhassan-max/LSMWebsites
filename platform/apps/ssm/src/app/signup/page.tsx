'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

const TOP_TC_TEXT = 'Sign up below to get the latest deals delivered straight to your inbox!';

const LEGAL_DISCLAIMER =
  'New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. 18+ Full T&Cs apply. GambleAware.org.';

const FOOTER_LEGAL =
  'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
  return '';
}

function validatePhone(value: string): string {
  if (!value.trim()) return 'Phone number is required';
  return '';
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consentData, setConsentData] = useState<ConsentFormData | null>(null);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [forceConsentErrors, setForceConsentErrors] = useState(false);

  function handleSubmit() {
    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);
    const consentValid = consentData?.isValid ?? false;

    setEmailError(eErr);
    setPhoneError(pErr);
    if (!consentValid) setForceConsentErrors(true);

    if (!eErr && !pErr && consentValid) {
      router.push('/');
    }
  }

  return (
    <main data-theme="ssm" className="flex flex-col w-full bg-surface pb-12 gap-[10px]">

      {/* Nav + USP */}
      <div className="flex flex-col">
        <SsmNav />
        <USP text="OVER 5,000,000 SUBSCRIBERS" />
      </div>

      {/* Mobile hero — hidden on desktop */}
      <div className="relative w-full h-48 overflow-hidden md:hidden">
        <Image
          src="/ssm/LandingPage/mobile.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile instruction — hidden on desktop */}
      <div className="md:hidden">
        <TopTCs text={TOP_TC_TEXT} />
      </div>

      {/* Hero + Form
            Mobile : form fields stack below sections above
            Desktop: 2-column grid — hero left, instruction + form right
      */}
      <div className="w-full md:max-w-[1440px] md:mx-auto md:px-16 md:grid md:grid-cols-[1fr_427px] md:gap-8">

        {/* Desktop hero — hidden on mobile */}
        <div className="relative hidden md:block h-[800px] overflow-hidden">
          <Image
            src="/ssm/LandingPage/desktop.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form container
              Mobile:  px-4 pb-4  (matches original layout)
              Desktop: p-8        (32 px all sides, inner = 363 px = Figma exact)
        */}
        <div className="flex flex-col gap-[10px] px-4 pb-4 md:p-8">

          {/* Desktop instruction — hidden on mobile */}
          <div className="hidden md:block">
            <TopTCs text={TOP_TC_TEXT} />
          </div>

          <TextField
            icon={Mail}
            label="Email"
            type="email"
            placeholder="Insert your email"
            value={email}
            error={emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(validateEmail(e.target.value));
            }}
            onClear={() => {
              setEmail('');
              if (emailError) setEmailError('Email is required');
            }}
          />
          <TextField
            icon={Phone}
            label="Phone Number"
            type="tel"
            placeholder="Your phone number"
            value={phone}
            error={phoneError}
            onChange={(e) => {
              setPhone(e.target.value);
              if (phoneError) setPhoneError(validatePhone(e.target.value));
            }}
            onClear={() => {
              setPhone('');
              if (phoneError) setPhoneError('Phone number is required');
            }}
          />
          <ConsentForm
            defaultExpanded={false}
            forceShowErrors={forceConsentErrors}
            onChange={(data) => {
              setConsentData(data);
              if (forceConsentErrors && data.isValid) setForceConsentErrors(false);
            }}
          />
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
      </div>

      {/* Legal disclaimer */}
      <TopTCs text={LEGAL_DISCLAIMER} />

      {/* Footer */}
      <SsmFooter legalText={FOOTER_LEGAL} />

    </main>
  );
}
