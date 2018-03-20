var express = require('express');
var router = express.Router();
var async = require('async');

var query = require('../config/query')()

var table = "member";
var username = "";

/* GET users listing. */
router.post('/', function(req, res, next) {
  var isSuccess = false;
  username = req.body.username;

  function selectUser(cb) {
    query.searchByUsername(table, username, function(result) {
      this.userList = result;

      // console.log(result)
      // console.log("=------------")
      // console.log(this.userList)

      if (result.length > 0) {
        cb(null, true, username)
      } else {
        cb(null, false, username)
      }
    });
  }

  function insertUser(isExist, username, cb) {
    var user = username
    // console.log("function insertUser(username, cb) {")
    if (!isExist) {
      query.insert(table, [user, user], function(result) {
        // console.log("insert 성공!!!");
        cb(null, user)
      });
    } else {
      cb(null, user)
    }
  }

  function addSession(username, cb) {
    // console.log("function addSession(username, cb) {")
    console.log(username);

    console.log(req.session)
    req.session.username = username;
    isSuccess = true;

    res.render('chat', {
      title: isSuccess,
      isSuccess: isSuccess,
      username: username
    })
    // cb(null, isSuccess, username);
  }

  function renderRes(isSuccess, username) {
    console.log("function renderRes(isSuccess, username) {")

  }

  async.waterfall([
    selectUser,
    insertUser,
    addSession,
    // renderRes
  ], function(err) {
    console.log(err)
  })






  /*if (username && username.trim() !== '') {
    /!*Mysql selection 이 아이디를 가진 사용자가 존재하는지*!/

    chatInfo.hasUser(username, function(result) {
      console.log(result)
      if (result) {
        console.log("/!* 사용자 있음. *!/" + this.userList)
        req.session.username = username;
        isSuccess = true;
      } else {
        console.log("/!* 사용자가 존재하지 않음. *!/")
        chatInfo.addUser(username, function(result1) {
          if (result) {
            console.log("insert 성공!!!");
            req.session.username = username;
            isSuccess = true;
          }
        })
      }
    })
  }

  res.render('chat', {
    isSuccess: isSuccess,
    username: username
  })*/




});

module.exports = router;








