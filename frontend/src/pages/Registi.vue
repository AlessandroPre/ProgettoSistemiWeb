<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Registi } from "../types"

export default defineComponent({
  data() {
    return {
      datiRegisti: [] as Registi[]
    }
  },
  methods: {
    getRegisti: function(){
      axios.get("/api/registi")
        .then(response => this.datiRegisti = response.data)
    }
  },
  mounted(){
    this.getRegisti()
  }
})
</script>

<template>
  <h2>Registi</h2>
  <section>
    <table v-if="datiRegisti != null">
      <tr>
        <th id="idregista">IDregista</th>
        <th id="nome">Nome</th>
        <th id="datanascita">Data di nascita</th>
        <th id="origine">Origine</th>
      </tr>
      <tr v-for="regista in datiRegisti">
        <th>{{regista.idregista}}</th>
        <td>{{regista.nome}}</td>
        <td>{{regista.datanascita}}</td>
        <td>{{regista.origine}}</td>
      </tr>
    </table>
  </section>
</template>
