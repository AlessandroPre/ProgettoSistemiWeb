import { compareSync } from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

// Campi da inserire nell'access token
interface User {
  id: number
  username: string
  role: "admin" | "user"
}

const JWT_SECRET = "foo"
const COOKIE_NAME = "access-token"

/**
 * Codifica l'utente in un access token e lo imposta come cookie.
 * Usato in fase di registrazione e login.
 */
export const setAccessToken = (req: Request, res: Response, user: any) => {
  // Crea l'access token con JWT
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
  // Imposta l'access token come cookie
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 86400000, // 1 giorno in millisecondi --> durata access token
    httpOnly: true,
    sameSite: true
    //secure: true
  })
}

/**
 * Decodifica l'access token, ottenendo l'utente.
 * Usato per verificare se l'utente ha effettuato il login.
 */
export const decodeAccessToken = (req: Request, res: Response) => {
  // Ottiene il cookie dell'access token
  //console.log(req.cookies)
  const accessToken = req.cookies && req.cookies[COOKIE_NAME]
  //console.log(accessToken)
  // Restituisce i dati dell'utente contenuti nell'access token, oppure null se il token è mancante o invalido
  if (!accessToken) return null
  try {
    const user = jwt.verify(accessToken, JWT_SECRET) as User
    return user
  } catch {
    return null
  }
}

/**
 * Cancella il cookie contente l'access token.
 * Usato per effettuare il logout.
 */
export const deleteAccessToken = (req: Request, res: Response) => {
  // Cancella il cookie dell'access token
  res.clearCookie(COOKIE_NAME)
}
