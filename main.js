// Query Selectors
const gamePage = document.querySelector(".main");
const gameOverPage = document.querySelector(".main-2");
const leftBackgroundImg = document.querySelector(".left-section");
const rightBackgroundImg = document.querySelector(".right-section");
const personName1 = document.querySelector(".left-heading");
const personName2 = document.querySelector(".right-heading");
const person1Followers = document.querySelector(".left-sub-heading");
const higherBtn = document.querySelector(".higher-btn");
const lowerBtn = document.querySelector(".lower-btn");
const vsLogo = document.querySelector(".vs-logo");
const highScoreDisplay = document.querySelector(".high-score");
const scoreDisplay = document.querySelector(".score");
const gameOverScore = document.querySelector(".game-over-score");
const playAgainBtn = document.querySelector(".play-again-btn");
const spanName = document.querySelector("span");

// Event Listeners
higherBtn.addEventListener("click", getHigherEvent);
lowerBtn.addEventListener("click", getLowerEvent);
playAgainBtn.addEventListener("click", playAgain);

// Global Variables
let currentPerson1;
let currentPerson2;
let highScore = 0;
let currentScore = 0;

// Functions

// Get First Person
function getFirstPerson() {
  currentPerson1 = data[getRandomIndex()];
  personName1.innerText = currentPerson1.name;
  person1Followers.innerText = currentPerson1.followers.toLocaleString("en-US");
  leftBackgroundImg.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
url('${currentPerson1.img}') no-repeat top center/cover`;
  spanName.innerText = currentPerson1.name;
}

// Get Second Person
function getSecondPerson() {
  currentPerson2 = data[getRandomIndex()];
  personName2.innerText = currentPerson2.name;
  rightBackgroundImg.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
  url('${currentPerson2.img}') no-repeat top center/cover`;
}
getFirstPerson();
getSecondPerson();

// Check which is higher
function getHigherEvent() {
  if (currentPerson2.followers > currentPerson1.followers) {
    addToScore();
    getWinColor();
    changeColorBack();
    currentPerson1 = currentPerson2;
    personName1.innerText = currentPerson1.name;
    person1Followers.innerText =
      currentPerson1.followers.toLocaleString("en-US");
    leftBackgroundImg.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
    url('${currentPerson1.img}') no-repeat top center/cover`;
    getNextPerson();
  } else {
    getLoseColor();
    changeColorBack();
    getToGameOverPage();
  }
}

function getLowerEvent() {
  if (currentPerson2.followers < currentPerson1.followers) {
    addToScore();
    getWinColor();
    changeColorBack();
    currentPerson1 = currentPerson2;
    personName1.innerText = currentPerson1.name;
    person1Followers.innerText =
      currentPerson1.followers.toLocaleString("en-US");
    leftBackgroundImg.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
    url('${currentPerson1.img}') no-repeat top center/cover`;
    getNextPerson();
  } else {
    getLoseColor();
    changeColorBack();
    getToGameOverPage();
  }
}

function getNextPerson() {
  let newIndex = Math.floor(Math.random() * data.length) + 1;
  let nextPerson = data[newIndex];
  currentPerson2 = nextPerson;
  personName2.innerText = currentPerson2.name;
  spanName.innerText = currentPerson1.name;
  rightBackgroundImg.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
  url('${currentPerson2.img}') no-repeat top center/cover`;
}

function getRandomIndex() {
  let newIndex = Math.floor(Math.random() * data.length);
  return newIndex;
}

function addToScore() {
  currentScore += 1;
  scoreDisplay.innerText = `Score: ${currentScore}`;
}

function getWinColor() {
  vsLogo.style.background = "green";
  vsLogo.style.transform = "scale(1.5)";
}

function getLoseColor() {
  vsLogo.style.background = "red";
  vsLogo.style.transform = "scale(1.5)";
}

function changeColorBack() {
  setTimeout(() => {
    vsLogo.style.background = "#fff";
    vsLogo.style.transform = "scale(1)";
  }, 1000);
}

function playAgain() {
  gamePage.classList.remove("hidden");
  gameOverPage.classList.add("hidden");
  currentScore = 0;
  scoreDisplay.innerText = `Score: ${currentScore}`;
  getFirstPerson();
  getSecondPerson();
}

function getToGameOverPage() {
  setTimeout(() => {
    gamePage.classList.add("hidden");
    gameOverPage.classList.remove("hidden");
    gameOverScore.innerText = currentScore;
    if (highScore < currentScore) {
      highScore = currentScore;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
      console.log(highScore);

      // This is to get the users high score before starting a new game
      highScoreToStore = currentScore;
      let stringifiedHighScore = JSON.stringify(highScoreToStore);
      localStorage.setItem("User High Score", stringifiedHighScore);
    }
  }, 1300);
}

// Local Storage
let highScoreToStore;
let retrievedHighScore = localStorage.getItem("User High Score");
let parsedHighScore = JSON.parse(retrievedHighScore);
highScore = parsedHighScore;
highScoreDisplay.innerText = `High Score: ${highScore}`;
