import type { AddManagementReq, GetManagementRes } from "@/model/management.model";
import request from "@/utils/request";

enum Api {
    MANAGEMENT = '/management',
}

export async function getManagementApi(): Promise<GetManagementRes> {
    return request.get(Api.MANAGEMENT).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function addManagementApi(req: AddManagementReq): Promise<any> {
    return request.post(Api.MANAGEMENT, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function deleteManagementApi(management_id: number): Promise<any> {
    return request.delete(Api.MANAGEMENT, {params: {ed_id: management_id}}).then((res) => {
        if (res) {
            return res.data;
        }
    });
}