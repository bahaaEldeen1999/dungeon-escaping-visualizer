const maze = document.getElementById('maze');
const cellFactor =Math.floor(maze.offsetHeight/10) ; 
const N= 10//Math.floor(maze.offsetHeight/cellFactor);
const M = 10//Math.floor(maze.offsetWidth/cellFactor);
const noOfKeys = 4;
const border = 1;
const emptyColor = 'lightgreen';
const freeCellClass = 'free-cell';
const wallCellClass = 'wall-cell';
const keyCellClass = 'key-cell';
const doorCellClass = 'door-cell';
const playerCellClass = 'player';
const outCellClass = 'out';
let clicked = -1;
let mazeGrid = constructMazeGrid(N,M);
const visited = constructVisitedArr(noOfKeys,N,M);
const mazeCells = createMaze(N,M);
function constructVisitedArr(noOfKeys,N,M){
    let visited = new Array(Math.pow(2,noOfKeys)); // [2^no][N][M]
    // construct visited array
    for(let i=0;i<visited.length;i++){
        let na = new Array(N);
        for(let j=0;j<N;j++){
            let ma = new Array(M);
            for(let k=0;k<M;k++){
                ma[k]=0;
            }
            na[j] = ma;
        }
        visited[i]=na;
        
    }
    return visited;
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
        case 'red-door':
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
        case 'green-door':
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
        case 'yellow-door':
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
        case 'blue-door':
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
        case 'red-key':
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
        case 'green-key':
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
        case 'yellow-key':
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
        case 'blue-key':
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
                cell.innerHTML = '';
                cell.classList = '';
                cell.classList.add('cell');
                cell.classList.add('animated');
                cell.classList.add('flipInX')
                cell.classList.add(playerCellClass);
                let icon = document.createElement('i');
                icon.classList.add('fa');
                icon.classList.add('fa-male');
                cell.appendChild(icon);
                mazeGrid[posI][posJ] = '*';
                break;
            }
        case 'out':
                {
                    cell.innerHTML = '';
                    cell.classList = '';
                    cell.classList.add('cell');
                    cell.classList.add('animated');
                    cell.classList.add('flipInX')
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


for(let i=0;i<N;i++){
    for(let j=0;j<M;j++){
        let cell = mazeCells[i][j];
        cell.addEventListener('mousemove',()=>{
            if(clicked == 1){
                
                if(cell.classList.contains(freeCellClass)){
                    updateCell(cell,'wall')
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
                    updateCell(cell,'wall')
                }else{
                    updateCell(cell,'free')
                }
            
        })
       
        
}
}
window.addEventListener('mouseup',()=>{
    console.log('mouseuo')
    clicked = -1;
});