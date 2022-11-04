function isValid(row,col,num){//validate if placing num in grid is Valid
    for(i=0;i<9;i++){
        if(i!=col && document.getElementById("cell("+row+","+i+")").value==num) return false;//check row
        if(i!=row && document.getElementById("cell("+i+","+col+")").value==num) return false;//check col
    }

    boxRowStart=row-row%3;
    boxColStart=col-col%3;
    for(i=boxRowStart;i<boxRowStart+3;i++){
        for(j=boxColStart;j<boxColStart+3;j++){
            if(i!=row && j!=col && document.getElementById("cell("+i+","+j+")").value==num) return false;
        }
    }
    return true;
}

function isValidStep(sudoku, row, col, num){//check is num can be placed in sudoku[row][col]
    for(i=0;i<9;i++){
        if(i!=col && sudoku[row][i]==num) return false;
        if(i!=row && sudoku[i][col]==num) return false;
    }
    boxRowStart=row-row%3;
    boxColStart=col-col%3;
    for(i=boxRowStart;i<boxRowStart+3;i++){
        for(j=boxColStart;j<boxColStart+3;j++){
            if(i!=row && j!=col && sudoku[i][j]==num) return false;
        }
    }
    return true;
}

function getGrid(){
    sudoku=[];
    for(let i=0;i<9;i++){
        let row=[];
        for(let j=0;j<9;j++){
            let number=document.getElementById("cell("+i+","+j+")").value;
            if(number=="") row.push(0);
            else row.push(parseInt(number));
        }
        sudoku.push(row);
    }
    return sudoku;
}

function getSolution(sudoku){
    let row = -1;
    let col = -1;
    let isFilled = true;
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if (sudoku[i][j] == 0){
                row = i;
                col = j;
                isFilled = false;
                break;
            }
        }
        if (!isFilled) break;
    }
 
    if (isFilled)  return true;

    for(let num=1;num<=9;num++){
        if(isValidStep(sudoku,row,col,num)){
            sudoku[row][col]=num;
            if(getSolution(sudoku)) return true;
            else sudoku[row][col]=0;
        }
    }
    return false;
}

function isSolvable(sudoku){
    puzzle=JSON.parse(JSON.stringify(sudoku));//to copy sudoku values to puzzle without reference, because  
    let row = -1;                             // in this function we are not solving sudoku
    let col = -1;                             // but checking if it is solvable or not.
    let isFilled = true;
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if (puzzle[i][j] == 0){
                row = i;
                col = j;
                isFilled = false;//cell is not assigned a value
                break;
            }
        }
        if (!isFilled) break;
    }
 
    if (isFilled)  return true;//all cells are filled

    for(let num=1;num<=9;num++){//consider each number [1..9] at cell and check if valid
        if(isValidStep(puzzle,row,col,num)){
            puzzle[row][col]=num;
            if(getSolution(puzzle)) return true;//check if next cells can be solved after this step
            else puzzle[row][col]=0;//backtracking
        }
    }
    return false;
}

function writeSolution(){
    resetGrid();
    sudoku=getGrid();
    getSolution(sudoku);
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            document.getElementById("cell("+i+","+j+")").value=sudoku[i][j];
        }
    }
    isComplete();
}