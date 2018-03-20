var query = require('../config/query')()

module.exports = chatInfo;

function chatInfo() {

  var table = "member";

  return {
    userList: [],
    selectUser: function(username, cb) {
      /*Mysql selection 이 아이디를 가진 사용자가 존재하는지*/
      query.searchByUsername(table, username, function(result) {
        this.userList = result;
        cb(result);
      });
    },
    insertUser: function(username, cb) {
      query.insert(table, [username, username], function(result) {
        cb(result)
      });
    }
  }
}

