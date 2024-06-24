const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email : {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate : [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxLength: [6, 'Password cannot exceed 6 charecters']
    },
    avatar: {
        type: String,
        required: true
    },
    role : {
        type: String,
        default : 'user'
    },
    resetpasswordToken : {
        type: String
    },
    resetpasswordTokenExpire: {
        type: Date
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

let model = mongoose.model('user', userSchema)

module.exports = model