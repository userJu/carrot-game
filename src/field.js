`use strict`;

import * as sound from "./sound.js";

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.ground = document.querySelector(".ground");
    this.groundRect = this.ground.getBoundingClientRect();
    this.ground.addEventListener("click", this.onClick);
  }

  init() {
    this.ground.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png", 80);
    this._addItem("bug", this.bugCount, "img/bug.png", 50);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
  _addItem(className, count, imgPath, size) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.groundRect.width;
    const y2 = this.groundRect.height;
    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      const randomX = randomNumber(x1, x2 - size);
      const randomY = randomNumber(y1, y2 - size);
      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;

      img.setAttribute("class", className);
      img.setAttribute("src", imgPath);
      this.ground.appendChild(img);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  };
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
