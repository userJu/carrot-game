"use strict";

const soundAlert = new Audio("sound/alert.wav");
const soundBg = new Audio("sound/bg.mp3");
const soundBug = new Audio("sound/bug_pull.mp3");
const soundCarrot = new Audio("sound/carrot_pull.mp3");
const soundWin = new Audio("sound/game_win.mp3");

export function playCarrot() {
  playSound(soundCarrot);
}
export function playBug() {
  playSound(soundBug);
}
export function playWin() {
  playSound(soundWin);
}
export function playAlert() {
  playSound(soundAlert);
}
export function playBg() {
  playSound(soundBg);
}
export function stopBg() {
  stopSound(soundBg);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
