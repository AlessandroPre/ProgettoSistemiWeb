<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import FilmForm from "../components/film-form.vue"
import FilmItem from "../components/film-item.vue"
import { Film, User } from "../types"

export default defineComponent({
  components: { FilmForm, FilmItem },
  props: {
    user: Object as PropType<User>,
  },
  data() {
    return {
      film: [] as Film[],
    }
  },
  methods: {
    async getFilm() {
      const res = await axios.get("/api/film")
      this.film = res.data
    },
  },
  mounted() {
    this.getFilm()
  },
})
</script>

<template>
  <div class="prose">
    <PostForm v-if="user" @submit="getFilm" />
    <h1>Gli ultimi film</h1>
    <div v-if="film.length > 0" class="flex flex-col gap-6">
      <PostItem
        v-for="films in film"
        :key="films.idfilm"
        :post="films"
        :canDelete="films.idGestore == user?.id || user?.role == 'admin'"
        @delete="getFilm"
      />
    </div>
    <div v-else>
      <p>Nessun film da visualizzare.</p>
    </div>
  </div>
</template>
