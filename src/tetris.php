<?php
    include_once 'navbar.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Tetris</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script type="text/javascript" src="tetris.js" charset="utf-8"></script>
    </head>
    <body>
        <div class="main">
            <div class="welcome">
                <h1>Tetris Game Screen</h1>
            </div>
            <button type="button" id="tetris">Start the game</button> 
            <div class="tetris-bg" id="tetris-grid">

            </div>
        </div>
    </body>
</html>