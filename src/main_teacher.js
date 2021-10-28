"use strict";
import PopUp from "./popup.js";
import Game from "./game.js";

const gameFinishPopup = new PopUp();
gameFinishPopup.setClickListener(() => {
  game.start();
});

const game = new Game(5, 5, 5);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "replay?";
      break;
    case "win":
      message = "you won";
      break;
    case "lose":
      message = "you lost";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishPopup.showWithText(message);
});
