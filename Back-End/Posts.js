const mongoose = require('mongoose')

const Post = mongoose.Schema({
    heading: String,
    body: String,
})

module.exports = mongoose.model('posts', Post)