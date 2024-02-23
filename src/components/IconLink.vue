<template>
    <a class="icon-link-bg" :href="link" target="_blank">
        <div class="icon-link">
            <img :src="image" />
        </div>
        <p>{{ text }}</p>
    </a>
</template>

<script setup lang="ts">
interface Props {
    image: string;
    text: string;
    link: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.icon-link-bg {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/s_bg01.png");
    cursor: pointer;
    margin-bottom: 10px;
}
.icon-link {
    margin-bottom: 5px;
}
p {
    font-size: 12px;
    color: #dec9b7;
    margin: 0;
}
</style>
