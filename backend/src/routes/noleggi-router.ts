import { Router } from "express"
import * as noleggiController from "../controllers/noleggi-controller"

const router: Router = Router()

router.get("/api/noleggi", noleggiController.allRental)
router.get("/api/noleggi/film", noleggiController.FilmHasRental)
router.get("/api/noleggi/:idnoleggio", noleggiController.rentalFromID)
router.get("/api/noleggi/:datanoleggio", noleggiController.rentalFromDate)

export default router
