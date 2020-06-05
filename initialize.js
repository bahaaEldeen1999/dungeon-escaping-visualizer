const maze = document.getElementById('maze');
const cellFactor =40 ; 
const N= Math.floor(maze.offsetHeight/cellFactor);
const M = Math.floor(maze.offsetWidth/cellFactor);
const noOfKeys = 4;
const border = 1;
const emptyColor = 'lightgreen';
const freeCellClass = 'free-cell';
const wallCellClass = 'wall-cell';
const keyCellClass = 'key-cell';
const doorCellClass = 'door-cell';
const playerCellClass = 'player';
const outCellClass = 'out';
let currentlySelected = 'wall';
let clicked = -1;
let mazeGrid = constructMazeGrid(N,M);
let visited = constructVisitedArr(noOfKeys,N,M);
let mazeCells = createMaze(N,M);
let isPlayer = false;
let isExit = false;
const selectText = document.querySelector("#current-text")
let start = {x:-1,y:-1};

function constructVisitedArr(noOfKeys,N,M){
    let vis = new Array(Math.pow(2,noOfKeys)); // [2^no][N][M]
    // construct visited array
    for(let i=0;i<vis.length;i++){
        let na = new Array(N);
        for(let j=0;j<N;j++){
            let ma = new Array(M);
            for(let k=0;k<M;k++){
                ma[k]=0;
            }
            na[j] = ma;
         //   console.log(na[j])
        }
        vis[i]=na;
        
    }
   // console.log(vis)
    return vis;
}

function constructMazeGrid(N,M){
    // construct maze array
    const mazeGrid = new Array(N);
    for(let i=0;i<N;i++){
        let ma = new Array(M);
        for(let j=0;j<M;j++){
            ma[j] = '.';
        }
        mazeGrid[i]=ma;
    }
    return mazeGrid;
}
function createCell(width,height,color,text,i,j){
    let div = document.createElement('div');
    div.style.width = (width-border)+'px';
    div.style.height = (height-border)+'px';
    div.innerText = text||'';
    div.classList.add(freeCellClass);
    div.classList.add('cell');
    div.classList.add('animated');
    div.posI = i;
    div.posJ = j;
    return div;
}


function createMaze(N,M){
    maze.innerHTML = ""
    let mazeCells = [];
    for(let i=0;i<N;i++){
        let mazeRow = [];
        let row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<M;j++){
            let cell = createCell(cellFactor,cellFactor,emptyColor,undefined,i,j); 
            row.appendChild(cell);
            mazeRow.push(cell);
        }
        maze.appendChild(row);
        mazeCells.push(mazeRow);
    }
    return mazeCells;
}


