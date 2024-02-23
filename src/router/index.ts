import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/active",
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        children: [
            {
                path: "/active",
                name: "Active",
                component: () => import("@/views/Active/index.vue"),
            },
            {
                path: "/active-form/:eventId",
                name: "ActiveForm",
                component: () => import("@/views/Active/ActiveForm/index.vue"),
            },
            {
                path: "/register",
                name: "Register",
                component: () => import("@/views/Register.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
