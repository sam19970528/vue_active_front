<template>
    <section>
        <div class="form-box d-none d-sm-block">
            <h1>{{ active?.eventName }}</h1>
            <p>{{ active?.detail }}</p>
        </div>
        <h2 class="d-sm-none">{{ active?.eventName }}</h2>
        <div class="form-box mt-sm-5 px-sm-0 pt-sm-5">
            <p class="sub-title d-none d-sm-block">
                申请主题：
                <span>{{ active?.eventName }}</span>
            </p>
            <div class="responsive">
                <div class="mb-3 form-inline">
                    <label class="form-label">会员帐号：</label>
                    <input type="text" placeholder="请输入会员帐号" class="form-input-03" v-model="form.member" />
                </div>
                <template v-if="Object.keys(form.conditions).length">
                    <div class="mb-3 form-inline" v-for="(_, key, index) in form.conditions">
                        <label class="form-label">{{ key }}：</label>
                        <input type="text" :placeholder="conditionToPairs[index][1]" class="form-input-03" v-model="form.conditions[key]" />
                    </div>
                </template>
                <div class="mb-3 form-inline">
                    <label class="form-label">验证码：</label>
                    <VerifyInput :form="form" :verify-code-src="verifyCodeSrc" />
                </div>
                <div class="d-none d-sm-block btn-position">
                    <button class="submit-orange-btn" @click="beforeSubmitHandle">提交申请</button>
                </div>
                <div class="d-sm-none text-center">
                    <button class="btn btn-light-brown me-4" @click="beforeSubmitHandle">立即提交</button>
                    <button class="btn btn-light-brown" @click="router.push('/')">返回首页</button>
                </div>
            </div>
            <p class="note d-none d-sm-block">
                <span>温馨提示 :</span>
                请点击对应活动类别申请，由于申请人众多，请勿重复提交，提交申请后专员将于30分钟内审核办理，提交申请后可以点击审核进度查询！
                <br />
                <span>特别声明 :</span>
                符合哪个活动就提交申请该活动，必须符合条件的客户方可提交申请，以免导致影响您失去该优惠申请资格，谢谢！
            </p>
            <div class="text-center d-none d-sm-block">
                <button class="link-golden" @click="openActiveSearchHandle">申请进度查询</button>
                <button class="link-golden" @click="router.push('/')">活动大厅首页</button>
            </div>
        </div>
        <p class="phone-detail d-sm-none">{{ active?.detail }}</p>
    </section>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store";
import { useActiveForm } from "@/hooks/form";
import VerifyInput from "@/components/VerifyInput.vue";

const route = useRoute();
const { eventId } = route.params;
const appStore = useAppStore();
const { active, form, beforeSubmitHandle, verifyCodeSrc, conditionToPairs } = useActiveForm(eventId as string);
const { openActiveSearchHandle } = appStore;
</script>

<style lang="scss" scoped>
@import "@/scss/rwd";
@import "@/scss/var";
section {
    width: 1000px;
    margin: 30px auto 0;
    position: relative;
    @include phone {
        width: 100%;
    }
}
h1 {
    line-height: 60px;
    margin-bottom: 32px;
    border-bottom: 1px solid #e5e5e5;
    color: #333333;
    text-align: center;
    font-size: 30px;
    padding-bottom: 7px;
}
h2 {
    padding-top: 23px;
    text-align: center;
}
.form-box {
    background: #fff;
    border-top: 2px solid #c0a366;
    padding: 20px 40px;
    @include phone {
        background: $main-color;
        color: #fff;
        border-top: none;
        margin-left: 5px;
        margin-right: 5px;
        padding: 7px 10px;
        input.form-control {
            width: 100%;
        }
        .form-label {
            width: 100px;
            color: #ecf4fb;
            text-align: left;
            font-size: 16px;
        }
    }
}
.responsive {
    padding: 0 0 50px 230px;
    .btn-position {
        position: relative;
        left: 180px;
    }
    @include phone {
        padding: 0;
    }
}
.sub-title {
    font-size: 12px;
    text-align: center;
    span {
        font-weight: bold;
        color: #f00;
        font-size: 14px;
    }
}
.note {
    margin: 0 40px 20px;
    border-top: 1px solid #e5e5e5;
    padding-top: 15px;
    line-height: 23px;
    height: auto;
    color: #666;
    font-size: 12px;
    span {
        color: #000;
    }
}
.verify-input {
    position: relative;
    .verify-img {
        position: absolute;
        right: 10px;
        top: 13px;
    }
}
.btn {
    @include phone {
        padding: 4px 16px;
    }
}
.phone-detail {
    padding: 20px;
}
</style>
