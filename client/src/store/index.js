import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('username') || ''
  },
  mutations: {
    Set_Name (state,data) {
      state.username = data
    }
  },
  actions: {
    setPlayerName ({commit}, username) {
      commit('Set_Name', username)
    }
  },
  modules: {
  },
});
