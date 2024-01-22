import { Router } from "express"
import * as noleggiController from "../controllers/noleggi-controller"

const router: Router = Router()

router.get("/api/noleggi", noleggiController.allRental)
router.get("/api/film", noleggiController.allFilm)
router.put("/api/noleggi", noleggiController.addRental)
router.put("/api/noleggi/:idnoleggio", noleggiController.updateRental)
router.delete("/api/noleggi/:idnoleggio", noleggiController.deleteRental)


export default router
