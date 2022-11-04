window.onload = function(){//works on page load
    createGrid();
    medium();
}

option=0;

async function setValue(){//sets value(var option) for a cell and check if it isValid 
    if(option==0 || this.classList.contains("generatedCell")){
        return;
    }
    this.value=option;
    row=this.id.charAt(5);
    col=this.id.charAt(7);
    if(!isValid(row,col,option)){//if 
        this.classList.add("wrongInput");
        await new Promise(r => setTimeout(r, 500));//wait 0.5 sec
        this.classList.remove("wrongInput");
        this.value="";
    }
    isComplete();
}

function selectValue(){//save option chosen in var option 
    option=this.value;
}

function eraseValue(){//since inputs are fixed for ints this will empty them
    option="erase";//string "erase" has no significance any str can do
}

function createGrid(){//creates 9x9 grid
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            // creates <input class="cell" id="cell(i,j)" type="number" readonly/>
            cell=document.createElement("input");
            cell.id="cell("+i+","+j+")";
            cell.classList.add("cell");
            cell.type="number";
            cell.style.cursor="pointer";
            cell.setAttribute("readonly",true);
            cell.addEventListener("click", setValue);
            if(i==2 || i==5 || i==8){
                cell.style.borderBottom="2px solid black"
            }
            if(i==0 || i==3 || i==6){
                cell.style.borderTop="2px solid black"
            }
            if(j==2 || j==5 || j==8){
                cell.style.borderRight="2px solid black";
            }
            if(j==0 || j==3 || j==6){
                cell.style.borderLeft="2px solid black";
            }
            document.getElementById("board").appendChild(cell);
        }
        //to add  line break after each row 
        lineBreak=document.createElement("br");
        document.getElementById("board").appendChild(lineBreak);
    }

    for(i=1;i<=9;i++){
        // creates <input class="cell" id="option-i"  onClick="selectValue();" readonly> i </input>
        cell=document.createElement("input");
        cell.id="option-"+i;
        cell.classList.add("cell");
        cell.setAttribute("readonly",true);
        cell.addEventListener("click", selectValue);
        cell.value=i;
        cell.style.cursor="pointer";
        document.getElementById("options").appendChild(cell);
    }
    cell=document.createElement("input")//erase the cell value option
    cell.id="erase";
    cell.value="del";
    cell.classList.add("cell");
    cell.setAttribute("readonly",true);
    cell.addEventListener("click", eraseValue);
    cell.style.padding="1px";
    cell.style.cursor="pointer";
    document.getElementById("options").appendChild(cell);
}

function resetGrid(){//empties all except generated cells
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            cell=document.getElementById("cell("+i+","+j+")");
            if(!cell.classList.contains("generatedCell")) cell.value="";
        }
    }
}

function clearGrid(){//empties all cells of grid
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            cell=document.getElementById("cell("+i+","+j+")");
            cell.value="";
            cell.className="cell";
        }
    }
}

async function isComplete(){//check if sudoku board is filled
    await new Promise(r => setTimeout(r, 500));//wait 0.5 sec
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(document.getElementById("cell("+i+","+j+")").value=="") return;
        }
    }
    alert("Congratulations, the sudoku is solved 🎉");
}