var express = require('express');
var router = express.Router();

var chatInfo = require('../config/chatInfo')

router.post('/', function(req, res) {

  var group = JSON.parse(req.body.group);
  var group_id = group.group_id;
  var group_name = group.group_name;
  var username = group.user_id;

  chatInfo.addRoom(group_id);
  req.session.addRoom = group_id;

  res.render('chatRoom', {
    group_id: group_id,
    group_name: group_name,
    username: username,
    memberList: chatInfo.userList
  })
});

module.exports = router;








