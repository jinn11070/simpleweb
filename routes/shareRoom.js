var express = require('express');
var router = express.Router();
var query = require('../config/query')()
var async = require('async');

var chatInfo = require('../config/chatInfo')

router.post('/shareRoom/:id', function(req, res) {

  var io = req.app.get('socketio');

  var sessionGroupId = req.params.id;
  var sessionUserId = req.session.userId;
  // var socketId = req.body.socketId;

  /*0.유저 정보 가져오기 */
  function getUserInfo(cb) {

    query.selectByUserId(sessionUserId, function(user) {
      // console.log(JSON.stringify(user))
      cb(null, user[0].phone);
    });
  }
  /*1. 방 정보 가져오기 */
  function getGroupInfo(phone, cb) {

    query.selectGroup(sessionGroupId, function(group) {
      // console.log(JSON.stringify(group))
      cb(null, phone, group);
    });
  }

  /*2. 방 멤버 리스트 가져오기 */
  function getGroupMembers(phone, group, cb) {
    query.selectGroupMembers(sessionGroupId, function(members) {
      // console.log(JSON.stringify(members))
      cb(null, phone, group, members)
    });
  }

  function setRender(phone, group, members) {

    // console.log(group)
    /*2. 소켓아이디 저장 */

    // query.saveSocketId(phone, socketId)

    res.render('shareRoom', {
      group_id: sessionGroupId,
      myname: sessionUserId,
      group_name: group[0].group_name,
      path_reg_date: group[0].path_reg_date,
      meet_time: group[0].meet_time,
      end_x: group[0].end_x,
      end_y: group[0].end_y,
      members: members
    })

    io.emit('test', "hi!!")
  }

  async.waterfall([
    getUserInfo,
    getGroupInfo,
    getGroupMembers,
    setRender
  ], function(err) {
    console.log(err)
  })

});

module.exports = router;








