<script lang="ts"> 
import { defineComponent } from "vue" 
import axios from "axios" 

export default defineComponent({ 
  data() { 
    return { 
      nomeFilm: "", 
      nomeAutore: "", 
      error: "", 
      success: "", 
      filmList: [] as string[], 
      suggestions: [] as any[] 
    } 
  }, 
  methods: { 
    // ottieni la lista di film disponibili 
    getFilmList() { 
      axios.get("/api/film") 
      .then(response => { 
        // trasforma la lista di oggetti film in una lista di stringhe 
        this.filmList = response.data.map((film: any) => film.titolo) 
      }) 
    }, 
    // invia la richiesta di noleggio 
    noleggia() { 
      axios.post("/api/noleggio", {
         nomeFilm: this.nomeFilm, nomeAutore: this.nomeAutore 
        }) 
        .then(response => { 
          // mostra un messaggio di successo 
          this.success = response.data.message 
          // azzera i campi del form 
          this.nomeFilm = "" 
          this.nomeAutore = "" 
        }) 
        .catch(error => { 
          // mostra un messaggio di errore 
          this.error = error.response.data.message 
        }) 
      }, 
      // filtra i suggerimenti in base all’input dell’utente 
      getSuggestions(input: string) { 
        const regex = new RegExp(input, "i") 
        return this.filmList.filter(film => film.match(regex)) 
      },
       // gestisci il cambio di input dell’utente 
      onInputChange(text: string) { 
        this.nomeFilm = text 
        this.suggestions = this.getSuggestions(text) 
      }, 
      // gestisci la selezione di un suggerimento 
      onSuggestionSelected(suggestion: any) { 
        this.nomeFilm = suggestion.item 
      } 
    }, 
    mounted() { 
      this.getFilmList() 
    } 
}) 
</script>
<template> 
  <h2>Noleggio</h2> 
  <form @submit.prevent="noleggia"> 
  <div> 
    <label for="nomeFilm">Nome del film</label> 
    <input id="nomeFilm" v-model="nomeFilm" type="text" required> 
  </div> 
  <div> 
    <label for="nomeAutore">Nome autore</label> 
    <input id="nomeAutore" v-model="nomeAutore" type="text" required> 
  </div> 
  <div> 
    <button type="submit">Noleggia</button> 
  </div> 
  <div v-if="error"> 
    <p>{{error}}</p> 
  </div> 
  <div v-if="success"> 
    <p>{{success}}</p> 
  </div> 
  </form> 
</template>
