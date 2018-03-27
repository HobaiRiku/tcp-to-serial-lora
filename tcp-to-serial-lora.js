#! /usr/bin/env node
var a =1;
const fs = require('fs');
let config = {};
const net = require('net');
let SerialPort = require("serialport");

var program = require('commander');

program
    .version('1.0.7')
    .option('-p, --port [Number]', 'tcp服务端口', parseInt)
    .option('-s, --serialPort [String]', '串口端口名称')
    .option('-c, --config [File Path]', '配置文件')
    .description('tcp转串口向lora开发板发送网关上行指令的程序')
    .parse(process.argv);

if (program.config) {
    config = JSON.parse(fs.readFileSync(program.config));
    console.log('使用' + program.config + '运行...');
    if (typeof (config.TCP_PORT) != 'number') {
        console.log('错误的配置参数（TCP_PORT）：\'' + config.TCP_PORT + '\'');
        process.exit(1);
    }
    if (typeof (config.serialPortName) != 'string') {
        console.log('错误的配置参数（serialPortName）：\'' + config.serialPortName + '\'');
        process.exit(1);
    }
} else {
        try {
            config = JSON.parse(fs.readFileSync("./default_config.json"));
        } catch (error) {
            if(!program.port||!program.serialPort){
            console.log('默认配置文件\'default_config.json\'读取错误或不存在,且未给定运行所需参数');
            process.exit(1);
            }
        }
        console.log('使用默认配置文件或命令行参数运行...')
}
if (program.port) {
    if (typeof (program.port) != 'number') {
        console.log('错误的参数（--port）：\'' + program.port + '\'');
        process.exit(1);
    } else {
        config.TCP_PORT = program.port;
    }
}
if (program.serialPort) {
    config.serialPortName = program.serialPort;
}

let serialPortName = config.serialPortName;
let server = net.createServer();
server.listen(config.TCP_PORT);
console.log(new Date() + ':' + 'tcp服务器启动：' +
    server.address().address + ':' + server.address().port);
let serialPort = new SerialPort(
    serialPortName, {
        baudRate: 9600, //波特率
        dataBits: 8, //数据位
        parity: 'none', //奇偶校验
        stopBits: 1, //停止位
        flowControl: false,
    },
    function (error) {
        if (error) {
            console.log(new Date() + ':' + "打开端口" + serialPortName + "错误：" + error);
            process.exit(1);
        } else {
            console.log(new Date() + ':' + "打开串口端口" + serialPortName + "成功,等待数据发送");

        }
    });

server.on('connection', function (socket) {

    console.log(new Date() + ':' + '发现tcp连接: ' +
        socket.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/)[0] + ':' + socket.remotePort);
    socket.on('data', function (data) {
        console.log(new Date() + ':' + '收到DATA ' + socket.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/)[0] + ':' + socket.remotePort + ':', intArrToHexString(data.toJSON().data));
        let data_length = data.length;
        if(data.length>49) return console.log(new Date() + ':数据过长，无法发送')
        let cmd = new Buffer([45, 45, 45, 170, data_length, 0, 8]);
        let cmd_send = Buffer.concat([cmd, data]);
        serialPort.write(cmd_send, function (error) {
            if (error) console.log(new Date() + ':' + '数据发送出错');
            else {
                console.log(new Date() + ':' + '数据发送成功');
            }
        });
    });
    socket.on('end', function () {
        console.log(new Date() + ':' + 'tcp连接中断:' + socket.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/)[0] + ':' + socket.remotePort);
        socket.end();
    });
    socket.on('error', function () {
        console.log(new Date() + ':' + '客户端连接:' + socket.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/)[0] + ':' + socket.remotePort + '出错,已断线');
        socket.end();
    });
});

function intToHexString(int_number) {
    return (int_number).toString(16).length > 1 ? (int_number).toString(16) : '0' + (int_number).toString(16);
}

function intArrToHexString(arr) {
    let arr_do = [];
    arr_do = arr;
    let result = '';
    for (let one of arr_do) {
        result = result + intToHexString(one) + ' ';
    }
    return result;
}