import Vue from "vue";
import Vuex from "vuex";
import Axios from "Axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pos1: "",
    pos2: "",
    pos3: "",
    pos4: "",
    pos5: "",
    pos6: "",
    pos7: "",
    pos8: "",
    pos9: "",
    userRun: 0,
    winner: ""
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
      state.userRun = user;
    },
    SET_WINNER(state, user) {
      state.winner = user;
    }
  },
  actions: {
    fetchposition(context, payload) {
      Axios({
        method: "POST",
        url: "http://localhost:3000/data",
        data: {
          room: localStorage.room
        }
      }).then(result => {
        console.log(result.data);
        const str1 = result.data.users[0].row;
        const str2 = result.data.users[1].row;
        let res1;
        let res2;
        if (str1 === "") {
          res1 = [];
        } else {
          res1 = str1.split(",");
        }
        if (str2 === "") {
          res2 = [];
        } else {
          res2 = str2.split(",");
        }
        console.log(res1.length + res2.length);
        console.log(res1, res2);
        context.commit("SET_USER_RUN", res1.length + res2.length);
        for (const i in res1) {
          if (res1[i] === "1") {
            context.commit("SET_POS_1", "A");
          }
          if (res1[i] === "2") {
            context.commit("SET_POS_2", "A");
          }
          if (res1[i] === "3") {
            context.commit("SET_POS_3", "A");
          }
          if (res1[i] === "4") {
            context.commit("SET_POS_4", "A");
          }
          if (res1[i] === "5") {
            context.commit("SET_POS_5", "A");
          }
          if (res1[i] === "6") {
            context.commit("SET_POS_6", "A");
          }
          if (res1[i] === "7") {
            context.commit("SET_POS_7", "A");
          }
          if (res1[i] === "8") {
            context.commit("SET_POS_8", "A");
          }
          if (res1[i] === "9") {
            context.commit("SET_POS_9", "A");
          }
        }

        for (const k in res2) {
          if (res2[k] === "1") {
            context.commit("SET_POS_1", "B");
          }
          if (res2[k] === "2") {
            context.commit("SET_POS_2", "B");
          }
          if (res2[k] === "3") {
            context.commit("SET_POS_3", "B");
          }
          if (res2[k] === "4") {
            context.commit("SET_POS_4", "B");
          }
          if (res2[k] === "5") {
            context.commit("SET_POS_5", "B");
          }
          if (res2[k] === "6") {
            context.commit("SET_POS_6", "B");
          }
          if (res2[k] === "7") {
            context.commit("SET_POS_7", "B");
          }
          if (res2[k] === "8") {
            context.commit("SET_POS_8", "B");
          }
          if (res2[k] === "9") {
            context.commit("SET_POS_9", "B");
          }
        }

        const winningConditions = [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["1", "4", "7"],
          ["2", "5", "8"],
          ["3", "6", "9"],
          ["1", "5", "9"],
          ["3", "5", "7"]
        ];

        res1.sort();
        res2.sort();
        console.log("sort", res1);

        if (res1.length > 2) {
          res1.slice(Math.max(res1.length - 2, 1));
          console.log("sort 3 terakhir", res1);
          for (let l = 0; l <= 7; l++) {
            console.log(winningConditions[l][0]);
            if (
              res1[0] === winningConditions[l][0] &&
              res1[1] === winningConditions[l][1] &&
              res1[2] === winningConditions[l][2]
            ) {
              console.log("WINNER");
              context.commit("SET_WINNER", result.data.users[0].username);
              if (this.winner) {
                setTimeout(() => {
                  console.log("disini");
                  localStorage.clear();
                }, 5000);
              }
            }
          }
        }

        if (res2.length > 2) {
          res2.slice(Math.max(res2.length - 2, 1));
          console.log("sort 3 terakhir", res1);
          for (let l = 0; l <= 7; l++) {
            if (
              res2[0] === winningConditions[l][0] &&
              res2[1] === winningConditions[l][1] &&
              res2[2] === winningConditions[l][2]
            ) {
              context.commit("SET_WINNER", result.data.users[1].username);
            }
          }
        }
      });
    }
  },
  modules: {}
});
