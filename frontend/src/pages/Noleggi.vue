<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Film, Noleggi } from "../types"

export default defineComponent({
  data() {
    return {
      filmInput: "",
      filmNoleggiati: [] as Noleggi[],
      suggestions: [] as Film[],
      datiFilm: [] as Film[],
    }
  },
  methods: {
    showSuggestions() {
      this.suggestions = this.datiFilm.filter((film) =>
        film.titolo.toLowerCase().includes(this.filmInput.toLowerCase())
      ).map((film) => film);
    },
    selectSuggestion(suggestion: Film) {
      this.filmInput = suggestion.titolo;
      this.suggestions = [];
    },
    addFilm() {
      const film = this.filmInput.trim();
      if (film !== "" ) {
        const newNoleggio: Noleggi = {
          idnoleggio: -1,
          datanoleggio: new Date(),
          id_film: this.datiFilm.find((film) => film.titolo === this.filmInput)?.idfilm!,
        };
        this.filmNoleggiati.push(newNoleggio);
      }
      this.filmInput = "";
    },
    getFilm() {
      axios
        .get("/api/film")
        .then((response) => (this.datiFilm = response.data))
    },
  },
  mounted() {
    this.getFilm();
  },
})
</script>
<template>
  <h1>I tuoi noleggi</h1>
  <input type="text" v-model="filmInput" placeholder="Inserisci il titolo di un film">
  <button @click="addFilm">Aggiungi film</button>
  <ul v-if="suggestions.length > 0">
    <li v-for="(suggestion, index) in suggestions" :key="index">
      {{ suggestion.titolo }}
    </li>
  </ul>
  <ul v-if="datiFilm.length > 0">
    <li v-for="(film, index) in datiFilm" :key="index">
      {{ film.titolo }}
    </li>
  </ul>
</template>