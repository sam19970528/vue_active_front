import type { DataItem, ActiveForm } from "@/types/data";
import { cloneDeep, isEmpty } from "lodash";
import { useDataStore, useAppStore } from "@/store";
import { formatConditions, formatConditionToPairs } from "@/lib/format";
import router from "@/router";
import { submitEvent } from "@/api";

export function useActiveForm(eventId: string | number) {
    const dataStore = useDataStore();
    const appStore = useAppStore();
    const { bgCoverHandler, dialogHandle } = appStore;
    const active = ref<any>({});
    const { getActiveDetail } = dataStore;
    const conditionToPairs = ref<[string, string][]>([]);
    onMounted(() => {
        active.value = cloneDeep(getActiveDetail(eventId as string));
        conditionToPairs.value = formatConditionToPairs(active.value.conditions);
        createFormConditionsAsProp(conditionToPairs.value);
    });
    function createFormConditionsAsProp(conditions: [string, string][]) {
        conditions.forEach(innerArr => {
            const condition = innerArr[0];
            form.conditions[condition] = "";
        });
    }
    const form = reactive<ActiveForm>({
        member: "",
        verifyInput: "",
        eventId: eventId as string,
        conditions: {},
    });
    async function beforeSubmitHandle() {
        if (!checkRequiredValidate()) return;
        await submit();
    }

    async function submit() {
        const { body, msg, status } = await submitEvent(form);
        if (status === "ok") {
            dialogHandle({
                content: body,
            });
            bgCoverHandler();
            router.push("/");
        } else {
            dialogHandle({
                content: msg,
            });
        }
    }
    const verifyCodeSrc = computed(() => `${window.location.origin}/api/test/getVerify`);
    function checkRequiredValidate(): boolean {
        let result = true;
        const checkEmptyValue = [
            {
                label: "会员帐号",
                value: form.member,
            },
            {
                label: "验证码",
                value: form.verifyInput,
            },
        ];
        if (!isEmpty(form.conditions)) {
            const keys = Object.keys(form.conditions);
            keys.forEach(item => {
                checkEmptyValue.push({
                    label: item,
                    value: form.conditions[item],
                });
            });
        }
        for (let i = 0; i < checkEmptyValue.length; i++) {
            const { value, label } = checkEmptyValue[i];
            if (!value) {
                dialogHandle({
                    content: `${label}不得為空`,
                });
                result = false;
                break;
            }
        }
        return result;
    }
    return {
        active,
        form,
        beforeSubmitHandle,
        verifyCodeSrc,
        conditionToPairs,
    };
}
