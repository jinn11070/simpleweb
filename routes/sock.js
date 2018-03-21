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
          console.log(clientData.room_id)
          console.log(clientData.username)
          console.log("chatInfo.hasRoom(clientData.roomId):" + chatInfo.hasRoom(clientData.room_id))


          if (chatInfo.hasRoom(clientData.room_id)) {
            joinedRoom = clientData.room_id;

            socket.join(joinedRoom);
            socket.emit('joined', {isSuccess: true, username: clientData.username});
            socket.broadcast.to(joinedRoom).emit('joined', {isSuccess: true, username: clientData.username});

            chatInfo.joinRoom(joinedRoom, clientData.username);
          } else {
            socket.emit('joined', {isSuccess: false})
          }
        });

        socket.on('message', function(clientData) {
          if (joinedRoom) {
            socket.broadcast.to(joinedRoom).json.send(clientData);
          }
        })
  });

  return router;
}
