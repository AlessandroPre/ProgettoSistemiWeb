<script lang="ts"> 
import { PropType, defineComponent } from "vue"; 
import axios from "axios"; 
import { Film, User, Registi } from "../types"; 
import FilmForm from "../components/film-form.vue"; 
export default defineComponent({ 
  components: { FilmForm }, 
  props: { user: Object as PropType<User> }, 
    data() { 
      return { 
        datiFilm: [] as Film[],
        datiRegisti: [] as Registi[], 
        idfilm: "", 
        id_regista: "", 
        titolo: "", 
        genere: "", 
        editedFilmIndex: 0,
        isEditing: false, // aggiunto stato per gestire la modifica editedFilmIndex: -1, // indice del film che si sta modificando 
        editedFilm: {} as Film, // oggetto del film che si sta modificando 
      }; 
    }, 
    methods: { 
      async getFilm() { 
        const res = await axios.get("/api/film"); 
        this.datiFilm = res.data; 
        },
        async getRegisti() { 
        const res = await axios.get("/api/registi"); 
        this.datiRegisti = res.data; 
        }, 
      async delFilm(idfilm: number) { 
        await axios.delete(`/api/film/${idfilm}`) 
        .then(() => this.getFilm()
        ); 
      }, async upFilm(film: Film) { 
        await axios.put(`/api/film/${film.idfilm}`, { 
          id_regista: film.id_regista, 
          titolo: film.titolo, 
          genere: film.genere, 
        })
        .then(() => {
           this.isEditing = false; 
           this.editedFilm = {} as Film; 
           this.getFilm(); 
        }); 
      }, 
      editFilm(film: Film) {        
        this.editedFilmIndex = this.datiFilm.indexOf(film); 
        this.editedFilm = { ...film }; 
        this.isEditing = true; 
      }, 
      cancelEdit() { 
        this.isEditing = false; 
        this.editedFilmIndex = -1; 
        this.editedFilm = {} as Film; 
      }, 
    }, 
    mounted() { 
      this.getFilm() 
      this.getRegisti()
    }, 
  }); 
  </script> 
  <template> 
    <section> 
      <p v-if="user?.role == 'admin'" style="font-weight: bold">Aggiungi un film</p> 
      <FilmForm v-if="user?.role == 'admin'" @submit="getFilm" /> 
      <table v-if="datiFilm != null"> 
      <tr> 
        <th>idFilm</th> 
        <th>id_regista</th> 
        <th>titolo</th> 
        <th>genere</th> 
        <th></th> 
      </tr> 
      <tr v-for="(film, index) in datiFilm" :key="index"> 
        <td>{{film.idfilm}}</td> 
        <td>{{film.id_regista}}</td> 
        <td>{{film.titolo}}</td> 
        <td>{{film.genere}}</td> 
        <td v-if="user?.role == 'admin'"> 
          <button class="btn" @click="delFilm(film.idfilm)">Elimina Film</button> 
          <button v-if="!isEditing" class="btn" @click="editFilm(film)">Modifica</button> 
          <div v-if="isEditing && editedFilmIndex === index"> 
            <input v-model="editedFilm.id_regista" type="text" placeholder="id_regista"> 
            <input v-model="editedFilm.titolo" type="text" placeholder="titolo"> 
            <input v-model="editedFilm.genere" type="text" placeholder="genere"> 
            <button class="btn" @click="upFilm(editedFilm)">Salva Modifiche</button> 
            <button class="btn" @click="cancelEdit">Annulla</button> 
          </div> 
        </td> 
      </tr> 
      </table> 
      <p style="font-weight: bold">Registi</p>
      <table v-if="datiRegisti != null"> 
      <tr> 
        <th>idregista</th> 
        <th>nome</th> 
        <th>datanascita</th> 
        <th>origine</th> 
      </tr> 
      <tr v-for="(regista, index) in datiRegisti" :key="index"> 
        <td>{{regista.idregista}}</td> 
        <td>{{regista.nome}}</td> 
        <td>{{regista.datanascita}}</td> 
        <td>{{regista.origine}}</td> 
      </tr> 
      </table> 
    </section> 
  </template>
