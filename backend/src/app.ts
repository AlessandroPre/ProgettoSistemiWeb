import express, { Express } from "express"
import cors from 'cors'
import history from "connect-history-api-fallback"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import filmRouter from "./routes/film-router"
import noleggiRouter from "./routes/noleggi-router"
import authRouter from "./routes/auth-router"

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static("public"))
//app.use(express.static("dist-frontend"))

app.use(cors())
app.use(bodyParser.json())
app.use(filmRouter)
app.use(noleggiRouter)

//autenticazione

app.use(cookieParser())
app.use(authRouter)


app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
