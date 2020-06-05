let speed = document.querySelector("#speed")
let time = 100;
speed.addEventListener("change",(e)=>{
    let s = Number(speed.value);
    if(s == 0) time = 5000;
    else{
        time = Math.ceil((100/s)*100);
    }
})
let path = [];
solveButton.addEventListener('click',()=>{
   // console.log(visited)
    if(isPlayer && isExit){
        clearPath(path)
        visited = constructVisitedArr(noOfKeys,N,M);
        //console.log(visited)
         path =  bfs(start);
       
        if(path.length == 0){
            bootbox.alert("Iam stuck")
            return 0;
        }
        visualizePath(path,time);
    }else{
        bootbox.alert("please make sure you added 1 player and 1 exit")
    }
})