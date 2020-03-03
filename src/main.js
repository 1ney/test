import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import router from './routes';

import { mapGetters, mapActions } from 'vuex'

import store from './store'
import Axios from 'axios'

Vue.use(VueRouter);

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store : store
})
