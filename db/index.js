// const { Pool } = require('pg')
import pg from "pg";
import { host, dbname, username, password, port } from "../config.js";

console.log(host);
// const pool = new Pool()
const pool = new pg.Pool({
  // data from heroku
  user: username,
  host: host,
  database: dbname,
  password: password,
  port: port,
  ssl: { rejectUnauthorized: false },
});

export async function query(text, params, callback) {
  return pool.query(text, params, callback);
}
