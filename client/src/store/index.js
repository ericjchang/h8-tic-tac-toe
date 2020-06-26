import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    pos5: '',
    pos6: '',
    pos7: '',
    pos8: '',
    pos9: '',
    userIndex: 0,
    winner: '',
  },
  mutations: {
    SET_POS_1(state, newPos) {
      state.pos1 = newPos;
    },
    SET_POS_2(state, newPos) {
      state.pos2 = newPos;
    },
    SET_POS_3(state, newPos) {
      state.pos3 = newPos;
    },
    SET_POS_4(state, newPos) {
      state.pos4 = newPos;
    },
    SET_POS_5(state, newPos) {
      state.pos5 = newPos;
    },
    SET_POS_6(state, newPos) {
      state.pos6 = newPos;
    },
    SET_POS_7(state, newPos) {
      state.pos7 = newPos;
    },
    SET_POS_8(state, newPos) {
      state.pos8 = newPos;
    },
    SET_POS_9(state, newPos) {
      state.pos9 = newPos;
    },
    SET_USER_RUN(state, user) {
      state.userIndex = user;
    },
    SET_WINNER(state, user) {
      state.winner = user;
    },
  },
  actions: {
    refreshPosition(context, payload) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/data',
        data: {
          room: localStorage.room,
        },
      })
        .then(result => {
          const str1 = result.data.users[0].row;
          const str2 = result.data.users[1].row;
          let p1;
          let p2;
          if (str1 === '') {
            p1 = [];
          } else {
            p1 = str1.split(',');
          }
          if (str2 === '') {
            p2 = [];
          } else {
            p2 = str2.split(',');
          }
          context.commit('SET_USER_RUN', p1.length + p2.length);

          for (const i in p1) {
            if (p1[i] === '1') {
              context.commit('SET_POS_1', 'A');
            }
            if (p1[i] === '2') {
              context.commit('SET_POS_2', 'A');
            }
            if (p1[i] === '3') {
              context.commit('SET_POS_3', 'A');
            }
            if (p1[i] === '4') {
              context.commit('SET_POS_4', 'A');
            }
            if (p1[i] === '5') {
              context.commit('SET_POS_5', 'A');
            }
            if (p1[i] === '6') {
              context.commit('SET_POS_6', 'A');
            }
            if (p1[i] === '7') {
              context.commit('SET_POS_7', 'A');
            }
            if (p1[i] === '8') {
              context.commit('SET_POS_8', 'A');
            }
            if (p1[i] === '9') {
              context.commit('SET_POS_9', 'A');
            }
          }

          for (const k in p2) {
            if (p2[k] === '1') {
              context.commit('SET_POS_1', 'B');
            }
            if (p2[k] === '2') {
              context.commit('SET_POS_2', 'B');
            }
            if (p2[k] === '3') {
              context.commit('SET_POS_3', 'B');
            }
            if (p2[k] === '4') {
              context.commit('SET_POS_4', 'B');
            }
            if (p2[k] === '5') {
              context.commit('SET_POS_5', 'B');
            }
            if (p2[k] === '6') {
              context.commit('SET_POS_6', 'B');
            }
            if (p2[k] === '7') {
              context.commit('SET_POS_7', 'B');
            }
            if (p2[k] === '8') {
              context.commit('SET_POS_8', 'B');
            }
            if (p2[k] === '9') {
              context.commit('SET_POS_9', 'B');
            }
          }

          const winningConditions = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['3', '6', '9'],
            ['1', '5', '9'],
            ['3', '5', '7'],
          ];

          p1.sort();
          p2.sort();
          console.log('sort', p1);

          if (p1.length > 2) {
            p1.slice(Math.max(p1.length - 2, 1));
            console.log('sort 3 terakhir', p1);
            for (let l = 0; l <= 7; l++) {
              console.log(winningConditions[l][0]);
              if (
                p1[0] === winningConditions[l][0] &&
                p1[1] === winningConditions[l][1] &&
                p1[2] === winningConditions[l][2]
              ) {
                console.log('WINNER');
                context.commit('SET_WINNER', result.data.users[0].username);
                if (this.winner) {
                  setTimeout(() => {
                    console.log('disini');
                    localStorage.clear();
                  }, 5000);
                }
              }
            }
          }

          if (p2.length > 2) {
            p2.slice(Math.max(p2.length - 2, 1));
            console.log('sort 3 terakhir', p1);
            for (let l = 0; l <= 7; l++) {
              if (
                p2[0] === winningConditions[l][0] &&
                p2[1] === winningConditions[l][1] &&
                p2[2] === winningConditions[l][2]
              ) {
                context.commit('SET_WINNER', result.data.users[1].username);
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetData(context, payload) {
      context.commit('SET_POS_1', '');
      context.commit('SET_POS_2', '');
      context.commit('SET_POS_3', '');
      context.commit('SET_POS_4', '');
      context.commit('SET_POS_5', '');
      context.commit('SET_POS_6', '');
      context.commit('SET_POS_7', '');
      context.commit('SET_POS_8', '');
      context.commit('SET_POS_9', '');
      context.commit('SET_USER_RUN', 0);
      context.commit('SET_WINNER', '');
    },
  },
  modules: {},
});
