const mongoose = require('mongoose')
const { Schema } = mongoose

const post = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    file: String,
    likes:{
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