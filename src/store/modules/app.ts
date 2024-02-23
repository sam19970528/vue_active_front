import { defineStore } from "pinia";
import { useDataStore } from "@/store";
import { ref } from "vue";

interface DialogInfo {
    title?: string | null;
    content: string;
}

const useAppStore = defineStore("app", () => {
    const dataStore = useDataStore();
    const isBgCover = ref(false);
    const isShowName = ref<string>();
    const isShowDialog = ref(false);
    const dialogInfo = reactive<DialogInfo>({
        title: null,
        content: "",
    });
    function dialogHandle({ title, content }: DialogInfo) {
        isShowDialog.value = true;
        dialogInfo.title = title;
        dialogInfo.content = content;
    }
    function bgCoverHandler(name?: string) {
        if (name) {
            isBgCover.value = true;
            isShowName.value = name;
        } else {
            isBgCover.value = false;
            isShowName.value = "";
        }
    }
    function openActiveSearchHandle() {
        if (dataStore.data.length === 0) {
            dialogHandle({
                content: "暂时没有活动",
            });
        } else {
            bgCoverHandler("ActiveStatusSearch");
        }
    }
    return {
        isBgCover,
        bgCoverHandler,
        openActiveSearchHandle,
        isShowName,
        dialogHandle,
        dialogInfo,
        isShowDialog,
    };
});

export default useAppStore;
