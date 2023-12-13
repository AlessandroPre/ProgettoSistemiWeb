import { Router } from "express"
import * as registiController from "../controllers/registi-controller"

const router: Router = Router()

router.get("/api/registi", registiController.allDirector)
router.get("/api/registi/film", registiController.filmFromDirector)
router.get("/api/registi/noleggio", registiController.rentalFromDirector)
router.get("/api/registi/datanascita", registiController.directorFromDate)

export default router
