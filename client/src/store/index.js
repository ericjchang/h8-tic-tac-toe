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
        url: 'https://murmuring-citadel-44052.herokuapp.com/data',
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
              context.commit('SET_POS_1', 'O');
            }
            if (p1[i] === '2') {
              context.commit('SET_POS_2', 'O');
            }
            if (p1[i] === '3') {
              context.commit('SET_POS_3', 'O');
            }
            if (p1[i] === '4') {
              context.commit('SET_POS_4', 'O');
            }
            if (p1[i] === '5') {
              context.commit('SET_POS_5', 'O');
            }
            if (p1[i] === '6') {
              context.commit('SET_POS_6', 'O');
            }
            if (p1[i] === '7') {
              context.commit('SET_POS_7', 'O');
            }
            if (p1[i] === '8') {
              context.commit('SET_POS_8', 'O');
            }
            if (p1[i] === '9') {
              context.commit('SET_POS_9', 'O');
            }
          }

          for (const j in p2) {
            if (p2[j] === '1') {
              context.commit('SET_POS_1', 'X');
            }
            if (p2[j] === '2') {
              context.commit('SET_POS_2', 'X');
            }
            if (p2[j] === '3') {
              context.commit('SET_POS_3', 'X');
            }
            if (p2[j] === '4') {
              context.commit('SET_POS_4', 'X');
            }
            if (p2[j] === '5') {
              context.commit('SET_POS_5', 'X');
            }
            if (p2[j] === '6') {
              context.commit('SET_POS_6', 'X');
            }
            if (p2[j] === '7') {
              context.commit('SET_POS_7', 'X');
            }
            if (p2[j] === '8') {
              context.commit('SET_POS_8', 'X');
            }
            if (p2[j] === '9') {
              context.commit('SET_POS_9', 'X');
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

          if (p1.length > 2) {
            for (let i = 0; i < p1.length; i++) {
              let temp = [];
              for (let j = 0; j < p1.length; j++) {
                if (j !== i) temp.push(p1[j]);
              }
              winningConditions.forEach(el => {
                if (JSON.stringify(el) == JSON.stringify(temp)) {
                  context.commit('SET_WINNER', `${result.data.users[0].username} Win !`);
                  if (this.winner) {
                    setTimeout(() => {
                      localStorage.clear();
                    }, 5000);
                  }
                }
              });
            }
          }

          if (p2.length > 2) {
            for (let i = 0; i < p2.length; i++) {
              let temp = [];
              for (let j = 0; j < p2.length; j++) {
                if (j !== i) temp.push(p2[j]);
              }
              winningConditions.forEach(el => {
                if (JSON.stringify(el) == JSON.stringify(temp)) {
                  context.commit('SET_WINNER', `${result.data.users[1].username} Win !`);
                  if (this.winner) {
                    setTimeout(() => {
                      localStorage.clear();
                    }, 5000);
                  }
                }
              });
            }
          }

          if (p1.length + p2.length === 9) {
            context.commit('SET_WINNER', 'DRAW!');
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
