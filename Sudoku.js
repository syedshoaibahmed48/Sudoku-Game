window.onload = function(){//works on page load
    createGrid();
    medium();
}

mode = "random";

function randomMode(){//sets mode to random
    mode="random";
}

function customMode(){//sets mode to custom
    mode="custom";
    clearGrid();
}

async function validateInput(){
    row=this.id.charAt(5);
    col=this.id.charAt(7);
    val=this.value;
    if(isNaN(parseInt(val)) || !isValid(row,col,val) || parseInt(val)===0){
        this.classList.add("wrongInput");
        await new Promise(r => setTimeout(r, 500));//wait 0.5 sec
        this.classList.remove("wrongInput");
        this.classList.remove("generatedCell");
        this.value="";
    }
}

function createGrid(){//creates 9x9 grid
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            // creates <input class="cell" id="cell(i,j)" type="number" readonly/>
            cell=document.createElement("input");
            cell.id="cell("+i+","+j+")";
            cell.classList.add("cell");
            cell.type="text";
            cell.style.cursor="pointer";
            cell.setAttribute("maxlength","1");
            cell.addEventListener("change", validateInput);
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