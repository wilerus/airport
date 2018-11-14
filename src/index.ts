import Vue from 'vue';
import ApplicationRouter from './ApplicationRouter';
import ApplicationStore from './ApplicationStore';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vue({
    el: '#vue-app',
    template: `
    <v-app dark>
  <router-view></router-view>
</v-app>
  `,
    store: ApplicationStore,
    router: ApplicationRouter
});
