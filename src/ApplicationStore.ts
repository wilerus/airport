import Vue from 'vue';
import Vuex from 'vuex';
import FlightsStore from './components/flights/FlightsStore';
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        FlightsStore
    }
});

export default store;
