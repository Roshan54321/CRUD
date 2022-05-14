const mongoose = require('mongoose') 
const { Schema } = mongoose

const users = new Schema({
    id: String,
    username: String,
    password: String,
    avatar: String
})

const usersModel = mongoose.model('users', users)
module.exports = usersModel