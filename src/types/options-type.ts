export interface OptionTab {

    data:OptionTabProps[];
    isOpen: boolean;
}



export interface OptionTabProps {
    
    [key: string]: OptionTabPropsData[] | string | number | boolean;
    
}

export interface OptionTabPropsData {
    
    id: string | number;
    name?: string;
    [key: string]: any;
    value?: string | number | boolean;
    
}