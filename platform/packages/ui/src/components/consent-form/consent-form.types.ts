export type InterestKey = 'casino' | 'bingo' | 'sports' | 'retail';

export type ContactKey = 'email' | 'sms' | 'social';

export type InterestState = Record<InterestKey, boolean>;

export type ContactState = Record<ContactKey, boolean>;

export interface ConsentOption<TOptionKey extends string> {
    key: TOptionKey;
    label: string;
}

export interface ConsentFormData {
    interests: InterestState;
    contactMethods: ContactState;
    isValid: boolean;
}

export interface ConsentFormProps {
    onChange?: (data: ConsentFormData) => void;
    defaultExpanded?: boolean;
    forceShowErrors?: boolean;
    className?: string;
}
