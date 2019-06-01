/*<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "root";
$database="mysql";
$conn = new mysqli($dbhost, $dbuser, $dbpass,$database);
$sql = "SELECT JSON_string FROM mysql.first_test WHERE name = 'AIIMS.png' limit 1";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
?> */
var cords = [];
var connected_nodes = [];
for (var temp = 0; temp < 3600 ; temp++) {
    connected_nodes[temp] = [];
}
// var tr = '<?php echo $row['JSON_string'] ;?>';
var tr =  '{"cords":[{"value":5504,"connected_nodes":[4604,5513],"Tags":[],"name":"Entry","description":""},{"value":4604,"connected_nodes":[3504,5504,4613],"Tags":[],"name":"","description":""},{"value":3504,"connected_nodes":[4604,3513,2604],"Tags":[],"name":"","description":""},{"value":2604,"connected_nodes":[2613,3504,1704],"Tags":[],"name":"","description":""},{"value":1704,"connected_nodes":[2604,1713],"Tags":[],"name":"","description":""},{"value":1713,"connected_nodes":[2613,1704,1726,1013],"Tags":[],"name":"","description":""},{"value":2613,"connected_nodes":[2604,1713,3513],"Tags":[],"name":"","description":""},{"value":3513,"connected_nodes":[2613,3504,4613,3526],"Tags":[],"name":"Mid6","description":""},{"value":4613,"connected_nodes":[4604,5513,3513,4639],"Tags":[],"name":"","description":""},{"value":5513,"connected_nodes":[5504,4613],"Tags":[],"name":"","description":""},{"value":2626,"connected_nodes":[3526,1726,2639],"Tags":[],"name":"Mid3","description":""},{"value":2639,"connected_nodes":[2626,4639],"Tags":[],"name":"Mid1","description":""},{"value":1726,"connected_nodes":[1713,2626,1739],"Tags":[],"name":"","description":""},{"value":3526,"connected_nodes":[3513,2626],"Tags":[],"name":"","description":""},{"value":4639,"connected_nodes":[2639,4613],"Tags":[],"name":"","description":""},{"value":2651,"connected_nodes":[2659,1751],"Tags":[],"name":"","description":""},{"value":2659,"connected_nodes":[2651,559],"Tags":[],"name":"Mid2","description":""},{"value":559,"connected_nodes":[2659,551],"Tags":[],"name":"","description":""},{"value":551,"connected_nodes":[1751,559,513],"Tags":[],"name":"Mid5","description":""},{"value":1013,"connected_nodes":[1713],"Tags":[],"name":"Mid4","description":""},{"value":1004,"connected_nodes":[504],"Tags":[],"name":"Exit","description":""},{"value":504,"connected_nodes":[1004,513],"Tags":[],"name":"","description":""},{"value":513,"connected_nodes":[551,504],"Tags":[],"name":"","description":""},{"value":1739,"connected_nodes":[1726,1751],"Tags":[],"name":"","description":""},{"value":1751,"connected_nodes":[1739,2651,551],"Tags":[],"name":"","description":""}]}';
//alert(tr);
var src_tag,dest_tag;
var src_bool = false,dest_bool = false;
var src = -1,dest = -1;
var shortest_path_var = [];

