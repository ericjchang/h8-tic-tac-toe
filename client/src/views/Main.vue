<template>
  <div class="contain">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />

    <div class="drawer">
      <header>
        <p class="message" v-if="userIndex % 2 === 0 && userid % 2 === 0">Your turn</p>
        <p class="message" v-else-if="userIndex % 2 !== 0 && userid % 2 !== 0">Your turn</p>
        <p class="message" v-else="">Enemy Turn</p>

        <button class="play-btn text-center" @click.prevent="play">restart</button>
      </header>

      <main class="board" v-if="!winner">
        <div v-if="pos1 === 'O'" class="cell circle"></div>
        <div v-else-if="pos1 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(1)"></div>

        <div v-if="pos2 === 'O'" class="cell circle"></div>
        <div v-else-if="pos2 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(2)"></div>

        <div v-if="pos3 === 'O'" class="cell circle"></div>
        <div v-else-if="pos3 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(3)"></div>

        <div v-if="pos4 === 'O'" class="cell circle"></div>
        <div v-else-if="pos4 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(4)"></div>

        <div v-if="pos5 === 'O'" class="cell circle"></div>
        <div v-else-if="pos5 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(5)"></div>

        <div v-if="pos6 === 'O'" class="cell circle"></div>
        <div v-else-if="pos6 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(6)"></div>

        <div v-if="pos7 === 'O'" class="cell circle"></div>
        <div v-else-if="pos7 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(7)"></div>

        <div v-if="pos8 === 'O'" class="cell circle"></div>
        <div v-else-if="pos8 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(8)"></div>

        <div v-if="pos9 === 'O'" class="cell circle"></div>
        <div v-else-if="pos9 === 'X'" class="cell cross"></div>
        <div v-else class="cell" @click="choose(9)"></div>
      </main>

      <h1 v-else-if="winner">{{ winner }}</h1>
    </div>

    <div class="col-4">
      <div class="game-log-message-box">
        <p>{{ msg }}</p>
        <div style="display: flex; flex-direction: column-reverse;">
          <div class="game-log-chat-messages">
            <div v-for="message in chatMessages" :key="message.name">
              <p>
                <b style="margin-left:8px">{{ message.name }} :</b>
              </p>
              <p style="margin-left:12px">{{ message.message }}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="message-box mt-2">
            <form @submit.prevent="sendMessage">
              <h4>Enter chat message</h4>
              <textarea
                class="form-control game-log-chat-messages"
                v-model="message"
                id="chat-message"
                rows="4"
                autofocus
              >
              </textarea>
              <br />
              <button type="submit" class="submit-button btn-md">Submit!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'chatBox',
  data() {
    return {
      message: '',
      msg: '',
      chatMessages: [],
      userpick: '',
      islogin: false,
      userid: localStorage.userid,
    };
  },
  computed: {
    ...mapState([
      'userIndex',
      'pos1',
      'pos2',
      'pos3',
      'pos4',
      'pos5',
      'pos6',
      'pos7',
      'pos8',
      'pos9',
      'winner',
    ]),
  },
  watch: {
    winner: (newVal, oldVal) => {
      if (newVal === 'DRAW!') {
        const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6579');
        audio.play();
        Swal.fire(`${newVal}`);
      } else {
        const audio = new Audio(
          'https://www.fesliyanstudios.com/musicfiles/2016-08-23_-_News_Opening_5_-_David_Fesliyan.mp3'
        );
        audio.play();
        Swal.fire(`${newVal}`);
      }
    },
  },
  methods: {
    ...mapActions(['refreshPosition', 'resetData']),
    sendMessage() {
      const messageData = {
        name: localStorage.username,
        message: this.message,
      };
      var socket = io.connect('https://murmuring-citadel-44052.herokuapp.com');
      socket.emit('send-message', messageData);
      this.message = '';
    },
    play() {
      localStorage.clear();
      this.resetData();
      this.$router.push('/');

      // Axios({
      //   method: 'DELETE',
      //   url: 'https://murmuring-citadel-44052.herokuapp.com/',
      //   data: { id: localStorage.userid },
      // })
      //   .then(result => {
      //     //
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    choose(pick) {
      if (this.userIndex % 2 === 0 && +localStorage.userid % 2 === 0) {
        axios({
          method: 'PUT',
          url: 'https://murmuring-citadel-44052.herokuapp.com/data',
          headers: {
            room: localStorage.room,
            username: localStorage.username,
          },
          data: {
            chose: pick,
          },
        })
          .then(result => {
            this.refreshPosition();
            var socket = io.connect('https://murmuring-citadel-44052.herokuapp.com');
            socket.emit('refresh');
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.userIndex % 2 !== 0 && +localStorage.userid % 2 !== 0) {
        axios({
          method: 'PUT',
          url: 'https://murmuring-citadel-44052.herokuapp.com/data',
          headers: {
            room: localStorage.room,
            username: localStorage.username,
          },
          data: {
            chose: pick,
          },
        })
          .then(result => {
            this.refreshPosition();
            var socket = io.connect('https://murmuring-citadel-44052.herokuapp.com');
            socket.emit('refresh');
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  },
  created() {
    // method from Vuex
    this.refreshPosition();

    io.connect('https://murmuring-citadel-44052.herokuapp.com').on('send-message', data => {
      this.chatMessages = data;
    });

    io.connect('https://murmuring-citadel-44052.herokuapp.com').on('refresh_client', () => {
      this.refreshPosition();
    });

    if (localStorage.username) {
      this.islogin = true;
    } else {
      this.islogin = false;
      this.$router.push('/');
    }
  },
};
</script>

<style>
.contain {
  display: flex;
  justify-content: space-evenly;
  background-image: url('https://images.unsplash.com/photo-1592330732588-85affb208a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');
  height: 100vh;
  font-family: 'Balsamiq Sans', cursive;
}

.chatBox {
  border: 1px;
  height: 300px;
  border-style: solid;
  border-color: #0d0e0d;
}

.submit-button {
  background-color: hsl(202, 75%, 43%);
  color: white;
  border-width: 0px;
  padding: 10px 25px;
  border-radius: 4px;
}

.game-log-message-box {
  height: 80%;
  background-color: width;
  width: 80%;
  text-align: left;
  padding-top: 95 px;
}

.message-box {
  padding-top: 10px;
}

#chat-message {
  background-color: antiquewhite;
}

.game-log-box {
  height: 100%;
  border: 1px;
  border-style: solid;
  border-color: #020202;
  background-color: #ecf0f1;
  padding: 5px 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-log-box-header {
  display: flex;
  justify-content: space-between;
}

.game-log-chat-messages {
  border: solid 2px;
  border-color: #bdbdbd;
  height: 195px;
  text-overflow: ellipsis;
  overflow: scroll;
  overflow-x: hidden;
  background-color: antiquewhite;
}

.textarea {
  width: 80%;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 80%;
}

body {
  margin: 0;
  background: hsl(185, 87%, 32%);
}

.drawer {
  width: 80%;
  margin: 0 auto;
  padding-top: 25px;
  display: flexbox;
  justify-items: center;
}

.board {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 320px;
  height: 320px;
  margin: 0 auto;
}

.cell {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 5px;
  border-radius: 0.3em;
  background: hsl(202, 75%, 43%);
}

.cell.circle,
.cell.cross {
  background: transparent;
}

.circle::after,
.cross::before,
.cross::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
}

.cross::before,
.cross::after {
  width: 5px;
  height: 75px;
  background: hsl(300, 15%, 33%);
}

.playing .cross::before,
.playing .cross::after {
  background: hsl(194, 100%, 73%);
}

.cross::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.cross::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.circle::after {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid hsl(300, 15%, 33%);
}

.playing .circle::after {
  border-color: hsl(7, 63%, 78%);
}

.playing .cell:not(.cross):not(.circle) {
  cursor: pointer;
}

.playing .cell:not(.cross):not(.circle):hover {
  background: hsl(300, 15%, 34%);
}

#instructions {
  display: none;
}

.message {
  text-align: center;
  color: hsla(300, 15%, 20%, 1);
  font-size: 35px;
  font-weight: bold;
}

.footer {
  display: flex;
  justify-content: center;
}

.play-btn {
  top: 10px;
  left: 100%;
  outline: none;
  border: none;
  cursor: pointer;
  margin-left: 100px;

  background: hsl(202, 75%, 43%);
  padding: 1rem 2.5rem;

  font-size: 2.4rem;
  font-weight: bold;
  color: rgb(232, 231, 241);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transform: translate(-25%, 0);
  transition: transform 200ms ease-out;
}

.play-btn:hover {
  background: hsl(300, 37%, 7%);
}

.play-btn.hide {
  transform: translate(-50%, -100%);
}

header {
  max-width: 320px;
  margin: 0 auto 20px;
}

@keyframes win {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(3);
  }
  100% {
    transform: scale(1);
  }
}

.scores::after {
  display: none;
  content: 'vs';
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 2.4rem;
  transform: translate(-50%, -50%);
  color: #bdbdbd;
}

.scores > div:last-child {
  text-align: right;
}

.hide {
  display: none;
}
</style>
