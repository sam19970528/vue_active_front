import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

if (import.meta.env.MODE === "prod") {
    console.log = function () {};
}
const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
