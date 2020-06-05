const di = [0,0,1,-1];
const dj = [-1,1,0,0];
function valid( i,j,currState){
    if(i<0 || i>=N || j<0 || j>=M)return 0;
    if(mazeGrid[i][j] == '#')return 0;
    if(visited[currState][i][j])return 0;
    if(mazeGrid[i][j] == 'R' && (currState&8) == 0)return 0;
    if(mazeGrid[i][j] == 'G' && (currState&4) == 0)return 0;
    if(mazeGrid[i][j] == 'B' && (currState&2) == 0)return 0;
    if(mazeGrid[i][j] == 'Y' && (currState&1) == 0)return 0;
    return 1;
}
let h = 0;

// { x,y,steps,state }
function bfs(st){
   // console.log(visited)
    // pos steps current state
    let q = [];
    q.push({x:st.x,y:st.y,steps:0,state:0});
    visited[0][st.x][st.y]=1;
    let path = [];
    if(!path[0])path[0] = [];
    if(!path[0][st.x])path[0][st.x] = [];
    if(!path[0][st.x][st.y])path[0][st.x][st.y] = {x:st.x,y:st.y,state:0};
    let optPath = [];
    let miny = 1e9;
    while(q.length > 0){
        let x = q[0].x;
        let y = q[0].y;
        let s = q[0].steps;
        let state = q[0].state;
        let statePar = state;
      //  console.log(x,y,s,state)
        q.shift();
        if(mazeGrid[x][y] == 'X'){
           
            if(s < miny){
                miny = s;
                h=1;
                
                // construct optimal path
                optPath = [{x:x,y:y,state:state}];
                let xt = x;
                let yt = y;
                let statet = state;
                let f = 0;
                while(mazeGrid[xt][yt] != '*' || statet != 0 ){
                     //   console.log(mazeGrid[xt][yt])
                      //  console.log('x '+xt+' y '+yt)
                       // console.log(path)
                        let x1 = path[statet][xt][yt].x; 
                        let y1 = path[statet][xt][yt].y; 
                        let state1 = path[statet][xt][yt].state; 
                        optPath.push({x:x1,y:y1,state:state1})
                        xt = x1;
                        yt = y1;
                        statet = state1;
                        f++;

                }

            }
        }
        if(mazeGrid[x][y] == 'r'){
            state = (state|8);
        }
        if(mazeGrid[x][y] == 'g'){
            state =( state|4);
        }
        if(mazeGrid[x][y] == 'b'){
            state = (state|2);
        }
        if(mazeGrid[x][y] == 'y'){
            state = (state|1);
        }
       // console.log(state)
        for(let k=0;k<4;k++){
            let nx = x+di[k];
            let ny = y+dj[k];
            if(valid(nx,ny,state)){
                if(!path[state])path[state] = [];
                if(!path[state][nx])path[state][nx] = [];
                if(!path[state][nx][ny])path[state][nx][ny] = {x:x,y:y,state:statePar};
                visited[state][nx][ny] = 1;
                q.push({x:nx,y:ny,steps:s+1,state:state});
            }

        }
    }
    return optPath.reverse();


}
// mazeGrid[0][0] = '*'
// mazeGrid[10][10] = 'X'

//let path = bfs({x:0,y:0})
let inventory = document.querySelector("#inventory")
async function visualizePath(path,time){
        for(let cell of path){
            inventory.innerHTML = "";
            let divCell = mazeCells[cell.x][cell.y];
            let state = cell.state;
            
            if(state&8){
                let h = document.createElement("h3");
                h.innerText = "red key"
                inventory.appendChild(h)
            }
            if(state&4){
                let h = document.createElement("h3");
                h.innerText = "green key"
                inventory.appendChild(h)
            }

            if(state&2){
                let h = document.createElement("h3");
                h.innerText = "blue key"
                inventory.appendChild(h)
            }
            if(state&1){
                let h = document.createElement("h3");
                h.innerText = "yellow key"

                inventory.appendChild(h)
            }
            let c = mazeGrid[cell.x][cell.y] ;
            if(c== 'R' || c == 'r' ){
                divCell.style.color = '#e74c3c'
            }
            if(c== 'Y' || c == 'y' ){
                divCell.style.color = '#f39c12'
            }
            if(c== 'g' || c == 'G' ){
                divCell.style.color = '#27ae60'
            }
            if(c== 'B' || c == 'b' ){
                divCell.style.color = '#2980b9'
            }
            divCell.classList.add('path');
            divCell.classList.add('animated');
            divCell.classList.add('zoomIn')
            await delay(time)
        }
}
 function clearPath(path){
    for(let cell of path){
        inventory.innerHTML = "";
        let divCell = mazeCells[cell.x][cell.y];
    
        
     
        let c = mazeGrid[cell.x][cell.y] ;
        if(c== 'R' || c == 'r' ){
            divCell.style.color = 'white'
        }
        if(c== 'Y' || c == 'y' ){
            divCell.style.color = 'white'
        }
        if(c== 'g' || c == 'G' ){
            divCell.style.color = 'white'
        }
        if(c== 'B' || c == 'b' ){
            divCell.style.color = 'white'
        }
        divCell.classList.remove('path');
        divCell.classList.remove('animated');
        divCell.classList.remove('zoomIn')
      
    }
}

//visualizePath(path)