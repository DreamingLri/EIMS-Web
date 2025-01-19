import type { AddCustomerReq, GetCustomerRes } from "@/model/customer.model";
import request from "@/utils/request";

enum Api{
    CUSTOMER = '/customer',
}

export async function getCustomerApi(): Promise<GetCustomerRes> {
    return request.get(Api.CUSTOMER).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function addCustomerApi(req: AddCustomerReq): Promise<any> {
    return request.post(Api.CUSTOMER, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function updateCustomerApi(req: AddCustomerReq): Promise<any> {
    return request.put(Api.CUSTOMER, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export async function deleteCustomerApi(customer_id: number): Promise<any> {
    return request.delete(Api.CUSTOMER, {params: {customer_id: customer_id}}).then((res) => {
        if (res) {
            return res.data;
        }
    });
}