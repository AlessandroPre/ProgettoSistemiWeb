<script lang="ts">
import axios from "axios"
import { defineComponent, PropType } from "vue"
import { Film } from "../types"


export default defineComponent({
  props: {
    film: Object as PropType<Film>,
  },
  emits: ["submit"],
  data() {
    return {
      datanoleggio: "",
      id_film: "",
      noleggiatore: "",
      films: [] as Film[],
      messaggio: ""
    }
  },
  computed: {
    canSubmit() {
      return this.datanoleggio !== "" && this.id_film
    },
  },
  methods: {
    async onSubmit() {
      if (this.datanoleggio == "" || this.id_film == "") return
      const selectedFilm = this.films.find((film) => film.titolo === this.id_film)
      const res = await axios.get("/api/auth/profile")
      await axios.put(`/api/noleggi`, {
        datanoleggio: this.datanoleggio,
        id_film: selectedFilm?.idfilm,
        noleggiatore: res.data.id,
      }) 
    this.datanoleggio = ""
    this.id_film = ""
    this.noleggiatore = ""
    this.messaggio = "Noleggio andato a buon termine, vieni a ritirare il film presso i nostri centri"
    this.$emit("submit")
    },
    async getFilms() {
      try {
        const res = await axios.get("/api/film")
        this.films = res.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getFilms()
  },
})
</script>

<template>
  <form class="not-prose flex relative mb-10" @submit.prevent="onSubmit">
    <select v-model="id_film" class="h-12 w-full px-5 pt-4 mt-4 rounded-lg border-slate-200">
      <option value="" disabled selected>Seleziona un film...</option>
      <option v-for="film in films">{{ film.titolo }}</option>
    </select> 
    <input 
      type="date" 
      v-model="datanoleggio" 
      class="h-12 w-full px-5 pt-4 mt-4 rounded-lg border-slate-200" 
    /> 
    <button 
      type="submit" 
      class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 absolute bottom-5 right-5"
      :disabled="!canSubmit"
    >
      Noleggia
    </button>
    <div v-if="messaggio" class="text-green-500 mt-2">{{ messaggio }}</div>
  </form>
</template>

