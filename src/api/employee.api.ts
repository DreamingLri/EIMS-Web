import type { AddEmployeeReq, GetEmployeeRes, UpdateEmployeeReq } from "@/model/employee.model";
import request from "@/utils/request";

enum Api {
    EMPLOYEE = '/employee',
}

export async function getEmployeeApi(): Promise<GetEmployeeRes> {
    return request.get(Api.EMPLOYEE).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function addEmployeeApi(req: AddEmployeeReq): Promise<any> {
    return request.post(Api.EMPLOYEE, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function updateEmployeeApi(req: UpdateEmployeeReq): Promise<any> {
    return request.put(Api.EMPLOYEE, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function deleteEmployeeApi(emp_no: number): Promise<any> {
    return request.delete(Api.EMPLOYEE, {params: {emp_no: emp_no}}).then((res) => {
        if (res) {
            return res.data;
        }
    });
}