export interface SelectOption {
    label: string;
    value: string | number;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'file'; // Puedes añadir más tipos de HTML5
    placeholder?: string;
    options?: SelectOption[];
    required?: boolean;
    rows?: number; // Para campos de tipo textarea
    accept?: string; // Para campos de tipo file
}
