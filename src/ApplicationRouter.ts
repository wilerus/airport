import Vue from 'vue';
import VueRouter from 'vue-router';
import Flights from './routing/flights/Flights';

Vue.use(VueRouter);

const applicationRouter = new VueRouter({
    routes: Flights.concat([
        /*for feature extension*/
    ])
});

export default applicationRouter;
