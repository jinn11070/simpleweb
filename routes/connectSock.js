var express = require('express');
var router = express.Router();
var query = require('../config/query')()
// var session = require('express-session')

module.exports = function(io){
  console.log("옴?")
  var Room = io.sockets;

  // var Room = io.of("/login");
  var socket_ids = [];
  var count = 0;

  function registerUser(socket, userPhone){
    // socket_id와 userId 테이블을 셋업
    var prevPhone = socket.prevPhone;

    if(prevPhone !== undefined) delete socket_ids[prevPhone];
    socket_ids[userPhone.phone] = socket.id;
    socket.prevPhone = userPhone.phone;

    // Room.emit('phoneList',{phones:Object.keys(socket_ids)});
    // Room.emit('userPhone', userPhone)

    /* save DB */
    query.saveSocketId(socket.prevPhone, socket.id)
  }

  Room.on('connection', function(socket) {
    console.log("********connect")
    socket.on('sendUserId', function(data) {
      var userId = data.userId;
      var phoneNumber = data.phone;

      socket.emit('saveSocket', {userId: userId, phone: phoneNumber});
      registerUser(socket, {userId: userId, phone: phoneNumber});
    })

      /*socket.on('disconnect',function(data){
       socket.get('phone',function(err,phone){
       if(phone != undefined){
       delete socket_ids[phone];
       Room.emit('phoneList',{phones:Object.keys(socket_ids)});
       }// if
       });
       });*/

      /*socket.on('test', function(data) {
        console.log(data)
      })*/

    socket.on('send_msg',function(data){
      // var phone = socket.prevPhone;
      data.msg = data.userId + ' : '+data.msg;
      if(data.to =='ALL') socket.broadcast.emit('broadcast_msg',data); // 자신을 제외하고 다른 클라이언트에게 보냄
      else{
        var socket_id = socket_ids[data.to];
        if(socket_id != undefined){
          Room.socket(socket_id).emit('broadcast_msg',data);
        }// if
      }

      socket.emit('broadcast_msg',data);
    });
  });

  return router;
}
