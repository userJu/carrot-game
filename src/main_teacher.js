"use strict";
import PopUp from "./popup.js";
import field from "./field.js";
import * as sound from "./sound.js";
const gameBtn = document.querySelector(".game__startBtn");
const gameTimer = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__numOfCarrots");

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishPopup = new PopUp();
gameFinishPopup.setClickListener(() => {
  startGame();
});

const gameField = new field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onGroundClick);

function onGroundClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  sound.playBg();
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideStartBtn();
  gameFinishPopup.showWithText("REPLAY?");
  sound.playAlert();
  sound.stopBg();
}

function finishGame(win) {
  started = false;
  hideStartBtn();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  sound.stopBg();

  stopGameTimer();

  gameFinishPopup.showWithText(win ? "YOU WON🦩" : "YOU LOST💩");
}

function showStopBtn() {
  gameBtn.style.visibility = "visible";
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}
function hideStartBtn() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function stopGameTimer() {
  clearInterval(timer);
}
function updateTimerText(sec) {
  const minute = Math.floor(sec / 60);
  const second = sec % 60;
  gameTimer.innerHTML = `${minute}:${second}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}
