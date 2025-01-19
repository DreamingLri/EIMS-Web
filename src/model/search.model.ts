export interface SearchReq {
    type: number;
    content: string;
}

export interface EmployeeSearch {
    emp_no: number;
    first_name: string;
    last_name: string;
    gender: number;
    hire_date: string;
    birthday: string;
    address: string;
    telephone: string;
    dept_name: string[];
}

export interface SearchRes {
    list: EmployeeSearch[];
}