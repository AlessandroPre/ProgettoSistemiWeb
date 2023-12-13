import { Router } from "express"
import * as filmController from "../controllers/film-controller"

const router: Router = Router()

router.get("/api/film", filmController.allFilms)
router.get("/api/film/:idregista", filmController.filmsFromDirector)
router.get("/api/film/categoria/:idfilm", filmController.filmsFromID)
router.get("/api/film/autore/:genre", filmController.filmsFromGenre)

export default router
