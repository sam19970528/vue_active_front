import { createPinia } from "pinia";
import useAppStore from "./modules/app";
import useDataStore from "./modules/data";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export { useAppStore, useDataStore };
export default pinia;
