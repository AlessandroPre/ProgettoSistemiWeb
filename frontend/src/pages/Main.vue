<script lang="ts"> 
import { defineComponent } from "vue" 
import Film from "./Film.vue" 
import Noleggio from "./Noleggi.vue" 
import { useRoute } from "vue-router"

export default defineComponent({ 
  components: { Film, Noleggio }, 
  setup() { 
    // ottieni il percorso corrente 
    const route = useRoute() 
    // restituisci il componente corrispondente al percorso 
    const getCurrentComponent = () => { 
      switch (route.path) { case "/main/film": return Film 
      case "/main/noleggio": return Noleggio 
      default: return Film 
    } 
  } 
  return { getCurrentComponent } 
} 
}) 
</script>

<template> 
  <div> 
    <component :is="getCurrentComponent()"></component> 
  </div>
</template>
