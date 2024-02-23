<template>
    <section>
        <div class="container" style="position: relative">
            <div class="icon-block">
                <IconLink :image="IconHome" text="首页" :link="getHomeLink()" />
                <IconLink :image="IconService" text="在线客服" :link="getServiceLink()" />
            </div>
            <div class="content">
                <div class="row">
                    <div class="col-6 col-sm-4" v-for="item in data" :key="item.id">
                        <div class="item">
                            <img :src="formatHttpsReplaceHttp(item.event_img)" @click="toActiveFormHandle(item.id)" />
                            <div class="d-none d-sm-block">
                                <div class="item-hover">
                                    <div class="item-hover-btn" @click="toActiveFormHandle(item.id)">
                                        <img src="../../assets/link01.png" />
                                    </div>
                                    <div class="item-hover-btn" @click="openDiscountApply(item.id)">
                                        <img src="../../assets/link02.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="active-p text-center">{{ item.eventName }}</div>
                    </div>
                    <div class="col-6 col-sm-4 d-none d-sm-block">
                        <div class="">
                            <img src="../../assets/12.jpg" style="width: 300px; height: 220px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import router from "@/router";
import IconLink from "@/components/IconLink.vue";
import { formatHttpsReplaceHttp } from "@/lib/format";
import { useDataStore, useAppStore } from "@/store";
import IconHome from "@/assets/s_img01.png";
import IconService from "@/assets/s_img05.png";

const dataStore = useDataStore();
const appStore = useAppStore();
const { getAllEventList, findLink } = dataStore;
const { bgCoverHandler } = appStore;
const openDiscountApply = (id: number) => {
    bgCoverHandler("DiscountApply");
    dataStore.showDiscountApplyEventId = id;
};
const { data } = toRefs(dataStore);

onMounted(() => {
    getAllEventList();
});
const getHomeLink = () => findLink("FrontEndUrl");
const getServiceLink = () => findLink("OnlineCustomerServiceURL");
function toActiveFormHandle(eventId: number) {
    router.push({ path: `/active-form/${eventId}` });
}
</script>

<style scoped lang="scss">
@import "@/scss/rwd";
@import "@/scss/var";
.row {
    img {
        width: 100%;
        height: 169px;
        @include phone {
            height: 83px;
        }
    }
}
.content {
    width: 1000px;
    border-top: 2px solid #c0a366;
    background-color: #ffffff;
    padding: 26px;
    position: relative;
    margin: auto;
    margin-top: 60px;
    @include phone {
        width: 100%;
        background-color: transparent;
        border-top: none;
        margin-top: 50px;
        padding: 0 10px;
    }
}
.active-p {
    color: #444444;
    background: #f6f6f6;
    margin: 0;
    padding: 10px;
    border-bottom: 2px solid #eeeeee;
    margin-bottom: 20px;
    @include phone {
        background: #fff;
        padding: 2px 0;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 15px;
    }
}
.col-6:nth-last-child(-n + 2) {
    @include phone {
        .active-p {
            margin-bottom: 0;
        }
    }
}
.item {
    position: relative;
    &:hover {
        .item-hover {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
}
.item-hover {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.6);
    .item-hover-btn {
        margin-bottom: 15px;
        cursor: pointer;
        img {
            width: 120px;
            height: 30px;
        }
    }
}
.icon-block {
    position: absolute;
    top: 10px;
    left: 80px;
    @include phone {
        display: none;
    }
}
</style>
