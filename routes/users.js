var express = require('express');
var router = express.Router();

var query = require('../config/repo')()

/* GET users listing. */
router.get('/', function(req, res, next) {
  var table = "user";
  var param = [];

  query.select(table, function(result) {
    res.send(JSON.stringify(result))
    /* TODO
     * res.render('user', { 로 구현해보기
     * */
  });


});

module.exports = router;







