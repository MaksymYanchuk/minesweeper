<?php
require_once 'files/config/connect.php';
session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content= "сапер, минер, онлайн, игра, сапер онлайн, сапер бесплатно, сапер игра, сапер играть">
        <link rel="icon" href="img/favicon.webp" type="image/x-icon">
        <link rel="preload" href='./fonts/digital-7 (mono).woff2' as="font" type="font/woff2" crossorigin>
        <link rel="preload" href='./fonts/RussoOne-Regular.woff2' as="font" type="font/woff2" crossorigin>
        <link rel="stylesheet" href="css/style.min.css">
        <title>Minesweeper</title>
    </head>
    <body style="font-family: 'Russo One'">
        <header class="header">
            <div class="header__stats">
                <p class="stats__text">Statistics</p>
                <img class="stats__img" src="img/svgicons/arrow-down.svg" alt="arrow-down">
            </div>
            <h1 class="header__title">Minesweeper</h1>
            <div class="header__player">Username: 
                <div class="header__player-wrapper">
                    <div class="username"></div>
                    <img class="username__icon" src="img/svgicons/edit.svg" alt="edit">
                </div>
            </div>
        </header>
  
        <main class="page">
            <section class="page__content">


                <div class="stats-wrapper">
                    <div class="stats-wrapper__buttons-container">
                        <button class="buttons-container__button_easy stats-button">Easy</button>
                        <button class="buttons-container__button_medium stats-button">Meddium</button>
                        <button class="buttons-container__button_hard stats-button">Hard</button>
                    </div>
                    <table class="leaderboard leaderboard_easy">
                        <tr>
                            <th>№</th>
                            <th>Player</th>
                            <th>Time</th>
                            <th>Clicks</th>
                            <th>Data</th>
                        </tr>
                        <?php 
                        $stats = mysqli_query($connect, "SELECT * FROM `stats` WHERE `difficulty` LIKE '%Easy%' ORDER BY `time` ASC LIMIT 10");
                        $stats = mysqli_fetch_all($stats);
                        foreach ($stats as $key => $data): 
                        ?>
                            <tr>
                                <td><?=$key + 1?></td>
                                <td class="Player"><?= $data[1]?></td>
                                <td class="Time"><?= $data[2]?></td>
                                <td class="Clicks"><?= $data[3]?></td>
                                <td class="Data"><?= $data[4]?></td>
                            </tr>
                        <?php endforeach; ?>
                    </table>

                    <table class="leaderboard leaderboard_medium">
                        <tr>
                            <th>№</th>
                            <th>Player</th>
                            <th>Time</th>
                            <th>Clicks</th>
                            <th>Data</th>
                        </tr>
                        <?php 
                        $stats = mysqli_query($connect, "SELECT * FROM `stats` WHERE `difficulty` LIKE '%Medium%' ORDER BY `time` ASC LIMIT 10");
                        $stats = mysqli_fetch_all($stats);
                        foreach ($stats as $key => $data): 
                        ?>
                            <tr>
                                <td><?=$key + 1?></td>
                                <td class="Player"><?= $data[1]?></td>
                                <td class="Time"><?= $data[2]?></td>
                                <td class="Clicks"><?= $data[3]?></td>
                                <td class="Data"><?= $data[4]?></td>
                            </tr>
                        <?php endforeach; ?>
                    </table>

                    <table class="leaderboard leaderboard_hard">
                        <tr>
                            <th>№</th>
                            <th>Player</th>
                            <th>Time</th>
                            <th>Clicks</th>
                            <th>Data</th>
                        </tr>
                        <?php 
                        $stats = mysqli_query($connect, "SELECT * FROM `stats` WHERE `difficulty` LIKE '%Hard%' ORDER BY `time` ASC LIMIT 10");
                        $stats = mysqli_fetch_all($stats);
                        foreach ($stats as $key => $data): 
                        ?>
                            <tr>
                                <td><?=$key + 1?></td>
                                <td class="Player"><?= $data[1]?></td>
                                <td class="Time"><?= $data[2]?></td>
                                <td class="Clicks"><?= $data[3]?></td>
                                <td class="Data"><?= $data[4]?></td>
                            </tr>
                        <?php endforeach; ?>
                    </table>
                </div>

                <div class="difficulty-level">
                    <h1 class="difficulty-level__header"> Select difficulty level</h1>
                    <ul class="difficulty-level__list">
                        <li class="difficulty-level__list__button difficulty-level__list__button_easy">
                            Easy 9x9
                        </li>
                        <li class="difficulty-level__list__button difficulty-level__list__button_normal">
                            Medium  16x16
                        </li>
                        <li class="difficulty-level__list__button difficulty-level__list__button_hard">
                            Hard 16x30
                        </li>
                    </ul>             
                </div>

                <div class="game-container">
                    <div class="modal-stats">
                        <div class="modal-stats__dialog">
                            <div class="modal-stats__content">
                                <div class="modal-stats__title">Your Result:</div>
                                <ul class="modal-stats__list"></ul>
                                    <li class="modal-stats__item">Difficulty mode: <span id='difficulty' class = 'modal-stats__result'></span></li>
                                    <li class="modal-stats__item">Username: <span id='username' class = 'modal-stats__result'></li>
                                    <li class="modal-stats__item">Time: <span id='time' class = 'modal-stats__result'></li>
                                    <li class="modal-stats__item">Clicks: <span id='clicks' class = 'modal-stats__result'></li>
                                </ul>
                                <button class="modal-stats__btn">OK</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>

        <footer class="footer">
            <div class="footer__wrapper">
                <div class="footer__card">
                    <p class="footer__card_text">Mastercard (UAH): <span class="card-number">5355 5722 5134 6084</span></p>
                    <img class="footer__card_copy"src="img/svgicons/copy.svg" alt="copy">
                </div>
                <div class="footer__donate">
                    <a class="footer__donate_ref" href="https://donatello.to/boomer">Donatello</a>
                    <img class="footer__donate_qr-code"src="img/qr-code.webp" alt="qr-code">
                </div>
            </div>    
        </footer>

        <div class="modal-username">
            <div class="modal-username__dialog">
                <div class="modal-username__content">
                    <div data-close class="modal-username__close">&times;</div>
                    <div class="modal-username__title">Enter your nickname</div>
                    <input required placeholder="Username" name="name" type="text" class="modal-username__input">
                    <button class="modal-username__btn">Save</button>
                </div>
            </div>
        </div>

        

        <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"></script>
        <script src="js/app.min.js"></script>
    </body>
</html>