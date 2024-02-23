<template>
    <div class="pop-up-form">
        <div class="i-close" @click="bgCoverHandler()"></div>
        <div id="msgDetail">
            <div class="bd modal-form">
                <div class="modal-logo">
                    <img :src="formatHttpsReplaceHttp(getLogo())" alt="logo" width="268" height="78" />
                </div>
                <div id="modal-3" class="hide" style="display: block">
                    <div class="form mt-4">
                        <div class="mb-3 form-inline">
                            <label>申请主题：</label>
                            <span style="color: #ff0; font-size: 14px; font-weight: bold">{{ active?.eventName }}</span>
                        </div>
                        <div class="mb-3 form-inline">
                            <label class="form-label">会员帐号：</label>
                            <div class="">
                                <input type="text" placeholder="请填写会员帐号" class="form-input-03" v-model="form.member" />
                            </div>
                        </div>
                        <template v-if="Object.keys(form.conditions).length">
                            <div class="mb-3 form-inline" v-for="(_, key, index) in form.conditions">
                                <label class="form-label">{{ key }}：</label>
                                <input type="text" :placeholder="conditionToPairs[index][1]" class="form-input-03" v-model="form.conditions[key]" />
                            </div>
                        </template>
                        <div class="mb-2 form-inline">
                            <label class="form-label">验证码：</label>
                            <VerifyInput :form="form" :verify-code-src="verifyCodeSrc" />
                        </div>
                        <div class="btn-position">
                            <button class="submit-btn" @click="beforeSubmitHandle">提交申请</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useActiveForm } from "@/hooks/form";
import { useAppStore, useDataStore } from "@/store";
import VerifyInput from "@/components/VerifyInput.vue";
import { formatHttpsReplaceHttp } from "@/lib/format";
const dataStore = useDataStore();
const { findLink } = dataStore;
const getLogo = (): string => findLink("FrontEndLogoImgPath");

interface Props {
    eventId: number;
}
const props = defineProps<Props>();
const appStore = useAppStore();
const { bgCoverHandler } = appStore;
const { active, form, beforeSubmitHandle, verifyCodeSrc, conditionToPairs } = useActiveForm(props.eventId);
</script>

<style scoped lang="scss">
.pop-up-form {
    z-index: 10001;
    box-sizing: content-box;
    width: 687px;
    min-height: 600px;
    height: auto;
    background: #161616;
    border: solid 4px #ecc14d;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -350px 0 0 -343px;
    font-size: 16px;
    border-radius: 6px;
    padding-bottom: 30px;
}

.i-close {
    width: 124px;
    height: 124px;
    background: url(../assets/i-close.png);
    position: absolute;
    right: -10px;
    top: -5px;
    cursor: pointer;
    z-index: 10;
}

#msgDetail {
    height: 100%;
}
.modal-logo {
    height: 83px;
    display: block;
    margin: 30px auto 0;
    text-align: center;
}
.form {
    margin: 0 auto;
    width: 95%;
    label {
        color: #fff;
        font-size: 14px;
        display: block;
        float: left;
        width: 250px;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        text-align: right;
        padding-right: 10px;
    }
}
.btn-position {
    position: relative;
    left: 250px;
}
.submit-btn {
    width: 155px;
    height: 48px;
    font-size: 18px;
    border-radius: 4px;
    border: none;
    background: #d4ae52;
    color: #281104;
    margin-right: 30px;
}
</style>
