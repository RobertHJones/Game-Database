import { query } from "../db/index.js";

// Write a function for get, post, put/patch and delete, as well as get by id etc

// GET ALL GAMES
export async function getAllGames() {
  console.log("test");
  const data = await query(`SELECT * FROM games;`);
  console.log("games are", data);
  return data.rows;
}
// GET GAME BY ID
export async function getGameByID(id) {
  const data = await query(`SELECT * FROM games WHERE id = $1;`, [id]);
  return data.rows;
}
// GET GAME BY TITLE ETC
export async function getGameByTitle(title) {
  const data = await query(
    `SELECT * FROM games WHERE title ILIKE '%' || $1 || '%';`,
    [title]
  );
  return data.rows;
}
export async function getGameByGenre(genre) {
  const data = await query(
    `SELECT * FROM games WHERE genre ILIKE '%' || $1 || '%';`, // Percent % matches any sequence of characters
    [genre]
  );
  return data.rows;
}
export async function getGameByDeveloper(developer) {
  const data = await query(
    `SELECT * FROM games WHERE developer ILIKE '%' || $1 || '%';`, // Percent % matches any sequence of characters
    [developer]
  );
  return data.rows;
}
export async function getGameByYear(year) {
  const data = await query(`SELECT * FROM games WHERE year = $1;`, [year]);
  return data.rows;
}
export async function getGameByRating(rating) {
  const data = await query(`SELECT * FROM games WHERE rating = $1;`, [rating]);
  return data.rows;
}

// ADD NEW GAME
export async function addNewGame(newGame) {
  const data = await query(`INSERT INTO games (title) VALUES ($1);`, [newGame]);
  // const data = await query (`INSERT INTO games (title, rating, genre, year, developer, comments) VALUES ($1, $2, $3, $4, $5, $6);` [newGame])
  return data.rows;
}
// DELETE GAME
export async function deleteGame(gameId) {
  const data = await query(`DELETE FROM games WHERE id = $1`, [gameId]);
  return data.rows;
}
// REPLACE GAME
export async function replaceGame(gameId, newGame) {
  const data = await query(
    `UPDATE games SET (title, rating, genre, year, developer, comments) VALUES ($1, $2, $3, $4, $5, $6) WHERE id = $7`,
    [newGame],
    [gameId]
  );
  return data.rows;
}

// UPDATE GAME
export async function updateScoresByID(id, update) {
  const data = await query(`SELECT * FROM scores WHERE id = $1;`, [id]);
  return data.rows;
}
