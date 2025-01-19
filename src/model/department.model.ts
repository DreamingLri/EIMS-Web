export interface Department {
    dept_no: number;
    dept_name: string;
    dept_peoplecount: number;
}

export interface GetDepartmentRes {
    list: Department[];
}

export interface AddDepartmentReq {
    dept_name: string;
}

export interface UpdateDepartmentReq {
    dept_no: number;
    dept_name: string;
}