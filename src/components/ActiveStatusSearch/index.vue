<template>
    <div class="search-box" :style="searchBoxPaddingStyle">
        <a href="#" @click.prevent="appStore.bgCoverHandler()">
            <i class="fal fa-times-circle text-white close"></i>
        </a>
        <div class="justify-content-center p-4 d-none d-sm-flex">
            <img :src="formatHttpsReplaceHttp(getLogo())" alt="logo" width="268" height="78" />
        </div>
        <div class="d-sm-none">
            <h2>申请进度查询</h2>
        </div>
        <template v-if="!tabShow">
            <div class="d-sm-none text-center">
                <input class="form-input mb-3" type="text" placeholder="请输入会员帐号" v-model="params.member" />
                <select class="form-input mb-4" v-model="params.eventId">
                    <option v-for="item in data" :value="item.id">{{ item.eventName }}</option>
                </select>
            </div>
            <div class="d-none d-sm-block">
                <div class="form">
                    <div class="form-inline">
                        <label>输入会员账号：</label>
                        <input type="text" class="form-input-01" placeholder="填写你的会员账号" v-model="params.member" />
                    </div>
                    <div class="form-inline">
                        <label>选择申请项目：</label>
                        <select class="form-input-01" v-model="params.eventId">
                            <option v-for="item in data" :value="item.id">{{ item.eventName }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button class="btn-search" @click="submitSearch">点击查询</button>
            </div>
        </template>
        <SearchTable :searchResult="searchResult" v-else />
    </div>
</template>

<script setup lang="ts">
import { useDataStore, useAppStore } from "@/store";
import SearchTable from "./Table.vue";
import { searchSubmitted } from "@/api";
import type { SearchSubmittedType, SearchResultType } from "@/types/data";
import { formatHttpsReplaceHttp } from "@/lib/format";

const dataStore = useDataStore();
const { data } = toRefs(dataStore);
const { findLink } = dataStore;
const appStore = useAppStore();
const { dialogHandle } = appStore;
const tabShow = ref(false);
const getLogo = (): string => findLink("FrontEndLogoImgPath");

const params = reactive<SearchSubmittedType>({
    eventId: String(data.value[0]?.id),
    member: "",
});
const searchResult = ref<SearchResultType[]>([]);
const searchBoxPaddingStyle = computed(() => {
    if (!tabShow.value) {
        return {
            padding: "20px",
        };
    } else {
        return {
            padding: "20px 0",
        };
    }
});
async function submitSearch() {
    if (!validateEmptyMember()) return;
    const { body, msg, status } = await searchSubmitted(params);
    if (status === "ok") {
        tabShow.value = true;
        searchResult.value = body;
    } else {
        dialogHandle({
            content: msg,
        });
    }
}
function validateEmptyMember() {
    if (!params.member) {
        dialogHandle({
            content: "会员账号不可為空",
        });
        return false;
    }
    return true;
}
</script>

<style lang="scss" scoped>
@import "@/scss/rwd";
.search-box {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    width: 640px;
    border-radius: 15px;
    height: 400px;
    background: #3c2d1f;
    border: 2px solid #bfa165;
    @include phone {
        height: auto;
        background: #460000;
        width: 85%;
        top: 25%;
        border: none;
        border-radius: 0;
    }
    .close {
        position: absolute;
        right: 3px;
        top: 3px;
        font-size: 30px;
        @include phone {
            font-size: 24px;
            top: 0;
            right: 0;
        }
    }
}
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-inline {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
        margin-right: 10px;
        color: #dec9b7;
        font-size: 14px;
    }
}
.btn-search {
    background: #ea5101;
    text-align: center;
    width: 160px;
    height: 40px;
    border: none;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    padding: 0;
    font-size: 18px;
    margin: 15px auto 0;
    @include phone {
        margin: 0;
        background: url(@/assets/subbtn.png) no-repeat;
        background-size: cover;
        font-weight: bold;
        color: #000;
        width: 100%;
        border-radius: 6px;
    }
}
h2 {
    text-align: center;
    color: #fff032;
    background: url(@/assets/tctitle.png) no-repeat;
    background-size: cover;
    font-size: 0.95rem;
    width: 16rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0 auto;
    margin-bottom: 8px;
}
.form-input {
    @include phone {
        color: #1e1e1f;
    }
}
</style>
