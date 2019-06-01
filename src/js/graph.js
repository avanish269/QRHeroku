<script>
        <?php
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "root";
        $database="mysql";
        $conn = new mysqli($dbhost, $dbuser, $dbpass,$database);
        $sql = "SELECT JSON_string FROM mysql.first_test WHERE name = 'AIIMS.png' limit 1";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        ?>
          var cords = [];
          var connected_nodes = [];
          for (var temp = 0; temp < 3600 ; temp++) {
              connected_nodes[temp] = [];
          }
           var tr = '<?php echo $row['JSON_string'] ;?>';
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
           reset();
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
      </script>
