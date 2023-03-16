"use strict"
import {
    getRandomNumbers,
} from './helpers.js'

window.addEventListener('DOMContentLoaded', () => {

    let minesCount = 10,
        rows = 9,
        columns = 9;

    const difficultyButtonsContainer = document.querySelector('.difficulty-level__list'),
          difficultyButtonSelector = '.difficulty-level__list__button',
          cellSelector = '.cell',
          cellSize = 40,
          mines = getRandomNumbers(0, rows*columns, minesCount);



    createGame({
        rows: rows, 
        columns: columns, 
        gameAreaClass: 'game-area',
        topPanelClass: 'game-area__top-panel',
        resetButtonClass: 'game-area__top-panel__button',
        timerClass: 'game-area__top-panel__timer',
        fieldClass: 'game-area__field',
        mineCounterClass: 'game-area__top-panel__mine-counter',
    });

    difficultyButtonsContainer.addEventListener("click", (e) => {
        const target = e.target;

        if (target.closest(difficultyButtonSelector)){
        rows = target.getAttribute('data-rows');
        columns = target.getAttribute('data-columns');
        }

    
        document.querySelector('.game-area').remove();
        createGame({
        rows: rows, 
        columns: columns, 
        gameAreaClass: 'game-area',
        topPanelClass: 'game-area__top-panel',
        resetButtonClass: 'game-area__top-panel__button',
        timerClass: 'game-area__top-panel__timer',
        fieldClass: 'game-area__field',
        mineCounterClass: 'game-area__top-panel__mine-counter',
        });
    })

    function createGame({rows, columns, gameAreaClass, topPanelClass, mineCounterClass, resetButtonClass, timerClass, fieldClass}) {

        const gameArea = document.createElement('div');
        const topPanel = document.createElement('div');
        const mineCounter = document.createElement('div');
        const resetButton = document.createElement('div');
        const timer = document.createElement('div');
        const field = document.createElement('div');

        resetButton.addEventListener('click', () => {

        })
        
        const showElement = function(element, className, parentSelector){
            element.classList.add(className);
            document.querySelector(parentSelector).append(element)
        }

        showElement(gameArea, gameAreaClass, '.page__content');
        showElement(topPanel, topPanelClass, '.game-area');
        showElement(mineCounter, mineCounterClass, '.game-area__top-panel');
        showElement(resetButton, resetButtonClass, '.game-area__top-panel');
        showElement(timer, timerClass, '.game-area__top-panel');
        showElement(field, fieldClass, '.game-area');

        gameArea.style.width = cellSize * columns + "px";
        field.style.height = (cellSize * rows) + "px";
        mineCounter.textContent = '000';
        timer.textContent = '000';

        const createCells = function (cellClass, closedClass) {
            for(let i = 0; i < rows * columns; i++ ) {
                const cell = document.createElement('div');
                cell.classList.add(cellClass);
                cell.classList.add(closedClass);
                document.querySelector('.game-area__field').append(cell);
            }
        }
        createCells('cell', 'closed');

        document.querySelector('.game-area__field').addEventListener('click', function openCell(e) {
            const target = e.target;
            const cells = document.querySelectorAll(cellSelector);
            
            console.log(mines);

            if (target.closest(cellSelector )) {
                cells.forEach((cell, i) => {
    
                    if (target === cell){
                        cell.classList.add('opened')
                        console.log(i);

                        if (mines.includes(i)) {
                            cell.classList.add('mine-red')
                            document.querySelector('.game-area__field').removeEventListener('click', openCell);

                            cells.forEach((cell, i) => {
                                if (mines.includes(i)){
                                    cell.classList.add('mine')
                                }
                            })   
                        }
                    }
                })
            }    
        })
    }

    
})