var express = require('express');
var router = express.Router();

var query = require('../config/query')()

/* GET users listing. */
router.get('/', function(req, res, next) {
  var table = "member";
  var username = "ucKang"

  var userList

  query.insert(table, [username, username], function(result) {
    JSON.stringify(result)
    res.send(result)
    // query.select(table, function(result) {
    //   res.send(JSON.stringify(result))
    //   /* TODO
    //    * res.render('user', { 로 구현해보기
    //    * */
    // });
    // res.send(result)
  });

 /* query.select(table, function(result) {
    res.send(JSON.stringify(result))
    /!* TODO
     * res.render('user', { 로 구현해보기
     * *!/
  });*/

 /* query.searchByUsername(table, username, function(result) {
    JSON.stringify(result)

    userList = result
    if (userList.length > 0) {
      res.send(JSON.stringify(userList))
    }
  });
*/


});

module.exports = router;







