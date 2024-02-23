export interface DataItem {
    active: boolean;
    applyCounts: number;
    auditor: string;
    conditions: string | string[];
    detail: string;
    eventName: string;
    event_img: string;
    expireTime: string;
    id: number;
    startTime: string;
    status: number;
}

export interface ActiveForm {
    member: string;
    verifyInput: string;
    eventId: string;
    conditions: {
        [key: string]: string;
    };
}

export interface SearchSubmittedType {
    eventId: string;
    member: string;
}

export interface SearchResultType {
    auditTime: null | string;
    eventName: string;
    member: string;
    note: null | string;
    status: number;
    submitTime: string;
}
