<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    }
  },
  methods: {
    async onSubmit() {
      if (this.password != this.confirmPassword) {
        alert("Le due password non coincidono.")
        return
      }
      try {
        await axios.post("/api/auth/register", {
          username: this.username,
          password: this.password,
        })
        window.location.href = "/"
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    },
  },
})
</script>

<template>
    <h1>Registrazione</h1>
    <form  @submit.prevent="onSubmit">
        <input type="text" placeholder="Username" v-model="username">

        <input type="password" placeholder="Password" v-model="password">

        <input type="password" placeholder="Conferma la password" v-model="confirmPassword">

        <button type="submit" class="registerbtn">Registrati</button>
    </form>
</template>