<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Film } from "../types"

export default defineComponent({
  data() {
    return {
      datiFilm: [] as Film[]
    }
  },
  methods: {
    getFilm() {
      axios.get("/api/film")
        .then(response => this.datiFilm = response.data)
    }
  },
  mounted() {
    this.getFilm()
  }
})
</script>

<template>
  <section>
    <table v-if="datiFilm != null">
      <tr>
        <th>idFilm</th>
		    <th>id_regista</th>
        <th>titolo</th>
        <th>genere</th>
      </tr>
      <tr v-for="film in datiFilm">
        <td>{{film.idfilm}}</td>
        <td>{{film.id_regista}}</td>
        <td>{{film.titolo}}</td>
        <td>{{film.genere}}</td>
      </tr>
    </table>
  </section>
</template>
