<template>
  <div class="contain">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />

    <div class="drawer">
      <header>
        <p class="message" v-if="userIndex % 2 === 0 && userid % 2 === 0">Your turn</p>
        <p class="message" v-else-if="userIndex % 2 !== 0 && userid % 2 !== 0">Your turn</p>
        <p class="message" v-else="">Enemy Turn</p>

        <button class="play-btn" @click.prevent="play">play</button>
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

    <div class="game-log-message-box">
      <p>{{ msg }}</p>
      <div style="display: flex; flex-direction: column-reverse;">
        <div class="game-log-chat-messages">
          <div v-for="message in chatMessages" :key="message.name">
            <p>
              <b>{{ message.name }}</b>
            </p>
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
    <div>
      <div class="message-box">
        <h3>Enter chat message</h3>
        <form @submit.prevent="sendMessage">
          <label for="chat-message"></label>
          <textarea v-model="message" id="chat-message" rows="4" cols="45" autofocus>
                Enter your message here...
              </textarea
          ><br />
          <button type="submit" class="submit-button btn-md">Submit!</button>
        </form>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
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
  methods: {
    ...mapActions(['refreshPosition', 'resetData']),
    sendMessage() {
      const messageData = {
        name: localStorage.username,
        message: this.message,
      };
      var socket = io.connect('http://localhost:3000');
      socket.emit('send-message', messageData);
      this.message = '';
    },
    play() {
      localStorage.clear();
      this.resetData();
      this.$router.push('/');

      // Axios({
      //   method: 'DELETE',
      //   url: 'http://localhost:3000/',
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
      console.log(pick);
      if (this.userIndex % 2 === 0 && +localStorage.userid % 2 === 0) {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/data',
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
            var socket = io.connect('http://localhost:3000');
            socket.emit('refresh');
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.userIndex % 2 !== 0 && +localStorage.userid % 2 !== 0) {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/data',
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
            var socket = io.connect('http://localhost:3000');
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
    if (this.userIndex % 2 === 0) {
      console.log('GILIRAN PEMAIN GANJIL');
    } else {
      console.log('GILIRAN PEMAIN GENAP');
    }

    io.connect('http://localhost:3000').on('send-message', data => {
      console.log('fetch chat success');
      this.chatMessages = data;
    });

    io.connect('http://localhost:3000').on('refresh_client', () => {
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
  margin: 10px;
  border-radius: 4px;
}
.game-log-message-box {
  height: 80%;
  background-color: width;
  width: 80%;
  text-align: left;
  padding-top: 95 px;
}

.message-box{
  padding-top: 10px;
}

#chat-message{
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
  border: solid black 1px;
  height: 195px;
  width: 580px;
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
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  margin: 0;
  height: 100vh;
  background: hsl(185, 87%, 32%);
  font-family: 'Montserrat', 'Arial', sans-serif;
  letter-spacing: 1px;
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

.footer{
  display: flex;
  justify-content: center ;
}

.play-btn {
  /* position: absolute; */
  top: 10px;
  left: 100%;
  outline: none;
  border: none;
  cursor: pointer;
  margin-left: 75px;

  background:  hsl(202, 75%, 43%);
  padding: 1rem 1.5rem;

  font-size: 2.4rem;
  font-weight: bold;
  color: rgb(232, 231, 241);
  border-radius: 0 0 0.2rem 0.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid hsla(300, 3%, 17%, 1);
  transform: translate(-50%, 0);
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
