<?php

if (isset($_POST["submit"])) {

    $firstName = $_POST["fName"];
    $lastName = $_POST["lName"];
    $userName = $_POST["uName"];
    $pwd = $_POST["pwd"];
    $confirmPwd = $_POST["cPwd"];
    $display = $_POST["display"];

    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (emptyInputRegister($firstName, $lastName, $userName, $pwd, $confirmPwd) !== false) {
        header("location: ../register.php?error=emptyInput");
        exit();
    }

    if (pwdMatch($pwd, $confirmPwd) !== false) {
        header("location: ../register.php?error=invalidMatch");
        exit();
    }

    if (userNameTaken($conn, $userName) !== false) {
        header("location: ./register.php?error=userNameTaken");
        exit();
    }

    createUser($conn, $firstName, $lastName, $userName, $pwd, $display);
}

else {
    header("location: ../register.php");
    exit();
}