var express = require('express');
var router = express.Router();

var query = require('../config/repo')()

/* GET users listing. */
router.get('/', function(req, res, next) {
  var table = "user";
  var param = [];

  query.select(table, function(value) {
    console.log("------")
    console.log()


    res.send("++" + JSON.stringify(value))
  });


});

module.exports = router;







