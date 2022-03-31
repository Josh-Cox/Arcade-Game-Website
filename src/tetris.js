function gameStart() {
    document.getElementById("tetrisStart").style.visibility = "hidden";

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
    let start = false;
    let free = true;
    let freeze = false;
    let movableR = true;
    let movableL = true;
    let gameFinished = false;
    let currentBlock = TETROMINOS.L;
    let currentPositionX = 90;
    let currentPositionY = 0;

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function setGrid(tetromino) {
        
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
                gameFinished = true;
                start = false;
            }
        }

        if (gameFinished == true) {
            gameOver(score);
            // location.reload();
        }

        else {
            drawNewShape(TETROMINOS.L);
            start = true;
        }
    }

    setInterval(function() {
        if (start == true) {
            moveDown();
        }
    }, 1000);
    

    function moveDown() {

        //check if block is at bottom
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][0] >= 19) {
                freeze = true;
            }
        }

        //check blocks below are free
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][0] < 19) {
                if (grid[(currentPos[i][0] + 1)][(currentPos[i][1])] == "Q") {
                    free = false;
                }
            }
        }

        //freeze block
        if ((freeze == true) || free == false) {
            console.log("BLOCK FROZEN");
            freeze = false;
            free = true;
            start = false;
            movableL = true;
            movableR = true;
            
            
            //set grid coords to "Q"
            for (let i = 0; i < currentPos.length; i++) {
                grid[(currentPos[i][0])][(currentPos[i][1])] = "Q";
            }

            //grab all active blocks
            temp = document.querySelectorAll(".block");

            //change blocks class to "taken"
            for (let i = 0; i < temp.length; i++) {
                temp[i].className = "taken";
            }
            
            score += 1;
            newBlock();
        }

        //check coords below are free
        else {

            //move block down
            if (free == true) {

                //set old grid coords to blank
                for (let i = 0; i < currentPos.length; i++) {
                    if (currentPos[i][0] < 19) {
                        grid[(currentPos[i][0])][(currentPos[i][1])] = "";
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
                tempDisplay = document.querySelectorAll(".block");
                currentPositionY += 30;
                for (let i = 0; i < tempDisplay.length; i++) {
                    tempDisplay[i].style.transform = "translate(" + currentPositionX + "px," + (currentPositionY) + "px)";
                }
            }   
        }
    }

    /**
     * Sets position and attributes of tetromino
     * @param shape 
     */
    function drawNewShape(shape) {
        if (shape == TETROMINOS.L) {
            currentPositionX = 90;
            currentPositionY = 0;

            createDiv().id = "blue";
            createDiv().id = "blue";
            createDiv().id = "blue";
            createDiv().id = "blue";

            
            selectAll = document.querySelectorAll(".block")
            
            selectAll[0].style.left = (609.5 + "px");
            selectAll[1].style.left = (639.5 + "px");
            selectAll[2].style.left = (669.5 + "px");
            selectAll[3].style.left = (669.5 + "px");

            selectAll[0].style.top = (202 + "px");
            selectAll[1].style.top = (202 + "px");
            selectAll[2].style.top = (202 + "px");
            selectAll[3].style.top = (232 + "px");


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

        //check if in bounds
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] <= 0) {
                movableL = false;
            }
        }

        if (movableL == true) {
            console.log("LEFT");
            //set old grid coords to blank
            for (let i = 0; i < currentPos.length; i++) {
                grid[(currentPos[i][0])][(currentPos[i][1])] = "";
            }
    
            //set new currentPos
            for (let i = 0; i < currentPos.length; i++) {
                currentPos[i][1] = currentPos[i][1] - 1;
            }
            
            //set new grid coords to tetromino letter
            for (let i = 0; i < currentPos.length; i++) {
                grid[currentPos[i][0]][currentPos[i][1]] = getKeyByValue(TETROMINOS, currentBlock);
            }
    
            //move tetromino
            temp = document.querySelectorAll(".block");
            currentPositionX -= 30;
            for (let i = 0; i < temp.length; i++) {
                temp[i].style.transform = "translate(" + (currentPositionX) + "px," + (currentPositionY) + "px)";
            }
        }
        movableL = true;

    }

    function moveRight() {

        //check if in bounds
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] >= 9) {
                movableR = false;
            }
        }

        if (movableR == true) {
            console.log("RIGHT");

            //set old grid coords to blank
            for (let i = 0; i < currentPos.length; i++) {
                grid[(currentPos[i][0])][(currentPos[i][1])] = "";
            }
            
            //set new currentPos
            for (let i = 0; i < currentPos.length; i++) {
                currentPos[i][1] = currentPos[i][1] + 1;
            }
            
            //set new grid coords to tetromino letter
            for (let i = 0; i < currentPos.length; i++) {
                grid[currentPos[i][0]][currentPos[i][1]] = getKeyByValue(TETROMINOS, currentBlock);
            }
            
            //move tetromino
            temp = document.querySelectorAll(".block");
            currentPositionX += 30;
            for (let i = 0; i < temp.length; i++) {
                temp[i].style.transform = "translate(" + (currentPositionX) + "px," + (currentPositionY) + "px)";
            } 
        }
        movableR = true;
    }
    
    
    /**
     * Creates a post request to leaderboard.php
     * @param score 
     */
    function gameOver(score) {
        console.log("POST");

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

        // let random = Math.floor(Math.random()*6);
        let random = 1;
        switch(random) {
            case 0:
                currentBlock = TETROMINOS.O;
                setGrid(currentBlock);
                break;
            case 1:
                currentBlock = TETROMINOS.L;
                setGrid(TETROMINOS.L);
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
    newBlock();
}
