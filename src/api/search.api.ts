import type { SearchReq, SearchRes } from "@/model/search.model";
import request from "@/utils/request";

enum Api {
    SEARCH = '/search',
}

export async function searchApi(req: SearchReq): Promise<SearchRes> {
    return request.post(Api.SEARCH, req).then((res) => {
        if (res) {
            return res.data;
        }
    });
}