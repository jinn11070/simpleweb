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
      return room.name === roomId;
    });

    if (roomList.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  addRoom: function(roomId) {
    console.log("addRoom:" + roomId)
    this.roomList.push({name: roomId, members: []});
  }
}

