import type { AddDepartmentReq, GetDepartmentRes, UpdateDepartmentReq } from "@/model/department.model";
import request from "@/utils/request";

enum Api {
    DEPARTMENT = '/department',
}

export async function getDepartmentApi(): Promise<GetDepartmentRes> {
    return request.get(Api.DEPARTMENT).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function addDepartmentApi(req: AddDepartmentReq): Promise<any> {
    return request.post(Api.DEPARTMENT, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function updateDepartmentApi(req: UpdateDepartmentReq): Promise<any> {
    return request.put(Api.DEPARTMENT, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function deleteDepartmentApi(dept_no: number): Promise<any> {
    return request.delete(Api.DEPARTMENT, {params: {dept_no: dept_no}}).then((res) => {
        if (res) {
            return res.data;
        }
    });
}