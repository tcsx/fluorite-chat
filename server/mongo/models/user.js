let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let loginSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    friends: Array,
    logo: {
        type: String,
        default: './image/icon_moren_face.png'
    },
    rooms: Array
});

let User = mongoose.model('user', loginSchema);

module.exports = User;