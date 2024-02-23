import request from "./request";
import type { ActiveForm, SearchSubmittedType } from "@/types/data";

interface GetEventParams {
    eventId: string;
}

export function getEventDetail(params: GetEventParams) {
    return request({
        url: `/event/getEventDetail`,
        method: "get",
        params,
    });
}

export function listAllHappeningEvent() {
    return request({
        url: `/event/listAllHappeningEvent`,
        method: "get",
    });
}

export function submitEvent(data: ActiveForm) {
    return request({
        url: `/submit/submitEvent`,
        method: "post",
        data,
    });
}

export function searchSubmitted(params: SearchSubmittedType) {
    return request({
        url: `/submit/searchSubmitted`,
        method: "get",
        params,
    });
}

export function getVerify() {
    return request({
        url: `/test/getVerify`,
        method: "get",
    });
}

export function checkVerify(data: { inputStr: string }) {
    return request({
        url: `/test/checkVerify`,
        method: "post",
        data,
    });
}

export function linkInfo() {
    return request({
        url: `/sysConfig/linkInfo`,
        method: "get",
    });
}
