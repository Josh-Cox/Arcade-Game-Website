<?php   
    include_once 'navbar.php'
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Registration Page</title>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="main">
            <div class="welcome">
                <h1>Sign Up Page</h1>
            </div>
            <div class="signUpForm">
                <form action="signUp.inc.php" method="post">
                    <input type="text" name="fName" placeholder="First Name">
                    <input type="text" name="lName" placeholder="Last Name">
                    <input type="text" name="uName" placeholder="Username">
                    <input type="password" name="pwd" placeholder="Password">
                    <input type="password" name="cPwd" placeholder="Confirm Password">
                    <input type="radio" id=radioYes name="display" value="yes" checked>
                    <input type="radio" id="radioNo" name="display" value="no">
                    <div class="switch">
                        <label for="radioYes" chec>Yes</label>
                        <label for="radioNo" chec>No</label>
                    </div>
                    <button type="submit" name="submit">Sign Up</button>
                </form>
            </div>
        </div>      
    </body>
</html>