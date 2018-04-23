let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser")
let multer = require('multer');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('./mongo/mongodb.js');
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().single('avatar'));
let upload = multer({ dest: '../wechat/public/logos' });
let User = require("./mongo/models/user.js");

let online_arr = [];

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
                })
            })
        } else {
            res.send("Username has already been exsisted！")
        }
    })

})
// login
app.post("/login", function (req, res) {
    var conn = {
        'username': req.body.username
    }
    // if(online_arr.indexOf(req.body.username)>=0){
    //     res.json({
    //             status: 'error',
    //             message: "User is online"
    //         })
    //         return;
    // }
    User.findOne(conn, function (err, doc) {
        if (!doc || doc.length < 1) {
            res.json({
                status: "error",
                message: "User has not been exsisted"
            });
        } else if (doc.password != req.body.password) {
            res.json({
                status: "error",
                message: "Wrong password！"
            })
        } else {
            // user = doc;
            online_arr.push(doc.username);
            res.json({
                status: 'success',
                message: "Login success",
                userInfo: doc
            })
        }
    })

})
// Search friend
app.post("/getUsers", (req, res) => {
    let partten = new RegExp("^" + req.body.username);
    let conn = {
        username: {
            $regex: partten,
            $ne: req.body.self_username
        }
    }

    User.find(conn, (err, doc) => {
        if (doc) {
            res.json({
                status: "success",
                message: "Search success",
                userInfo: doc
            })
        }
    }).limit(5)
})
// Add friend
app.post('/makeFriend', (req, res) => {

    let self = req.body.self;
    let friend = req.body.friend;

    User.update({ _id: friend.id }, { $addToSet: { friends: self } }, (err, doc) => {

    })
    User.update({ _id: self.id }, { $addToSet: { friends: friend } }, (err, doc) => {
        res.json({
            status: "success",
            message: "Login success"
        })
    })

})

// upload figure
app.post("/uploadLogo", upload.single("avatar"), (req, res) => {
    User.update({ _id: req.body.id }, { $set: { logo: './logos/' + req.file.filename } }, function () {
        res.send({
            status: "success",
            url: './logos/' + req.file.filename
        })
    })
})

// Change username
app.post("/savenickname",(req,res)=>{
    User.update({_id:req.body.id},{$set:{nickname:req.body.nickname}},function(){
        res.send({
            status:'success'
        })
    })
})



app.listen(4000);