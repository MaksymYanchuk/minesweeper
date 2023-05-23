"use strict";
import minesweeper from "./modules/minesweeper.js";
import username from "./modules/username.js";
import stats from "./modules/stats.js";
import copyText from "./modules/copyText.js";

window.addEventListener("DOMContentLoaded", () => {

  let gameState = {
    difficulty: 'Easy',
    player: 'Unknown',
    time: 0,
    minesCount: 10,
    mines: "",
    rows: 9,
    columns: 9,
    lost: false,
    win: false,
    firstClick: true,
    clicks:0,
  };

  minesweeper(gameState);
  username(gameState);
  stats();
  copyText(document.querySelector('.footer__card_copy'),'.card-number');
 
});
