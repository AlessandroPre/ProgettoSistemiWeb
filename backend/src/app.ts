import express, { Express } from "express"
import cors from 'cors'
import filmRouter from "./routes/film-router"
import registiRouter from "./routes/registi-router"
import noleggiRouter from "./routes/noleggi-router"
import history from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist-frontend"))

app.use(cors())
app.use(filmRouter)
app.use(registiRouter)
app.use(noleggiRouter)

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
