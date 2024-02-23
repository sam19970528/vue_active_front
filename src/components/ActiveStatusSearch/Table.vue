<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>会员帐号</th>
                <th>申请时间</th>
                <th>申请状态</th>
                <th>查看回复</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="searchResult.length">
                <tr v-for="item in searchResult">
                    <td>{{ item.member }}</td>
                    <td>{{ moment(item.submitTime).format("YYYY-MM-DD hh:mm:ss") }}</td>
                    <td>
                        <span class="badge" :class="`text-bg-${transStatus(item.status).color}`">{{ transStatus(item.status).text }}</span>
                    </td>
                    <td>
                        <a v-if="item.note" style="color: #fff" href="#" @click="readNoteHandle(item.note!)">点击查看</a>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td class="td-no-info" colspan="15">未查询到信息</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { SearchResultType } from "@/types/data";
import { transStatus } from "@/lib/format";
import { useAppStore } from "@/store";
import moment from "moment";

interface Props {
    searchResult: SearchResultType[];
}
const appStore = useAppStore();
const props = defineProps<Props>();
function readNoteHandle(note: string) {
    appStore.dialogHandle({
        content: note,
    });
}
</script>

<style lang="scss" scoped>
@import "@/scss/_rwd.scss";
.table {
    width: 600px;
    margin: 0 auto;
    th {
        border: 1px solid #dec9b7;
        height: 45px;
        line-height: 45px;
        color: #ffd900;
        font-size: 14px;
        text-align: center;
        font-weight: normal;
        padding: 0.15rem;
    }
    td {
        border: 1px solid #dec9b7;
        height: 45px;
        line-height: 45px;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        padding: 0.15rem;
    }
    @include phone {
        // margin-top: 40px;
        width: 100%;
        th {
            color: #fff100;
            padding: 10px;
            text-align: center;
            padding: 0.1rem;
            font-size: 12px;
            border: 1px solid #212121;
        }
        td {
            font-size: 12px;
            color: #fff;
            padding: 0.1rem;
            border: 1px solid #212121;
        }
        td.td-no-info {
            color: #fff;
            text-align: center;
        }
    }
}
</style>
