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

    //set up POST request
    // let url = "http://localhost:8888/src/leaderboard.php";
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);

    // xhr.setRequestHeader("Accept", "")

    //test
    $.ajax({
        type: "POST",
        url: "leaderboard.php",
        data: {
        Username: "",
        Score: score
        },
        cache: false,
        success: function(data) {
        alert(data);
        },
        error: function(xhr, status, error) {
        console.error(xhr);
        }
        });
        
    
    switch(random) {
        case 0:
            currentBlock = tetrominoes.O;
            if (
                (grid[0][4]) || 
                (grid[0][5]) ||
                (grid[1][4]) ||
                (grid[1][5])) {
                    //game over
                }
            break;
        case 1:
            currentBlock = tetrominoes.L;
            if (
                (grid[0][3]) || 
                (grid[0][4]) ||
                (grid[0][5]) ||
                (grid[1][5])) {
                    //game over
                }
            break;
        case 2:
            currentBlock = tetrominoes.Z;
            if (
                (grid[1][3]) || 
                (grid[1][4]) ||
                (grid[1][5]) ||
                (grid[0][3])) {
                    //game over
                }
            break;
        case 3:
            currentBlock = tetrominoes.S;
            if (
                (grid[0][5]) || 
                (grid[1][5]) ||
                (grid[1][4]) ||
                (grid[2][4])) {
                    //game over
                }
            break;
        case 4:
            currentBlock = tetrominoes.T;
            if (
                (grid[0][4]) || 
                (grid[1][4]) ||
                (grid[1][5]) ||
                (grid[2][4])) {
                    //game over
                }
            break;
        case 5:
            currentBlock = tetrominoes.I;
            if (
                (grid[0][3]) || 
                (grid[0][4]) ||
                (grid[0][5]) ||
                (grid[0][6])) {
                    //game over
                }
            break;
    }
})