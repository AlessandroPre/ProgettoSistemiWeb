import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"
import App from "./App.vue"
import Film from "./pages/Film.vue"
import Regista from "./pages/Registi.vue"
import Noleggio from "./pages/Noleggi.vue"
import NotFound from "./pages/NotFound.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Noleggio },
    { path: "/registi", component: Regista },
    { path: "/film", component: Film },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
