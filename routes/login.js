var express = require('express');
var router = express.Router();
var query = require('../config/query')()
var async = require('async');

var chatInfo = require('../config/chatInfo')


// router.get('/', function(req, res) {
//   if (req.session.username) {
//
//     query.selectGroupByUsername(username, function(result) {
//       var params = {
//         "isSuccess": true,
//         "username": req.session.username,
//         "groupList": result
//       }
//
//       res.render('chatList', {
//         title: "CHATLIST",
//         params: params
//       })
//     })
//   }
// });

router.post('/', function(req, res, next) {
  var object = {
    isSuccess: false,
    user_id: req.body.userId,
    phone: req.body.phone,
    group_id: '402882c8628629d10162863032880002',
    // group_id: '',
    group_name: 'di'
    // group_name: '',
  }

  /*1. 회원 검증 */
  /*function checkUser(next) {
    query.checkUser(userId, function(isMember) {
      isSuccess = isMember;
      next(userId);

      // if (isMember) {
      //   req.session.userId = userId;
      //   next();
      // } else {
      //   return;
      // }
    });
  }*/

  /*3. 방리스트 가져오기*/
  /*function getGroupList(next) {
    query.selectGroupListByHostUser(userId, function(group) {
      console.log(JSON.stringify(group))
      // req.session.groupId = group.id;
      // next(group.group_name, group.host_email);
      // next(group);
    });
  }*/

  /* 2방 정보 가져오기 */
  // function getGroupInfo(next) {
  //   query.selectGroup(object.group_id, function(group) {
  //
  //     console.log(JSON.stringify(group))
  //     // req.session.groupId = group.id;
  //     // next(group.group_name, group.host_email);
  //
  //     object.group_id = group.id;
  //     object.group_name = group.group_name;
  //
  //     next();
  //   });
  // }


  // /*3. 방 멤버 리스트 가져오기 */
  // function getGroupMembers(next) {
  //   query.selectGroupMembers(object.group_id, function(members) {
  //     console.log(JSON.stringify(members))
  //     next(members);
  //   });
  // }

  /*4. 세션에 넣기*/
  req.session.userId = req.body.userId;
  req.session.groupId = object.group_id;

  res.render('login', object)

  async.waterfall([
    // checkUser,
    // getGroupInfo,
    // getGroupMembers,
    // setRender

    // selectGroup,
  ], function(err) {
    console.log(err)
  })
});

module.exports = router;









