import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allRental(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM noleggi`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function rentalFromID(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM noleggi
    WHERE idnoleggio=?`,
    [req.params.idnoleggio],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function rentalFromDate(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM noleggi
    WHERE datanoleggio=?`,
    [req.params.datanoleggio],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function FilmHasRental(req: Request, res: Response) {
  connection.execute(
    `SELECT f.titolo, n.datanoleggio
    FROM film f JOIN noleggi n ON f.idfilm = n.id_film;`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}
