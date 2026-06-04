export interface SignupFormData {
    email: string;
    phone: string;
    consent: boolean;
}

export interface SignupFormProps {
    brandName?: string;
    privacyPolicyUrl?: string;
    termsUrl?: string;
    onSubmit?: (data: SignupFormData) => void;
    requiredFieldLabel?: string;
    ageConfirmText?: string;
    consentLabel?: string;
    consentBodyText?: string;
}
