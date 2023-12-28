import { Request, Response } from "express"
import { getConnection } from "../utils/db"
import { decodeAccessToken } from "../utils/auth"

export const allFilms = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const [film] = await conn.execute(
    `SELECT *
    FROM film`
  )
  res.json(film)
}
//film per genere da git

//autenticazione
export const addFilm = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = decodeAccessToken(req, res)
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.")
    return
  }

  const conn = await getConnection()
  await conn.execute("INSERT INTO film (idfilm, id_regista, titolo, genere) VALUES (?, ?, ?, ?)", [
    req.body.idfilm,
    req.body.id_regista,
    req.body.titolo,
    req.body.genere,
  ])
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
  const [film] = await conn.execute("SELECT * FROM film WHERE idfilm=?", [req.params.idfilm])
  if (!Array.isArray(film) || film.length == 0) {
    res.status(404).send("film non trovato.")
    return
  }
  // Verifica che l'utente abbia i permessi per eliminare il post
  const film = film[0] as any
  if (film.authorId != user.id && user.role != "admin") {
    res.status(403).send("Non hai i permessi per eliminare questo film.")
    return
  }

  await conn.execute("DELETE FROM film WHERE id=?", [req.params.idfilm])
  res.json({ success: true })
}