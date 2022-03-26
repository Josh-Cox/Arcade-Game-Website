document.addEventListener('DOMContentLoaded', () => {

    let grid = [

        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],

    ];


    let tetrominoes = {
        "O": [[1, 1], [1, 2], 
              [2, 1], [2, 2]],

        "L": [[1, 1], [1, 2], [1, 3], 
                              [2, 3]],

        "Z": [[1, 1], 
              [2, 1], [2, 2], [2, 3]],

        "S": [        [1, 2], 
              [2, 1], [2, 2], 
              [3, 1]],

        "T": [[1, 1], 
              [2, 1], [2, 2], 
              [3, 1]],

        "I": [[1, 1], [1, 2], [1, 3], [1, 4]]
    };

    let score = 0;
    let random = Math.floor(Math.random()*6);
    let currentBlock = 0;
    let startPosTaken = false;
    console.log(random);


    //POST score to leaderboard.php
    function gameOver(score) {
        $.ajax({

            type: "POST",
            url: "leaderboard.php",
            dataType: "json",
            data: {Score: score},
            success : function(data){
                if (data.code == "200"){
                    alert("Success: " +data.msg);
                } else {
                    $(".display-error").html("<ul>"+data.msg+"</ul>");
                    $(".display-error").css("display","block");
                }
            },
            async: true,
        });
    }
        
    
    switch(random) {
        case 0:
            currentBlock = tetrominoes.O;
            if (
                (grid[0][4]) != "" || 
                (grid[0][5]) != "" ||
                (grid[1][4]) != "" ||
                (grid[1][5]) != "") {
                    gameOver(score);
                }
                else {
                    grid[0][4] = "O";
                    grid[0][5] = "O";
                    grid[1][4] = "O";
                    grid[1][5] = "O";
                }
            break;
        case 1:
            currentBlock = tetrominoes.L;
            if (
                (grid[0][3]) != "" || 
                (grid[0][4]) != "" ||
                (grid[0][5]) != "" ||
                (grid[1][5]) != "") {
                    gameOver(score);
                }
                else {
                    grid[0][3] = "L";
                    grid[0][4] = "L";
                    grid[0][5] = "L";
                    grid[1][5] = "L";
                }
            break;
        case 2:
            currentBlock = tetrominoes.Z;
            if (
                (grid[1][3]) != "" || 
                (grid[1][4]) != "" ||
                (grid[1][5]) != "" ||
                (grid[0][3]) != "") {
                    gameOver(score);
                }
                else {
                    grid[1][3] = "Z";
                    grid[1][4] = "Z";
                    grid[1][5] = "Z";
                    grid[0][3] = "Z";
                }
            break;
        case 3:
            currentBlock = tetrominoes.S;
            if (
                (grid[0][5]) != "" || 
                (grid[1][5]) != "" ||
                (grid[1][4]) != "" ||
                (grid[2][4]) != "") {
                    gameOver(score);
                }
                else {
                    grid[0][5] = "S";
                    grid[1][5] = "S";
                    grid[1][4] = "S";
                    grid[2][4] = "S";
                }
            break;
        case 4:
            currentBlock = tetrominoes.T;
            if (
                (grid[0][4]) != "" || 
                (grid[1][4]) != "" ||
                (grid[1][5]) != "" ||
                (grid[2][4]) != "") {
                    gameOver(score);
                }
                else {
                    grid[0][4] = "T";
                    grid[1][4] = "T";
                    grid[1][5] = "T";
                    grid[2][4] = "T";
                }
            break;
        case 5:
            currentBlock = tetrominoes.I;
            if (
                (grid[0][3]) != "" || 
                (grid[0][4]) != "" ||
                (grid[0][5]) != "" ||
                (grid[0][6]) != "") {
                    gameOver(score);
                }
                else {

                }
            break;
    }
})