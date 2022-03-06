<?php

$serverName = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "tetrisUsers";

$conn = mysqli_connect($serverName, $dbUsername, $dbPassword, $dbName);

if (!$conn) {
    die("Connetion failed: " . mysqli_connect_error());
}