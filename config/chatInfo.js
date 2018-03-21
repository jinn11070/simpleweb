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
  selectUserGroup: function(username, cb) {
    query.selectGroupByUsername(username, function(result) {
      console.log(result)
      cb(result)
    })
  },
  hasRoom: function(roomId) {
    console.log("---------------------")
    console.log(this.roomList)
    var roomList = this.roomList.filter(function(room) {
      return room.id === roomId;
    });

    if (roomList.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  addRoom: function(roomId) {
    console.log("addRoom:" + roomId)
    this.roomList.push({id: roomId, members: []});
  },
  hasMembers: function(members, username) {
    return members.some(function(d) {
      return d === username;
    });
  },
  joinRoom: function(roomId, username) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === roomId;
    });

    console.log(roomList[0])
    if (!this.hasMembers(roomList[0].members, username)) {
      roomList[0].members.push(username);
    }
  },
  leaveRoom: function(roomId, username) {
    var roomList = this.roomList.filter(function(room) {
      return room.id === roomId;
    });
    roomList[0].members.forEach(function(d, i, arr) {
      if (d === username) {
        arr.splice(i, 1);
      }
    })
  },
}

