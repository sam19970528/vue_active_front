import { fromPairs, map, replace, toPairs } from "lodash";
import type { TextColor, TextColorObject } from "./types";
import { StatusType } from "@/types/format";

export const formatHttpsReplaceHttp = (url: string | null): string => {
    const env = import.meta.env.MODE;
    if (env !== "development") return url as string;
    else if (typeof url === "string") {
        return replace(url, "https", "http");
    } else {
        return "";
    }
};

export const formatConditions = (conditions: string) => {
    const parseConditions = JSON.parse(conditions as string);
    const conditionKeys = Object.keys(parseConditions);
    return conditionKeys;
};

export const transStatus = (status: string | number): TextColor => {
    const statusObject: TextColorObject = {
        0: {
            text: StatusType[0],
            color: "secondary",
        },
        1: {
            text: StatusType[1],
            color: "success",
        },
        9: {
            text: StatusType[9],
            color: "danger",
        },
    };
    return statusObject[status];
};

// 轉換成[["123","456"],["789","012"]]
export function formatConditionToPairs(condition: string) {
    const parseCondition = JSON.parse(condition);
    const obj = parseCondition[0];
    const twoDimensionalArray = toPairs(obj);
    return twoDimensionalArray as [string, string][];
}
