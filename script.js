const board = document.querySelector(".game-board");

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const movesText = document.getElementById("moves");
const levelText = document.getElementById("level");
const timeText = document.getElementById("time");
const winText = document.getElementById("winMessage");

// IMAGES
const baseImages = [
  "apple.png",
  "banana.png",
  "grapes.png",
  "watermelon.png"
];

// SOUND
let flipSound = new Audio("sounds/flip.mp3");
let winSound = new Audio("sounds/win.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(()=>{});
}

// GAME VAR
let first = null;
let second = null;
let lock = false;

let moves = 0;
let matched = 0;
let level = 1;
let coins = 0;

let timer;
let time = 0;
let paused = false;

// START GAME
function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  resetGame();
}

// RESET GAME
function resetGame() {
  board.innerHTML = "";

  first = null;
  second = null;
  lock = false;

  moves = 0;
  matched = 0;
  time = 0;

  movesText.textContent = 0;
  levelText.textContent = level;
  timeText.textContent = 0;
  winText.textContent = "";

  startTimer();

  let deck = [...baseImages, ...baseImages].sort(()=>Math.random()-0.5);

  deck.forEach(img=>{
    let card = document.createElement("div");
    card.classList.add("card");

    let image = document.createElement("img");
    image.src = "images/" + img;

    card.appendChild(image);
    board.appendChild(card);

    card.addEventListener("click", flip);
  });
}

// TIMER
function startTimer() {
  clearInterval(timer);
  timer = setInterval(()=>{
    if(!paused){
      time++;
      timeText.textContent = time;
    }
  },1000);
}

// PAUSE
function pauseGame() {
  paused = !paused;
}

// FLIP
function flip() {
  if(lock || paused) return;
  if(this === first) return;

  playSound(flipSound);

  this.classList.add("show");

  if(!first){
    first = this;
    return;
  }

  second = this;
  moves++;
  movesText.textContent = moves;

  check();
}

// CHECK
function check() {
  let a = first.querySelector("img").src;
  let b = second.querySelector("img").src;

  if(a === b){
    matched++;
    reset();

    if(matched === baseImages.length){
      win();
    }
  } else {
    lock = true;

    setTimeout(()=>{
      first.classList.remove("show");
      second.classList.remove("show");
      reset();
    },600);
  }
}

// RESET
function reset() {
  first = null;
  second = null;
  lock = false;
}

// WIN
function win() {
  playSound(winSound);

  winText.textContent = "🎉 Level Complete!";
  function win() {
  playSound(winSound);

  coins += 10; // har level par coins
  coinsText.textContent = coins;

  winText.textContent = "🎉 Level Complete! +10 Coins";
  if(moves < bestScore){
  bestScore = moves;
  localStorage.setItem("best", bestScore);
  bestText.textContent = bestScore;
}

  setTimeout(()=>{
    if(level < 10){
      level++;
      resetGame();
    } else {
      winText.textContent = "🏆 Game Completed!";
    }
  },1200);
}

  setTimeout(()=>{
    if(level < 10){
      level++;
      resetGame();
    } else {
      winText.textContent = "🏆 You Finished All Levels!";
    }
  },1200);
}

const coinsText = document.getElementById("coins");
const bestText = document.getElementById("best");
bestText.textContent = bestScore;
let bestScore = localStorage.getItem("best") || 999;