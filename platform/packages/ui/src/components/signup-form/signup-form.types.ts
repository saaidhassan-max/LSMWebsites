export type SignupFormVariant = 'ontario' | 'sfb-sfsg' | 'sfbets';

export interface SignupFormData {
    email: string;
    phone: string;
    name: string;
    consent: boolean;
}

export interface SignupFormProps {
    variant?: SignupFormVariant;
    brandName?: string;
    headlineText?: string;
    privacyPolicyUrl?: string;
    termsUrl?: string;
    onSubmit?: (data: SignupFormData) => void;
    requiredFieldLabel?: string;
    ageConfirmText?: string;
    consentLabel?: string;
    consentBodyText?: string;
    nameEmailMode?: boolean;
}
