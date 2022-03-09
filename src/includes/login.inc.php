<?php

if (isset($_POST["submit"])) {

    $userName = $_POST["uName"];
    $pwd = $_POST["pwd"];

    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (emptyInputLogin($userName, $pwd) !== false) {
        header("location: ../index.php?error=emptyInput");
        exit();
    }

    loginUser($conn, $userName, $pwd);

}
else {
    header("location: ../index.php");
    exit();
}