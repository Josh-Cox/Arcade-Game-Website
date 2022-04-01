function gameStart() {
    let audio = document.getElementById("audio");
    audio.volume = 0.2;
    audio.play();
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
    let rotatable = false;
    let gameFinished = false;
    let currentBlock = TETROMINOS.L;
    let currentPositionX = 90;
    let currentPositionY = 0;

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function setGrid() {
        
        //set correct currentPos
        for (let i = 0; i < currentBlock.length; i++) {
            currentPos[i][0] = currentBlock[i][0] - 1;
            currentPos[i][1] = currentBlock[i][1] + 2;
        }


        //loop through tetromino coords
        for (let i = 0; i < currentPos.length; i++) {
            //if start position is free
            if (grid[currentPos[i][0]][currentPos[i][1]] == "") {
                //set grid coords
                grid[currentPos[i][0]][currentPos[i][1]] = getKeyByValue(TETROMINOS, currentBlock);
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
            drawNewShape();
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
                temp[i].id = "";
            }

            //check if any rows are complete
            checkCompleteRows();
            
            //create new block
            if (start == true) {
                newBlock();
            }
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
     * Checks if any rows are complete in the grid
     */
    function checkCompleteRows() {
        let complete = true;

        for (let i = 0; i <= 19; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] != "Q") {
                    complete = false;
                }
            }

            if (complete == true) {
                removeRow(i);
            }
            complete = true;
        }
    }

    /**
     * Removes a row from the grid
     * @param row
     */
    function removeRow(row) {
        console.log("REMOVE ROW " + row);

        //set row coords to row above
        for (let i = row; i >= (20 - row); i--) {
            for (let j = 0; j <= 9; j++) {
                grid[i][j] = grid[i - 1][j];
            }
        }

        //get all taken blocks
        let allTakenBlocks = document.querySelectorAll(".taken");

        //remove row
        let remainTakenBlocks = [];
        let count = 0;

        for (let i = 0; i < allTakenBlocks.length; i++) {
            if (getTopOffset(allTakenBlocks[i]) == (202 + (row * 30))) {
                allTakenBlocks[i].remove();
            }
            else if (getOffset(allTakenBlocks[i]) < (202 + (row * 30))) {
                remainTakenBlocks[count] = allTakenBlocks[i];
                count ++;
            }
        }


        //move everything down
        remainTakenBlocks.forEach(element => {
            let x = getTranslateValues(element).x;
            element.style.top = (getOffset(element) + 30) + "px";
            element.style.transform = "translateY(0px)";
            element.style.transform = "translateX(" + x + "px)";
        });

    }

    function getTopOffset(block) {
        let temp = block.getBoundingClientRect();
        return Math.round((temp.top + window.scrollY));
    }

    function getOffset(block) {
        let temp = block.getBoundingClientRect();
        return (temp.top + window.scrollY);
    }

    /**
     * Gets computed translate values
     * @param {HTMLElement} element
     * @returns {Object}
     */
    function getTranslateValues (element) {
        const style = window.getComputedStyle(element)
        const matrix = style['transform'] || style.webkitTransform || style.mozTransform
    
        // No transform property. Simply return 0 values.
        if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
            x: 0,
            y: 0,
            z: 0
        }
        }
    
        // Can either be 2d or 3d transform
        const matrixType = matrix.includes('3d') ? '3d' : '2d'
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
    
        // 2d matrices have 6 values
        // Last 2 values are X and Y.
        // 2d matrices does not have Z value.
        if (matrixType === '2d') {
        return {
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0
        }
        }
    
        // 3d matrices have 16 values
        // The 13th, 14th, and 15th values are X, Y, and Z
        if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14]
        }
        }
    }

    /**
     * Sets position and attributes of tetromino
     */
    function drawNewShape() {
        score += 1;
        currentPositionX = 90;
        currentPositionY = 0;

        switch (currentBlock) {
            case TETROMINOS.L:

                //create 4 block divs
                createDiv().id = "blue";
                createDiv().id = "blue";
                createDiv().id = "blue";
                createDiv().id = "blue";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (609.5 + "px");
                selectAll[1].style.left = (639.5 + "px");
                selectAll[2].style.left = (669.5 + "px");
                selectAll[3].style.left = (669.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (202 + "px");
                selectAll[2].style.top = (202 + "px");
                selectAll[3].style.top = (232 + "px");
    
                break;

            case TETROMINOS.O:

                //create 4 block divs
                createDiv().id = "yellow";
                createDiv().id = "yellow";
                createDiv().id = "yellow";
                createDiv().id = "yellow";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (609.5 + "px");
                selectAll[1].style.left = (639.5 + "px");
                selectAll[2].style.left = (609.5 + "px");
                selectAll[3].style.left = (639.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (202 + "px");
                selectAll[2].style.top = (232 + "px");
                selectAll[3].style.top = (232 + "px");
    
                break;

            case TETROMINOS.Z:

                //create 4 block divs
                createDiv().id = "orange";
                createDiv().id = "orange";
                createDiv().id = "orange";
                createDiv().id = "orange";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (609.5 + "px");
                selectAll[1].style.left = (609.5 + "px");
                selectAll[2].style.left = (639.5 + "px");
                selectAll[3].style.left = (669.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (232 + "px");
                selectAll[2].style.top = (232 + "px");
                selectAll[3].style.top = (232 + "px");
    
                break;

            case TETROMINOS.S:

                //create 4 block divs
                createDiv().id = "red";
                createDiv().id = "red";
                createDiv().id = "red";
                createDiv().id = "red";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (639.5 + "px");
                selectAll[1].style.left = (639.5 + "px");
                selectAll[2].style.left = (609.5 + "px");
                selectAll[3].style.left = (609.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (232 + "px");
                selectAll[2].style.top = (232 + "px");
                selectAll[3].style.top = (262 + "px");
    
                break;

            case TETROMINOS.T:

                //create 4 block divs
                createDiv().id = "purple";
                createDiv().id = "purple";
                createDiv().id = "purple";
                createDiv().id = "purple";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (609.5 + "px");
                selectAll[1].style.left = (609.5 + "px");
                selectAll[2].style.left = (639.5 + "px");
                selectAll[3].style.left = (609.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (232 + "px");
                selectAll[2].style.top = (232 + "px");
                selectAll[3].style.top = (262 + "px");

                break;

            case TETROMINOS.I:

                //create 4 block divs
                createDiv().id = "light-blue";
                createDiv().id = "light-blue";
                createDiv().id = "light-blue";
                createDiv().id = "light-blue";
            
                //set selectAll to all block divs
                selectAll = document.querySelectorAll(".block")
                
                //set correct coordinates
                selectAll[0].style.left = (609.5 + "px");
                selectAll[1].style.left = (639.5 + "px");
                selectAll[2].style.left = (669.5 + "px");
                selectAll[3].style.left = (699.5 + "px");
    
                selectAll[0].style.top = (202 + "px");
                selectAll[1].style.top = (202 + "px");
                selectAll[2].style.top = (202 + "px");
                selectAll[3].style.top = (202 + "px");
    
                break;
        }

        //move divs to correct place
        for (let i = 0; i < selectAll.length; i++) {
            selectAll[i].style.transform = "translate(" + currentPositionX + "px," + currentPositionY + "px)";
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

    document.addEventListener("keydown", move);

    function move(keydown) {
        switch (keydown.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowDown":
                moveDown();
                keydown.preventDefault();
                break;
            case "ArrowUp":
                // rotate();
                keydown.preventDefault();
                break;
        }
    }

    function rotate() {
          
        //check if in bounds
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] <= 0) {
                rotatable = false;
            }
        }

          let side = Math.sqrt(currentPos.length);
          let rotate = function(d,i){
             return [Math.abs(i % side - side+1), Math.floor(i/side)]
          }
          currentPos = currentPos.map(rotate);

    }

    function moveLeft() {

        //check if in bounds
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] <= 0) {
                movableL = false;
            }
        }

        //check blocks are free
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] > 0) {
                if (grid[(currentPos[i][0])][(currentPos[i][1] - 1)] == "Q") {
                    movableL = false;
                }
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

        //check blocks are free
        for (let i = 0; i < currentPos.length; i++) {
            if (currentPos[i][1] < 19) {
                if (grid[(currentPos[i][0])][(currentPos[i][1] + 1)] == "Q") {
                    movableR = false;
                }
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

        alert("Game Over\nHead to the leaderboard to see how you did!");

    }
    

    /**
     * Creates a new block on the tetris grid
     */
    function newBlock() {

        let random = Math.floor(Math.random()*6);
        // let random = 0;
        switch(random) {
            case 0:
                currentBlock = TETROMINOS.O;
                setGrid();
                break;
            case 1:
                currentBlock = TETROMINOS.L;
                setGrid();
                break;
            case 2:
                currentBlock = TETROMINOS.Z;
                setGrid();
                break;
            case 3:
                currentBlock = TETROMINOS.S;
                setGrid();
                break;
            case 4:
                currentBlock = TETROMINOS.T;
                setGrid();
                break;
            case 5:
                currentBlock = TETROMINOS.I;
                setGrid();
                break;
        }
    }
    newBlock();
}
