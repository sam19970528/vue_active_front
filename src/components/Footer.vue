<template>
    <div class="footer">
        <div class="d-none d-sm-block">Copyright © Reserved</div>
        <a class="d-sm-none p-2 text-center" v-for="item in list" :href="item.prop" target="_blank">
            <i class="far" :class="item.icon" style="font-size: 1.25rem"></i>
            <div>{{ item.title }}</div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { linkInfo } from "@/api";
import { find } from "lodash";

onMounted(() => {
    getLink();
});

const list = reactive([
    {
        id: "OpenAccountURL",
        prop: "",
        icon: "fa-user-plus",
        title: "免费开户",
    },
    {
        id: "DownloadAppURL",
        prop: "",
        icon: "fa-arrow-circle-down",
        title: "APP下载",
    },
    {
        id: "PlaceBetOnMobileURL",
        prop: "",
        icon: "fa-mobile-android-alt",
        title: "手机投注",
    },
    {
        id: "OnlineCustomerServiceURL",
        prop: "",
        icon: "fa-headphones",
        title: "在线客服",
    },
]);
async function getLink() {
    const { body } = await linkInfo();
    list.forEach(item => {
        const currentProp = find(body, i => i.id === item.id);
        if (currentProp) item.prop = currentProp.prop;
    });
}
</script>

<style lang="scss" scoped>
@import "../scss/_rwd.scss";
.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #999999;
    font-size: 12px;
    @include phone {
        padding: 0 25px;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1c1d1e;
        a {
            color: #fff;
        }
    }
}
</style>
