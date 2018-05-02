var express = require('express');
var router = express.Router();

/* GET homey page. */
router.get('/', function(req, res, next) {

  var sessionUserid = req.session.userid;
  var sessionRoomid = req.session.roomid;

  sessionUserid = (sessionUserid === undefined || sessionUserid === null) ? '없음' : sessionUserid;
  sessionRoomid = (sessionRoomid === undefined || sessionRoomid === null) ? '없음' : sessionRoomid;

  res.render('index', {
    title: 'CHAT',
    name: 'SOOJIN',
    // isTrue: this.name === 'SOOJIN',
    // a_list: ['김미란', '김현주', '변정윤', '장혜주', '정수진']
  });
});

module.exports = router;


