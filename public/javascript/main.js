// select our 'get leaderboard' button
const url = "http://localhost:3000";
// const getGameTable = document.querySelector("#getleaderboard");
const gameButton = document.querySelector("#game-button");
const gameInput = document.querySelector("#game-input");
const genreInput = document.querySelector("#genres");
const ratingInput = document.querySelector("#ratings");
const gameDetails = document.querySelector(".game-details");
const gameImage = document.querySelector(".game-photo");
const theGames = document.querySelector(".thegames");
const whiteBox = document.querySelector("#whitebox");
const tableElement = document.querySelector("td");
const newTitle = document.querySelector("#titleinput");
const newSubmit = document.querySelector("#submit");

// select the table section
const gameTable = document.querySelector("#table");
alert("Prepare to have your mind blown!");
function addGames(game) {
  // const newLine = document.createElement("tr");
  // theGames.appendChild(newLine);
  const listItem = document.createElement("td");
  listItem.innerText = game;
  theGames.appendChild(listItem);
}

function addComment(game) {
  const comment = document.createElement("div");
  comment.innerText = game;
  whiteBox.appendChild(comment);
}

// add event listener to 'get leaderboard' button
// getGameTable.addEventListener("click", getGames);
gameButton.addEventListener("click", getGame);
newSubmit.addEventListener("click", post);

// create function that fetches the data from /scores and then calls our createLeaderboardView
// function to print it
async function getGames() {
  const response = await fetch(`${url}/games`);
  const { payload } = await response.json();
  gameTable.innerHTML = ""; // clear the text for clicking the button
  console.log(payload);
  for (let i = 0; i < payload.length; i++) {
    addGames(payload[i].title);
    addGames(payload[i].rating);
    addGames(payload[i].genre);
    addGames(payload[i].year);
    addGames(payload[i].developer);
    addComment(payload[i].comments);
  }

  // .forEach needed to be added so that it runs createLeaderboardView for each object in the database
  payload.map(function (userScore) {
    createGameView(userScore);
  });
}

async function getGame() {
  let game = gameInput.value;
  let genre = genreInput.value;
  let band = ratingInput.value;
  const response = await fetch(
    `${url}/games/?title=${game}&genre=${genre}&band=${band}`
  );
  const { payload } = await response.json();
  gameImage.src = payload[0].image;
  whiteBox.innerHTML = "";
  // theGames.innerHTML = "";
  // gameTable.innerHTML = ""; // clear the text for clicking the button
  for (let i = 0; i < payload.length; i++) {
    addGames(payload[i].title);
    addGames(payload[i].rating);
    addGames(payload[i].genre);
    addGames(payload[i].year);
    addGames(payload[i].developer);
    const newLine = document.createElement("tr");
    theGames.appendChild(newLine);
  }
  addComment(payload[0].comments);
}

async function post() {
  let title = newTitle.value;
  const response = await fetch("http://localhost:3000/games/post/json", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `{
  Title: ${title},
 }`,
  });

  response.json().then((data) => {
    console.log(data);
  });
}
// create callback function that renders the database and appends it the the table
// function createGameView({ title, rating, genre, year, developer, comments }) {
//   const newLine = document.createElement("tr");
//   const newGame = document.createElement("td");
//   const newRating = document.createElement("td");
//   const newGenre = document.createElement("td");
//   const newYear = document.createElement("td");
//   const newDeveloper = document.createElement("td");
//   const newComments = document.createElement("td");
//   leaderboard.appendChild(newLine);
//   newLine.appendChild(
//     newGame,
//     newRating,
//     newGenre,
//     newYear,
//     newDeveloper,
//     newComments
//   );
//   newGame.innerText = title;
//   newRating.innerText = rating;
//   newGenre.innerText = genre;
//   newYear.innerText = year;
//   newDeveloper.innerText = developer;
//   newComments.innterText = comments;
// }
