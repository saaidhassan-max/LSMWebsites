'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '../Checkbox/Checkbox';

const LEGAL_TEXT =
  `By accepting our terms and clicking "SIGN ME UP", I confirm that I would like to receive marketing communications about the latest casino, bingo, and sports offers; winners; news; giveaways; competitions and incentives via email, SMS and social messaging (e.g. WhatsApp) from Little Star Media Ltd and It's A Good Choice Ltd.`;

const INTERESTS = [
  { key: 'casino', label: 'Casino (inc. Slots)' },
  { key: 'bingo', label: 'Bingo' },
  { key: 'sports', label: 'Sports Betting' },
  { key: 'retail', label: 'Non-Gambling Retail Offers & Vouchers' },
] as const;

const CONTACTS = [
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' },
  { key: 'social', label: 'Social Messaging' },
] as const;

type InterestKey = typeof INTERESTS[number]['key'];
type ContactKey = typeof CONTACTS[number]['key'];

type InterestState = Record<InterestKey, boolean>;
type ContactState = Record<ContactKey, boolean>;

export interface ConsentFormData {
  interests: InterestState;
  contactMethods: ContactState;
  isValid: boolean;
}

export interface ConsentFormProps {
  onChange?: (data: ConsentFormData) => void;
  defaultExpanded?: boolean;
  className?: string;
}

const DEFAULT_INTERESTS: InterestState = {
  casino: false,
  bingo: false,
  sports: false,
  retail: false,
};

const DEFAULT_CONTACTS: ContactState = {
  email: false,
  sms: false,
  social: false,
};

export function ConsentForm({ onChange, defaultExpanded = true, className = '' }: ConsentFormProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [interests, setInterests] = useState<InterestState>(DEFAULT_INTERESTS);
  const [contacts, setContacts] = useState<ContactState>(DEFAULT_CONTACTS);

  const anyInterest = Object.values(interests).some(Boolean);
  const allInterests = Object.values(interests).every(Boolean);
  const anyContact = Object.values(contacts).some(Boolean);
  const allContacts = Object.values(contacts).every(Boolean);

  const mainChecked = allInterests && allContacts;
  const mainIndeterminate = !mainChecked && (anyInterest || anyContact);

  const showMainError = hasInteracted && !anyInterest && !anyContact;
  const showInterestError = hasInteracted && anyContact && !anyInterest;
  const showContactError = hasInteracted && anyInterest && !anyContact;

  function notify(newInterests: InterestState, newContacts: ContactState) {
    const newAnyInterest = Object.values(newInterests).some(Boolean);
    const newAnyContact = Object.values(newContacts).some(Boolean);
    onChange?.({
      interests: newInterests,
      contactMethods: newContacts,
      isValid: newAnyInterest && newAnyContact,
    });
  }

  function handleMainChange() {
    setHasInteracted(true);
    const selectAll = !mainChecked;
    const newInterests = Object.fromEntries(
      INTERESTS.map(({ key }) => [key, selectAll])
    ) as InterestState;
    const newContacts = Object.fromEntries(
      CONTACTS.map(({ key }) => [key, selectAll])
    ) as ContactState;
    setInterests(newInterests);
    setContacts(newContacts);
    notify(newInterests, newContacts);
  }

  function handleInterestChange(key: InterestKey, checked: boolean) {
    setHasInteracted(true);
    const newInterests = { ...interests, [key]: checked };
    setInterests(newInterests);
    notify(newInterests, contacts);
  }

  function handleContactChange(key: ContactKey, checked: boolean) {
    setHasInteracted(true);
    const newContacts = { ...contacts, [key]: checked };
    setContacts(newContacts);
    notify(interests, newContacts);
  }

  return (
    <div className={`w-full flex flex-col gap-2 px-4 py-5 ${className}`}>
      {/* Header row: Keep me informed + chevron */}
      <div className="flex items-center w-full">
        <Checkbox
          checked={mainChecked}
          indeterminate={mainIndeterminate}
          error={showMainError}
          onChange={handleMainChange}
          label="Keep me informed"
          className="flex-1 font-bold"
        />
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="w-10 h-10 flex items-center justify-center shrink-0 text-on-surface-light"
          aria-label={isExpanded ? 'Collapse preferences' : 'Expand preferences'}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Main error */}
      {showMainError && (
        <p className="text-sm font-normal leading-5 text-error -mt-1 ml-10">
          Please accept our terms
        </p>
      )}

      {/* Legal text */}
      <p className="text-sm font-normal leading-5 text-on-surface-light">
        {LEGAL_TEXT}
      </p>

      {/* Expandable detail section */}
      {isExpanded && (
        <div className="flex flex-col gap-2 mt-1">
          <p className="text-sm font-normal leading-5 text-on-surface-light">
            Simply tick the boxes to choose which types of offer you'd like to receive and how:
          </p>

          {/* I'm interested in */}
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-5 text-on-surface-light py-1">
              I'm interested in
            </p>
            {INTERESTS.map(({ key, label }) => (
              <Checkbox
                key={key}
                checked={interests[key]}
                error={showInterestError}
                onChange={(checked) => handleInterestChange(key, checked)}
                label={label}
              />
            ))}
            {showInterestError && (
              <p className="text-sm font-normal leading-5 text-error ml-10">
                Please select what you're interested in
              </p>
            )}
          </div>

          {/* Contact me by */}
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-5 text-on-surface-light py-1">
              Contact me by
            </p>
            {CONTACTS.map(({ key, label }) => (
              <Checkbox
                key={key}
                checked={contacts[key]}
                error={showContactError}
                onChange={(checked) => handleContactChange(key, checked)}
                label={label}
              />
            ))}
            {showContactError && (
              <p className="text-sm font-normal leading-5 text-error ml-10">
                Please select how you wish to be contacted
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
