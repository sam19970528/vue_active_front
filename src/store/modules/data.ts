import { defineStore } from "pinia";
import { ref } from "vue";
import { listAllHappeningEvent, linkInfo } from "@/api";
import { find, orderBy } from "lodash";
import type { DataItem } from "@/types/data";

const useDataStore = defineStore(
    "data",
    () => {
        const data = ref<DataItem[]>([]);
        const linkList = reactive([
            {
                id: "FrontEndUrl",
                prop: "",
                title: "首页",
            },
            {
                id: "OpenAccountURL",
                prop: "",
                title: "免费开户",
            },
            {
                id: "DownloadAppURL",
                prop: "",
                title: "APP下载",
            },
            {
                id: "PlaceBetOnMobileURL",
                prop: "",
                title: "手机投注",
            },
            {
                id: "OnlineCustomerServiceURL",
                prop: "",
                title: "在线客服",
            },
            {
                id: "FrontEndLogoImgPath",
                prop: "",
                title: "",
            },
            {
                id: "FrontEndUrl",
                prop: "",
                title: "",
            },
        ]);
        const showDiscountApplyEventId = ref<string | number>("");
        async function getAllEventList() {
            const { body, msg, status } = await listAllHappeningEvent();
            if (status === "ok") {
                data.value = orderBy(body.content, ["orderr"], ["desc"]);
            }
        }
        function getActiveDetail(eventId: string) {
            const findActive = find(data.value, { id: Number(eventId) });
            return findActive;
        }
        async function getLink() {
            const { body } = await linkInfo();
            linkList.forEach(item => {
                const currentProp = find(body, i => i.id === item.id);
                if (currentProp) item.prop = currentProp.prop;
            });
        }
        const findLink = (id: string): string => find(linkList, i => i.id === id)!.prop;
        return {
            getAllEventList,
            data,
            getActiveDetail,
            getLink,
            findLink,
            showDiscountApplyEventId,
        };
    },
    {
        persist: [
            {
                paths: ["data"],
                storage: localStorage,
            },
        ],
    }
);

export default useDataStore;
