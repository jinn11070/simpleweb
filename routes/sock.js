var express = require('express');
var router = express.Router();
var chatInfo = require('../config/chatInfo');

module.exports = function(io){
  var Room = io
      .of('/chatRoom')
      .on('connection', function(socket) {
        console.log('***********user connected');

        var joinedRoom = null;
        socket.on('join', function(clientData) {

          // console.log("sock.js--------------")
          // console.log(chatInfo.userList)
          // console.log(chatInfo.roomList)
          console.log(clientData.roomId)
          console.log("chatInfo.hasRoom(clientData.roomId):" + chatInfo.hasRoom(clientData.roomId))


          if (chatInfo.hasRoom(clientData.roomId)) {
            joinedRoom = clientData.roomName;

            socket.join(joinedRoom);
            socket.emit('joined', {isSuccess: true, username: clientData.username});
          } else {
            socket.emit('joined', {isSuccess: false})
          }
        });

  });

  return router;
}
