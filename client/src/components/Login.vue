<template>
  <div class="login-register d-flex align-items-center justify-content-center">
    <div class="border border-primary p-5 rounded administration">
      <h2 class="text-center">Welcome</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            class="form-control"
            type="text"
            id="username"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <button type="submit" class="btn btn-primary">Start</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      room: "",
      islogin: false
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/signup",
        data: {
          username: this.username
        }
      })
        .then(result => {
          console.log(result);
          localStorage.setItem("room", result.data.room);
          localStorage.setItem("username", result.data.username);
          localStorage.setItem("userid", result.data.id);
          this.$router.push("main");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.username) {
      this.islogin = true;
      this.$router.push("main");
    } else {
      this.islogin = false;
    }
  }
};
</script>

<style>
.login-register {
  height: 100vh;
}
</style>
