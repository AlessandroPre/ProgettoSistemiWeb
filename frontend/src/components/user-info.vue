<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import { User } from "../types"

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout")
      window.location.reload()
    },
  },
})
</script>

<template>
  <span class="text-sm">{{ user?.username }}</span>
  <div
    class="h-9 w-9 flex rounded-full"
    :class="{ 'bg-blue-500': user?.role != 'admin', 'bg-rose-500': user?.role == 'admin' }"
  ></div>
  <RouterLink to="/noleggi" class="btn">Noleggio</RouterLink>
  <RouterLink to="/film" class="btn">Film</RouterLink>
  <button class="btn !px-2" @click="logout">Logout</button>
</template>
