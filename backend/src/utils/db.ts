import mysql, { Connection } from 'mysql2'

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
