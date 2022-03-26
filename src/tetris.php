<?php
    include_once 'navbar.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Tetris</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <script src="tetris.js" charset="utf-8"></script>
    </head>
    <body>
        <div class="main">
            <div class="welcome">
                <h1>Tetris Game Screen</h1>
            </div>
            <div class="tetris-bg">
                <img src="../img/tetris-grid-bg.png" id="grid">
                <button type="button" id="start">Start</button>
            </div>
        </div>
    </body>
</html>