# tcp-to-serial-lora

一个可以接收tcp-socket数据，并对数据进行包装，通过串口将数据发送至lora开发板，开发板通过lora网关，实现tcp数据转发至lora服务器的命令行工具，项目依赖node以及npm平台。    
NPM:    
[![NPM version][npm-image]][npm-url]    
[![David deps][david-image]][david-url]    
[![node version][node-image]][node-url]    
[![npm download][download-image]][download-url]    
[![npm license][license-image]][download-url]   
github:    
[![GitHub release](https://img.shields.io/github/release/HobaiRiku/tcp-to-serial-lora.svg?style=flat-square)](https://github.com/HobaiRiku/tcp-to-serial-lora/releases)    
[![Github All Releases](https://img.shields.io/github/downloads/HobaiRiku/tcp-to-serial-lora/total.svg)](https://github.com/HobaiRiku/tcp-to-serial-lora)    
[![GitHub watchers](https://img.shields.io/github/watchers/HobaiRiku/tcp-to-serial-lora.svg?style=social&label=Watch)](https://github.com/HobaiRiku/tcp-to-serial-lora)    


[npm-image]: https://img.shields.io/npm/v/tcp-to-serial-lora.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tcp-to-serial-lora
[travis-image]: https://img.shields.io/travis/HobaiRiku/tcp-to-serial-lora.svg?style=flat-square
[travis-url]: https://travis-ci.org/HobaiRiku/tcp-to-serial-lora
[coveralls-image]: https://img.shields.io/coveralls/HobaiRiku/tcp-to-serial-lora.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/HobaiRiku/tcp-to-serial-lora?branch=master
[david-image]: https://img.shields.io/david/HobaiRiku/tcp-to-serial-lora.svg?style=flat-square
[david-url]: https://david-dm.org/HobaiRiku/tcp-to-serial-lora
[node-image]: https://img.shields.io/badge/node.js-%3E=_8.4-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/tcp-to-serial-lora.svg?style=flat-square
[download-url]: https://npmjs.org/package/tcp-to-serial-lora
[license-image]: https://img.shields.io/npm/l/tcp-to-serial-lora.svg

### #安装

```bash
npm install tcp-to-serial-lora -g
```

### #使用

安装后使用命令行：

```bash
tcp-to-serial-lora -p 30001 -s COM3
```

或下载源码直接进入根目录运行:

```bash
npm install
node tcp-to-serial-lora -p 30001 -s COM3
```

命令:

```bash
Usage: tcp-to-serial-lora [options]

  tcp转串口向lora开发板发送网关上行指令的程序
  
  Options:

    -V, --version            查看当前版本
    -p, --port [Number]        tcp服务端口
    -s, --serialPort [String]  串口端口名称
    -c, --config [File Path]      配置文件
    -h, --help               输出帮助信息
```

### #配置文件

在根目录下创建`default_config.json` ：

```json
{
    "TCP_PORT":30001,//tcp服务端口
    "serialPortName":"COM3"//串口端口名称
}
```

ps:若不使用配置文件，运行必须携带`-p`与`-s`参数

### #使用telnet进行测试

```bash
telnet 127.0.0.1 30001
```

键盘输入，观察lora服务器节点消息即可