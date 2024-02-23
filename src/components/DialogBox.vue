<template>
    <div class="dialog-box">
        <div class="dialog-title">{{ title }}</div>
        <button type="button" class="btn-close" @click="closeHandle"></button>
        <div class="dialog-content">{{ dialogInfo.content }}</div>
        <div class="dialog-btn">
            <button class="btn rounded-0 btn-primary" @click="closeHandle">确定</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
const appStore = useAppStore();
const { dialogInfo } = appStore;
const title = computed(() => dialogInfo.title ?? "信息");
const closeHandle = () => {
    appStore.isShowDialog = false;
};
</script>

<style scoped lang="scss">
@import "@/scss/rwd";
.dialog-box {
    min-width: 260px;
    min-height: 150px;
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border: 1px solid #eee;
    @include phone {
        border: 1px solid #ddd;
        top: 40%;
    }
    .btn-close {
        position: absolute;
        top: 13px;
        right: 5px;
        font-size: 0.75rem;
    }
}
.dialog-title {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #f8f8f8;
    border-radius: 2px 2px 0 0;
}
.dialog-content {
    position: relative;
    padding: 30px;
    line-height: 24px;
    word-break: break-all;
    font-size: 14px;
    overflow: auto;
}
.dialog-btn {
    text-align: right;
    padding: 0 10px 12px;
    pointer-events: auto;
}
.btn {
    font-size: 12px;
}
</style>
