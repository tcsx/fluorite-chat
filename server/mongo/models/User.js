const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    logo: {
        type: String,
        default: './image/icon_moren_face.png'
    },
    rooms: Array
});

const User = mongoose.model('User', userSchema);