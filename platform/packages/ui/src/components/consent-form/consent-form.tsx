'use client';

import type React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '../checkbox/checkbox';
import type {
    ConsentFormData,
    ConsentFormProps,
    ConsentOption,
    ContactState,
    InterestKey,
    InterestState
} from './consent-form.types';

const buildLegalText = (submitLabel: string): string =>
    `By accepting our terms and clicking "${submitLabel}", I confirm that I would like to receive marketing communications about the latest casino, bingo, and sports offers; winners; news; giveaways; competitions and incentives via email, SMS, and social messaging (e.g. WhatsApp) from Little Star Media Ltd and It's A Good Choice Ltd. I also agree to receive exclusive non-gambling retail promotions, such as vouchers and discounts for well-known brands, via email, SMS and social messaging from selected third-party partners.`;

const INTERESTS = [
    { key: 'casino', label: 'Casino (inc. Slots)' },
    { key: 'bingo', label: 'Bingo' },
    { key: 'sports', label: 'Sports Betting' },
    { key: 'retail', label: 'Non-Gambling Retail Offers & Vouchers' }
] satisfies ConsentOption<InterestKey>[];

const DEFAULT_INTERESTS: InterestState = {
    casino: false,
    bingo: false,
    sports: false,
    retail: false
};

const EMPTY_CONTACTS: ContactState = {
    email: false,
    sms: false,
    social: false
};

const SELECTED_CONTACTS: ContactState = {
    email: true,
    sms: true,
    social: true
};

const LEGAL_TEXT_CLASSES: Record<NonNullable<ConsentFormProps['variant']>, string> = {
    default: 'text-xs leading-4',
    compact: 'text-[10px] leading-[14px]'
};

const COMPACT_TEXT_CLASSES = 'text-[10px] leading-[14px]';

export function ConsentForm({
    onChange,
    defaultExpanded = true,
    forceShowErrors = false,
    className = '',
    variant = 'default',
    submitLabel = 'SIGN ME UP'
}: ConsentFormProps): React.ReactElement {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [interests, setInterests] = useState<InterestState>(DEFAULT_INTERESTS);

    const anyInterest = Object.values(interests).some(Boolean);
    const allInterests = Object.values(interests).every(Boolean);

    const mainChecked = allInterests;
    const mainIndeterminate = !mainChecked && anyInterest;

    const shouldShowErrors = hasInteracted || forceShowErrors;
    const showMainError = shouldShowErrors && !anyInterest;

    function notify(newInterests: InterestState): void {
        const newAnyInterest = Object.values(newInterests).some(Boolean);
        onChange?.({
            interests: newInterests,
            contactMethods: newAnyInterest ? SELECTED_CONTACTS : EMPTY_CONTACTS,
            isValid: newAnyInterest
        });
    }

    function handleMainChange(): void {
        setHasInteracted(true);
        const selectAll = !mainChecked;
        const newInterests = Object.fromEntries(
            INTERESTS.map(({ key }) => [key, selectAll])
        ) as InterestState;
        setInterests(newInterests);
        notify(newInterests);
    }

    function handleInterestChange(key: InterestKey, checked: boolean): void {
        setHasInteracted(true);
        const newInterests = { ...interests, [key]: checked };
        setInterests(newInterests);
        notify(newInterests);
    }

    return (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            <div className="flex items-center w-full">
                <Checkbox
                    checked={mainChecked}
                    indeterminate={mainIndeterminate}
                    error={showMainError}
                    onChange={handleMainChange}
                    label="Keep me informed"
                    className="flex-1 font-bold"
                    labelClassName={variant === 'compact' ? 'text-sm !font-medium leading-5' : ''}
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

            {showMainError === true && (
                <div className="inline-flex items-center bg-error px-1 py-1 ml-10">
                    <p
                        className={`${
                            variant === 'compact'
                                ? COMPACT_TEXT_CLASSES
                                : 'text-sm leading-[16.8px]'
                        } font-normal text-surface-container-low`}
                    >
                        Please accept our terms
                    </p>
                </div>
            )}

            <p className={`${LEGAL_TEXT_CLASSES[variant]} font-normal tracking-[0.4px] text-on-surface-light`}>
                {buildLegalText(submitLabel)}
            </p>

            {isExpanded === true && (
                <div className="flex flex-col gap-2 mt-1">
                    <p
                        className={`${
                            variant === 'compact' ? COMPACT_TEXT_CLASSES : 'text-sm leading-5'
                        } font-normal text-on-surface-light`}
                    >
                        Simply tick the boxes to choose which types of offer you'd like to receive
                        and how:
                    </p>

                    <div className="flex flex-col">
                        <p
                            className={`${
                                variant === 'compact' ? COMPACT_TEXT_CLASSES : 'text-sm leading-5'
                            } font-medium text-on-surface-light py-1`}
                        >
                            I'm interested in
                        </p>
                        {INTERESTS.map(({ key, label }) => (
                            <Checkbox
                                key={key}
                                checked={interests[key]}
                                error={showMainError}
                                onChange={(checked) => handleInterestChange(key, checked)}
                                label={label}
                                labelClassName={variant === 'compact' ? COMPACT_TEXT_CLASSES : ''}
                            />
                        ))}
                        {showMainError === true && (
                            <div className="inline-flex items-center bg-error px-1 py-1 ml-10">
                                <p
                                    className={`${
                                        variant === 'compact'
                                            ? COMPACT_TEXT_CLASSES
                                            : 'text-sm leading-[16.8px]'
                                    } font-normal text-surface-container-low`}
                                >
                                    Please select what you're interested in
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
