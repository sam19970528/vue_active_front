<template>
    <section class="home">
        <Header />
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition mode="out-in" enter-active-class="animate__animated animate__fadeInLeft animate__faster" leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <p class="copyright d-sm-none">Copyright © Reserved</p>
        <Footer />
        <BgCover v-if="appStore.isBgCover" />
        <DialogBox v-if="appStore.isShowDialog" />
    </section>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BgCover from "@/components/BgCover.vue";
import DialogBox from "@/components/DialogBox.vue";
import { useAppStore, useDataStore } from "@/store";

onMounted(() => {
    getLink();
});
const appStore = useAppStore();
const dataStore = useDataStore();
const { getLink } = dataStore;
</script>
<style lang="scss" scoped>
@import "../scss/_rwd.scss";
@import "../scss/_var.scss";
.home {
    width: 100%;
    min-height: 100vh;
    border-top: none;
    margin: 0 auto;
    position: relative;
    background-image: url("../assets/mainbg.jpg");
    background-repeat: repeat-x;
    @include phone {
        height: 100vh;
        border-bottom: none;
        background-image: none;
    }
}

.content {
    width: 100%;
    height: 100%;
    @include phone {
        position: fixed;
        overflow-y: auto;
        max-height: calc(100vh - 100px);
    }
}
.copyright {
    position: absolute;
    bottom: 65px;
    width: 100%;
    text-align: center;
    color: #794500;
    font-size: 12px;
    margin-bottom: 0;
}
</style>
