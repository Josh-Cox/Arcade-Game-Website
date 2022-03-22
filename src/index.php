<?php
    session_start();
    include_once 'navbar.php';

    //The following php code would be in includes/register.inc.php, but the mark scheme specifies a POST to index.php
    if (isset($_POST["submit"])) {
        
        
        $firstName = $_POST["fName"];
        $lastName = $_POST["lName"];
        $userName = $_POST["uName"];
        $pwd = $_POST["pwd"];
        $confirmPwd = $_POST["cPwd"];
        $displayString = $_POST["display"];
        
        if ($displayString == "yes") {
            $display = 1;
        }
        else if ($displayString == "no") {
            $display = 0;
        }
        else {
            header("location: register.php?error=displayNotSet");
            exit();
        }
        require_once 'includes/dbh.inc.php';
        require_once 'includes/functions.inc.php';
        
        if (emptyInputRegister($firstName, $lastName, $userName, $pwd, $confirmPwd) !== false) {
            header("location: register.php?error=emptyInput");
            exit();
        }
        
        if (pwdMatch($pwd, $confirmPwd) !== false) {
            header("location: register.php?error=invalidMatch");
            exit();
        }
        
        if (userNameTaken($conn, $userName) !== false) {
            header("location: register.php?error=userNameTaken");
            exit();
        }
        
        createUser($conn, $firstName, $lastName, $userName, $pwd, $display);
    }
    else {

    }
?>

<!DOCTYPE html>
<html>

    <head>
        <title>Landing Page</title>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="main">
            <?php
                if (isset($_SESSION["userName"])) { ?>
                    <div class="welcome">
                        <h1>Welcome to Tetris</h1>
                        <button onclick="location.href='tetris.php';" type="button" id="play">Click here to play</button><br>
                        <button onclick="location.href='includes/logout.inc.php';" type="button" id="logout">Logout</button>
                    </div>
                    <?php
                }
                else { ?>
                    <div class="welcome">
                        <h1>Login Form</h1>
                    </div>
                    <div class="loginForm" id="login">
                        <form action="includes/login.inc.php" method="post">
                            <input type="text" name="uName" placeholder="Username">
                            <input type="password" name="pwd" placeholder="Password">
                            <button type="submit" name="submit">Login</button><br>
                            <p><a href="register.php">Dont have a user account? Register now</a></p>
                        </form>
                    </div>
                    <?php
                        if (isset($_GET["error"])) {

                            switch ($_GET["error"]) {

                                case "emptyInput":
                                    echo '<p id="error">Please fill in all fields</p>';
                                    break;
                                
                                case "invalidLogin":
                                    echo "<p id='error'>Incorrect login information</p?";
                                    break;
                            }
                        }
                    ?>
                <?php
                } ?>
        </div>
    </body>
</html>