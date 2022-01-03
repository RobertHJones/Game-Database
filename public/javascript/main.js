const url = "http://localhost:3000";
// const getGameTable = document.querySelector("#getleaderboard");
const gameButton = document.querySelector("#game-button");
const gameInput = document.querySelector("#game-input");
const genreInput = document.querySelector("#genres");
const ratingInput = document.querySelector("#ratings");
const gameDetails = document.querySelector(".game-details");
const gameImage = document.querySelector(".game-photo");
const theGames = document.querySelector(".thegames");
const theGamesTable = document.querySelector(".tableone");
const whiteBox = document.querySelector("#whitebox");
const tableElement = document.querySelectorAll("td");
const newTitle = document.querySelector("#titleinput");
const newRating = document.querySelector("#ratinginput");
const newGenre = document.querySelector("#genreinput");
const newYear = document.querySelector("#yearinput");
const newDeveloper = document.querySelector("#developerinput");
const newSubmit = document.querySelector("#submit");
const tBody = document.querySelector("#tbody");

// select the table section
const gameTable = document.querySelector("#table");
alert("Prepare to have your mind blown!");

// function to return game(s)
function addGames(game) {
  // const newLine = document.createElement("tr");
  // theGames.appendChild(newLine);
  const listItem = document.createElement("td");
  listItem.innerText = game;
  tBody.appendChild(listItem);
}

// function to add in the comment into the brain thought
function addComment(game) {
  const comment = document.createElement("div");
  comment.innerText = game;
  whiteBox.appendChild(comment);
}

// getGameTable.addEventListener("click", getGames);
gameButton.addEventListener("click", getGame);
newSubmit.addEventListener("click", post);

async function getGame() {
  let game = gameInput.value;
  let genre = genreInput.value;
  let band = ratingInput.value;
  const response = await fetch(
    `${url}/games/?title=${game}&genre=${genre}&band=${band}`
  ); //title=${game}&genre=${genre}&band=${band}
  const { payload } = await response.json();
  gameImage.src = payload[0].image;
  whiteBox.innerHTML = "";
  while (tBody.hasChildNodes()) {
    tBody.removeChild(tBody.lastChild);
  }
  for (let i = 0; i < payload.length; i++) {
    addGames(payload[i].title);
    addGames(payload[i].rating);
    addGames(payload[i].genre);
    addGames(payload[i].year);
    addGames(payload[i].developer);
    const newLine = document.createElement("tr");
    tBody.appendChild(newLine);
  }
  addComment(payload[0].comments);
}

// Post request to add new game
async function post() {
  let title = newTitle.value;
  let rating = newRating.value;
  let genre = newGenre.value;
  let year = newYear.value;
  let developer = newDeveloper.value;

  const response = await fetch("http://localhost:3000/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      Rating: rating,
      Genre: genre,
      Year: year,
      Developer: developer,
    }),
  });

  response.json().then((data) => {
    console.log(data);
  });

  alert(`${title} added to database`);
}
