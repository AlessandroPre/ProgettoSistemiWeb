<script lang="ts">
import { PropType, defineComponent } from "vue"
import { Noleggi } from "../types"
import axios from "axios"
/**eliminazione noleggio */
export default defineComponent({
  props: {
    noleggio: Object as PropType<Noleggi>,
    canDelete: Boolean,
  },
  emits: ["delete"],
  methods: {
    async deleteRental() {
      await axios.delete(`/api/noleggi/${this.noleggio?.idnoleggio}`)
      this.$emit("delete")
    },
  },
})
</script>

<template>
  <div class="px-4 rounded-lg border border-slate-200">
    <table>
      <thead>
        <tr>
          <th>ID Noleggio</th>
          <th>Data di Noleggio</th>
          <th>Film Noleggiato</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ noleggio?.idnoleggio }}</td>
          <td>{{ new Date(noleggio?.datanoleggio ?? "").toLocaleDateString() }}</td>
          <td>{{ noleggio?.id_film }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="canDelete" class="not-prose flex justify-end gap-2 mb-5">
      <button class="btn" @click="deleteRental">Elimina noleggio</button>
    </div>
  </div>
</template>
