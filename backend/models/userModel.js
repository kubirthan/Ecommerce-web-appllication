const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
})

let model = mongoose.model('user', userSchema)

module.exports = model