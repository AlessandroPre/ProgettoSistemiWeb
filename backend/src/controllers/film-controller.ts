import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allFilms(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM film`,
    [],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmsFromDirector(req: Request, res: Response) {
  connection.execute(
    `SELECT idfilm, id_regista, titolo, genere 
    FROM film, registi
    WHERE id_regista=idregista AND idregista=?`,
    [req.params.idregista],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmsFromID(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM film
    WHERE idfilm=?`,
    [req.params.idfilm],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmsFromGenre(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM film
    WHERE genere=?`,
    [req.params.genere],
    function (err, results, fields) {
      res.json(results)
    }
  )
}
