var app=new Vue({
  el:"#app",
  data:{
    scanner:null,
    activeCameraId:null,
    cameras:[],
    scans:[]
  },
  mounted:function(){
    var self=this;
    var isMobile={
      Android: function(){
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    var qrcontent="q";
    var x=123;
    var tr =  '{"cords":[{"value":5504,"connected_nodes":[4604,5513],"Tags":[],"name":"Entry","description":""},{"value":4604,"connected_nodes":[3504,5504,4613],"Tags":[],"name":"","description":""},{"value":3504,"connected_nodes":[4604,3513,2604],"Tags":[],"name":"","description":""},{"value":2604,"connected_nodes":[2613,3504,1704],"Tags":[],"name":"","description":""},{"value":1704,"connected_nodes":[2604,1713],"Tags":[],"name":"","description":""},{"value":1713,"connected_nodes":[2613,1704,1726,1013],"Tags":[],"name":"","description":""},{"value":2613,"connected_nodes":[2604,1713,3513],"Tags":[],"name":"","description":""},{"value":3513,"connected_nodes":[2613,3504,4613,3526],"Tags":[],"name":"Mid6","description":""},{"value":4613,"connected_nodes":[4604,5513,3513,4639],"Tags":[],"name":"","description":""},{"value":5513,"connected_nodes":[5504,4613],"Tags":[],"name":"","description":""},{"value":2626,"connected_nodes":[3526,1726,2639],"Tags":[],"name":"Mid3","description":""},{"value":2639,"connected_nodes":[2626,4639],"Tags":[],"name":"Mid1","description":""},{"value":1726,"connected_nodes":[1713,2626,1739],"Tags":[],"name":"","description":""},{"value":3526,"connected_nodes":[3513,2626],"Tags":[],"name":"","description":""},{"value":4639,"connected_nodes":[2639,4613],"Tags":[],"name":"","description":""},{"value":2651,"connected_nodes":[2659,1751],"Tags":[],"name":"","description":""},{"value":2659,"connected_nodes":[2651,559],"Tags":[],"name":"Mid2","description":""},{"value":559,"connected_nodes":[2659,551],"Tags":[],"name":"","description":""},{"value":551,"connected_nodes":[1751,559,513],"Tags":[],"name":"Mid5","description":""},{"value":1013,"connected_nodes":[1713],"Tags":[],"name":"Mid4","description":""},{"value":1004,"connected_nodes":[504],"Tags":[],"name":"Exit","description":""},{"value":504,"connected_nodes":[1004,513],"Tags":[],"name":"","description":""},{"value":513,"connected_nodes":[551,504],"Tags":[],"name":"","description":""},{"value":1739,"connected_nodes":[1726,1751],"Tags":[],"name":"","description":""},{"value":1751,"connected_nodes":[1739,2651,551],"Tags":[],"name":"","description":""}]}';
    var count=0;
    function GetDir(ini,fin){
      var ini_local = ini % 10000;
      var ini_local_x = ini_local % 100;
      var ini_local_y = Math.floor(ini_local / 100);
      var ini_previous = Math.floor(ini/10000);
      var ini_previous_x = ini_previous % 100;
      var ini_previous_y = Math.floor(ini_previous / 100);
      var fin_x = fin % 100;
      var fin_y = Math.floor(fin/100);
      //U - turn
      if(fin_x == ini_previous_x && fin_y == ini_previous_y){
        return 1;
      }
      //destination reached
      if(fin_x == ini_local_x && fin_y == ini_local_y){
        return 0;
      }
      //if horizontal
      if(ini_local_y == ini_previous_y){
        if(fin_y == ini_local_y){
          return 4;
        }
        if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) < 0 ){
          return 3;
        }
        if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) > 0 ){
          return 2;
        }
      }
      //if vertical
      if(ini_local_x == ini_previous_x){
        if(fin_x == ini_local_x){
          return 4;
        }
        if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) < 0 ){
          return 3;
        }
        if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) > 0 ){
          return 2;
        }
      }
      return 0;
    }
    self.scanner=new Instascan.Scanner({video:document.getElementById("pre"),scanPeriod:1});
    self.scanner.addListener('scan',function(content,image){
      self.scans.unshift({date:+(Date.now()), content:content});
      function GetDir(ini,fin){
        var ini_local = ini % 10000;
        var ini_local_x = ini_local % 100;
        var ini_local_y = Math.floor(ini_local / 100);
        var ini_previous = Math.floor(ini/10000);
        var ini_previous_x = ini_previous % 100;
        var ini_previous_y = Math.floor(ini_previous / 100);
        var fin_x = fin % 100;
        var fin_y = Math.floor(fin/100);
        //U - turn
        if(fin_x == ini_previous_x && fin_y == ini_previous_y){
          return 1;
        }
        //destination reached
        if(fin_x == ini_local_x && fin_y == ini_local_y){
          return 0;
        }
        //if horizontal
        if(ini_local_y == ini_previous_y){
          if(fin_y == ini_local_y){
            return 4;
          }
          if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) < 0 ){
            return 3;
          }
          if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) > 0 ){
            return 2;
          }
        }
        //if vertical
        if(ini_local_x == ini_previous_x){
          if(fin_x == ini_local_x){
            return 4;
          }
          if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) < 0 ){
            return 3;
          }
          if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) > 0 ){
            return 2;
          }
        }
        return 0;
      }
      qrcontent=content;
      if(!isNaN(qrcontent)){
        x=parseInt(qrcontent);
      }
      else{
        x=60606060;
      }
      if(isNaN(x)){
        alert("Invalid Data! Scan another qr code");
      }
      else{
        x1=x%100;
        y=Math.floor(x/100);
        x2=y%100;
        y=Math.floor(y/100);
        x3=y%100;
        y=Math.floor(y/100);
        x4=y%100;
        y=Math.floor(y/100);
        if((x1>=0&&x1<=59)&&(x2>=0&&x2<=59)&&(x3>=0&&x3<=59)&&(x4>=0&&x4<=59)&&(y==0)){
          alert(x1);
          alert(x2);
          alert(x3);
          alert(x4);
          alert("Valid Data");
          var url_string = window.location.href; //window.location.href
          var url = new URL(url_string);
          var brad = url.searchParams.get("d");
          alert(brad);
          alert(GetDir(x,brad));
          self.scanner.stop();
          location.href="https://www.google.com";
        }
        else{
          alert("Invalid Data! Scan another qr code");
        }
      }
    });
    Instascan.Camera.getCameras().then(function(cameras){
      self.cameras=cameras;
      if(cameras.length>0){
        var i=0;
        if(isMobile.Android() || isMobile.iOS()){
          i=1;
          self.scanner.mirror=false;
        }
        self.activeCameraId=cameras[i].id;
        self.scanner.start(cameras[i]);
      }
      else{
        console.error('No cameras');
      }
    }).catch(function(e){
      console.error(e);
    });
  },
  methods:{
    formatName:function(name){
      return name || 'unknown';
    },
    selectCamera:function(camera){
      this.activeCameraId=camera.id;
      this.scanner.start(camera);
    }
  }
});
