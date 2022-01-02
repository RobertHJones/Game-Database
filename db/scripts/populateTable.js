import { query } from "../index.js";
import { games } from "../../games.js";

const sqlString = `INSERT INTO games (title, rating, band, genre, year, developer, comments, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user`;

async function populateGamesTable() {
  for (let i = 0; i < games.length; i++) {
    let { title, rating, band, genre, year, developer, comments, image } =
      games[i];

    const res = await query(sqlString, [
      title,
      rating,
      band,
      genre,
      year,
      developer,
      comments,
      image,
    ]);
    console.log(res);
  }
}

populateGamesTable();
