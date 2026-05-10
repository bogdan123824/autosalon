export interface IOrder {
    id: number;
    username: string;
    company_name: string;
    telephone: string;
    email: string;
    car: string;
    wishes?: string; 
}

export interface IDrive {
    id: number;
    username: string;
    company_name: string;
    telephone: string;
    email: string;
    time: string;
    car: string;
    color: string;
    transmission: string;
    wishes?: string;
}

export interface IConnection {
    id: number;
    username: string;
    company_name: string;
    telephone: string;
    email: string;
    problems: string;
    wishes?: string; 
}