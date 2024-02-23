<template>
    <div class="d-flex verify-input">
        <input type="text" class="form-input-03" v-model="form.verifyInput" placeholder="填写验证码" />
        <img class="verify-img" :src="verifyCodeSrc" />
    </div>
</template>

<script lang="ts" setup>
import type { ActiveForm } from "@/types/data";

interface Props {
    form: ActiveForm;
    verifyCodeSrc: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.verify-input {
    position: relative;
    .verify-img {
        position: absolute;
        right: 10px;
        top: 13px;
    }
}
</style>
