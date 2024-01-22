import { Router } from "express"
import * as filmController from "../controllers/film-controller"

const router: Router = Router()

router.get("/api/film", filmController.allFilms)
router.get("/api/registi", filmController.allDirector)
router.post("/api/film", filmController.addFilm);
router.put("/api/film/:idfilm", filmController.updateFilm)
router.delete("/api/film/:idfilm", filmController.deleteFilm)

export default router
