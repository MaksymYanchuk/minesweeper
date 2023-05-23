import {
    getRandomNumbers,
    intersect,
    switchClass,
    checkCells,
  } from "../helpers.js";

function minesweeper(gameState) {
    const difficulty = [
    {
        minesCount: 10,
        rows: 9,
        columns: 9,
    },
    {
        minesCount: 40,
        rows: 16,
        columns: 16,
    },
    {
        minesCount: 99,
        rows: 16,
        columns: 30,
    },
    ];

    let board = {},
    timerInterval;

    const cellSize = 40;
    const modalStatsContent = document.querySelector('.modal-stats__content');

    const createMines = function() {

        gameState.mines = getRandomNumbers(
            0,
            gameState.rows * gameState.columns,
            gameState.minesCount
        )

        fetch('files/vendor/create.php', {
            method: 'POST',
            headers: {
            'Content-type': 'application/x-www-form-urlencoded'
            },
            body: 'hash=' + md5(gameState.mines)
            })
            .then(function(response) {
            if (response.ok) {
            // Обработка успешного ответа
            } else {
            // Обработка ошибки
            console.log('Error ' + response.status);
            }
            })
            .catch(function(error) {
            console.log(error);
        });
        
    };
    
    createMines();

    let minesAround;
    
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

    const boardClasses = {
    difficultyButtonContainer: "difficulty-level__list",
    difficultyButton: "difficulty-level__list__button",
    parent: "game-container",
    gameArea: "game-area",
    topPanel: "game-area__top-panel",
    resetButton: "game-area__top-panel__button",
    resetButtonWin: "game-area__top-panel__button_win",
    resetButtonLose: "game-area__top-panel__button_lose",
    timer: "game-area__top-panel__timer",
    mineCounter: "game-area__top-panel__mine-counter",
    field: "game-area__field",
    };

    createGame({
    rows: gameState.rows,
    columns: gameState.columns,
    gameAreaClass: boardClasses.gameArea,
    topPanelClass: boardClasses.topPanel,
    resetButtonClass: boardClasses.resetButton,
    timerClass: boardClasses.timer,
    fieldClass: boardClasses.field,
    mineCounterClass: boardClasses.mineCounter,
    });

    document.querySelector(`.${boardClasses.difficultyButtonContainer}`).addEventListener("click", (e) => {
    const target = e.target;
    const buttons = document.querySelectorAll(`.${boardClasses.difficultyButton}`);

    buttons.forEach((button, i) => {

        if (target.closest(`.${boardClasses.difficultyButton}`) && target === button) {
            switch(i) {
                case 0: gameState.difficulty = "Easy";
                break;
                case 1: gameState.difficulty = "Medium";
                break;
                case 2: gameState.difficulty = "Hard";
                break;
            }
            gameState.rows = +difficulty[i].rows;
            gameState.columns = +difficulty[i].columns;
            gameState.minesCount = +difficulty[i].minesCount;
            modalStatsContent.style.display = 'none';
            resetGame();
        }
    });
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
    gameArea.classList.add(gameAreaClass);
    document.querySelector(`.${boardClasses.parent}`).prepend(gameArea);

    showElement(topPanel, topPanelClass, `.${boardClasses.gameArea}`);
    showElement(mineCounter, mineCounterClass, `.${boardClasses.topPanel}`);
    showElement(resetButton, resetButtonClass, `.${boardClasses.topPanel}`);
    showElement(timer, timerClass, `.${boardClasses.topPanel}`);
    showElement(field, fieldClass, `.${boardClasses.gameArea}`);


    field.addEventListener("contextmenu", flag);
    field.addEventListener("click", openCell);
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
        field.append(cell);
        }
    };

    createCells(cellClasses.cell, cellClasses.closed);
    setMinesCount(
        mineCounter,
        gameState.minesCount,
        cellClasses.flag
    );
    board = {
        gameArea: gameArea,
        topPanel: topPanel,
        mineCounter: mineCounter,
        resetButton: resetButton,
        timer: timer,
        field: field,
    };
    }

    function resetGame() {
    gameState.clicks = 0;
    gameState.time = 0;
    gameState.lost = false;
    gameState.win = false;
    gameState.firstClick = true;
    createMines();
    board.gameArea.remove();
    createGame({
        rows: gameState.rows,
        columns: gameState.columns,
        gameAreaClass: boardClasses.gameArea,
        topPanelClass: boardClasses.topPanel,
        resetButtonClass: boardClasses.resetButton,
        timerClass: boardClasses.timer,
        fieldClass: boardClasses.field,
        mineCounterClass: boardClasses.mineCounter,
    });
    modalStatsContent.style.display = 'none';
    stopTimer();
    
    }

    function getMinesAround(i, cols, rows) {
    return (minesAround = intersect(gameState.mines, checkCells(i, cols, rows)).length);
    }

    function setMinesCount(counter, minesCount, flagClass) {
    let countOfMines = minesCount;
    let flags = document.querySelectorAll(`.${flagClass}`).length;
    countOfMines -= flags;

    if (countOfMines < 10) {
        counter.innerHTML = `00${countOfMines}`;
    } else {
        counter.innerHTML = `0${countOfMines}`;
    }
    }

    function setTimer() {
    if (timerInterval === undefined) {
        const start = new Date();
        timerInterval = setInterval(updateTimer, 4);

        function updateTimer() {
            
            let t = parseInt((new Date() - start) / 1000);
            let floatTime = (new Date() - start) / 1000;
            if (t < 10) {
                board.timer.innerHTML = `00${t}`;
            } else if (t < 100 && t >= 10) {
                board.timer.innerHTML = `0${t}`;
            } else {
                board.timer.innerHTML = t;
            }
            gameState.time = floatTime;
        }
    }
    }

    function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
    }

    function checkWin(cells) {
    let openedCells = [];
    cells.forEach((cell) => {
        if (!cell.classList.contains(cellClasses.closed)) {
        openedCells.push(cell);
        }
        if (openedCells.length === cells.length -  gameState.mines.length) {

        switchClass(
            board.resetButton,
            boardClasses.resetButton,
            boardClasses.resetButtonWin,
        );
        stopTimer();
        gameState.win = true;
        
        const result = () => {
            const difficulty = document.querySelector('#difficulty');
            const username = document.querySelector('#username');
            const time = document.querySelector('#time');
            const clicks = document.querySelector('#clicks');
    

            difficulty.innerHTML = gameState.difficulty;
            switch(gameState.difficulty) {
                case 'Easy': difficulty.classList.add('easy');
                break;
                case "Medium": difficulty.classList.add('medium');
                break;
                case "Hard": difficulty.classList.add('hard');
                break;
            }

            modalStatsContent.style.display = 'block';
            
            username.innerHTML = gameState.player;
            time.innerHTML = gameState.time;
            clicks.innerHTML = gameState.clicks;
    
            const modalStatsBtn = document.querySelector('.modal-stats__btn');
            modalStatsBtn.addEventListener('click', () => {
                modalStatsContent.style.display = 'none';
            })
        }

        result();

        const now = new Date();
        const offsetInMinutes = now.getTimezoneOffset();
        const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
        const utcTimestamp = now.getTime() - offsetInMilliseconds;
        const utcDate = new Date(utcTimestamp);
        const utcString = utcDate.toISOString();

        fetch('files/vendor/create.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'difficulty=' + gameState.difficulty + 
            '&player=' + gameState.player + 
            '&time=' + gameState.time + 
            '&clicks=' + gameState.clicks + 
            '&date=' + utcString +
            '&mines=' + gameState.mines
            })
            .then(function(response) {
            if (response.status === 200) {
            return response.text();
            } else {
            throw new Error('Ошибка ' + response.status);
            }
            })
            .then(function(data) {
            console.log(data);
            })
            .catch(function(error) {
            console.log(error);
            });
        }
    });
    }

    function lose(cell, cells) {
    cell.classList.add("mine-red");

    gameState.lost = true;

    cells.forEach((cell, i) => {
        if (gameState.mines.includes(i)) {
        cell.classList.add("mine");
        }
    });

    switchClass(
        board.resetButton,
        boardClasses.resetButton,
        boardClasses.resetButtonLose,
    );
    stopTimer();
    gameState.lost = true;

    }

    function flag(e) {
    e.preventDefault();

    gameState.clicks++;

    const target = e.target;
    const cells = document.querySelectorAll(`.${cellClasses.cell}`);

    if (target.closest(`.${cellClasses.cell}`) && gameState.lost === false && !gameState.win) {
        cells.forEach((cell, i) => {
        if (target === cell && target.classList.contains(cellClasses.closed)) {
            cell.classList.toggle(cellClasses.flag);
        }
        });
        setTimer();
        setMinesCount(
        board.mineCounter,
        gameState.minesCount,
        cellClasses.flag
        );
    }
    }

    function openCell(e) {
    gameState.clicks++;
    const target = e.target;
    const cells = document.querySelectorAll(`.${cellClasses.cell}`);

    cells.forEach((cell, i) => {
        if (
        target === cell &&
        !target.classList.contains(cellClasses.flag) &&
        !gameState.lost &&
        !gameState.win
        ) {
            
        // First click without mine
        if (gameState.firstClick) {
            while (gameState.mines.includes(i)) {
                gameState.mines = getRandomNumbers(
                0,
                gameState.rows * gameState.columns,
                gameState.minesCount
            );
            }
            gameState.firstClick = false;
        }

        if (!gameState.mines.includes(i)) {
            let arr = [i];

            // auto open clear cells
            while (arr.length > 0) {
            getMinesAround(arr[0], gameState.columns, gameState.rows);
            if (minesAround === 0) {
                checkCells(
                arr[0],
                gameState.columns,
                gameState.rows
                ).forEach((item) => {
                if (
                    arr.indexOf(item) === -1 &&
                    cells[item].classList.contains(cellClasses.closed)
                )
                    arr.push(item);
                });
            }
            cells[arr[0]].classList.remove(cellClasses.flag);
            switchClass(
                cells[arr[0]],
                cellClasses.closed,
                cellClasses["d" + minesAround]
            );
            arr.shift();
            }

            setTimer();
            setMinesCount(
            board.mineCounter,
            gameState.minesCount,
            cellClasses.flag
            );
            checkWin(cells);
        } else {
            lose(cell, cells);
        }
        }
    });
    }
}

export default minesweeper;