/* DOM elements */
const difficultySelect = document.getElementById("select-difficulty");
const startButton = document.getElementById("start-btn");
const input = document.getElementById("user-input");
const timerStyle = document.querySelector(".timer");
const screenTimer = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const reset = document.querySelector(".reset");

/* Variables */
let gameDifficulty = "easy";
let chosenWord = "";
let scrambledWord = "";
let usedNumbers = [-1];
let score = 0;
let time = 30;

const MAX_SCORE = 50;

/* Word rrays */

const easyArray = [
  "love",
  "moon",
  "light",
  "dark",
  "sword",
  "spoon",
  "soup",
  "earth",
  "bag",
  "door",
  "chair",
  "smile",
  "face",
  "hair",
  "shoe",
  "dress",
  "cheese",
  "teeth",
  "mouse",
  "bed",
  "fox",
  "rain",
  "sun",
  "snow",
  "leaf"
];

const mediumArray = [
  "monkey",
  "shadow",
  "castle",
  "water",
  "sugar",
  "eyebrow",
  "football",
  "bottle",
  "circle",
  "puppet",
  "paper",
  "notebook",
  "kitten",
  "yellow",
  "after",
  "button",
  "cotton",
  "morning",
  "trumpet",
  "hospital",
  "pancake",
  "whistle",
  "fireworks",
  "mistake",
  "crystal"
];

const hardArray = [
  "snowflake",
  "sunshine",
  "horrendous",
  "politician",
  "watermelon",
  "calculator",
  "conversation",
  "caterpillar",
  "helicopter",
  "cauliflower",
  "librarian",
  "jellyfish",
  "motorbike",
  "pineapple",
  "thermometer",
  "asparagus",
  "syllable",
  "zucchini",
  "disappointment",
  "neighborhood",
  "hippopotamus",
  "scientific",
  "photograph",
  "supermarket",
  "alphabetical"
];

/* Functions */

// 1. Choose difficulty
function chooseDifficulty() {
  if (difficultySelect.value === "medium") {
    gameDifficulty = "medium";
  } else if (difficultySelect.value === "hard") {
    gameDifficulty = "hard";
  } else {
    gameDifficulty = "easy";
  }
}

// 2. Victoire
function victory() {
  clearInterval(timer);
  document.querySelector(".section-b").style.display = "none";
  document.querySelector(".section-c").style.display = "block";
  document.getElementById("messageVictory").innerHTML = `Congratulations ! You've reached the maximum score of ${MAX_SCORE}.`;
}


// 3. Game over
function gameOver() {
  clearInterval(timer);

  document.querySelector(".section-b").style.display = "none";
  document.querySelector(".section-c").style.display = "block";

  document.getElementById(
    "messageFailed"
  ).innerHTML = `The hidden word was ${chosenWord.toUpperCase()}. <br/>
  Final score: ${score}`;

  let playAgain = document.getElementById("play-again");
  playAgain.addEventListener("click", reloadGame);
}

// 4. Countdown
function countdown() {
  if (time > 0) {
    time--;
    screenTimer.innerHTML = time;
  } else {
    gameOver();
  }

  if (time < 16 && time > 8) {
    timerStyle.style.border = "8px solid rgb(254, 158, 68)";
  } else if (time < 8) {
    timerStyle.style.border = "8px solid rgb(253, 99, 65)";
  }
}

// 5. Start new timer
function resetTimer() {
  time = 30;
  screenTimer.innerHTML = time;
  timerStyle.style.border = "8px solid rgb(1, 194, 154)";
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

// 6. Get number
// FIX ---> avoid repeated words
function getNumber(array) {
  let number = Math.floor(Math.random() * array.length);
  for (let i = 0; i < usedNumbers.length; i++) {
    if (number !== usedNumbers[i]) {
      usedNumbers.push(number);
      return number;
    } else {
      getNumber(array);
    }
  }
}

// 7. Choose word
function chooseWord(array) {
  let randomWord = "";
  let randomNum = getNumber(array);
  randomWord = array[randomNum];
  return randomWord;
}

// 8. Scramble word
function scrambleWord(word) {
  let a = word.split(""),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

// 9. Start game
function startGame() {
  resetTimer();

  document.querySelector(".section-a").style.display = "none";
  document.querySelector(".section-b").style.display = "block";

  input.value = "";

  scoreDisplay.innerHTML = `Score: ${score}`;

  if (gameDifficulty === "easy") {
    chosenWord = chooseWord(easyArray);
    scrambledWord = scrambleWord(chosenWord);
  } else if (gameDifficulty === "medium") {
    chosenWord = chooseWord(mediumArray);
    scrambledWord = scrambleWord(chosenWord);
  } else if (gameDifficulty === "hard") {
    chosenWord = chooseWord(hardArray);
    scrambledWord = scrambleWord(chosenWord);
  }

  document.getElementById("word").innerHTML = scrambledWord.toUpperCase();
}

// 10. Compare words
function compareWords() {
  if (input.value === chosenWord) {
    score += 5;
    startGame();
  }
}

// 11. Compare words mise à jour
function compareWords() {
  if (input.value === chosenWord) {
    score += 5;
    scoreDisplay.innerHTML = `Score: ${score}`;

    if (score >= MAX_SCORE) {
      victory();
      return; // Arrête la fonction pour ne pas redémarrer le jeu
    }

    startGame();
  }
}

// 12. Reload
function reloadGame() {
  location.reload(true);
}

/* Event listeners */
difficultySelect.addEventListener("input", chooseDifficulty);
startButton.addEventListener("click", startGame);
input.addEventListener("input", compareWords);
reset.addEventListener("click", reloadGame);