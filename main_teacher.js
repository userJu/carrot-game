"use strict";

const ground = document.querySelector(".ground");
const groundRect = ground.getBoundingClientRect();

const gameBtn = document.querySelector(".game__startBtn");
const gameTimer = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__numOfCarrots");

const popUp = document.querySelector(".popup");
const popUpBtn = document.querySelector(".popup__btn");
const popUpResult = document.querySelector(".result");

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const soundAlert = new Audio("sound/alert.wav");
const soundBg = new Audio("sound/bg.mp3");
const soundBug = new Audio("sound/bug_pull.mp3");
const soundCarrot = new Audio("sound/carrot_pull.mp3");
const soundWin = new Audio("sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

ground.addEventListener("click", onGroundClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpBtn.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(soundBg);
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideStartBtn();
  showPopUpWithText("REPLAY?");
  playSound(soundAlert);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideStartBtn();
  if (win) {
    playSound(soundWin);
  } else {
    playSound(soundBug);
    stopSound(soundBg);
  }
  stopGameTimer();

  showPopUpWithText(win ? "YOU WON🦩" : "YOU LOST💩");
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

function showPopUpWithText(text) {
  popUpResult.innerText = text;
  popUp.style.visibility = "visible";
}

function hidePopUp() {
  popUp.style.visibility = "hidden";
}
function initGame() {
  score = 0;
  ground.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  //벌레와 당근을 생성한뒤 field에 추가해줌
  addItem("carrot", CARROT_COUNT, "img/carrot.png", 80);
  addItem("bug", BUG_COUNT, "img/bug.png", 50);
}

function onGroundClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(soundCarrot);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
      stopSound(soundBg);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;

  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath, size) {
  const x1 = 0;
  const y1 = 0;
  const x2 = groundRect.width;
  const y2 = groundRect.height;
  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    const randomX = randomNumber(x1, x2 - size);
    const randomY = randomNumber(y1, y2 - size);
    img.style.left = `${randomX}px`;
    img.style.top = `${randomY}px`;

    img.setAttribute("class", className);
    img.setAttribute("src", imgPath);
    ground.appendChild(img);
  }
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
