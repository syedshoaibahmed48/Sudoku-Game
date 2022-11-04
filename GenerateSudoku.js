function easy(){//function to generate easy sudoku
    clearGrid();
    grid=generateSudoku(35);
    writeGrid(grid);
}

function medium(){//function to generate medium sudoku
    clearGrid();
    grid=generateSudoku(30);
    writeGrid(grid);
}

function hard(){//function to generate hard sudoku
    clearGrid();
    grid=generateSudoku(20);
    writeGrid(grid);
}

function generateSudoku(numbers){//generates a random sudoku

    while(1){
        let sudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    
        numbersDone=0;
        while(numbersDone<numbers){
            r=Math.floor(Math.random()*9);
            c=Math.floor(Math.random()*9);
            n=Math.floor(Math.random()*9)+1;
            if(sudoku[r][c]==0){
                if(!isValidStep(sudoku,r,c,n)) continue;
                sudoku[r][c]=n;
                numbersDone++;
            } 
        }
        if(isSolvable(sudoku)) return sudoku;
    }
}

function writeGrid(sudoku){//writes generated sudoku values to html page
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(sudoku[i][j]!=0){
                cell=document.getElementById("cell("+i+","+j+")");
                cell.value=sudoku[i][j];
                cell.classList.add("generatedCell");
            } 
        }
    }
}