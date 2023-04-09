"use strict";
import { getRandomNumbers,
          intersect,
          switchClass,
          checkCells
        } from "./helpers.js";

window.addEventListener("DOMContentLoaded", () => {

  let gameProperty = {
    minesCount: 10,
    rows: 9,
    columns: 9,
    lost: false,
  }
  
  let board,
    timerInterval;
    

  const difficultyButtonsContainer = document.querySelector(
      ".difficulty-level__list"
    ),
    difficultyButtonSelector = ".difficulty-level__list__button",
    cellSelector = ".cell",
    cellSize = 40;

  let mines = getRandomNumbers(0, gameProperty.rows * gameProperty.columns, gameProperty.minesCount),
      minesAround;

  const cellClasses = {
    cell: "cell",
    closed: "cell_closed",
    flag: "cell_flag",
    d0: "cell_clear",
    d1: "cell_digit-1",
    d2: "cell_digit-2",
    d3: "cell_digit-3",
    d4: "cell_digit-4",
    d5: "cell_digit-5",
    d6: "cell_digit-6",
    d7: "cell_digit-7",
    d8: "cell_digit-8",
  };

  createGame({
    rows: gameProperty.rows,
    columns: gameProperty.columns,
    gameAreaClass: "game-area",
    topPanelClass: "game-area__top-panel",
    resetButtonClass: "game-area__top-panel__button",
    timerClass: "game-area__top-panel__timer",
    fieldClass: "game-area__field",
    mineCounterClass: "game-area__top-panel__mine-counter",
  });

  
  difficultyButtonsContainer.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(difficultyButtonSelector)) {
      gameProperty.rows = +target.getAttribute("data-rows");
      gameProperty.columns = +target.getAttribute("data-columns");
      gameProperty.minesCount = +target.getAttribute("data-mines");
      resetGame();
    }

  });

  function createGame({
    rows,
    columns,
    gameAreaClass,
    topPanelClass,
    mineCounterClass,
    resetButtonClass,
    timerClass,
    fieldClass,
  }) {
    const gameArea = document.createElement("div"),
      topPanel = document.createElement("div"),
      mineCounter = document.createElement("div"),
      resetButton = document.createElement("div"),
      timer = document.createElement("div"),
      field = document.createElement("div");

    const showElement = function (element, className, parentSelector) {
      element.classList.add(className);
      document.querySelector(parentSelector).append(element);
    };

    showElement(gameArea, gameAreaClass, ".page__content");
    showElement(topPanel, topPanelClass, ".game-area");
    showElement(mineCounter, mineCounterClass, ".game-area__top-panel");
    showElement(resetButton, resetButtonClass, ".game-area__top-panel");
    showElement(timer, timerClass, ".game-area__top-panel");
    showElement(field, fieldClass, ".game-area");

    document.querySelector(".game-area__field").addEventListener("contextmenu", flag);
     
  
    document.querySelector(".game-area__field").addEventListener("click", openCell)

    resetButton.addEventListener("click", resetGame);

    gameArea.style.width = cellSize * columns + "px";
    field.style.height = cellSize * gameProperty.rows + "px";
    mineCounter.textContent = "000";
    timer.textContent = "000";

    const createCells = function (cellClass, closedClass) {
      for (let i = 0; i < gameProperty.rows * columns; i++) {
        const cell = document.createElement("div");
        cell.classList.add(cellClass);
        cell.classList.add(closedClass);
        document.querySelector(".game-area__field").append(cell);
      }
    };

    createCells(cellClasses.cell, cellClasses.closed);
    setMinesCount(document.querySelector(".game-area__top-panel__mine-counter"), gameProperty.minesCount, cellClasses.flag)

      board = {
      gameArea:gameArea,
      topPanel:topPanel,
      mineCounter:mineCounter,
      resetButton:resetButton,
      timer:timer,
      field:field,
    }
  }

  function resetGame() {
    gameProperty.lost = false;
    mines = getRandomNumbers(0, gameProperty.rows * gameProperty.columns, gameProperty.minesCount);
    document.querySelector(".game-area").remove();
    createGame({
      rows: gameProperty.rows,
      columns: gameProperty.columns,
      gameAreaClass: "game-area",
      topPanelClass: "game-area__top-panel",
      resetButtonClass: "game-area__top-panel__button",
      timerClass: "game-area__top-panel__timer",
      fieldClass: "game-area__field",
      mineCounterClass: "game-area__top-panel__mine-counter",
    });
    stopTimer();
  }

  function getMinesAround(i, cols, rows){
    return minesAround = intersect(mines, checkCells(i, cols,rows)).length;
  }
  
  function setMinesCount(counter, minesCount, flagClass) {
    let countOfMines = minesCount;
    let flags = document.querySelectorAll(`.${flagClass}`).length;
    countOfMines -= flags;

    if (countOfMines < 10){
      counter.innerHTML = `00${countOfMines}`;
    } else {
      counter.innerHTML = `0${countOfMines}`;
    }
  }

  function setTimer() {
    if (timerInterval === undefined) {

      const start = new Date();
      timerInterval = setInterval(updateTimer, 1000);
  
      function updateTimer() {
        let t = parseInt((new Date() - start) / 1000); 
        if (t < 100 && t >= 10){
          board.timer.innerHTML = `0${t}`;
        } else if (t < 10) {
          board.timer.innerHTML = `00${t}`;
        }
      }
    }
  } 


  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
  }

  function checkWin(cells) {
    let openedCells = [];
    cells.forEach(cell => {
      if (!cell.classList.contains(cellClasses.closed)){
        openedCells.push(cell);
      }
      if (openedCells.length === cells.length - mines.length) {
        switchClass(board.resetButton, "game-area__top-panel__button", "game-area__top-panel__button_win")
        stopTimer()
        document.querySelector(".game-area__field").removeEventListener("contextmenu", flag);
      }
   })
  }

  function lose(cell, cells){
    cell.classList.add("mine-red");

    gameProperty.lost = true;

    cells.forEach((cell, i) => {
      if (mines.includes(i)) {
        cell.classList.add("mine");
      }
    });

    switchClass(board.resetButton, "game-area__top-panel__button", "game-area__top-panel__button_lose")
    stopTimer()
    gameProperty.lost = true;
  }

  function flag(e) {
    e.preventDefault();

    setTimer();
    const target = e.target;
    const cells = document.querySelectorAll(cellSelector);

    if (target.closest(cellSelector) && gameProperty.lost === false) {
      cells.forEach((cell, i) => {
        if (target === cell && target.classList.contains(cellClasses.closed)) {
          cell.classList.toggle(cellClasses.flag);
        }
      });
    }
    setMinesCount(document.querySelector(".game-area__top-panel__mine-counter"), gameProperty.minesCount, cellClasses.flag)
  };
  
  function openCell(e) {

    setTimer();
    const target = e.target;
    const cells = document.querySelectorAll(cellSelector);

    if (gameProperty.lost === false) {
      cells.forEach((cell, i) => {
        if (target === cell && !target.classList.contains(cellClasses.flag)) {
        
          if (!mines.includes(i)) {

            let arr = [i];
            
            while (arr.length > 0) {
              getMinesAround(arr[0], gameProperty.columns, gameProperty.rows);
              if (minesAround === 0) {
                checkCells(arr[0], gameProperty.columns, gameProperty.rows).forEach(item => {
                  if(arr.indexOf(item) === -1 && cells[item].classList.contains(cellClasses.closed)) arr.push(item);
                  
                });
              } 
              cells[arr[0]].classList.remove(cellClasses.flag);
              switchClass(cells[arr[0]], cellClasses.closed, cellClasses["d" + minesAround]);
              arr.shift();
            }
            
          } else {
            lose(cell, cells);
          }
        }
      });
    }
    setMinesCount(document.querySelector(".game-area__top-panel__mine-counter"), gameProperty.minesCount, cellClasses.flag);
    checkWin(cells);
    console.log(timerInterval);
  };

});
