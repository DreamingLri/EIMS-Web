import type { Admin } from "@/model/admin.model";
import request from "@/utils/request";

enum Api {
    LOGIN = '/login',
    LOGOUT = '/logout',
}

export async function loginApi(name: string, password: string): Promise<Admin> {
    return request.post(Api.LOGIN, { name, password }).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function logoutApi(): Promise<any> {
    return request.post(Api.LOGOUT).then((res) => {
        if (res) {
            return res.data;
        }
    });
}