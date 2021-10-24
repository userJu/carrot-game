"use strict";
const startBtn = document.querySelector(".game__startBtn");
const play = `<i class="fas fa-play"></i>`;
const stop = `<i class="fas fa-stop"></i>`;
const gameTime = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__numOfCarrots");
const ground = document.querySelector(".ground");
const groundRect = ground.getBoundingClientRect();
const popup = document.querySelector(".popup");
const popupInfo = document.querySelector(".result");

const itemNum = 5;
const gameSecond = 3;

const alertSound = new Audio("sound/alert.wav");
const bg = new Audio("sound/bg.mp3");
const bug_pull = new Audio("sound/bug_pull.mp3");
const carrot_pull = new Audio("sound/carrot_pull.mp3");
const game_win = new Audio("sound/game_win.mp3");

let timer = false;
let start = false;

// 1. 시작 버튼
startBtn.addEventListener("click", () => {
  changeShape();
});

function changeShape() {
  if (start === false) {
    startBtn.innerHTML = `${play}`;
    stopTimer();
    popupBox();
    soundStop(bg);
    soundPlay(alertSound);
    popupInfo.innerHTML = "REPLAY❔";
  } else if (start === true) {
    startBtn.innerHTML = `${stop}`;
    popup.style.visibility = "hidden";
    randomItem();
    gameTimer();
    soundPlay(bg);
    gameScore.innerHTML = itemNum;
  }
  start = !start;
}

// - 버튼을 누르면 시간이 줄어든다
function gameTimer() {
  let time = gameSecond;
  timer = setInterval(() => {
    timeRemaining(time);
    if (time <= 0) {
      popupInfo.innerHTML = "Return😢";
      changeShape();
      popupBox();
      clearInterval(intervalTime);
      return;
    }
    time--;
  }, 1000);
}

function timeRemaining(time) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  gameTime.innerHTML = `${minute}:${second}`;
}
function stopTimer() {
  clearInterval(timer);
}

// - 버튼을 누르면 벌레와 당근이 무작위로 ground에 생성된다

function randomItem() {
  ground.innerHTML = "";
  addItem("carrot", itemNum, "img/carrot.png", 80);
  addItem("bug", itemNum, "img/bug.png", 50);
}

function addItem(className, count, imgPath, size) {
  const width = groundRect.width;
  const height = groundRect.height;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.src = imgPath;
    item.setAttribute("class", className);
    item.setAttribute("data-name", className);

    ground.appendChild(item);
    const x = Math.floor(Math.random() * (width - size));
    const y = Math.floor(Math.random() * (height - size));
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  }
}

let carrot = itemNum;
// 2. 벌레와 당근
// - 당근을 누르면 당근의 개수가 줄어드는 것이 표시된다
ground.addEventListener("click", (e) => {
  const target = e.target.dataset.name;
  if (target === "carrot") {
    carrot = ground.childElementCount - itemNum - 1;
    e.target.remove();
    soundPlay(carrot_pull);
    gameScore.innerHTML = carrot;
    carrotNum(carrot);
  } else if (target === "bug") {
    startBtn.innerHTML = `${stop}`;
    soundPlay(bug_pull);
    changeShape();
    stopTimer();
    popupInfo.innerHTML = "Return😢";
    soundStop(bg);
    soundPlay(alertSound);
    popupBox();
  } else {
    return;
  }
});

function carrotNum(carrot) {
  if (carrot === 0) {
    changeShape();
    soundStop(bg);
    soundStop(alertSound);
    soundPlay(game_win);
    popupInfo.innerHTML = "congratulate!💕";
    stopTimer();
    popupBox();
  }
}

// - 알람이 뜬다
function popupBox() {
  popup.style.visibility = "visible";
}
// - 알람의 return 버튼을 클릭하면 게임이 다시 시작된다
const popupBtn = document.querySelector(".popup__btn");
popupBtn.addEventListener("click", () => {
  changeShape();

  popup.style.visibility = "hidden";
});
// - 음악 재생
function soundPlay(sound) {
  sound.play();
}
// - 음악 정지
function soundStop(sound) {
  sound.pause();
  sound.currentTime = 0;
}

// 3. 제한시간
// - 제한시간이 지나면 알람이 뜬다
