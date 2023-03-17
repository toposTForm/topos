/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import naive from "naive-ui";
import Vue3Material from 'vue3-material';

createApp(App).config.productionTip = false;

createApp(App).use(store, Vue3Material, naive).mount('#app');
