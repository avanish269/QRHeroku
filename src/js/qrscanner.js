var scanner=null;
var activeCameraId=null;
var cameras=[];
var scans=[];
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
  Windows: function(){
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
var qrcontent="q";
var x=123;
var tr =  '{"cords":[{"value":3820,"connected_nodes":[3833,1520],"Tags":[],"name":"Assitech Lab (009)","description":""},{"value":3848,"connected_nodes":[1548,3833],"Tags":[],"name":"Seminar Hall (001)","description":""},{"value":3833,"connected_nodes":[3820,3848,5733],"Tags":[],"name":"Entrance","description":""},{"value":1520,"connected_nodes":[1510,1533,3820],"Tags":[],"name":"Presentation Room (006)","description":""},{"value":1533,"connected_nodes":[1520,1543],"Tags":[],"name":"Elevator","description":""},{"value":1548,"connected_nodes":[1543,3848,248],"Tags":[],"name":"","description":""},{"value":1543,"connected_nodes":[1548,1533],"Tags":[],"name":"Library (005)","description":""},{"value":1503,"connected_nodes":[1510],"Tags":[],"name":"Lift/Stairs","description":""},{"value":1510,"connected_nodes":[1503,410,1520],"Tags":[],"name":"","description":""},{"value":410,"connected_nodes":[1510],"Tags":[],"name":"Server Room (007/008)","description":""},{"value":248,"connected_nodes":[1548],"Tags":[],"name":"Washroom","description":""},{"value":5733,"connected_nodes":[3833],"Tags":[],"name":"","description":""}]}';
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
    //return 4;
    if( (fin_x-ini_local_x)*(ini_local_x - ini_previous_x) > 0){
      return 4;
    }
    if((fin_x-ini_local_x)*(ini_local_x - ini_previous_x) < 0){
      return 1;
    }
  }
  if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) < 0 ){
    return 2;
  }
  if( (ini_local_x - ini_previous_x)*(fin_y - ini_local_y) > 0 ){
    return 3;
  }
}
//if vertical
if(ini_local_x == ini_previous_x){
  if(fin_x == ini_local_x){
    if( (fin_y-ini_local_y)*(ini_local_y - ini_previous_y) > 0){
      return 4;
    }
    if((fin_y-ini_local_y)*(ini_local_y - ini_previous_y) < 0){
      return 1;
    }
  }
  if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) < 0 ){
    return 3;
  }
  if( (ini_local_y - ini_previous_y)*(fin_x - ini_local_x) > 0 ){
    return 2;
  }
}
return 7;
}
self.scanner=new Instascan.Scanner({video:document.getElementById("pre"),scanPeriod:1});
self.scanner.addListener('scan',function(content,image){
  self.scans.unshift({date:+(Date.now()), content:content});
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
      //alert(brad);
      var qrr = Submit(x%10000,brad);
      alert(qrr);
      alert(GetDir(x,qrr));
      self.scanner.stop();
      var wr = "https://testarjs12.herokuapp.com/?c=" + GetDir(x,qrr);
      location.href=wr;
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
