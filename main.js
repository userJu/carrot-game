"use strict";
const startBtn = document.querySelector(".game__startBtn");
const play = `<i class="fas fa-play"></i>`;
const stop = `<i class="fas fa-stop"></i>`;
const gameTime = document.querySelector(".game__time");
const gameScore = document.querySelector(".game__numOfCarrots");
const ground = document.querySelector(".ground");
const groundRect = ground.getBoundingClientRect();
const itemNum = 5;
const popup = document.querySelector(".popup");

let timeLeft = 10;
let start = false;

// 1. 시작 버튼
startBtn.addEventListener("click", () => {
  changeShape();
});

function changeShape() {
  if (start === false) {
    startBtn.innerHTML = `${play}`;
    start = true;
  } else if (start === true) {
    startBtn.innerHTML = `${stop}`;
    randomItem();
    gameScore.innerHTML = itemNum;
    start = false;
  }
}
changeShape();

// - 버튼을 누르면 버튼의 모양이 바뀐다 < toggle 이용하기
// function changeShape(){
//     if(startBtn.innerHTML === play){
//         startBtn.innerHTML = `${stop}`
//         randomItem()
//         gameScore.innerHTML=itemNum
//     }else if (startBtn.innerHTML === stop){
//         startBtn.innerHTML = `${play}`
//     }
// }
// changeShape();

// - 버튼을 누르면 시간이 줄어든다
function setGameTime() {
  gameTime.innerHTML = `0:${timeLeft}`;
  timeLeft--;
}
function intervalFunction() {
  if (start === true) {
    console.log("인터벌시작");
    const interval = setInterval(setGameTime, 1000);
  } else {
    clearInterval(interval);
  }
}
intervalFunction();

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
    gameScore.innerHTML = carrot;
    carrotNum(carrot);
  } else if (target === "bug") {
    startBtn.innerHTML = `${stop}`;
    changeShape();
    popupInfo.innerHTML = "Return😢";
    popupBox();
  }
});
const popupInfo = document.querySelector(".result");

function carrotNum(carrot) {
  if (carrot === 0) {
    popupInfo.innerHTML = "congratulate!💕";
    popupBox();
  }
}

// - 벌레를 누르면 알람이 뜬다
function popupBox() {
  popup.style.visibility = "visible";
}
// 알람의 return 버튼을 클릭하면 게임이 다시 시작된다
const popupBtn = document.querySelector(".popup__btn");
popupBtn.addEventListener("click", () => {
  changeShape();
  popup.style.visibility = "hidden";
});
// - 제한 시간 내에 당근을 다 누르면 성공했다는 알람이 뜬다

// 3. 제한시간
// - 제한시간이 지나면 알람이 뜬다
