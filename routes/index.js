var express = require('express');
var router = express.Router();

/* GET homey page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    name: 'SOOJIN',
    isTrue: this.name === 'SOOJIN',
    a_list: ['김미란', '김현주', '변정윤', '장혜주', '정수진']
  });
});

module.exports = router;

