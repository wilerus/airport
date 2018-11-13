import Vue from 'vue';
import VueRouter from 'vue-router';
import Chart from './routing/chart/Chart';

Vue.use(VueRouter);

const applicationRouter = new VueRouter({
  routes: Chart.concat([
    /*for feature extension*/
  ])
});

export default applicationRouter;
