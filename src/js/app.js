"use strict"

window.addEventListener('DOMContentLoaded', () => {

    const difficultyButtonsContainer = document.querySelector('.difficulty-level__list'),
          difficultyButtonSelector = '.difficulty-level__list__button',
          cellSize = 40;

    let rows,
        columns;
    
    difficultyButtonsContainer.addEventListener("click", (e) => {
        const target = e.target;

        if (target.closest(difficultyButtonSelector)){
            rows = target.getAttribute('data-rows');
            columns = target.getAttribute('data-columns');
        }
        
        createGameArea(rows, columns);
        createCells(rows, columns);
    })


    










    function createGameArea(rows, columns) {
        const gameArea = document.createElement('div');
        gameArea.classList.add('game-area');
        gameArea.style.width = cellSize * columns + "px";

        document.querySelector('.page__content').append(gameArea);
        
        const topPanel = document.createElement('div');
        topPanel.classList.add('game-area__top-panel');
        gameArea.style.width = cellSize * columns + "px";
        document.querySelector('.game-area').append(topPanel);
        

        const topPanelButton = document.createElement('div');
        topPanelButton.classList.add('game-area__top-panel__button');
        document.querySelector('.game-area__top-panel').append(topPanelButton);

        const field = document.createElement('div');
        field.classList.add('game-area__field');
        field.style.height = (cellSize * rows) + "px";
        console.log(field.style.height)
        document.querySelector('.game-area').append(field);
        
    }

    function createCells(rows, columns) {
        for(let i = 0; i < rows * columns; i++ ){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            document.querySelector('.game-area__field').append(cell);
        }
    }


})