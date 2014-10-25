/**
* Applications main file
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var server = require('./server/routes');
var path = require('path');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/', server.router);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client', 'index.html'));
});
app.get('/test', function (req, res) {
  res.send('test ok');
});

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('submit', function () {
    console.log('a user has submitted a THING');
    socket.broadcast.emit('update');
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on port *:3000');
});
