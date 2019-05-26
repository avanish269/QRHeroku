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
    self.scanner=new Instascan.Scanner({video:document.getElementById("pre"),scanPeriod:5});
    self.scanner.addListener('scan',function(content,image){
      self.scans.unshift({date:+(Date.now()), content:content});
    });
    Instascan.Camera.getCameras().then(function(cameras){
      self.cameras=cameras;
      if(cameras.length>0){
        var i=0;
        if(isMobile.Android() || isMobile.iOS()){
          i=1;
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
