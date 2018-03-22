var express = require('express');
var router = express.Router();
var query = require('../config/query')()
var async = require('async');

var chatInfo = require('../config/chatInfo')

router.get('/', function(req, res) {
  if (req.session.username) {

    query.selectGroupByUsername(username, function(result) {
      var params = {
        "isSuccess": true,
        "username": req.session.username,
        "groupList": result
      }

      res.render('chatList', {
        title: "CHATLIST",
        params: params
      })
    })
  }
});

router.post('/', function(req, res, next) {
  var isSuccess = false;
  var username = req.body.username;

  function selectUser(cb) {
    if (username && username.trim() !== '') {
      // cb(null, !chatInfo.hasUser(username), username)
      if (!chatInfo.hasUser(username)) {
        chatInfo.addUser(username);
        req.session.username = username;
        isSuccess = true;
      }

      cb(null, username)
    }
  }

  function selectGroup (username, cb) {
    /* db에서 user, group 정보 가져오기*/

    query.selectGroupByUsername(username, function(result) {
      var params = {
        "isSuccess": isSuccess,
        "username": username,
        "groupList": result
      }

      res.render('chatList', {
        title: "CHATLIST",
        params: params
      })
    })

  }

  async.waterfall([
    selectUser,
    selectGroup,
  ], function(err) {
    console.log(err)
  })
});

module.exports = router;








