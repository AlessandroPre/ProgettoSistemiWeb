<script lang="ts">
import { PropType, defineComponent } from "vue"
import { Film } from "../types"
import axios from "axios"

export default defineComponent({
  props: {
    film: Object as PropType<Film>,
    canDelete: Boolean,
  },
  emits: ["delete"],
  methods: {
    async deleteFilm() {
      await axios.delete(`/api/film/${this.film?.idfilm}`)
      this.$emit("delete")
    },
  },
})
</script>

<template>
  <div class="px-4 rounded-lg border border-slate-200">
    <p class="text-sm">
      {{ film?.idfilm }} • {{ film?.titolo}}
    </p>
    <p>
      {{ film?.genere }}
    </p>
    <div v-if="canDelete" class="not-prose flex justify-end gap-2 mb-5">
      <button class="btn" @click="deleteFilm">Elimina Film</button>
    </div>
  </div>
</template>