function shortest_path(){
   var pred = [];
   var dist = [];
   if(BFS(pred,dist)==false){
    alert("selected nodes are not connected");
    return;
   }
   var path = [];
   var crawl = dest;
   path.push(crawl);
   var ai = 1;
   console.log("dest:"+dest);
   console.log("src:"+src);
   while(pred[find(crawl,cords)] != -1){
    console.log("path:"+path);
    console.log("crawl:"+crawl+" "+find(crawl,cords));
    path.push(pred[find(crawl,cords)]);
    crawl = pred[find(crawl,cords)];
    ai++;
    if(ai == 1000)
      return;
   }
   shortest_path_var = path;
   for(var b=0;b<(path.length)-1;b++){
    console.log(path[b]);   //only for debugging
    make_path(path[b],path[b+1]);
   }
   alert(path);
   return;
}
function BFS(pred, dist){
  var queue = [];
  var visited = [];
  for(var b=0;b<cords.length;b++){
    visited[b] = false;
    dist[b] = 100000;
    pred[b] = -1;
  }
  visited[find(src,cords)] = true;
  dist[find(src,cords)] = 0;
  queue.push(src);
  var o = 0;
  while(queue.length != 0){
    var u = queue.shift();    //equivalent to pop
    var inde = find(u,cords);
    o++;
    for(var b=0;b<connected_nodes[inde].length; b++){
      if(length(u,connected_nodes[inde][b])+dist[find(u,cords)]<dist[find(connected_nodes[inde][b],cords)] ){
        console.log("u:"+u+" "+length(u,connected_nodes[inde][b]));
        visited[find(connected_nodes[inde][b],cords)] = true;
        dist[find(connected_nodes[inde][b],cords)] = dist[find(u,cords)] +length(u,connected_nodes[inde][b]);
        pred[find(connected_nodes[inde][b],cords)] = u;
        queue.push(connected_nodes[inde][b]);
        o++;
        if(o>100)
          return false;
      }
    }
    if(o>100)
      return false;
  }
  if(dist[find(dest,cords)]==100000)
      return false;
  return true;
}
function length(A,B){
  var x1 = Math.floor(A/100);
  var x2 = Math.floor(B/100);
  var y1 = A%100;
  var y2 = B%100;
  var z = Math.pow((x2-x1),2)+Math.pow((y2-y1),2);
  console.log("A,B:"+A+" "+B+"z: "+z);
  return Math.sqrt(z);
}
function find(key,array){   //returns the index at which key is store in array
  for (var i = 0; i < array.length; i++) {
    if (array[i] == key) {
      return i;
    }
  }
  return -1;
}
function make_path(x,y){
    var a,b,c,d,e,f,g;
    a = Math.floor(x/100); b = x%100;
    c = Math.floor(y/100); d = y%100;
    e = Math.floor((a+c)/2);
    f = Math.floor((b+d)/2);
    if (e==a & f==b) {
      g = 100*c +b ;
    }
    else if (e==c & f==d) {
      g = 100*a +d ;
    } else {
      g = 100*e + f;
      make_path(g,x);
      make_path(g,y);
    }
}
//SAMPLE=>{"cords":[{"value":5626,"connected_nodes":[4726],"Tags":["entry"]},{"value":3226,"connected_nodes":[4726,3229,2226],"Tags":[]},{"value":3229,"connected_nodes":[3226],"Tags":["stairs","help desk"]},{"value":2226,"connected_nodes":[3226,2240],"Tags":[]},{"value":2240,"connected_nodes":[2226],"Tags":[]},{"value":4726,"connected_nodes":[3226,5626,4750],"Tags":[]},{"value":4750,"connected_nodes":[4726],"Tags":["gents washroom","ladies washroom"]}]}
function Submit(a,b){
// reset();
 var cords = [];
 var connected_nodes = [];
 for (var temp = 0; temp < 3600 ; temp++) {
     connected_nodes[temp] = [];
 }
 // var tr = '<?php echo $row['JSON_string'] ;?>';
 var tr =  '{"cords":[{"value":5504,"connected_nodes":[4604,5513],"Tags":[],"name":"Entry","description":""},{"value":4604,"connected_nodes":[3504,5504,4613],"Tags":[],"name":"","description":""},{"value":3504,"connected_nodes":[4604,3513,2604],"Tags":[],"name":"","description":""},{"value":2604,"connected_nodes":[2613,3504,1704],"Tags":[],"name":"","description":""},{"value":1704,"connected_nodes":[2604,1713],"Tags":[],"name":"","description":""},{"value":1713,"connected_nodes":[2613,1704,1726,1013],"Tags":[],"name":"","description":""},{"value":2613,"connected_nodes":[2604,1713,3513],"Tags":[],"name":"","description":""},{"value":3513,"connected_nodes":[2613,3504,4613,3526],"Tags":[],"name":"Mid6","description":""},{"value":4613,"connected_nodes":[4604,5513,3513,4639],"Tags":[],"name":"","description":""},{"value":5513,"connected_nodes":[5504,4613],"Tags":[],"name":"","description":""},{"value":2626,"connected_nodes":[3526,1726,2639],"Tags":[],"name":"Mid3","description":""},{"value":2639,"connected_nodes":[2626,4639],"Tags":[],"name":"Mid1","description":""},{"value":1726,"connected_nodes":[1713,2626,1739],"Tags":[],"name":"","description":""},{"value":3526,"connected_nodes":[3513,2626],"Tags":[],"name":"","description":""},{"value":4639,"connected_nodes":[2639,4613],"Tags":[],"name":"","description":""},{"value":2651,"connected_nodes":[2659,1751],"Tags":[],"name":"","description":""},{"value":2659,"connected_nodes":[2651,559],"Tags":[],"name":"Mid2","description":""},{"value":559,"connected_nodes":[2659,551],"Tags":[],"name":"","description":""},{"value":551,"connected_nodes":[1751,559,513],"Tags":[],"name":"Mid5","description":""},{"value":1013,"connected_nodes":[1713],"Tags":[],"name":"Mid4","description":""},{"value":1004,"connected_nodes":[504],"Tags":[],"name":"Exit","description":""},{"value":504,"connected_nodes":[1004,513],"Tags":[],"name":"","description":""},{"value":513,"connected_nodes":[551,504],"Tags":[],"name":"","description":""},{"value":1739,"connected_nodes":[1726,1751],"Tags":[],"name":"","description":""},{"value":1751,"connected_nodes":[1739,2651,551],"Tags":[],"name":"","description":""}]}';
 //alert(tr);
 var src_tag,dest_tag;
 var src_bool = false,dest_bool = false;
 var src = -1,dest = -1;
 var shortest_path_var = [];

 src_tag = a;
 dest_tag = b;
 // var tr = '{"cords":[{"value":5626,"connected_nodes":[4726],"Tags":["entry"]},{"value":3226,"connected_nodes":[4726,3229,2226],"Tags":[]},{"value":3229,"connected_nodes":[3226],"Tags":["stairs","help desk"]},{"value":2226,"connected_nodes":[3226,2240],"Tags":[]},{"value":2240,"connected_nodes":[2226],"Tags":[]},{"value":4726,"connected_nodes":[3226,5626,4750],"Tags":[]},{"value":4750,"connected_nodes":[4726],"Tags":["gents washroom","ladies washroom"]}]}'
 var obj = JSON.parse(tr);
 for(var b=0;b<obj.cords.length;b++){
  cords[b] = obj.cords[b].value;
  for(var c=0;c<obj.cords[b].connected_nodes.length;c++){
    connected_nodes[b][c] = obj.cords[b].connected_nodes[c];
  }
    if(obj.cords[b].name==src_tag)
      src = obj.cords[b].value;
    if(obj.cords[b].name==dest_tag)
      dest = obj.cords[b].value;
 }
 console.log(src+" "+dest);
 shortest_path();
 var llen = path.length - 2;
 return path[llen];
}

var temp_bool=false;
var initial;
/*
destination reached : 0
U-turn : 1
left turn : 2
right turn : 3
forward : 4
*/