function updateCell(cell,cellType){
    let posI = Number(cell.posI);
    let posJ =Number(cell.posJ);
    switch(cellType){
        case 'free':
            if( mazeGrid[posI][posJ] == '*')isPlayer = false;
            if( mazeGrid[posI][posJ] == 'X')isExit = false;
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('zoomIn')
            cell.classList.add(freeCellClass);
            mazeGrid[posI][posJ] = '.';
            break;
        case 'wall':
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('zoomIn')
            cell.classList.add(wallCellClass);
            mazeGrid[posI][posJ] = '#';
            break;
        case 'door-red':
        {
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('flipInX')
            cell.classList.add(doorCellClass+'-red');
            let icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-university');
            cell.appendChild(icon);
            mazeGrid[posI][posJ] = 'R';
            break;
        }
        case 'door-green':
        {
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('flipInX')
            cell.classList.add(doorCellClass+'-green');
            let icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-university');
            cell.appendChild(icon);
            mazeGrid[posI][posJ] = 'G';
            break;
        }
        case 'door-yellow':
        {
            
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('flipInX')
            cell.classList.add(doorCellClass+'-yellow');
            let icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-university');
            cell.appendChild(icon);
            mazeGrid[posI][posJ] = 'Y';
            break;
        }
        case 'door-blue':
        {
            cell.innerHTML = '';
            cell.classList = '';
            cell.classList.add('cell');
            cell.classList.add('animated');
            cell.classList.add('flipInX')
            cell.classList.add(doorCellClass+'-blue');
            let icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-university');
            cell.appendChild(icon);
            mazeGrid[posI][posJ] = 'B';
            break;
        }
        case 'key-red':
            {
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX')
                cell.classList.add(doorCellClass+'-red');
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-key');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = 'r';
                break;
            }
        case 'key-green':
            {
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX')
                cell.classList.add(doorCellClass+'-green');
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-key');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = 'g';
                break;
            }
        case 'key-yellow':
            {
                
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX')
                cell.classList.add(doorCellClass+'-yellow');
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-key');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = 'y';
                break;
            }
        case 'key-blue':
            {
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX')
                cell.classList.add(doorCellClass+'-blue');
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-key');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = 'b';
                break;
            }
        case 'player':
            {
                if(isPlayer){
                    bootbox.alert("cannot add more than 1 player")
                    return 0;
                }
                isPlayer = true;
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX');
                cell.classList.add('player-cell');
                cell.classList.add(playerCellClass);
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-user');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = '*';
                start = {x:posI,y:posJ};
                break;
            }
        case 'exit':
                {
                    if(isExit){
                        bootbox.alert("cannot add more than 1 exit")
                        return 0;
                    }
                    isExit = true;
                    cell.innerHTML = '';
                    cell.classList = '';
                    cell.classList.add('cell');
                    cell.classList.add('animated');
                    cell.classList.add('flipInX');
                    cell.classList.add('exit-cell');
                    cell.classList.add(outCellClass);
                    let icon = document.createElement('i');
                    icon.classList.add('fa');
                    icon.classList.add('fa-sign-out');
                    cell.appendChild(icon);
                    mazeGrid[posI][posJ] = 'X';
                    break;
                }



    }
}
function reset(){
     currentlySelected = 'wall-cell';
     clicked = -1;
     mazeGrid = constructMazeGrid(N,M);
     visited = constructVisitedArr(noOfKeys,N,M);
     mazeCells = createMaze(N,M);
     isPlayer = false;
     isExit = false;
     for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            let cell = mazeCells[i][j];
            cell.addEventListener('mousemove',()=>{
                if(clicked == 1){
                    
                    if(cell.classList.contains(freeCellClass)){
                        updateCell(cell,currentlySelected)
                    }else{
                        updateCell(cell,'free')
                    }
                }
            })
            cell.addEventListener('mousedown',()=>{
                clicked = 1;
                event.preventDefault()
            });
            cell.addEventListener('click',()=>{
               
                    
                    if(cell.classList.contains(freeCellClass)){
                        updateCell(cell,currentlySelected)
                    }else{
                        updateCell(cell,'free')
                    }
                
            })
           
            
    }
    }
}

for(let i=0;i<N;i++){
    for(let j=0;j<M;j++){
        let cell = mazeCells[i][j];
        cell.addEventListener('mousemove',()=>{
            if(clicked == 1){
                
                if(cell.classList.contains(freeCellClass)){
                    updateCell(cell,currentlySelected)
                }else{
                    updateCell(cell,'free')
                }
            }
        })
        cell.addEventListener('mousedown',()=>{
            clicked = 1;
            event.preventDefault()
        });
        cell.addEventListener('click',()=>{
           
                
                if(cell.classList.contains(freeCellClass)){
                    updateCell(cell,currentlySelected)
                }else{
                    updateCell(cell,'free')
                }
            
        })
       
        
}
}
window.addEventListener('mouseup',()=>{
   
    clicked = -1;
});

const menuSelect = document.querySelectorAll('#menu>div');
menuSelect.forEach(div=>{
    div.addEventListener('click',(e)=>{
        
        let selected = div.className
        if(selected == "player" && isPlayer){
            bootbox.alert("cannot add more than 1 player")
            return;
        }
        if(selected == "out" && isExit){
            bootbox.alert("cannot add more than 1 exit")
            return;
        }
        currentlySelected = selected
        selectText.innerText = currentlySelected
    })
})
//document.querySelectorAll('.fa').forEach(icon=>icon.classList.add("fa-2x"))
const solveButton = document.querySelector("#solve");