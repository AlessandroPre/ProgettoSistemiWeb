import { Request, Response } from "express"
// Importa getConnection invece di connection
import { getConnection } from "../utils/db"

export async function allDirector(req: Request, res: Response) {
  // Usa getConnection per ottenere la connessione al database
  const conn = await getConnection()
  conn.execute(
    `SELECT *
    FROM registi`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmFromDirector(req: Request, res: Response) {
  // Usa getConnection per ottenere la connessione al database
  const conn = await getConnection()
  conn.execute(
    `SELECT r.nome AS nome_regista, f.titolo AS titolo_film 
    FROM registi r JOIN film f ON r.idregista = f.id_regista 
    GROUP BY r.nome, f.titolo ORDER BY r.nome;`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}
