"use strict";

import field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__time");
    this.gameScore = document.querySelector(".game__numOfCarrots");
    this.gameBtn = document.querySelector(".game__startBtn");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onGroundClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.init();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBg();
  }
  stop() {
    this.started = false;
    this.stopTimer();
    this.hideStartBtn();
    sound.playAlert();
    sound.stopBg();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideStartBtn();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBg();
    this.stopTimer();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onGroundClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  showStopBtn() {
    this.gameBtn.style.visibility = "visible";
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }
  hideStartBtn() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  updateTimerText(sec) {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    this.gameTimer.innerHTML = `${minute}:${second}`;
  }

  init() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
