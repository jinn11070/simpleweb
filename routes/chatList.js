var express = require('express');
var router = express.Router();
var query = require('../config/query')()
var async = require('async');

var chatInfo = require('../config/chatInfo')

var username = "";
var groupList = [];

router.post('/', function(req, res, next) {
  var isSuccess = false;
  username = req.body.username;

  function selectUser(cb) {
    if (username && username.trim() !== '') {
      // cb(null, !chatInfo.hasUser(username), username)
      if (!chatInfo.hasUser(username)) {
        chatInfo.addUser(username);
        req.session.username = username;
        cb(null, username)
      }
    }
  }

  function selectGroup (username, cb) {
    /* db에서 user, group 정보 가져오기*/

    query.selectGroupByUsername(username, function(result) {
      var params = {
        "isSuccess": true,
        "username": username,
        "groupList": result
      }

      cb(null, params)
    })

  }

  function renderRes(params) {
    res.render('chatList', {
      title: "CHATLIST",
      params: params
    })
  }

  async.waterfall([
    selectUser,
    selectGroup,
    renderRes
  ], function(err) {
    console.log(err)
  })
});

module.exports = router;








