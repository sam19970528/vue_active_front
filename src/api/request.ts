import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useAppStore } from "@/store";
const DEV_API = "http://192.168.0.126:9090";
const PROD_API = "https://transcenter2.tt289.com/event";
export const baseURL = import.meta.env.DEV ? DEV_API : PROD_API;

type TAxiosOption = {
    timeout: number;
    baseURL: string;
};

const service = axios.create(<TAxiosOption>{
    timeout: 5000,
    baseURL: "/api",
});
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    error => {
        const appStore = useAppStore();
        let message: string;
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
            case 403:
                message = "拒绝访问";
                break;
            case 404:
                message = "请求地址错误";
                break;
            case 500:
                message = "服务器回應錯誤";
                break;
            default:
                message = "网络连接故障";
        }
        appStore.dialogHandle({
            content: message,
        });
        return Promise.reject(error);
    }
);

export default service;
