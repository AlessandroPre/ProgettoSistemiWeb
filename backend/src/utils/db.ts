import mysql, { Connection } from 'mysql2/promise'

/*export const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mioDB'
})*/

//autenticazione
let conn: Connection | null = null
export const getConnection = async () => {
  if (!conn) {
    conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mioDB",
    })
  }
  return conn
}

