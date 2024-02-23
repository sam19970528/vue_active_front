<template>
    <div class="header">
        <div class="desktop">
            <div class="me-5">
                <img :src="logoSrc" style="cursor: pointer" width="268" height="78" @click="backToHome" alt="logo" />
            </div>
            <div class="me-5">
                <div class="custom-logo">
                    <a :href="getCenterLogoUrl()" target="_blank">
                        <template v-if="isArray(formatUrl)">
                            <template v-for="(item, index) in formatUrl">
                                <span v-show="index !== 0">.</span>
                                <span :class="{ host: index === 0 }">{{ item }}</span>
                            </template>
                        </template>
                        <span class="host" v-else>{{ formatUrl }}</span>
                    </a>
                </div>
            </div>
            <div @click="openActiveSearchHandle" style="cursor: pointer">
                <img src="../assets/query.png" />
            </div>
        </div>
        <div class="d-sm-none">
            <div class="container">
                <div class="row" style="align-items: center">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <div>
                            <img :src="logoSrc" style="width: 100%; height: 50px" @click="backToHome" />
                        </div>
                    </div>
                    <div class="col-3">
                        <div style="display: flex; justify-content: flex-end">
                            <i @click="openActiveSearchHandle" class="fal fa-file-search" style="color: #e5cf76; font-size: 1.5rem"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useDataStore } from "@/store";
import { formatHttpsReplaceHttp } from "@/lib/format";
import router from "@/router";
import { includes, isArray, replace } from "lodash";
const appStore = useAppStore();
const dataStore = useDataStore();
const { openActiveSearchHandle } = appStore;
const { findLink } = dataStore;
const getLogo = (): string => findLink("FrontEndLogoImgPath");
const getCenterLogoUrl = (): string => findLink("FrontEndUrl");
const formatUrl = computed(() => {
    const url = getCenterLogoUrl();
    const clean = cleanHttp(url);
    if (includes(clean, ".")) {
        const splitUrl = clean.split(".");
        return splitUrl;
    } else return clean;
});
const cleanHttp = (url: string) => {
    const result = replace(url, /^https?:\/\//, "");
    return result;
};
const logoSrc = computed(() => formatHttpsReplaceHttp(getLogo()));
const backToHome = () => router.push("/");
</script>

<style lang="scss" scoped>
@import "../scss/_rwd.scss";
@import "../scss/_var.scss";
.header {
    width: 100%;
    height: 85px;
    border-bottom: 1px solid #ddd;
    top: 0;
    z-index: 10;
    background: $main-color;
    .desktop {
        display: flex;
        justify-content: center;
        align-items: center;
        @include phone {
            display: none;
        }
    }
    @include phone {
        height: 50px;
        position: fixed;
    }
}
.custom-logo {
    background-image: url(@/assets/domain.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 358px;
    height: 79px;
    position: relative;
    a {
        position: absolute;
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 0;
        bottom: 6px;
        left: 135px;
        span.host {
            color: #ca4f1b;
        }
        span {
            color: #5f2207;
        }
    }
}
</style>
