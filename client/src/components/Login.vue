<template>
  <div>
    <div class="landingPage">
      <div class="logo mt-5">
        <img src="@/assets/logo-game.png" alt="" style="width:50%" />
      </div>
      <h5 class="text">Lets Play</h5>
      <hr class="my-3" />
      <div>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="username"
              id="username"
              placeholder="Your Username"
            />
          </div>
          <div class="button">
            <button type="submit" class="btn btn-dark btn-ml ml-2">
              Join Game
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      room: '',
      islogin: false,
    };
  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: 'https://murmuring-citadel-44052.herokuapp.com/signup',
        data: {
          username: this.username,
        },
      })
        .then(result => {
          console.log(result);
          localStorage.setItem('room', result.data.room);
          localStorage.setItem('username', result.data.username);
          localStorage.setItem('userid', result.data.id);
          this.$router.push('main');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    if (localStorage.username) {
      this.islogin = true;
      this.$router.push('main');
    } else {
      this.islogin = false;
    }
  },
};
</script>

<style scoped>
.logo,
form,
button {
  display: flex;
  justify-content: center;
}

.text {
  text-align: center;
}
</style>
