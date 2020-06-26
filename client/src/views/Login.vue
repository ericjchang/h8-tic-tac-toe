<template>
  <div>
    <div class="landingPage justify-content-center">
      <div class="logo mt-5">
        <img src="@/assets/logo-game.png" alt="" style="width:65%" />
      </div>
      <h5 class="text">Lets Play</h5>
      <hr class="my-3" />
      <div>
        <form>
          <div class="form-group">
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="name"
              placeholder="Your Username"
            />
          </div>
          <div class="button">
            <button type="submit" class="btn btn-dark btn-ml ml-2" @click.prevent="setName">
              Join Game
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    setName() {
      localStorage.name = this.username;
      this.$store.dispatch("setPlayerName", this.username);
    }
  }
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
