import { Router } from "express"
import * as filmController from "../controllers/film-controller"

const router: Router = Router()

router.get("/api/film", filmController.allFilms)
router.get("/api/film/autore/:genre", filmController.filmFromGenre)
router.get("/api/film/addFilm", filmController.addFilm)
router.get("/api/film/deleteFilm", filmController.deleteFilm)

export default router
