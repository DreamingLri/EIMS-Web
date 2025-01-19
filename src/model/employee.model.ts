export interface Employee {
    emp_no: number;
    first_name: string;
    last_name: string;
    gender: number;
    hire_date: string;
    birthday: string;
    address: string;
    telephone: string;
}

export interface GetEmployeeRes {
    list: Employee[];
}

export interface AddEmployeeReq {
    first_name: string;
    last_name: string;
    gender: number;
    hire_date: string;
    birthday: string;
    address: string;
    telephone: string;
}

export interface UpdateEmployeeReq {
    emp_no: number;
    first_name: string;
    last_name: string;
    gender: number;
    hire_date: string;
    birthday: string;
    address: string;
    telephone: string;
}