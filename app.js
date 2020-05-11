// mazeGrid
function generate(){
  let s = "{";  
for(let i=0;i<10;i++){
    let ss = "{";
    for(let j=0;j<10;j++){
         if(mazeGrid[i][j] == '.')ss+="0";
         else ss += "1";
         if(j !=9) ss+=",";
    }
    //console.log("fff "+ss)
    ss+="}";
    s+=ss;
    if(i!=9)s+=",";
}
s+="}";

console.log(s);
}