<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      error: ""
    }
  },
  methods: {
    login(){
      axios.post("/api/login", {username: this.username, password: this.password})
      .then(response => {
        localStorage.setItem("token", response.data.token)
        this.$router.push("/main")
      })
      .catch(error => {
        this.error = error.response.data.message
      })
    }
  }
})
</script>
<template> 
  <h2>Login</h2> 
  <form @submit.prevent="login"> 
    <div> 
      <label for=“username”>Username</label> 
      <input id=“username” v-model="username" type=“text” required> 
    </div> 
    <div> 
      <label for=“password”>Password</label> 
      <input id=“password” v-model="password" type=“password” required> 
    </div>
    <div> 
      <button type="submit">Accedi</button> 
    </div> 
    <div v-if="error"> 
      <p>{{error}}</p> 
    </div> 
  </form>
</template>
