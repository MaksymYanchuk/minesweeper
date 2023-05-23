function stats() {
    let menuOpened = false;

    const target = document.querySelector('.stats__img');
    const statsTable = document.querySelector('.stats-wrapper');
    target.addEventListener('click', () => {
        if (!menuOpened) {
            openStats()
        } else {
            closeStats()
        }

    });

    function openStats() {
        statsTable.style.top = '78px';
        menuOpened = true;
        target.style.transform = 'rotate(-0.5turn)';
    }

    function closeStats() {
        statsTable.style.top = '-500px';
        menuOpened = false;
        target.style.transform = 'rotate(0turn)';
    }

   
    
    // buttons

    const buttonContainer = document.querySelector('.stats-wrapper__buttons-container');
    const buttons = document.querySelectorAll('.stats-button');
    const leaderboards = document.querySelectorAll('.leaderboard');
    const activeClass = 'buttons-container__button_active'; 

    function hideStatsContent() {
        leaderboards.forEach(item => {
            item.classList.remove("show");
            item.classList.add("hide");

            buttons.forEach(item => {
                item.classList.remove(activeClass);
            });
        });
    }

    function showStatsContent(i = 0) {
        leaderboards[i].classList.add("show");
        leaderboards[i].classList.remove("hide");
        buttons[i].classList.add(activeClass);
    }

    buttonContainer.addEventListener('click', (e) => {

        if (e.target.closest('.stats-button')) {

            buttons.forEach((item, i) => {

                if (e.target == item) {
                    hideStatsContent();
                    showStatsContent(i);
                }
            });

            
        }
    })

    hideStatsContent();
    showStatsContent();
}



export default stats;