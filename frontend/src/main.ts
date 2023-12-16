import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"
import App from "./App.vue"
import Film from "./pages/Film.vue"
import Login from "./pages/Login.vue"
import Noleggi from "./pages/Noleggi.vue"
import Main from './pages/Main.vue'
import NotFound from "./pages/NotFound.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/main", component: Main },
    { path: "/main/film", component: Film },
    { path: "/main/noleggio", component: Noleggi },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
