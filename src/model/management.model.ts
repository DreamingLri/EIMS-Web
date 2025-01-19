export interface Management {
    ed_id: number;
    emp_no: number;
    emp_name: string;
    dept_no: number;
    dept_name: string;
    entry_date: string;
    leave_date: string;
    status: number;
}

export interface GetManagementRes {
    list: Management[];
}

export interface AddManagementReq {
    emp_no: number;
    dept_no: number;
}