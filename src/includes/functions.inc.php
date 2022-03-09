<?php 

function emptyInputRegister($firstName, $lastName, $userName, $pwd, $confirmPwd) {
    $result = true;

    if (empty($firstName) || empty($firstName) || empty($firstName) || empty($firstName) || empty($firstName)) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function pwdMatch($pwd, $confirmPwd) {
    $result = true;

    if ($pwd !== $confirmPwd) {
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function userNameTaken($conn, $userName) {

    $sql = "SELECT * FROM Users WHERE userName = ?;";
    $prepStatement = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($prepStatement, $sql)) {
        header("location: ../register.php?error=prepStatementFailed");
        exit();
    }

    mysqli_stmt_bind_param($prepStatement, "s", $userName);
    mysqli_stmt_execute($prepStatement);

    $outputData = mysqli_stmt_get_result($prepStatement);

    if ($row = mysqli_fetch_assoc($outputData)) {
        return $row;
    }
    else {
        $result = false;
        return $result;
    }

    mysqli_stmt_close($prepStatement);
}

function createUser($conn, $firstName, $lastName, $userName, $pwd, $display) {

    $sql = "INSERT INTO Users (UserName, FirstName, LastName, Password, Display) VALUES (?, ?, ?, ?, ?);";
    $prepStatement = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($prepStatement, $sql)) {
        header("location: ../register.php?error=prepStatementFailed");
        exit();
    }

    $hashPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($prepStatement, "sssss", $userName, $firstName, $lastName, $hashPwd, $display);
    mysqli_stmt_execute($prepStatement);
    mysqli_stmt_close($prepStatement);

    header("location: ../index.php?error=none");
        exit();
}