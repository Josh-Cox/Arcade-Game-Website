<?php
    include_once 'navbar.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Tetris</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="test.css">
    </head>
    <body>
        <div class="main">
            <div class="welcome">
                <h1>Tetris Game Screen</h1>
            </div>
            <button type="button" id="tetrisStart">Start the game</button> 
            <div class="tetris-bg" id="tetris-grid">
                <div class="b1" id="1"></div>
                <div class="b2" id="2"></div>
                <div class="b3" id="3"></div>
                <div class="b4" id="4"></div>
            </div>
        </div>
    </body>
</html>