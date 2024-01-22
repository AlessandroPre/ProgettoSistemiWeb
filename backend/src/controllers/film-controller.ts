import { Request, Response } from "express"
import { getConnection } from "../utils/db"

export const allFilms = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const [film] = await conn.execute(
    `SELECT *
    FROM film`
  )
  res.json(film)
}

export const allDirector = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const [registi] = await conn.execute(
    `SELECT *
    FROM registi`
  )
  res.json(registi)
}

//autenticazione
export const addFilm = async (req: Request, res: Response) => {
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
  const conn = await getConnection()
  await conn.execute("DELETE FROM film WHERE idfilm=?", [req.params.idfilm])
  res.json({ success: true })
}

export const updateFilm = async (req: Request, res: Response) => {
  const conn = await getConnection();
  await conn.execute(
    "UPDATE film SET titolo = ?, genere = ?, id_regista = ? WHERE idfilm = ?",
    [req.body.titolo, req.body.genere, req.body.id_regista, req.params.idfilm]
  );
  res.json({ success: true });
}; 
