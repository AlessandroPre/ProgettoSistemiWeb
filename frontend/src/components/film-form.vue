<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { Film } from "../types"

export default defineComponent({
  emits: ["submit"],
  data() {
    return {
      idfilm: "",
      id_regista: "",
      titolo: "",
      genere: "",
      films: [] as Film[],
    }
  },
  computed: {
    canSubmit() {
      return this.genere !== "" && this.id_regista && this.idfilm && this.titolo
    },
  },
  methods: {
    async onSubmit() {
      console.log(this.idfilm)
      if (!this.canSubmit) return
      await axios.post("/api/film", {
        idfilm: this.idfilm,
        id_regista: this.id_regista,
        titolo: this.titolo,
        genere: this.genere,
      })
      console.log(this.idfilm)
      this.idfilm = "";
      this.id_regista = "";
      this.titolo = "";
      this.genere = "";
      this.$emit("submit");
    },
  },
})
</script>


<template>
  <form class="not-prose flex relative mb-10" @submit.prevent="onSubmit">
    <input 
      ref="input" 
      v-model="idfilm" 
      class="rounded-lg border-slate-200" 
      placeholder="idfilm" 
    />
    <input 
      ref="input" 
      v-model="id_regista" 
      class="rounded-lg border-slate-200" 
      placeholder="id_regista" 
    />
    <input 
      ref="input" 
      v-model="titolo" 
      class="rounded-lg border-slate-200" 
      placeholder="titolo" 
    />
    <input 
      ref="input" 
      v-model="genere" 
      class="rounded-lg border-slate-200" 
      placeholder="genere" 
    />
    <button 
      type="submit"
      class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 absolute bottom-5 right-5"  
      :disabled="!canSubmit">
      Aggiungi
    </button>
  </form>
</template>
