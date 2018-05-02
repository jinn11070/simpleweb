var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  var filename = path.join(process.cwd(), '/test/mrkim.txt');
  // var filename = path.join(process.cwd(), req.url);

  fs.exists(filename, function(isExist) {
    if (!isExist) {
      res.writeHead(404, {"content-Type": "text/plain"});
      res.write("404 NotFound\n");
      res.end();
      return;
    }

    fs.readFile(filename, encoding='utf-8', function(err, data) {
      if (err) {
        console.log(err)
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(data);

    })
  })
/*
  fs.readFile('./index.html', encoding='utf-8', function(err, data) {
    if (err) {
      console.log(err)
      /!*res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();*!/
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(data);

  })
*/

  /*path.extname(filename, function(isExist) {

    if (!isExist) {
      res.writeHead(404, {"content-Type": "text/plain"});
      res.write("404 NotFound\n");
      res.end();
      return;
    }

    fs.readFile('./index.html', encoding='utf-8', function(err, data) {
      if (err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(data);

    })
  });*/
});

module.exports = router;
