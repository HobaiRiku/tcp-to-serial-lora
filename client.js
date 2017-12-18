
var net = require('net');   //引入网络模块
var HOST = '127.0.0.1';     //定义服务器地址
var PORT = 30001;            //定义端口号

let flag =true;
//创建一个TCP客户端实例
var client = net.connect(PORT, HOST, function() {
    console.log('Connected to the server.');
     setInterval(function(){
         let arr=[]
         for(let i=0 ;i<49;i++){
            arr.push(0xff);
         }
    client.write(new Buffer(arr));
   },6*1000)  
});


//监听连接关闭事件
client.on('end', function() {
    console.log('Server disconnected.');
    client.end();
    flag=false;
});

//监听错误事件
client.on('error', function() {
    console.log('Server error exit.');
    client.end();
    flag=false;
    process.exit()
});