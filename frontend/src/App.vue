<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import UserInfo from "./components/user-info.vue"
import { User } from "./types"

export default defineComponent({
  components: { UserInfo },
  data() {
    return {
      user: null as User | null,
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/profile")
      this.user = res.data
    },
  },
  mounted() {
    this.getUser()
  },
})
</script>

<template>
  <header>
    <h1>Noleggio film</h1>
  </header>
  <UserInfo v-if="user" :user="user" />
  <nav v-else>
    <router-link to="/main/film">Film</router-link>
    <router-link to="/main/noleggio">Noleggio</router-link>
    <router-link to="/registrati">Registrati</router-link>
  </nav>
  <main>
    <RouterView :user="user" />
  </main>
  <footer>
    <p>Progetto di Proietti Martina e Alessandro Pretolani</p>
  </footer>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(219, 69, 83);
  background-color: #fff;
}
</style>
