import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allDirector(req: Request, res: Response) {
  connection.execute(
    `SELECT *
    FROM registi`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function directorFromDate(req: Request, res: Response) {
  connection.execute(
    `SELECT idregista, nome, datanascita, origine 
    FROM registi 
    ORDER BY datanascita;`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmFromDirector(req: Request, res: Response) {
  connection.execute(
    `SELECT r.nome AS nome_regista, f.titolo AS titolo_film 
    FROM registi r JOIN film f ON r.idregista = f.id_regista 
    GROUP BY r.nome, f.titolo ORDER BY r.nome;`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function rentalFromDirector(req: Request, res: Response) {
  connection.execute(
    `SELECT r.nome, f.titolo, COUNT(n.idnoleggio) as noleggi 
    FROM registi r JOIN film f ON r.idregista = f.id_regista JOIN noleggi n ON f.idfilm = n.id_film 
    GROUP BY r.idregista, r.nome, f.idfilm, f.titolo 
    ORDER BY r.idregista, f.idfilm;`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}