export interface OptionTab {

    data:OptionTabProps[];
    isOpen: boolean;
}

export interface OptionTabProps {
    id: string | number;
    name?: string;
    [key: string]: any;
    value?: string | number | boolean;
    
}