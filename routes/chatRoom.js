var express = require('express');
var router = express.Router();

var chatInfo = require('../config/chatInfo')

router.get('/chatRoom/:id/:name', function(req, res) {
  var isSuccess = false;

  var room_id = req.params.id;
  var room_name = req.params.name;

  var sessionUserId = req.session.username;

  if (chatInfo.hasRoom(room_id)) {
    isSuccess = true;
  }

  res.render('chatRoom', {
    isSuccess: isSuccess,
    room_id: room_id,
    room_name: room_name,
    username: sessionUserId,
  })
});

module.exports = router;








