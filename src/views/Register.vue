<template>
    <section style="margin: 5px 15px 0 15px">
        <div class="form-box">
            <div class="mb-3 row" v-for="item in registerFormList">
                <label :for="item.id" class="col-sm-3 col-form-label">{{ item.labelText }}</label>
                <div class="col-sm-9">
                    <input :type="item.type" :class="item.inputClass" :id="item.id" v-model="form[item.id]" />
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-light-brown me-4">立即註册</button>
                <button class="btn btn-light-brown" @click="() => router.push('/')">返回首页</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import router from "@/router";
const registerFormList = reactive([
    {
        id: "account",
        labelText: "会员帐号",
        type: "text",
        inputClass: "form-control",
    },
    {
        id: "password",
        labelText: "会员密码",
        type: "password",
        inputClass: "form-control",
    },
    {
        id: "passwordConfirm",
        labelText: "密码确认",
        type: "password",
        inputClass: "form-control",
    },
    {
        id: "realname",
        labelText: "真实姓名",
        type: "text",
        inputClass: "form-control",
    },
    {
        id: "withdrawPassword",
        labelText: "取款密码",
        type: "password",
        inputClass: "form-control",
    },
    {
        id: "mobile",
        labelText: "手机号码",
        type: "text",
        inputClass: "form-control",
    },
]);
const form = reactive({
    account: "a323232",
    password: "123456",
    passwordConfirm: "123456",
    realname: "測試",
    withdrawPassword: "123456",
    mobile: "8655566999",
});
</script>
