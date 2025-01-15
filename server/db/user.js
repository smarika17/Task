const mangoose = require('mongoose');


const userSchema = new mangoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
});

const User = mangoose.model('User', userSchema);
module.exports = User;