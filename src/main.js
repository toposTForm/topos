/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'



createApp(App).use(store).mount('#app');
createApp(App).config.productionTip = false;
