const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser")
const multer = require('multer');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('./mongo/mongodb.js');
require('./mongo/models/User');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().single('avatar'));
const upload = multer({ dest: '../wechat/public/logos' });

const User = mongoose.model('User');



const online_arr = [];

// register

app.post("/register", function (req, res) {

    User.find({ username: req.body.username }, function (err, doc) {
        if (doc.length < 1) {
            var user = new User(req.body);
            user.save(function (err, doc) {
                if (err) res.send(err);
                res.json({
                    status: 'success',
                    message: "login success",
                    userInfo: doc
                });
            });
        } else {
            res.send("Username already exsists！");
        }
    });
});
// login
app.post("/login", function (req, res) {
    User.findOne({
        username: req.body.username
    }, (err, doc) => {
        if (!doc || doc.length < 1) {
            res.json({
                status: "error",
                message: "User has not been exsisted"
            });
        } else if (doc.password != req.body.password) {
            res.json({
                status: "error",
                message: "Wrong password！"
            });
        } else {
            // user = doc;
            online_arr.push(doc.username);
            res.json({
                status: 'success',
                message: "Login success",
                userInfo: doc
            });
        }
    });
});
// Search friend
app.get("/user/:userId/friend/:friendName", (req, res) => {
    const { userId, friendName } = req.params;
    let partten = new RegExp("^" + userId);
    User.find({
        userId: {
            $regex: partten,
            $ne: friendName
        }
    }, (err, doc) => {
        if (doc) {
            res.json({
                status: "success",
                message: "Search success",
                userInfo: doc
            });
        }
    }).limit(5);
});

// Add friend
app.post('/user/:userId/friends/:friendId', (req, res) => {
    const { userId, friendId } = req.params;
    User.update({ username: userId }, { $addToSet: { friends: friendId } }).exec().then(() => User.update({ _id: friendId }, { $addToSet: { friends: userId } }).exec()).then(() =>  res.send({
        status: "success",
        message: "Login success"
    }));

});

// upload figure
app.post("/uploadLogo", upload.single("avatar"), (req, res) => {
    User.update({ _id: req.body.id }, { $set: { logo: './logos/' + req.file.filename } }, function () {
        res.send({
            status: "success",
            url: './logos/' + req.file.filename
        });
    });
});

// Change username
app.post("/savenickname", (req, res) => {
    User.update({ _id: req.body.id }, { $set: { nickname: req.body.nickname } }, function () {
        res.send({
            status: 'success'
        });
    });
});



app.listen(4000);