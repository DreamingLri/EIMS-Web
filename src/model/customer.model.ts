export interface Customer {
    customer_id: number;
    customer_name: string;
    company: string;
    sex: string;
    age: number;
    telephone: string;
    address: string;
}

export interface GetCustomerRes {
    list: Customer[];
}

export interface AddCustomerReq {
    customer_name: string;
    company: string;
    sex: string;
    age: number;
    telephone: string;
    address: string;
}

export interface UpdateCustomerReq {
    customer_id: number;
    customer_name: string;
    company: string;
    sex: string;
    age: number;
    telephone: string;
    address: string;
}