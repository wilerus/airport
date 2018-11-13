import Vue from 'vue';
import ApplicationRouter from './ApplicationRouter';
import ApplicationStore from './ApplicationStore';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify, {
    iconfont: 'mdi'
});

export default new Vue({
    data() {
        return {
            transitionName: 'slide-right'
        };
    },
    el: '#vue-app',
    template: `
    <v-app dark>
  <div class="body-container">
  <transition name="slide-fade">
  <router-view class="content-container"></router-view>
  </transition>
</div>
</v-app>
  `,
    store: ApplicationStore,
    router: ApplicationRouter
});
