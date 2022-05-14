const mongoose = require('mongoose')
const { Schema } = mongoose

const post = new Schema({
    id: String,
    title: String,
    message: String,
    avatar: String,
    creator: String,
    file: String,
    replies: Array,
    likes:{
        type: Number,
        default: 0
    },
    loves:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const postModel = mongoose.model('post', post )

module.exports = postModel