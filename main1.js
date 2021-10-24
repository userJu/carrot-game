"use strict";
const gameStartBtn = document.querySelector(".game__startBtn");
const playShape = `<i class="fas fa-play"></i>`;
const stopShape = `<i class="fas fa-stop"></i>`;

const gameTime = document.querySelector(".game__time");

const ground = document.querySelector(".ground");
const groundHeight = ground.offsetHeight;
const groundWidth = ground.offsetWidth;

const popup = document.querySelector(".popup");
const popupBtn = document.querySelector(".popup__btn");
const popupResult = document.querySelector(".result");

const itemNum = 5;

let start = false;

gameStartBtn.addEventListener("click", gameState);
function gameState() {
  if (!start) {
    gameStart();
  } else {
    gameStop();
  }
  start = !start;
}
function gameStart() {
  buttonShape(stopShape);
  displayItems();
  intervalTime();
  visibility(gameStartBtn, "visible");
  console.log("시작");
}
function gameStop() {
  buttonShape(playShape);
  deleteItems();
  intervalTimeStop();
  visibility(gameStartBtn, "hidden");

  console.log("끝");
}
function buttonShape(shape) {
  gameStartBtn.innerHTML = `${shape}`;
}

function displayItems() {
  deleteItems();
  for (let i = 0; i < itemNum; i++) {
    bringItems("bug", 50);
    bringItems("carrot", 80);
  }
}

function bringItems(item, size) {
  const x = Math.floor(Math.random() * (groundWidth - size));
  const y = Math.floor(Math.random() * (groundHeight - size));
  const img = document.createElement("img");
  img.setAttribute("class", item);
  img.setAttribute("src", `img/${item}.png`);
  ground.appendChild(img);
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
}
function deleteItems() {
  ground.innerHTML = "";
}

let interval = false;
const playTime = 3;

function intervalTime() {
  let countTime = playTime;
  interval = setInterval(() => {
    displayTime(countTime);
    countTime--;
    if (countTime < 0) {
      intervalTimeStop();
    }
  }, 1000);
}

function intervalTimeStop() {
  clearInterval(interval);
  showResult("RETURN❔");
}
function displayTime(countTime) {
  const minute = Math.floor(countTime / 60);
  const second = countTime % 60;
  gameTime.innerHTML = `${minute}:${second}`;
}

function showResult(message) {
  visibility(popup, "visible");
  visibility(gameStartBtn, "hidden");
  popupResult.innerHTML = message;
  buttonShape(playShape);
}

popupBtn.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  start = true;
  gameStart();
});

function visibility(things, state) {
  things.style.visibility = state;
}
let carrotNum = itemNum;

const gameCarrotsNum = document.querySelector(".game__numOfCarrots");
ground.addEventListener("click", (e) => {
  const target = e.target;
  console.dir(target);
  if (target.matches(".ground")) {
    return;
  } else if (target.matches(".carrot")) {
    console.log("🥕");
    target.remove();

    if (carrotNum === 0) {
      console.log("끝");
    }
  } else {
    console.log("🐛");
  }
});
