var express = require('express');
var router = express.Router();

var chatInfo = require('../config/chatInfo')

router.get('/chatRoom/:id/:name', function(req, res) {
  var isSuccess = false;

  var room_id = req.params.id;
  var room_name = req.params.name;

  // console.log("********************************************" + chatInfo.hasRoom(room_id))
  // console.log(room_id)
  // console.log(room_name)

  if (chatInfo.hasRoom(room_id)) {
    isSuccess = true;
  }

  // console.log("---===req.session.username===req.session.username")
  // console.log(req.session.username)

  res.render('chatRoom', {
    isSuccess: isSuccess,
    room_id: room_id,
    room_name: room_name,
    username: req.session.username
  })
});

module.exports = router;








