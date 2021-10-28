"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".popup");
    this.popUpBtn = document.querySelector(".popup__btn");
    this.popUpResult = document.querySelector(".result");
    this.popUpBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpResult.innerText = text;
    this.popUp.style.visibility = "visible";
  }
  hide() {
    this.popUp.style.visibility = "hidden";
  }
}
