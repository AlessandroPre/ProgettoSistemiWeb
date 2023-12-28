import { createApp } from "vue"
import { User } from "./types"
import { createRouter, createWebHistory, Router } from "vue-router"
import axios from "axios"
import "./style.css"
import App from "./App.vue"
import Film from "./pages/Film.vue"
import Home from "./pages/Home.vue"
import Login from "./pages/Login.vue"
import Noleggi from "./pages/Noleggi.vue"
import NotFound from "./pages/NotFound.vue"
import Register from "./pages/Register.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/login",
      component: Login,
      meta: { requireLogout: true }, // Segna che la rotta richiede il logout
    },
    {
      path: "/register",
      component: Register,
      meta: { requireLogout: true }, // Segna che la rotta richiede il logout
    },
    // Ipotetica rotta che richiede il login
     {
      path: "/film",
      component: Film,
      meta: { requireLogin: true },
    },
    {
      path: "/noleggi",
      component: Noleggi,
      meta: { requireLogin: true },
    }, 
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
})

// Funzione che viene eseguita prima di ogni navigazione del router
router.beforeEach(async (to) => {
  const res = await axios.get("/api/auth/profile")
  const user = res.data as User | null
  // Se la pagina richiede il login, ma l'utente non l'ha effettuato, lo rimanda alla pagina di login
  if (to.meta.requireLogin && !user) {
    return { path: "/login" }
  }
  // Se la pagina richiede il logout, ma l'utente ha effettuato l'accesso, lo rimanda alla home
  if (to.meta.requireLogout && user) {
    return { path: "/" }
  }
})

createApp(App).use(router).mount("#app")
