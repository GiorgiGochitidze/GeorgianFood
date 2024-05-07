const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    img: String,
    title: String,
    description: String,
    date: String
})

module.exports = mongoose.model('posts', Post)