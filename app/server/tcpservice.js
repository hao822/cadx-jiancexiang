'use strict';
var net = require('net');
var mysql = require('mysql');
var tcp_server = net.createServer();//创建tcp server
var Sockets = {};
var SocketID = 1;

const uuid = require('node-uuid');

module.exports = function init() {

    //监听端口
    tcp_server.listen(7002, function () {
        console.log('tcp_server listen 7002');
    })


    /**
     * 连接成功发送消息
     */

    //处理客户端连接
    tcp_server.on('connection', function (socket) {
        console.log(socket.address())
        Sockets[SocketID] = socket;
        SocketID++;
        // DealConnect(socket)
        //读取数据
        socket.on('data', function (data) {
            data = data.toString();
            console.log('+++received data %s', data);
            //从逗号分割成数组
            data = data.split(",");
            //判断数组的长度是否等于14，不等于则数据传入有误
            if (data.length == 14) {

                /**
                 * 此处给returnData中加入一个编号
                 */
                const id = uuid.v1();

                //将数据组合成一个对象
                const returnData = {
                    parentId: data[0],
                    longitude: data[1],
                    latitude: data[2],
                    windSpeed: data[3],
                    noise: data[4],
                    pmValue: data[5],
                    harmfulGas1: data[6],
                    harmfulGas2: data[7],
                    temperature: data[8],
                    humidity: data[9],
                    accelerationX: data[10],
                    accelerationY: data[11],
                    accelerationZ: data[12]
                }
                returnData.id = id;
                console.log('---received data %s', returnData);
                //创建库链接
                var connection = mysql.createConnection({
                    // host: '127.0.0.1',
                    host: '39.100.65.255',
                    // host: '47.93.230.161',
                    // user: 'root',
                    user: 'building_user',
                    // password: 'yue825822',
                    password: 'building123',
                    // database: 'egg'
                    database: 'building'

                });
                connection.connect();

                /**
                 * id是设备编号，表中加一项设备编号，1，2，3，4，5，6
                 * 思路：id作为父级，数据编号是唯一的，每次传入的数据，根据id来划分，
                 * 展示：
                 */

                //库操作
                let sql = "INSERT INTO buildingGateway SET ?"
                connection.query(sql, returnData, (err, result) => {
                    if (err) {
                        console.log('999999', err)
                        socket.write(err + '')
                    } else {
                        console.log('8888888888', result)
                        socket.write('success')
                    }
                })
                //关闭库
                connection.end();
            } else {
                socket.write('fail,length should be equal to 14')
            }

        })
    })

    tcp_server.on('error', function () {
        console.log('tcp_server error!');
    })

    tcp_server.on('close', function () {
        console.log('tcp_server close!');
    })
}
