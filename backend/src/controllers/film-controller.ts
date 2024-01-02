import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getConnection } from "../utils/db"
import { decodeAccessToken } from "../utils/auth"

export async function allFilms(req: Request, res: Response) {
  // Se req.query.idfilm è undefined, usa null altrimenti usa il valore di req.query.idfilm
  const idfilm = req.query.idfilm === undefined ? null : req.query.idfilm as string;
  connection.execute(
    `SELECT *
    FROM film
    WHERE idfilm=?`, // Aggiungi la condizione WHERE idfilm=?
    [idfilm], // Usa la variabile idfilm come parametro
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function filmFromGenre(req: Request, res: Response) {
  connection.execute(
    `SELECT film.titolo, film.genere
    FROM film
    WHERE film.genere=?`,
    [req.params.genere as string], // Specifica il tipo di req.params.genere come string
    function(err, results, fields) {
      res.json(results)
    }
  )
}

//autenticazione
export const addFilm = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = decodeAccessToken(req, res)
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }

  const conn = await getConnection()
  await conn.execute("INSERT INTO film (idfilm, id_regista, titolo, genere, idGestore) VALUES (?, ?, ?, ?, ?)", [ // Aggiungi il parametro idGestore nella query
    req.body.idfilm,
    req.body.id_regista,
    req.body.titolo,
    req.body.genere,
    req.body.idGestore
  ]) // Usa await prima di conn.execute
  res.json({ success: true })
}

export const deleteFilm = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = decodeAccessToken(req, res)
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }

  const conn = await getConnection()
  // Verifica che il film esista
  const film = await conn.execute("SELECT * FROM film WHERE idfilm=?", [req.params.idfilm]) // Usa await prima di conn.execute
  if (!Array.isArray(film) || film.length == 0) {
    res.status(404).send("film non trovato.")
    return
  }
  // Verifica che l'utente abbia i permessi per eliminare il post
  const PermissionFilm = film[0] as any // Usa un nome diverso per la variabile o usa la stessa variabile senza dichiararla di nuovo
  if (PermissionFilm.idfilm != user.id && user.role != "admin") {
    res.status(403).send("Non hai i permessi per eliminare questo film.")
    return
  }

  await conn.execute("DELETE FROM film WHERE idfilm=?", [req.params.idfilm]) // Usa await prima di conn.execute
  res.json({ success: true })
}
