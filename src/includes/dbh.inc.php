<?php

$serverName = "localhost";
$dbUsername = "root";
$dbPassword = "root";
$dbName = "coursework";
$port = 1111;

$conn = mysqli_connect($serverName, $dbUsername, $dbPassword, $dbName, $port);

if (!$conn) {
    die("Connetion failed: " . mysqli_connect_error());
}