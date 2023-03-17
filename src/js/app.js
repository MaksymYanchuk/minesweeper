"use strict";
import { getRandomNumbers, intersect, switchClass } from "./helpers.js";

window.addEventListener("DOMContentLoaded", () => {
  let minesCount = 10,
    rows = 9,
    columns = 9;

  const difficultyButtonsContainer = document.querySelector(
      ".difficulty-level__list"
    ),
    difficultyButtonSelector = ".difficulty-level__list__button",
    cellSelector = ".cell",
    cellSize = 40;

  let mines = getRandomNumbers(0, rows * columns, minesCount);

  const cellClasses = {
    cell: "cell",
    clear: "cell_clear",
    flag: "cell_flag",
    d0: "cell_closed",
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
    rows: rows,
    columns: columns,
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
      rows = +target.getAttribute("data-rows");
      columns = +target.getAttribute("data-columns");
      minesCount = +target.getAttribute("data-mines");
      mines = getRandomNumbers(0, rows * columns, minesCount);
    }
    resetGame();
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

    resetButton.addEventListener("click", resetGame);

    gameArea.style.width = cellSize * columns + "px";
    field.style.height = cellSize * rows + "px";
    mineCounter.textContent = "000";
    timer.textContent = "000";

    const createCells = function (cellClass, closedClass) {
      for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement("div");
        cell.classList.add(cellClass);
        cell.classList.add(closedClass);
        document.querySelector(".game-area__field").append(cell);
      }
    };

    createCells(cellClasses.cell, cellClasses.d0);

    document
      .querySelector(".game-area__field")
      .addEventListener("click", function openCell(e) {
        const target = e.target;
        const cells = document.querySelectorAll(cellSelector);

        console.log(mines);

        if (target.closest(cellSelector)) {
          cells.forEach((cell, i) => {
            if (target === cell) {
              const checkCells = function () {
                let cellsToCheck = [];

                if (i === 0) {
                  cellsToCheck = [i + 1, i + columns, i + columns + 1]; // top left corner
                } else if (i === columns - 1) {
                  cellsToCheck = [i - 1, i + columns - 1, i + columns]; // top right corner
                } else if (i === columns * rows - columns) {
                  cellsToCheck = [i - columns, i - columns + 1, i + 1]; // down left corner
                } else if (i === columns * rows - 1) {
                  cellsToCheck = [i - columns - 1, i - columns, i - 1]; // down right corner
                } else if (i % columns === 0) {
                  cellsToCheck = [
                    i - columns,
                    i - columns + 1,
                    i + 1,
                    i + columns,
                    i + columns + 1,
                  ]; // left side
                } else if (i > 0 && i < columns - 1) {
                  cellsToCheck = [
                    i - 1,
                    i + 1,
                    i + columns - 1,
                    i + columns,
                    i + columns + 1,
                  ]; //top side
                } else if (i % columns === columns - 1) {
                  cellsToCheck = [
                    i - columns - 1,
                    i - columns,
                    i - 1,
                    i + columns - 1,
                    i + columns,
                  ]; //right side
                } else if (
                  i > columns * rows - columns &&
                  i < columns * rows - 1
                ) {
                  cellsToCheck = [
                    i - columns - 1,
                    i - columns,
                    i - columns + 1,
                    i - 1,
                    i + 1,
                  ]; //bot side
                } else {
                  cellsToCheck = [
                    i - columns - 1,
                    i - columns,
                    i - columns + 1,
                    i - 1,
                    i + 1,
                    i + columns - 1,
                    i + columns,
                    i + columns + 1,
                  ];
                }

                const matched = intersect(mines, cellsToCheck);
                const length = matched.length;
                switchClass(
                  cell,
                  cellClasses.d0,
                  cellClasses["d" + length],
                  cellClasses.clear
                );
              };

              checkCells();

              if (mines.includes(i)) {
                cell.classList.add("mine-red");
                document
                  .querySelector(".game-area__field")
                  .removeEventListener("click", openCell);

                cells.forEach((cell, i) => {
                  if (mines.includes(i)) {
                    cell.classList.add("mine");
                  }
                });
              }
            }
          });
        }
      });

    document.querySelector(".game-area__field").addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const target = e.target;
        const cells = document.querySelectorAll(cellSelector);

        if (target.closest(cellSelector)) {
          cells.forEach((cell, i) => {
            if (target === cell) {
              cell.classList.add(cellClasses.flag);
            }
          });
        }
      });
  }

  function resetGame() {
    mines = getRandomNumbers(0, rows * columns, minesCount);
    document.querySelector(".game-area").remove();
    createGame({
      rows: rows,
      columns: columns,
      gameAreaClass: "game-area",
      topPanelClass: "game-area__top-panel",
      resetButtonClass: "game-area__top-panel__button",
      timerClass: "game-area__top-panel__timer",
      fieldClass: "game-area__field",
      mineCounterClass: "game-area__top-panel__mine-counter",
    });
  }
});
