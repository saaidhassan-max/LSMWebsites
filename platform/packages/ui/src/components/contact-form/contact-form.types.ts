export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}

export interface ContactFormErrors {
    name: string;
    email: string;
    message: string;
}
