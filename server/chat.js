let app = require('http').createServer(handler)
let io = require('socket.io')(app);

// var express = require("express");
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.listen(3000);

function handler(req, res) {

}


let arrAllSocket = {};
io.on('connection', function (socket) {
  socket.on('join', function (userName) {
    user = userName;
    socket.username = user;
    arrAllSocket[user] = socket;
  });

  //Server gets messgege and sends message to another user
  socket.on('private_message', function (from, to, msg) {
    var target = arrAllSocket[to];

    if (target) {
console.log(target.username);
      target.emit("private_message", from, to, msg);
      target.emit("common_message", from, to, msg);
    }
  });

  //link disconnect
  socket.on('disconnect', function (data) {
    delete(arrAllSocket[socket.username]);
  });
});
