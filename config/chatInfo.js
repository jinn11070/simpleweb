var query = require('../config/query')()

var chatInfo = module.exports = {
  userList: [],
  roomList: [],
  hasUser: function(username) {
    var userList = this.userList.filter(function(user) {
      return user === username;
    });

    if (userList.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  addUser: function(username) {
    this.userList.push(username);
  },
  hasRoom: function(roomId) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === roomId;
    });

    if (roomList.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  addRoom: function(room_id) {
    console.log("addRoom:" + room_id)
    this.roomList.push({id: room_id, memberList: []});
  },
  hasMembers: function(members, username) {
    return members.some(function(d) {
      return d === username;
    });
  },
  getMembers: function(room_id) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === room_id;
    });

    return roomList[0].memberList
  },
  joinRoom: function(room_id, username) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === room_id;
    });

    if (!this.hasMembers(roomList[0].memberList, username)) {
      roomList[0].memberList.push(username);
    }

    console.log(roomList)
  },
  leaveRoom: function(room_id, username) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === room_id;
    });
    roomList[0].memberList.forEach(function(d, i, arr) {
      if (d === username) {
        arr.splice(i, 1);
      }
    })
  },
}

