<template>
    <div>
        <div class="landingPage">
            <div class='logo'>
                <img src="../assets/FAVPNG_logo-tic-tac-ultimate-tic-tac-toe-font_cie130TR.png" alt="" style="width:65%">
            </div>
            <!-- <p style="text-align: center;" class="lead">This is a simple hero unit</p> -->
            <h5 class='text'>Lets Play</h5>
            <hr class="my-3">
            <div>
                <form>
                    <div class="form-group" >
                    <input v-model="username" type="text" class="form-control" id="name" placeholder="Your Username">
                    </div>
                    <div class="button">
                        <button type="submit" class="btn btn-dark btn-ml" @click.prevent="setName" >Join Game</button>
                    </div>
                </form>
            </div>         
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username: ''
        }
    },
    methods: {
        setName () {
            localStorage.name = this.username
            this.$store.dispatch('setPlayerName', this.username)
        }
    },
}
</script>

<style scoped>
.landingPage {
    display: flex;
    justify-content: space-evenly;
}

.logo, form, button{
    display: flex;
    justify-content: center;
} 

.text{
    text-align: center;
}
</style>
