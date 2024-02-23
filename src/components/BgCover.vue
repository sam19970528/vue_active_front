<template>
    <div class="bg-cover">
        <ActiveStatusSearch v-if="isShowName === 'ActiveStatusSearch'" />
        <DiscountApply v-if="isShowName === 'DiscountApply'" :event-id="showDiscountApplyEventId" />
    </div>
</template>

<script setup>
import ActiveStatusSearch from "../components/ActiveStatusSearch/index.vue";
import DiscountApply from "../components/DiscountApply.vue";
import { useAppStore, useDataStore } from "@/store";
const { isShowName } = useAppStore();
const { showDiscountApplyEventId } = useDataStore();
</script>

<style lang="scss" scoped>
.bg-cover {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    min-height: 100vh;
}
</style>
