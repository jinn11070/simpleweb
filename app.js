var express = require('express');
var session = require('express-session');
var query = require('./config/query')()
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var readFile = require('./routes/readFile');
var chatList= require('./routes/chatList');
var makeRoom= require('./routes/makeRoom');
var chatRoom= require('./routes/chatRoom');
var shareRoom= require('./routes/shareRoom');
var sock = require('./routes/sock');
var connectSock = require('./routes/connectSock');

var app = express();
var io = socket_io();

app.io = io;

app.set('trust proxy', 1)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('log level', 3);
app.set('transports', [
  'websocket',
  'flashsocket',
  'htmlfile',
  'xhr-polling',
  'jsonp-polling'
]);
app.set('socketio', io);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret key',
  // resave: false,
  // saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/readFile', readFile);
// app.use('/sock', sock(io));
app.use('/sock', connectSock(io));
app.use('/getsock', connectSock)

app.use('/login', login);
app.use('/chatList', chatList);
app.use('/makeRoom', makeRoom);

// app.all('/chatRoom/*', chatRoom);
app.all('/shareRoom/*', shareRoom);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
