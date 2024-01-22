<script lang="ts">
import axios from "axios"
import { defineComponent, PropType } from "vue"
import { Film, Noleggi, User } from "../types"
import NoleggiForm from "../components/noleggi-form.vue"
import NoleggiItem from "../components/noleggi-item.vue"

export default defineComponent({
  components: { NoleggiForm, NoleggiItem },
  props: { user: Object as PropType<User>, film: Object as PropType<Film> },
  data() {
    return {
      datiNoleggi: [] as Noleggi[],
      datiFilm: [] as Film[],
      datanoleggio: "",
      editedFilmIndex: 0,
      isEditing: false, // aggiunto stato per gestire la modifica editedFilmIndex: -1, // indice del film che si sta modificando 
      editeNoleggio: {} as Noleggi, // oggetto del film che si sta modificando 
      //editedFilmDataNoleggio: ""
    }
  },
  methods: {
    async getNoleggi() {
      const res = await axios.get("/api/noleggi")
      this.datiNoleggi = res.data
    },
    async getFilm() { 
        const res = await axios.get("/api/film"); 
        this.datiFilm = res.data; 
        }, 
    async delNoleggi(idnoleggio: number) {
      await axios.delete(`/api/noleggi/${idnoleggio}`) 
        .then(() => this.getNoleggi())
    },
    async upNoleggi(noleggio: Noleggi){
      //const formattedDataNoleggio = new Date(this.editedFilmDataNoleggio); // Conversione della stringa in dato di tipo data
      await axios.put(`/api/noleggi/${noleggio.idnoleggio}`, { 
          datanoleggio: this.datanoleggio 
        })
        .then(() => {
          this.datanoleggio = ""; // Reset della variabile dopo la modifica
          this.getNoleggi(); 
        }); 
    },
    editNoleggi(noleggio: Noleggi) {        
        this.editedFilmIndex = this.datiNoleggi.indexOf(noleggio); 
        this.editeNoleggio = { ...noleggio }; 
        this.isEditing = true; 
      }, 
      cancelEdit() { 
        this.isEditing = false; 
        this.editedFilmIndex = -1; 
        this.editeNoleggio = {} as Noleggi; 
      },
  },
  mounted() {
    this.getNoleggi()
    this.getFilm()
  },
})
</script>

<template>
  <div class="prose" id="Noleggi">
    <NoleggiForm v-if="user?.role == 'user'" @submit="getNoleggi" />
    <table v-if="datiNoleggi != null"> 
      <tr> 
        <th>N. Noleggio</th> 
        <th>data ritiro del noleggio</th> 
        <th>Film</th> 
        <th v-if="user?.role =='admin'">Noleggiatore</th> 
        <th></th> 
      </tr> 
      <tr v-for="(noleggio, index) in datiNoleggi" :key="index"> 
        <td>{{noleggio.idnoleggio}}</td> 
        <td>{{noleggio.datanoleggio}}</td> 
        <td>{{datiFilm.find(film => film.idfilm === noleggio.id_film)?.titolo}}</td> 
        <td v-if="user?.role=='admin'">{{user.id}}</td> 
        <td v-if="user?.role == 'admin'"> 
          <button class="btn" @click="delNoleggi(noleggio.idnoleggio)">Elimina Noleggio</button>
          <button v-if="!isEditing" class="btn" @click="editNoleggi(noleggio)">Modifica</button>
          <div v-if="isEditing && editedFilmIndex === index"> 
            <input v-model="datanoleggio" type="text" placeholder="data del noleggio">  
            <button class="btn" @click="upNoleggi(editeNoleggio)">Salva Modifiche</button> 
            <button class="btn" @click="cancelEdit">Chiudi</button> 
          </div> 
        </td> 
      </tr> 
      </table>
  </div>
</template>
