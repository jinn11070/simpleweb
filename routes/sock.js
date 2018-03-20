// var express = require('express');
// var router = express.Router();
//
// router.get('/', function(req, res, next) {
//   res.io = io;
//   next();
//   /*res.render('sock', {
//     title: 'cccccc'
//   });*/
// });
//
// module.exports = router;





module.exports = function(io){
  var express = require('express');
  var router = express.Router();
  io.on('connection', function(socket) {
    console.log('***********user connected');
    socket.on('clientMsg', function(fromClient) {
      console.log("clientMsg:" + fromClient);

      var serverMsg = 'its me';
      socket.emit('serverMsg', serverMsg); // 클라이언트쪽으로 client_1 이벤트 발행
    })
  })

  // var router = express.Router();

  return router;
}

