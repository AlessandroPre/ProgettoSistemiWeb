import { Request, Response } from "express"
import { getConnection } from "../utils/db"


export const allRental = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const [rentals] = await conn.execute(
    `SELECT *
    FROM noleggi`
  )
  res.json(rentals)
}

export const allFilm = async (req: Request, res: Response) => {
  const conn = await getConnection()
  const [film] = await conn.execute(
    `SELECT *
    FROM film`
  )
  res.json(film)
}


export const addRental = async (req: Request, res: Response) => {
  const conn = await getConnection();
  await conn.execute("INSERT INTO noleggi (datanoleggio, id_film, noleggiatore) VALUES (?, ?, ?)", 
  [ req.body.datanoleggio, req.body.id_film, req.body.noleggiatore ]);
  res.json({ success: true }
  ) 
}


export const deleteRental = async (req: Request, res: Response) => {
  const conn = await getConnection()
  await conn.execute("DELETE FROM noleggi WHERE idnoleggio=?", [req.params.idnoleggio])
  res.json({ success: true })
}


export const updateRental = async (req: Request, res: Response) => {
  const conn = await getConnection();
  await conn.execute(
    "UPDATE noleggi SET datanoleggio = ? WHERE idnoleggio = ?",
    [req.body.datanoleggio, req.params.idnoleggio]
  );
  res.json({ success: true });
}; 
