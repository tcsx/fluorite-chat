let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
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

let User = mongoose.model('User', userSchema);