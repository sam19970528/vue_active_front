<template>
    <div class="verify-image-box">
        <span>{{ code }}</span>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    code: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@import "@/scss/var";
.verify-image-box {
    width: 100px;
    height: 40px;
    border: 2px solid $light-blue;
    background: $minor-color;
    padding: 3px 6px;
    text-align: center;
    span {
        font-size: 20px;
        font-weight: bold;
        color: cadetblue;
    }
}
</style>
