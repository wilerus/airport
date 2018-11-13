import Vue from 'vue';
import Vuex from 'vuex';
import ChartStore from './components/chart/ChartStore';
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    ChartStore
  }
});

export default store;
