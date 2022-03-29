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


    const TETROMINOS = {
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

    let currentPos = [[0, 0], [0, 0], [0, 0], [0, 0]];

    let score = 0;
    let currentBlock = TETROMINOS.L;
    let currentPositionX = 90;
    let currentPositionY = 0;

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function setGrid(tetromino) {
        currentPos = [[0, 0], [0, 0], [0, 0], [0, 0]];
        console.log(currentPos);
        console.log(currentPositionX);
        console.log(currentPositionY);
        let gameOver = false;
        
        //set correct currentPos
        for (let i = 0; i < tetromino.length; i++) {
            currentPos[i][0] = tetromino[i][0] - 1;
            currentPos[i][1] = tetromino[i][1] + 2;
        }

        //loop through tetromino coords
        for (let i = 0; i < currentPos.length; i++) {
            //set grid coords
            if (grid[currentPos[i][0]][currentPos[i][1]] == "") {
                grid[currentPos[i][0]][currentPos[i][1]] = getKeyByValue(TETROMINOS, tetromino);
            }
            else {
                gameOver = true;
                alert("GAME OVER");
                gameOver();
            }
        }
        if (gameOver == false) {
            drawNewShape(currentBlock);
        }
    }

    setInterval(function() {
        moveDown();
    }, 1000);

    setInterval(function() {
        if (document.querySelectorAll(".block").length == 0) {
            currentPositionX = 90;
            currentPositionY = 0;
            newBlock();
        }
    }, 10);

    function moveDown() {
        if (document.querySelectorAll(".block").length != 0) {

            let free = true;
            //check coords below are free
            for (let i = 0; i < currentPos.length; i++) {
                if (currentPos[i][0] < 19) {
                    if (grid[currentPos[i][0] + 1][currentPos[i][1]] == "Q") {
                        free = false;
                    }
                }
            }
            if (free == true) {
                //grab all active blocks
                temp = document.querySelectorAll(".block");
                //if at bottom of grid
                if (currentPositionY >= 540) {
                    //change blocks class to "taken"
                    for (let i = 0; i < temp.length; i++) {
                        temp[i].className = "taken";
                    }
                    currentPositionY = 0;
                }
                else {
                    //set old grid coords to blank
                    for (let i = 0; i < currentPos.length; i++) {
                        if (currentPos[i][0] < 19) {
                            grid[currentPos[i][0]][currentPos[i][1]] = "";
                        }
                    }
                    //set new currentPos
                    for (let i = 0; i < currentPos.length; i++) {
                        if (currentPos[i][0] < 19) {
                            currentPos[i][0] = currentPos[i][0] + 1;
                    }
                    }
                    //set new grid coords to tetromino letter
                    for (let i = 0; i < currentPos.length; i++) {
                        if (currentPos[i][0] < 19) {
                            grid[currentPos[i][0]][currentPos[i][1]] = getKeyByValue(TETROMINOS, currentBlock);
                        }
                    }

                    //move tetromino down
                    currentPositionY += 30;
                    for (let i = 0; i < temp.length; i++) {
                        temp[i].style.transform = "translate(" + currentPositionX + "px," + (currentPositionY) + "px)";
                    }
                }
            }
        }
    }

    /**
     * Sets position and attributes of tetromino
     * @param shape 
     */
    function drawNewShape(shape) {
        if (shape = TETROMINOS.L) {
            createDiv().id = "blue";
            createDiv().id = "blue";
            createDiv().id = "blue";
            temp = createDiv();
            temp.id = "blue";
            temp.style.position = "relative";
            temp.style.top = "30px";
            temp.style.right = "30px";

            selectAll = document.querySelectorAll(".block")

            for (let i = 0; i < selectAll.length; i++) {
                selectAll[i].style.transform = "translate(" + currentPositionX + "px," + currentPositionY + "px)";
            }
        }
    }
    
    /**
     * Draws a tetromino on the grid
     */
    function createDiv() {
        const newDiv = document.createElement("div");
        newDiv.className = "block";
        return document.getElementById("tetris-grid").appendChild(newDiv);
    }

    document.addEventListener("keydown", test);

    function test(keydown) {
        switch (keydown.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowDown":
                moveDown();
                break;
        }
    }

    function moveLeft() {
        temp = document.querySelectorAll(".block");

        for (let i = 0; i < temp.length; i++) {
            temp[i].style.transform = "translate(" + (currentPositionX - 30) + "px," + (currentPositionY) + "px)";
        }

        currentPositionX -= 30;
    }

    function moveRight() {
        temp = document.querySelectorAll(".block");

        for (let i = 0; i < temp.length; i++) {
            temp[i].style.transform = "translate(" + (currentPositionX + 30) + "px," + (currentPositionY) + "px)";
        }

        currentPositionX += 30;
    }
    
    
    /**
     * Creates a post request to leaderboard.php
     * @param score 
     */
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
    

    /**
     * Creates a new block on the tetris grid
     */
    function newBlock() {

        currentPos = [[0, 0], [0, 0], [0, 0], [0, 0]];
        // let random = Math.floor(Math.random()*6);
        let random = 1;
        switch(random) {
            case 0:
                currentBlock = TETROMINOS.O;
                setGrid(currentBlock);
                break;
            case 1:
                currentBlock = TETROMINOS.L;
                setGrid(currentBlock);
                break;
            case 2:
                currentBlock = TETROMINOS.Z;
                setGrid(currentBlock);
                break;
            case 3:
                currentBlock = TETROMINOS.S;
                setGrid(currentBlock);
                break;
            case 4:
                currentBlock = TETROMINOS.T;
                setGrid(currentBlock);
                break;
            case 5:
                currentBlock = TETROMINOS.I;
                setGrid(currentBlock);
                break;
        }
    }
})