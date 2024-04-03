const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uid: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userModel = new mongoose.model('userModel', userSchema);
module.exports = userModel;