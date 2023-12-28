<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  emits: ["submit"],
  data() {
    return {
      idfilm: "",
      id_regista: "",
      titolo: "",
      genere: "",
      idGestore: "",
    }
  },
  computed: {
    canSubmit() {
      return this.idfilm != ""
    },
  },
  methods: {
    async onSubmit() {
      if (!this.canSubmit) return
      await axios.post("/api/film", {
        idfilm: this.idfilm,
        id_regista: this.id_regista,
        titolo: this.titolo,
        genere: this.genere,
        idGestore: this.idGestore,
      })
      this.idfilm = ""
      this.id_regista = ""
      this.titolo = ""
      this.genere = ""
      this.idGestore = ""
      this.$emit("submit")
    },
  },
})
</script>

<template>
  <form class="not-prose flex relative mb-10" @submit.prevent="onSubmit">
    <input
        type="text"
        v-model="idfilm"
        class="rounded-lg border-slate-200"
        placeholder="idfilm"
      />
      <input
        type="text"
        v-model="id_regista"
        class="rounded-lg border-slate-200"
        placeholder="id_regista"
      />
      <input
        type="text"
        v-model="titolo"
        class="rounded-lg border-slate-200"
        placeholder="titolo"
      />
      <input
        type="text"
        v-model="genere"
        class="rounded-lg border-slate-200"
        placeholder="genere"
      />
      <input
        type="text"
        v-model="idGestore"
        class="rounded-lg border-slate-200"
        placeholder="idGestore"
      />
    <button
      type="submit"
      class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 absolute bottom-5 right-5"
      :disabled="!canSubmit">Posta</button>
  </form>
</template>
