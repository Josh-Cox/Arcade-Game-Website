<?php   
    include_once 'navbar.php'
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Registration Page</title>
        <link rel="stylesheet" href="style.css">
        <meta charset="UFT-8">
    </head>

    <body>
        <div class="main">
            <h1>Sign Up Page</h1>
            <div class="signUpForm">
                <form action="signUp.inc.php" method="post">
                    <input type="text" name="fName" placeholder="First Name">
                    <input type="text" name="lName" placeholder="Last Name">
                    <input type="text" name="uName" placeholder="Username">
                    <input type="password" name="pwd" placeholder="Password">
                    <input type="password" name="cPwd" placeholder="Confirm Password">
                    <button type="submit" name="submit">Sign Up</button>
                </form>
            </div>
        </div>      
    </body>
</html>